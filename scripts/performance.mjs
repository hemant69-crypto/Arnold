import lighthouse from "lighthouse";
import * as launcher from "chrome-launcher";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const origin = process.env.QA_ORIGIN ?? "http://127.0.0.1:3001";
const availableRoutes = [
  ["consulting", "/consulting"],
  ["home", "/"],
  ["service", "/capabilities/executive-search"],
  ["article", "/insights/choosing-an-rpo-engagement"],
  ["opportunities", "/opportunities"],
  ["gcc", "/gcc"],
  ["training", "/capabilities/training"],
];
const selection = process.env.QA_PERFORMANCE_ROUTE;
if (selection && !availableRoutes.some(([name]) => name === selection))
  throw new Error("Unknown performance route");
const routes = selection
  ? availableRoutes.filter(([name]) => name === selection)
  : availableRoutes;
await mkdir("output/lighthouse", { recursive: true });
const results = [];
for (const [name, path] of routes) {
  const runs = [];
  for (let i = 1; i <= 3; i++) {
    const chrome = await launcher.launch({
      chromePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      chromeFlags: [
        "--headless",
        "--disable-background-networking",
        "--no-first-run",
      ],
    });
    try {
      const result = await lighthouse(origin + path, {
        port: chrome.port,
        logLevel: "error",
        output: "json",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      });
      const lhr = result.lhr;
      await writeFile(
        `output/lighthouse/${name}-${i}.json`,
        JSON.stringify(lhr),
      );
      const a = lhr.audits,
        requests = a["network-requests"].details.items;
      const sum = (type) =>
        requests
          .filter((r) => r.resourceType === type)
          .reduce((n, r) => n + (r.transferSize ?? 0), 0);
      const run = {
        score: Math.round(lhr.categories.performance.score * 100),
        lcp: a["largest-contentful-paint"].numericValue,
        cls: a["cumulative-layout-shift"].numericValue,
        tbt: a["total-blocking-time"].numericValue,
        scriptBytes: sum("Script"),
        fontBytes: sum("Font"),
        browser: lhr.environment.hostUserAgent,
        settings: lhr.configSettings,
      };
      runs.push(run);
      console.log(
        name,
        i,
        JSON.stringify({ ...run, browser: undefined, settings: undefined }),
      );
    } finally {
      await chrome.kill();
    }
  }
  const median = (key) => runs.map((r) => r[key]).sort((a, b) => a - b)[1];
  results.push({
    name,
    path,
    median: Object.fromEntries(
      ["score", "lcp", "cls", "tbt", "scriptBytes", "fontBytes"].map((k) => [
        k,
        median(k),
      ]),
    ),
    runs,
  });
}
const buildId = (await readFile(".next/BUILD_ID", "utf8")).trim();
await writeFile(
  selection
    ? `output/performance-${selection}.json`
    : "output/performance-summary.json",
  JSON.stringify(
    {
      buildId,
      date: new Date().toISOString(),
      origin,
      tool: "Lighthouse 13.5.0; default mobile simulated throttling; fresh Chrome profile per pass",
      results,
    },
    null,
    2,
  ),
);
console.log("Summary saved");
