import { NextResponse } from "next/server";
import { inquiryEnabled } from "@/lib/site-config";
import { processEnquiry, readLimitedBody } from "@/lib/enquiry";
import { RedisEnquiryStore, ResendProvider } from "@/lib/enquiry-adapters";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const json = request.headers
    .get("content-type")
    ?.startsWith("application/json");
  const reply = (
    status: number,
    value: Record<string, unknown>,
    receipt?: string,
  ) => {
    const response = json
      ? NextResponse.json(value, { status })
      : new NextResponse(
          `<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Enquiry status</title><h1>${receipt ? "Enquiry accepted" : "Enquiry not confirmed"}</h1><p>${String(value.message ?? "Continue to your confirmation.")}</p><a href="${receipt ? "/thank-you" : "/contact"}">${receipt ? "View confirmation" : "Return to contact"}</a></html>`,
          { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
        );
    response.headers.set("Cache-Control", "private, no-store");
    if (receipt)
      response.cookies.set("arnold-receipt", receipt, {
        httpOnly: true,
        secure: new URL(request.url).protocol === "https:",
        sameSite: "strict",
        path: "/thank-you",
        maxAge: 900,
      });
    return response;
  };
  if (!inquiryEnabled)
    return reply(503, {
      message: "Online enquiries are not connected. No enquiry has been sent.",
    });
  const origin = process.env.APP_ORIGIN!;
  const secret = process.env.RECEIPT_SECRET!;
  let validOrigin = false;
  try {
    validOrigin = new URL(origin).origin === origin;
  } catch {
    /* Invalid configuration fails closed. */
  }
  if (
    secret.length < 32 ||
    !validOrigin ||
    (process.env.NODE_ENV === "production" && !origin.startsWith("https://"))
  )
    return reply(503, {
      message:
        "Enquiry sending is unavailable until configuration is verified.",
    });
  const type = request.headers.get("content-type")?.split(";")[0];
  if (
    type !== "application/json" &&
    type !== "application/x-www-form-urlencoded"
  )
    return reply(415, { message: "Use the website contact form." });
  let value: unknown;
  try {
    const raw = await readLimitedBody(request);
    value = json
      ? JSON.parse(raw)
      : Object.fromEntries(new URLSearchParams(raw));
  } catch {
    return reply(400, {
      message:
        "The enquiry is invalid or too large. Please use the contact form.",
    });
  }
  try {
    const ip =
      process.env.VERCEL === "1"
        ? (request.headers.get("x-vercel-forwarded-for")?.split(",")[0] ??
          "unknown")
        : "shared-untrusted";
    const result = await processEnquiry(
      value,
      request.headers.get("origin"),
      ip,
      {
        origin,
        secret,
        store: new RedisEnquiryStore(
          process.env.UPSTASH_REDIS_REST_URL!,
          process.env.UPSTASH_REDIS_REST_TOKEN!,
        ),
        provider: new ResendProvider(
          process.env.RESEND_API_KEY!,
          process.env.ENQUIRY_TO!,
          process.env.ENQUIRY_FROM!,
        ),
      },
    );
    const { receipt, ...body } = result;
    return reply(result.status, body, receipt);
  } catch {
    return reply(503, {
      message: "Enquiry sending is unavailable. No acceptance is confirmed.",
    });
  }
}
