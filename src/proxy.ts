import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { contentSecurityPolicy } from "@/lib/csp";
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const development = process.env.NODE_ENV === "development";
  const dynamic = path === "/contact" || path === "/thank-you";
  const nonce = dynamic ? randomBytes(18).toString("base64") : undefined;
  const policy = contentSecurityPolicy({ path, nonce, development });
  const headers = new Headers(request.headers);
  if (nonce) {
    headers.set("x-nonce", nonce);
    headers.set("Content-Security-Policy", policy);
  }
  const response = NextResponse.next({ request: { headers } });
  response.headers.set(
    process.env.CSP_REPORT_ONLY === "true"
      ? "Content-Security-Policy-Report-Only"
      : "Content-Security-Policy",
    policy,
  );
  if (dynamic) response.headers.set("Cache-Control", "private, no-store");
  return response;
}
export const config = {
  matcher: [
    "/((?!api/|_next/|media/|fonts/|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)",
  ],
};
