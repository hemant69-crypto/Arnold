import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const pages = [
  ["/capabilities", "talent"],
  ["/capabilities/workforce-solutions", "workforce"],
  ["/capabilities/background-verification", "verification"],
  ["/capabilities/hr-advisory", "advisory"],
  ["/about#founder", "founder"],
] as const;

test("each new field renders, pauses with the menu and follows the shared visitor preference", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1414, height: 900 });
  await mkdir("output/playwright/four-pillars", { recursive: true });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const [path, variant] of pages) {
    await page.goto(path);
    const zone = page.locator(`[data-scene="${variant}"]`);
    await zone.scrollIntoViewIfNeeded();
    await expect(zone).toHaveAttribute("data-field-status", "running");
    await expect(zone.locator("canvas")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await zone.screenshot({
      path: `output/playwright/four-pillars/effect-${variant}-1414.png`,
    });
    await page.locator(".menu-trigger").click();
    await expect(zone).toHaveAttribute("data-field-status", "static");
    await page.keyboard.press("Escape");
    await expect(zone).toHaveAttribute("data-field-status", "running");
  }
  const founder = page.locator("#founder");
  const box = await founder.boundingBox();
  await page.mouse.move(
    box!.x + box!.width * 0.85,
    box!.y + Math.min(box!.height * 0.4, 450),
  );
  await expect
    .poll(async () =>
      Number.parseFloat(
        await founder.evaluate((el) =>
          el.style.getPropertyValue("--portrait-x"),
        ),
      ),
    )
    .toBeGreaterThan(1);
  await founder.getByRole("button", { name: "Pause effects" }).click();
  await expect(founder).toHaveAttribute("data-field-status", "static");
  await page.goto("/capabilities/workforce-solutions");
  const workforce = page.locator('[data-scene="workforce"]');
  await expect(workforce).toHaveAttribute("data-field-status", "static");
  await workforce.getByRole("button", { name: "Resume effects" }).click();
  await expect(workforce).toHaveAttribute("data-field-status", "running");
  await page.locator(".section-video").scrollIntoViewIfNeeded();
  await expect(workforce).toHaveAttribute("data-field-status", "static");
  expect(errors).toEqual([]);
});

for (const [path, variant] of pages.slice(0, 4)) {
  test(`${variant} stock film decodes, loops and suspends with the menu and offscreen`, async ({
    page,
  }) => {
    test.setTimeout(80000);
    await page.setViewportSize({ width: 1414, height: 900 });
    const requests: string[] = [];
    page.on("request", (request) => {
      if (request.url().endsWith(".mp4")) requests.push(request.url());
    });
    await page.goto(path);
    await expect(page.locator(".section-video")).toHaveCount(1);
    expect(requests).toEqual([]);
    const section = page.locator(".section-video");
    const video = section.locator("video");
    await section.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        video.evaluate((el) => ({
          paused: (el as HTMLVideoElement).paused,
          width: (el as HTMLVideoElement).videoWidth,
        })),
      )
      .toEqual({ paused: false, width: 1280 });
    const media = await video.evaluate((el) => {
      const v = el as HTMLVideoElement;
      return {
        duration: v.duration,
        muted: v.muted,
        loop: v.loop,
        error: v.error,
      };
    });
    expect(media.duration).toBeGreaterThan(5.5);
    expect(media.duration).toBeLessThan(9);
    expect(media.muted && media.loop).toBe(true);
    expect(media.error).toBeNull();
    expect(requests).toHaveLength(1);
    await video.evaluate((el) => {
      const v = el as HTMLVideoElement;
      let previous = v.currentTime;
      let cycles = 0;
      return new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(
          () => reject(new Error("Film did not complete three loops")),
          40000,
        );
        const check = () => {
          if (previous - v.currentTime > v.duration * 0.5) cycles++;
          previous = v.currentTime;
          if (cycles >= 3) {
            clearTimeout(timeout);
            v.removeEventListener("timeupdate", check);
            resolve();
          }
        };
        v.addEventListener("timeupdate", check);
      });
    });
    await section.screenshot({
      path: `output/playwright/four-pillars/video-${variant}-1414.png`,
    });
    await page.locator(".menu-trigger").click();
    await expect
      .poll(() => video.evaluate((el) => (el as HTMLVideoElement).paused))
      .toBe(true);
    await page.keyboard.press("Escape");
    await expect
      .poll(() => video.evaluate((el) => (el as HTMLVideoElement).paused))
      .toBe(false);
    await section.getByRole("button", { name: "Pause video" }).click();
    await expect
      .poll(() => video.evaluate((el) => (el as HTMLVideoElement).paused))
      .toBe(true);
    await section.getByRole("button", { name: "Play video" }).click();
    await expect
      .poll(() => video.evaluate((el) => (el as HTMLVideoElement).paused))
      .toBe(false);
    await page.locator("main h1").scrollIntoViewIfNeeded();
    await expect
      .poll(() => video.evaluate((el) => (el as HTMLVideoElement).paused))
      .toBe(true);
  });
}

test("new effects react to reduced motion and unavailable graphics without hiding essential copy", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1414, height: 900 });
  await page.goto("/about#founder");
  const founder = page.locator("#founder");
  await expect(founder).toHaveAttribute("data-field-status", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(founder).toHaveAttribute("data-field-status", "static");
  await expect(founder.locator(".founder-portrait img")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(founder).toHaveAttribute("data-field-status", "running");
  await founder.locator("canvas").evaluate((el) => {
    (el as HTMLCanvasElement)
      .getContext("webgl")!
      .getExtension("WEBGL_lose_context")!
      .loseContext();
  });
  await expect(founder).toHaveAttribute("data-field-status", "failed");
  await expect(founder.locator("#founder-name")).toBeVisible();
  await expect(founder.locator(".founder-link")).toBeVisible();
});

test("mobile, save-data and reduced motion use stills; deliberate film playback remains available", async ({
  browser,
}) => {
  test.setTimeout(120000);
  for (const mode of ["mobile", "reduced", "save-data"]) {
    const context = await browser.newContext({
      viewport: { width: mode === "mobile" ? 390 : 1414, height: 900 },
      reducedMotion: mode === "reduced" ? "reduce" : "no-preference",
    });
    if (mode === "save-data")
      await context.addInitScript(() => {
        Object.defineProperty(navigator, "connection", {
          configurable: true,
          value: {
            saveData: true,
            addEventListener() {},
            removeEventListener() {},
          },
        });
      });
    const page = await context.newPage();
    for (const [path, variant] of pages) {
      const films: string[] = [];
      const listener = (request: import("@playwright/test").Request) => {
        if (request.url().endsWith(".mp4")) films.push(request.url());
      };
      page.on("request", listener);
      await page.goto(`http://127.0.0.1:3001${path}`);
      const zone = page.locator(`[data-scene="${variant}"]`);
      await zone.scrollIntoViewIfNeeded();
      await expect(zone).toHaveAttribute("data-field-status", "static");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
      if (variant !== "founder") {
        const section = page.locator(".section-video");
        await section.scrollIntoViewIfNeeded();
        expect(films).toEqual([]);
        await expect(section.locator("video")).not.toHaveAttribute("src", /.+/);
        await expect(section.locator("picture img")).toBeVisible();
        await section.getByRole("button", { name: "Play video" }).click();
        await expect
          .poll(() =>
            section
              .locator("video")
              .evaluate((el) => (el as HTMLVideoElement).paused),
          )
          .toBe(false);
        await section.getByRole("button", { name: "Pause video" }).click();
      }
      page.off("request", listener);
    }
    await context.close();
  }
});

test("new pillar and founder compositions retain their copy and images without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 900 },
  });
  const page = await context.newPage();
  for (const [path, variant] of pages) {
    await page.goto(`http://127.0.0.1:3001${path}`);
    const zone = page.locator(`[data-scene="${variant}"]`);
    await expect(zone).toBeVisible();
    await expect(zone.locator("h1, h2")).toBeVisible();
    await expect(zone.locator(".scene-motion-control")).toBeHidden();
    if (variant !== "founder")
      await expect(page.locator(".section-video picture img")).toBeAttached();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  }
  await context.close();
});
