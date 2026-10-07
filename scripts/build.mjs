import { mkdirSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";
mkdirSync("security", { recursive: true });
const buildId = randomUUID();
const manifestPath = "security/csp-hashes.json";
// Both passes use one ID, so page scripts remain identical. Pass one measures
// the rendered scripts; pass two bundles those hashes into the request proxy.
writeFileSync(manifestPath, JSON.stringify({ buildId, routes: {} }) + "\n");
function build() {
  const result = spawnSync(
    process.execPath,
    ["node_modules/next/dist/bin/next", "build"],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        NEXT_TELEMETRY_DISABLED: "1",
        ARNOLD_BUILD_ID: buildId,
      },
    },
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
}
function measure() {
  const root = ".next/server/app";
  const routes = {};
  for (const file of readdirSync(root, { recursive: true })) {
    if (!file.endsWith(".html")) continue;
    const html = readFileSync(join(root, file), "utf8");
    const hashes = new Set();
    for (const match of html.matchAll(
      /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
    )) {
      if (/\bsrc\s*=/.test(match[1]) || !match[2]) continue;
      hashes.add(
        `'sha256-${createHash("sha256").update(match[2]).digest("base64")}'`,
      );
    }
    let path =
      "/" +
      relative(root, join(root, file))
        .split(sep)
        .join("/")
        .replace(/\.html$/, "");
    if (path === "/index") path = "/";
    routes[path] = [...hashes];
  }
  if (!routes["/"]?.length || !routes["/_not-found"]?.length)
    throw new Error("CSP generation requires homepage and 404 scripts.");
  const manifest = {
    buildId: readFileSync(".next/BUILD_ID", "utf8").trim(),
    routes,
  };
  return manifest;
}
build();
const manifest = measure();
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
build();
const verified = measure();
if (JSON.stringify(verified) !== JSON.stringify(manifest)) {
  throw new Error(
    "CSP scripts changed between build passes; refusing unsafe output.",
  );
}
console.log(
  `CSP hashes bundled and verified for ${Object.keys(manifest.routes).length} immutable HTML routes.`,
);
