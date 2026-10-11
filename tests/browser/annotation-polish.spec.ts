import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const pillarPaths = [
  "/capabilities",
  "/capabilities/workforce-solutions",
  "/capabilities/background-verification",
  "/capabilities/hr-advisory",
];

test("pillar circle follows the Home/Consulting size and interaction rules", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1414, height: 900 });
  await mkdir("output/playwright/annotation-polish", { recursive: true });
  for (const [i, path] of pillarPaths.entries()) {
    await page.goto(path);
    const zone = page.locator(".pillar-experience");
    await expect(zone).toHaveAttribute("data-field-status", "running");
    await page.mouse.move(870, 395);
    await expect(zone).toHaveAttribute("data-pointer-lens", "true");
    const lens = () =>
      zone.evaluate((el) => ({
        x: parseFloat(el.style.getPropertyValue("--lens-x")),
        y: parseFloat(el.style.getPropertyValue("--lens-y")),
        radius: parseFloat(el.style.getPropertyValue("--lens-radius")),
      }));
    expect((await lens()).radius).toBeCloseTo(130.1, 1);
    await page.mouse.move(1020, 430);
    await expect.poll(async () => (await lens()).x).toBeGreaterThan(1000);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `output/playwright/annotation-polish/pillar-cursor-${i}-1414.png`,
    });
    await zone.locator(".intro-bottom a").hover();
    await expect(zone).not.toHaveAttribute("data-pointer-lens", "true");
    await page.mouse.move(900, 395);
    await expect(zone).toHaveAttribute("data-pointer-lens", "true");
    await zone.locator("h1").evaluate((el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const selection = window.getSelection()!;
      selection.removeAllRanges();
      selection.addRange(range);
    });
    await expect(zone).not.toHaveAttribute("data-pointer-lens", "true");
    await page.evaluate(() => window.getSelection()?.removeAllRanges());
    await page.mouse.move(925, 400);
    await expect(zone).toHaveAttribute("data-pointer-lens", "true");
    await page.locator(".menu-trigger").click();
    await expect(zone).not.toHaveAttribute("data-pointer-lens", "true");
    await page.keyboard.press("Escape");
    await expect(zone).toHaveAttribute("data-field-status", "running");
    await page.mouse.move(930, 405);
    await expect(zone).toHaveAttribute("data-pointer-lens", "true");
    await zone.getByRole("button", { name: "Pause effects" }).click();
    await expect(zone).not.toHaveAttribute("data-pointer-lens", "true");
    await zone.getByRole("button", { name: "Resume effects" }).click();
    await expect(zone).toHaveAttribute("data-field-status", "running");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(zone).not.toHaveAttribute("data-pointer-lens", "true");
    await expect(zone).toHaveAttribute("data-field-status", "static");
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }
});

test("annotation compositions and simplified menu fit desktop and mobile", async ({
  page,
}) => {
  await mkdir("output/playwright/annotation-polish", { recursive: true });
  for (const width of [1414, 1176, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.locator("#perspective").scrollIntoViewIfNeeded();
    await page.evaluate(() => document.fonts.ready);
    await page.locator("#perspective").screenshot({
      path: `output/playwright/annotation-polish/experience-${width}.png`,
    });
    await expect(page.locator("main")).not.toContainText(
      "Illustrative cityscape",
    );
    await expect(page.locator(".cinema-credit")).toHaveCount(0);
    await page.goto("/about#founder");
    await expect(page.locator("#founder img")).toBeVisible();
    await page.locator("#founder").screenshot({
      path: `output/playwright/annotation-polish/founder-${width}.png`,
    });
    await page.locator(".menu-trigger").click();
    await expect(page.locator(".expanded-nav a")).toHaveCount(14);
    await expect(
      page.locator(".expanded-nav > div").nth(1).locator("a"),
    ).toHaveText([
      "Talent & Search",
      "Workforce Solutions",
      "Background Verification",
      "HR Advisory",
      "GCC & Enterprise Capability",
    ]);
    await expect(page.locator(".menu-service-details")).toHaveCount(0);
    const bottom = await page
      .locator(".menu-bottom > div a")
      .evaluateAll((links) =>
        links.map((el) => {
          const box = el.getBoundingClientRect();
          return { top: box.top, bottom: box.bottom };
        }),
      );
    expect(
      Math.max(...bottom.map((b) => b.top)) -
        Math.min(...bottom.map((b) => b.top)),
    ).toBeLessThan(2);
    expect(
      Math.max(...bottom.map((b) => b.bottom)) -
        Math.min(...bottom.map((b) => b.bottom)),
    ).toBeLessThan(2);
    await page.locator("#menu-panel").screenshot({
      path: `output/playwright/annotation-polish/menu-${width}.png`,
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.keyboard.press("Escape");
  }
  await page.goto("/consulting");
  await expect(page.locator("main")).not.toContainText("Illustrative format");
  await expect(page.locator(".cinema-credit")).toHaveCount(0);
});
