/* global document */
import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const directory = resolve("../docs/founder-content-response/screenshots");
await mkdir(directory, { recursive: true });
const origin = "http://127.0.0.1:3001";
const browser = await chromium.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const page = await context.newPage();
const captures = [];
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const targets = [
  ["hero", "/", ".hero"],
  ["capability-themes", "/capabilities", ".page-intro"],
  ["gcc", "/gcc", ".page-intro"],
  ["rpo", "/capabilities/recruitment-process-outsourcing", "#rpo-models"],
  [
    "rpo-table",
    "/capabilities/recruitment-process-outsourcing",
    "#rpo-models table",
  ],
  ["flexible-models", "/", "#workforce-models"],
  ["framework", "/", ".approach-preview"],
  ["framework-stages", "/", ".approach-preview > div:last-child"],
  ["ai-workforce", "/", ".cinema"],
  ["skills-intelligence", "/", "#skills-intelligence"],
  ["candidate", "/opportunities", ".page-intro"],
  ["ats-unchanged", "/opportunities", "#portal"],
  ["insights", "/insights", "#ins1"],
  ["advantage", "/", "#arnold-advantage"],
  ["outcomes", "/", "#business-outcomes"],
  ["early-proof", "/", ".client-strip"],
  ["workforce-advisory", "/consulting", ".consulting-hero"],
];
try {
  for (const [id, path, selector] of targets) {
    const response = await page.goto(origin + path);
    if (response?.status() !== 200) throw new Error(`Unavailable: ${path}`);
    await page.evaluate(() => document.fonts.ready);
    const element = page.locator(selector);
    await element.scrollIntoViewIfNeeded();
    await page.locator("img").evaluateAll(async (images) => {
      await Promise.all(
        images.map(async (image) => {
          image.loading = "eager";
          try {
            await image.decode();
          } catch {
            /* Existing QA validates media. */
          }
        }),
      );
    });
    const file = resolve(directory, `${id}.png`);
    const buffer = await element.screenshot({
      path: file,
      animations: "disabled",
    });
    captures.push({
      id,
      path,
      selector,
      file,
      sha256: createHash("sha256").update(buffer).digest("hex"),
      text: await element.innerText(),
      bounds: await element.boundingBox(),
    });
  }
  const themes = await page
    .goto(origin + "/capabilities")
    .then(() => page.locator(".families h3").allTextContents());
  if (
    themes.join("|") !==
    "Leadership|Talent|Workforce|Capability|GCC & Enterprise Capability"
  )
    throw new Error("Incomplete capability themes");
  await page.goto(origin + "/opportunities");
  if (await page.locator('input[type="file"], iframe, form').count())
    throw new Error(
      "ATS must remain unavailable; no added upload or application form",
    );
  for (const id of ["hero", "candidate", "ai-workforce"]) {
    const target = targets.find((entry) => entry[0] === id);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(origin + target[1]);
    await page.evaluate(() => document.fonts.ready);
    const element = page.locator(target[2]);
    await element.scrollIntoViewIfNeeded();
    const file = resolve(directory, `${id}-mobile.png`);
    const buffer = await element.screenshot({
      path: file,
      animations: "disabled",
    });
    captures.push({
      id: `${id}-mobile`,
      path: target[1],
      selector: target[2],
      file,
      sha256: createHash("sha256").update(buffer).digest("hex"),
      bounds: await element.boundingBox(),
      text: await element.innerText(),
    });
  }
  if (errors.length) throw new Error(errors.join("\n"));
  await writeFile(
    resolve(directory, "../screenshot-manifest.json"),
    JSON.stringify(
      {
        capturedAt: new Date().toISOString(),
        origin,
        buildId: (await readFile(".next/BUILD_ID", "utf8")).trim(),
        method:
          "Unaltered browser element screenshots; reduced motion for stable evidence; desktop 1440px and mobile 390px.",
        themes,
        errors,
        captures,
      },
      null,
      2,
    ),
  );
  console.log(
    `Saved ${captures.length} website screenshots; all five themes and unchanged ATS state verified.`,
  );
} finally {
  await context.close();
  await browser.close();
}
