import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

test("the sticky atmosphere cannot paint over the GCC editorial surface", async ({
  page,
}) => {
  test.setTimeout(90000);
  for (const [width, reducedMotion] of [
    [1440, "no-preference"],
    [1440, "reduce"],
    [1024, "no-preference"],
    [768, "no-preference"],
    [390, "no-preference"],
    [320, "no-preference"],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion });
    await page.goto("/");
    await page.locator(".gcc-feature").waitFor();
    const feature = await page.locator(".gcc-feature").evaluate((element) => ({
      top: element.getBoundingClientRect().top + scrollY,
      height: element.getBoundingClientRect().height,
    }));
    for (const offset of [-100, 0, Math.min(450, feature.height - 550)]) {
      await page.evaluate(
        (top) => window.scrollTo({ top, behavior: "instant" }),
        feature.top + offset,
      );
      // Hit testing omits pointer-events:none artwork, so visibility checks
      // alone missed this bug. Verify the actual painted editorial surface.
      await expect(page).toHaveScreenshot("gcc-white-surface.png", {
        clip: { x: width - 18, y: 450, width: 16, height: 16 },
        animations: "disabled",
        maxDiffPixels: 0,
        scale: "css",
      });
    }
  }
});

test("GCC content, image and service links reflow and remain accessible", async ({
  page,
}) => {
  test.setTimeout(90000);
  await mkdir("output/playwright/gcc-section", { recursive: true });
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: width >= 1024 ? 1200 : 900 });
    await page.goto("/");
    const section = page.getByRole("region", {
      name: "Your next stage. The right people.",
    });
    await section.getByRole("heading", { level: 2 }).scrollIntoViewIfNeeded();
    await expect(section.locator(".gcc-support a")).toHaveCount(3);
    await expect(section.getByText("Bengaluru, India")).toBeVisible();
    await expect(section.locator(".gcc-summary")).toBeVisible();
    await expect
      .poll(() =>
        section
          .locator("img")
          .evaluate(
            (image: HTMLImageElement) =>
              image.complete && image.naturalWidth > 0,
          ),
      )
      .toBe(true);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    for (const element of await section.locator("h2, h3, p, a, figure").all()) {
      const box = await element.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
    }
    const results = await new AxeBuilder({ page })
      .include("#gcc-technology")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await section.screenshot({
      path: `output/playwright/gcc-section/section-${width}.png`,
      animations: "disabled",
    });
    if (width === 1440) {
      await section.evaluate((element) =>
        window.scrollTo({
          top: element.getBoundingClientRect().top + scrollY - 40,
          behavior: "instant",
        }),
      );
      await page.screenshot({
        path: "output/playwright/gcc-section/preview.png",
      });
    }
  }
});

test("GCC service links and main invitation open their destination at the top", async ({
  page,
}) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/capabilities/executive-search",
      "/capabilities/permanent-staffing",
      "/capabilities/recruitment-process-outsourcing",
      "/gcc",
    ]) {
      await page.goto("/");
      await page.locator(`.gcc-feature a[href="${path}"]`).click();
      await expect(page).toHaveURL((url) => url.pathname === path);
      await expect(page.locator("main h1")).toBeVisible();
      await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    }
    await page.goto("/#gcc-technology");
    await expect(page.locator("#gcc-feature-heading")).toBeInViewport();
    await expect
      .poll(() =>
        page
          .locator("#gcc-technology")
          .evaluate((element) =>
            Math.round(element.getBoundingClientRect().top),
          ),
      )
      .toBe(110);
  }
});

test("GCC content remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("/");
  const section = page.locator(".gcc-feature");
  await expect(section.locator("h2")).toHaveText(
    "Your next stage.The right people.",
  );
  await expect(section.locator(".gcc-support a")).toHaveCount(3);
  await section.locator("h2").scrollIntoViewIfNeeded();
  await expect(page).toHaveScreenshot("gcc-white-surface.png", {
    clip: { x: 372, y: 450, width: 16, height: 16 },
    maxDiffPixels: 0,
    scale: "css",
  });
  await context.close();
});
