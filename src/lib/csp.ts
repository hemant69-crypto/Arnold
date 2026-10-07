import bundledManifest from "../../security/csp-hashes.json";
type HashManifest = { buildId: string; routes: Record<string, string[]> };
const manifest: HashManifest = bundledManifest;
export function staticScriptHashes(path: string) {
  return manifest.routes[path] ?? manifest.routes["/_not-found"] ?? [];
}
export function contentSecurityPolicy({
  path,
  nonce,
  development = false,
  atsOrigin,
}: {
  path: string;
  nonce?: string;
  development?: boolean;
  atsOrigin?: string;
}) {
  const scripts = development
    ? "'self' 'unsafe-inline' 'unsafe-eval'"
    : nonce
      ? `'self' 'nonce-${nonce}' 'strict-dynamic'`
      : `'self' ${staticScriptHashes(path).join(" ")}`;
  return [
    `default-src 'self'`,
    `script-src ${scripts}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob:`,
    `font-src 'self'`,
    `media-src 'self'`,
    `connect-src 'self'${development ? " ws:" : ""}`,
    `frame-src ${atsOrigin ?? "'none'"}`,
    `object-src 'none'`,
    `base-uri 'none'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
  ].join("; ");
}
