/* global document */
import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const phase = process.env.REVIEW_PHASE === "before" ? "before" : "final";
const evidence = resolve("../docs/enterprise-buyer-refinement");
const directory = resolve(
  "output/playwright/enterprise-buyer-refinement",
  phase,
);
await mkdir(directory, { recursive: true });
const origin = "http://127.0.0.1:3001";
const browser = await chromium.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: phase === "final" ? 2 : 1,
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
const captures = [];
page.on("pageerror", (error) => errors.push(error.message));
const targets = [
  ["hero", "/", ".hero"],
  ["hero-proposition", "/", ".hero-lower"],
  ["hero-copy", "/", ".hero-lower > p"],
  ["business-context", "/", "#perspective"],
  ["consulting", "/consulting", ".consulting-hero"],
  ["buyer-priorities", "/consulting", "#business-priorities"],
  ["growth-priority", "/consulting", ".consulting-situation:first-child"],
  ["consulting-outputs", "/consulting", "#practical-outputs"],
  ["capabilities", "/capabilities", ".page-intro"],
  ["buyer-journeys", "/capabilities", "#cap3"],
  ["gcc", "/gcc", ".page-intro"],
  ["gcc-stages", "/gcc", "#gcc-growth"],
  ["leadership", "/capabilities/executive-search", ".page-intro"],
  ["rpo", "/capabilities/recruitment-process-outsourcing", "#rpo-models"],
  ["framework", "/", ".approach-preview > div:last-child"],
  ["advantage", "/", "#arnold-advantage"],
  ["outcomes", "/", "#business-outcomes"],
  ["contact", "/contact?interest=consulting", ".contact-layout"],
  ["ats", "/opportunities", "#portal"],
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
            /* Report media failures in QA. */
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
  const pages = [];
  for (const path of [
    "/",
    "/consulting",
    "/capabilities",
    "/gcc",
    "/capabilities/executive-search",
    "/capabilities/recruitment-process-outsourcing",
    "/about",
    "/employers",
    "/contact?interest=consulting",
    "/opportunities",
  ]) {
    await page.goto(origin + path);
    pages.push({
      path,
      title: await page.title(),
      description: await page
        .locator('meta[name="description"]')
        .getAttribute("content"),
      text: await page.locator("main").innerText(),
      links: await page.locator("main a").evaluateAll((links) =>
        links.map((a) => ({
          text: a.textContent,
          href: a.getAttribute("href"),
        })),
      ),
    });
  }
  for (const id of ["hero", "consulting", "capabilities"]) {
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
      text: await element.innerText(),
      bounds: await element.boundingBox(),
    });
  }
  if (errors.length) throw new Error(errors.join("\n"));
  await writeFile(
    resolve(evidence, `${phase}-review.json`),
    JSON.stringify(
      {
        capturedAt: new Date().toISOString(),
        origin,
        buildId: (await readFile(".next/BUILD_ID", "utf8")).trim(),
        method:
          "Unaltered element screenshots and rendered public copy; reduced motion for stable evidence; 1440px desktop and 390px mobile.",
        errors,
        captures,
        pages,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    `Saved ${captures.length} ${phase} captures and ${pages.length} rendered buyer-journey pages.`,
  );
} finally {
  await context.close();
  await browser.close();
}
