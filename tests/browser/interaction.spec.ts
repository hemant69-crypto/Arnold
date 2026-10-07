import { test, expect } from "@playwright/test";
import { writeFile } from "node:fs/promises";
test("mobile menu interactions stay responsive under fourfold CPU slowdown", async ({
  page,
  context,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const cdp = await context.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.goto("/");
  await page.evaluate(() => {
    const samples: number[] = [];
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) samples.push(entry.duration);
    });
    observer.observe({
      type: "event",
      buffered: true,
      durationThreshold: 16,
    } as PerformanceObserverInit);
    (window as unknown as { arnoldLabEvents: number[] }).arnoldLabEvents =
      samples;
  });
  for (let i = 0; i < 8; i++) {
    await page.locator(".menu-trigger").click();
    await expect(page.locator("#menu-panel a").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.locator(".menu-trigger")).toBeFocused();
  }
  const samples = await page.evaluate(
    () => (window as unknown as { arnoldLabEvents: number[] }).arnoldLabEvents,
  );
  const maxEventDuration = Math.max(0, ...samples);
  await writeFile(
    "output/interaction-lab.json",
    JSON.stringify(
      {
        profile: "Chrome, 390x844, CPU slowdown 4x, eight open/Escape cycles",
        samples,
        maxEventDuration,
        meaning:
          "Lab Event Timing samples at a 16ms reporting threshold. Not field INP.",
      },
      null,
      2,
    ),
  );
  expect(maxEventDuration).toBeLessThanOrEqual(200);
});
