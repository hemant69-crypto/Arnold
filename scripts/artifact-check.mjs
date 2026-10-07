import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
const failures = [],
  inspected = [];
async function scan(root) {
  for (const item of await readdir(root, { withFileTypes: true })) {
    const path = join(root, item.name);
    if (item.isDirectory()) await scan(path);
    else {
      inspected.push(path);
      if (
        /\.(?:pdf|docx?|sql|env|pem|key)$/i.test(path) ||
        /(?:^|\/)\.env/.test(path)
      )
        failures.push(path + ": private file type");
      if (/\.(?:html|js|json|txt|svg|css)$/.test(path)) {
        const text = await readFile(path, "utf8");
        if (
          /MUST NOT LEAK|PRIVATE_EVIDENCE_CANARY|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|sk_live_[A-Za-z0-9]{20}/.test(
            text,
          )
        )
          failures.push(path + ": secret/private canary");
      }
    }
  }
}
await scan("public");
await scan(".next/static");
async function html(root) {
  for (const i of await readdir(root, { withFileTypes: true })) {
    const p = join(root, i.name);
    if (i.isDirectory()) await html(p);
    else if (i.name.endsWith(".html")) {
      inspected.push(p);
      if (
        /MUST NOT LEAK|PRIVATE_EVIDENCE_CANARY/.test(await readFile(p, "utf8"))
      )
        failures.push(p);
    }
  }
}
await html(".next/server/app");
const sensitivePaths = [
  "/sources/",
  "/reports/",
  "/planning/",
  "/docs/",
  "/websites/",
];
async function traces(root) {
  for (const i of await readdir(root, { withFileTypes: true })) {
    const p = join(root, i.name);
    if (i.isDirectory()) await traces(p);
    else if (i.name.endsWith(".nft.json")) {
      const data = JSON.parse(await readFile(p, "utf8"));
      for (const f of data.files ?? [])
        if (sensitivePaths.some((s) => f.includes(s)))
          failures.push(p + ": source material traced");
    }
  }
}
await traces(".next/server");
const statuses = {};
for (const path of [
  "/.env",
  "/README.md",
  "/sources/private.docx",
  "/docs/QA_REPORT.md",
  "/security/csp-hashes.json",
]) {
  const r = await fetch(
    (process.env.QA_ORIGIN ?? "http://127.0.0.1:3001") + path,
  );
  statuses[path] = r.status;
  if (r.status !== 404) failures.push(path + ": unexpected status " + r.status);
}
const result = {
  date: new Date().toISOString(),
  filesInspected: inspected.length,
  failures,
  statuses,
  scope:
    "Public assets/client bundles/generated HTML/private-source trace references and HTTP exposure smoke test. Not a penetration test.",
};
await writeFile("output/artifact-check.json", JSON.stringify(result, null, 2));
console.log(JSON.stringify(result));
if (failures.length) process.exitCode = 1;
