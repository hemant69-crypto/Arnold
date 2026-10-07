import { SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { handleCmsWebhook } from "@/lib/cms-webhook";
import { readLimitedBody } from "@/lib/enquiry";
export async function POST(request: Request) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  const endpoint = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const hook = process.env.CMS_REBUILD_HOOK;
  if (
    process.env.CMS_ENABLED !== "true" ||
    !secret ||
    !endpoint ||
    !token ||
    !hook
  )
    return Response.json({ result: "not-configured" }, { status: 503 });
  try {
    const redisUrl = new URL(endpoint);
    const hookUrl = new URL(hook);
    if (
      redisUrl.protocol !== "https:" ||
      !redisUrl.hostname.endsWith(".upstash.io") ||
      hookUrl.origin !== "https://api.vercel.com" ||
      !hookUrl.pathname.startsWith("/v1/integrations/deploy/")
    )
      throw new Error("Invalid configuration");
    const command = async (payload: (string | number)[]) => {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: AbortSignal.timeout(4000),
      });
      if (!response.ok) throw new Error("queue-unavailable");
      const result = await response.json();
      if (result.error) throw new Error("queue-unavailable");
      return result.result;
    };
    const raw = await readLimitedBody(request);
    const result = await handleCmsWebhook(
      raw,
      request.headers.get(SIGNATURE_HEADER_NAME) ?? "",
      secret,
      {
        reserve: async (key) =>
          (await command([
            "SET",
            `arnold:cms:${key}`,
            "pending",
            "NX",
            "EX",
            120,
          ])) === "OK",
        requestCurrentBuild: async () => {
          const response = await fetch(hook, {
            method: "POST",
            cache: "no-store",
            signal: AbortSignal.timeout(8000),
          });
          if (!response.ok) throw new Error("rebuild-unavailable");
        },
        complete: async (key) => {
          if (
            (await command([
              "SET",
              `arnold:cms:${key}`,
              "requested",
              "EX",
              86400,
            ])) !== "OK"
          )
            throw new Error("queue-unavailable");
        },
      },
    );
    return Response.json(
      { result: result.result },
      { status: result.status, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { result: "reconciliation-required" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
