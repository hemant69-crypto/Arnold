import {
  mkdirSync,
  writeFileSync,
  readFileSync,
  readdirSync,
  existsSync,
} from "node:fs";
import { join, relative, sep } from "node:path";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
mkdirSync("security", { recursive: true });
if (!existsSync("security/csp-hashes.json"))
  writeFileSync(
    "security/csp-hashes.json",
    JSON.stringify({ buildId: "pending", routes: {} }),
  );
const result = spawnSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build"],
  { stdio: "inherit", env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" } },
);
if (result.status !== 0) process.exit(result.status ?? 1);
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
writeFileSync(
  "security/csp-hashes.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  `CSP hashes generated for ${Object.keys(routes).length} immutable HTML routes. Rebuild whenever public content changes.`,
);
