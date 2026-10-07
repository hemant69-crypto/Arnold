import { decodeSignatureHeader, isValidSignature } from "@sanity/webhook";
import { createHash } from "node:crypto";
export interface CmsRebuildQueue {
  reserve(key: string): Promise<boolean>;
  requestCurrentBuild(): Promise<void>;
  complete(key: string): Promise<void>;
}
export async function handleCmsWebhook(
  raw: string,
  signature: string,
  secret: string,
  queue: CmsRebuildQueue,
  now = Date.now(),
) {
  if (secret.length < 32 || raw.length > 24000)
    return { status: 401, result: "rejected" };
  try {
    const { timestamp } = decodeSignatureHeader(signature);
    if (
      Math.abs(now - timestamp) > 300000 ||
      !(await isValidSignature(raw, signature, secret))
    )
      return { status: 401, result: "rejected" };
  } catch {
    return { status: 401, result: "rejected" };
  }
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return { status: 400, result: "invalid-event" };
  }
  if (
    !body ||
    !["service", "insight", "editorialPage", "approvedEvidence"].includes(
      String(body._type),
    ) ||
    !["create", "update", "delete"].includes(String(body.operation)) ||
    typeof body._id !== "string" ||
    !/^[a-zA-Z0-9_.-]{1,128}$/.test(body._id) ||
    /^(drafts|versions)\./.test(body._id)
  )
    return { status: 400, result: "invalid-event" };
  const key = createHash("sha256").update(raw).digest("hex");
  try {
    if (!(await queue.reserve(key)))
      return { status: 202, result: "already-requested" };
    await queue.requestCurrentBuild();
    await queue.complete(key);
    return { status: 202, result: "rebuild-requested" };
  } catch {
    return { status: 503, result: "reconciliation-required" };
  }
}
