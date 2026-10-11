import lighthouse from "lighthouse";
import * as launcher from "chrome-launcher";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const origin = process.env.QA_ORIGIN ?? "http://127.0.0.1:3015";
const chrome = await launcher.launch({
  chromePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  chromeFlags: [
    "--headless",
    "--disable-background-networking",
    "--no-first-run",
  ],
});
try {
  const result = await lighthouse(`${origin}/email-signature`, {
    port: chrome.port,
    logLevel: "error",
    output: "json",
    onlyCategories: ["performance", "accessibility", "best-practices"],
  });
  const report = result.lhr;
  await mkdir("output/email-signature", { recursive: true });
  await writeFile(
    "output/email-signature/lighthouse.json",
    JSON.stringify(report),
  );
  const summary = {
    buildId: (await readFile(".next/BUILD_ID", "utf8")).trim(),
    origin,
    tool: "Lighthouse mobile, one lab run",
    scores: Object.fromEntries(
      Object.entries(report.categories).map(([key, value]) => [
        key,
        Math.round(value.score * 100),
      ]),
    ),
    lcpMs: report.audits["largest-contentful-paint"].numericValue,
    cls: report.audits["cumulative-layout-shift"].numericValue,
    tbtMs: report.audits["total-blocking-time"].numericValue,
  };
  await writeFile(
    "output/email-signature/performance-summary.json",
    JSON.stringify(summary, null, 2),
  );
  console.log(JSON.stringify(summary));
} finally {
  await chrome.kill();
}
