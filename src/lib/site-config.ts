import "server-only";
function safeHttps(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}
export const atsUrl = safeHttps(process.env.ATS_URL);
export const productionOrigin = (() => {
  const value = safeHttps(process.env.PRODUCTION_ORIGIN);
  if (!value) return null;
  const url = new URL(value);
  return url.pathname === "/" && !url.search && !url.hash ? url.origin : null;
})();
export const inquiryEnabled = Boolean(
  process.env.ENQUIRY_ENABLED === "true" &&
  process.env.RESEND_API_KEY &&
  process.env.ENQUIRY_TO &&
  process.env.ENQUIRY_FROM &&
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN &&
  process.env.RECEIPT_SECRET &&
  process.env.APP_ORIGIN,
);
export const publicReleaseEnabled =
  process.env.PUBLIC_RELEASE_APPROVED === "true" && Boolean(productionOrigin);
