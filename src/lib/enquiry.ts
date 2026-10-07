import { createHmac, timingSafeEqual } from "node:crypto";
import { interests } from "./interests";
export type Enquiry = {
  requestId: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  interest: string;
  message: string;
};
export type Reservation =
  "reserved" | "accepted" | "pending" | "blocked" | "conflict";
export interface EnquiryStore {
  reserve(id: string, digest: string, rateKey: string): Promise<Reservation>;
  accept(id: string, digest: string): Promise<void>;
}
export interface EnquiryProvider {
  send(enquiry: Enquiry): Promise<"accepted" | "rejected" | "unknown">;
}
export type EnquiryDependencies = {
  store: EnquiryStore;
  provider: EnquiryProvider;
  secret: string;
  origin: string;
};
const uuid =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const email = /^[^\s@\r\n<>]{1,64}@[^\s@\r\n<>]+\.[^\s@\r\n<>]+$/;
export function validateEnquiry(value: unknown): {
  data?: Enquiry;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  if (!value || typeof value !== "object" || Array.isArray(value))
    return { errors: { form: "Provide a valid enquiry." } };
  const input = value as Record<string, unknown>;
  const allowed = [
    "requestId",
    "name",
    "email",
    "company",
    "phone",
    "interest",
    "message",
    "website",
  ];
  if (Object.keys(input).some((key) => !allowed.includes(key)))
    errors.form = "The enquiry includes an unsupported field.";
  const read = (key: string, max: number, required = true) => {
    const raw = input[key];
    if (typeof raw !== "string") {
      if (required) errors[key] = "Complete this field.";
      return "";
    }
    const str = raw.trim();
    const controls = [...str].some(
      (c) => c.charCodeAt(0) < 32 && c !== "\n" && c !== "\r" && c !== "\t",
    );
    if ((required && !str) || str.length > max || controls)
      errors[key] = `Use ${max} characters or fewer and complete the field.`;
    return str;
  };
  const data = {
    requestId: read("requestId", 36),
    name: read("name", 120),
    email: read("email", 254),
    company: read("company", 120),
    phone: read("phone", 120, false),
    interest: read("interest", 50),
    message: read("message", 3000),
  };
  if (!uuid.test(data.requestId))
    errors.form = "Reload the contact page before sending.";
  if (!email.test(data.email))
    errors.email = "Enter a valid email address for follow-up.";
  for (const key of ["name", "company", "phone"] as const)
    if (/[\r\n]/.test(data[key]))
      errors[key] = "Use a single line for this field.";
  if (!interests.some(([id]) => id === data.interest))
    errors.interest = "Choose one of the available service interests.";
  if (input.website) errors.form = "This enquiry cannot be accepted.";
  return { data: Object.keys(errors).length ? undefined : data, errors };
}
export function digest(secret: string, value: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}
export function createReceipt(id: string, secret: string, now = Date.now()) {
  const payload = `${id}.${Math.floor(now / 1000) + 900}`;
  return `${payload}.${digest(secret, payload)}`;
}
export function validReceipt(
  value: string | undefined,
  secret: string,
  now = Date.now(),
) {
  if (!value || secret.length < 32) return false;
  const [id, exp, signature, ...rest] = value.split(".");
  if (
    rest.length ||
    !uuid.test(id ?? "") ||
    !/^\d{10}$/.test(exp ?? "") ||
    !/^\w{64}$/.test(signature ?? "")
  )
    return false;
  const expires = Number(exp);
  if (
    expires <= Math.floor(now / 1000) ||
    expires > Math.floor(now / 1000) + 900
  )
    return false;
  const expected = digest(secret, `${id}.${exp}`);
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
export async function processEnquiry(
  value: unknown,
  requestOrigin: string | null,
  ip: string,
  deps: EnquiryDependencies,
) {
  if (requestOrigin !== deps.origin)
    return {
      status: 403,
      message: "This enquiry must be sent from the website.",
    };
  const { data, errors } = validateEnquiry(value);
  if (!data)
    return { status: 400, message: "Review the highlighted fields.", errors };
  const payload = digest(deps.secret, JSON.stringify(data));
  const rateKey = digest(deps.secret, ip);
  try {
    const reservation = await deps.store.reserve(
      data.requestId,
      payload,
      rateKey,
    );
    if (reservation === "blocked")
      return {
        status: 429,
        message: "Too many attempts. Please wait before trying again.",
      };
    if (reservation === "conflict")
      return {
        status: 409,
        message:
          "This request identifier already belongs to another enquiry. Reload the page to start a new one.",
      };
    if (reservation === "pending")
      return {
        status: 409,
        message:
          "Acceptance is not confirmed yet. Keep this page open and retry the same form after two minutes.",
      };
    if (reservation === "accepted")
      return {
        status: 200,
        accepted: true,
        receipt: createReceipt(data.requestId, deps.secret),
      };
    const result = await deps.provider.send(data);
    if (result !== "accepted")
      return {
        status: result === "unknown" ? 503 : 502,
        message:
          result === "unknown"
            ? "We could not confirm acceptance. Keep this page open and retry the same form after two minutes."
            : "The delivery service did not accept this enquiry. Please try again later.",
      };
    await deps.store.accept(data.requestId, payload);
    return {
      status: 200,
      accepted: true,
      receipt: createReceipt(data.requestId, deps.secret),
    };
  } catch {
    return {
      status: 503,
      message:
        "Enquiry sending is temporarily unavailable. Acceptance is not confirmed; please retry this same form later.",
    };
  }
}
export async function readLimitedBody(request: Request, limit = 24000) {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > limit) throw new Error("body-limit");
  const reader = request.body?.getReader();
  if (!reader) return "";
  let size = 0;
  const chunks: Uint8Array[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      throw new Error("body-limit");
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}
