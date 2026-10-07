import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

const evidence = "output/playwright/consulting";

test("consulting has a complete business-led narrative, correct navigation and enquiry routing", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/consulting");
  await expect(page.locator("main h1")).toHaveText(
    "Business consulting for your next chapter.",
  );
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.locator(".consulting-advisory-item")).toHaveCount(6);
  await expect(page.locator(".consulting-situation")).toHaveCount(6);
  await expect(page.locator(".consulting-service-row")).toHaveCount(6);
  await expect(page.locator(".consulting-stage")).toHaveCount(4);
  await expect(page.locator(".consulting-faq")).toHaveCount(8);
  await expect(page.locator(".consulting-perspectives article")).toHaveCount(3);
  const copy = await page.locator("main").textContent();
  expect(copy!.split(/\s+/).length).toBeGreaterThan(2500);
  expect(copy).not.toMatch(/TODO|TBC|internal note|Apex|[\u0900-\u097f]/i);
  expect(
    copy!.match(
      /Your next stage requires more than an additional hiring list/g,
    ),
  ).toHaveLength(1);
  expect(await page.locator(".nav-groups a").allTextContents()).toEqual([
    "Home",
    "Consulting",
    "Capabilities",
    "GCC & Technology",
    "Approach",
    "About",
    "Insights",
    "Contact",
    "Opportunities",
  ]);
  await page.locator(".menu-trigger").click();
  const menuPaths = await page
    .locator("#menu-panel .expanded-nav a")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(menuPaths.slice(0, 3)).toEqual(["/", "/consulting", "/capabilities"]);
  await page.keyboard.press("Escape");
  await page
    .locator('.consulting-hero a[href="/contact?interest=consulting"]')
    .click();
  await expect(page.locator('select[name="interest"]')).toHaveValue(
    "consulting",
  );
  await expect(
    page.getByRole("button", { name: "Sending unavailable in preview" }),
  ).toBeDisabled();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore consulting", exact: true })
    .click();
  await expect(page).toHaveURL(/\/consulting$/);
});

test("consulting motion respects pause, menu suspension and runtime reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/consulting");
  const root = page.locator(".consulting-page");
  await expect(root).toHaveAttribute("data-consult-motion", "running");
  await expect(page.locator(".atmosphere canvas")).toHaveClass("is-ready");
  await page.getByRole("button", { name: "Pause effects" }).click();
  await expect(root).toHaveAttribute("data-consult-motion", "static");
  await page.goto("/about");
  await page.goto("/consulting");
  await expect(root).toHaveAttribute("data-consult-motion", "static");
  await page.getByRole("button", { name: "Resume effects" }).click();
  await expect(root).toHaveAttribute("data-consult-motion", "running");
  await page.locator(".menu-trigger").click();
  await expect(root).toHaveAttribute("data-consult-motion", "static");
  await page.keyboard.press("Escape");
  await expect(root).toHaveAttribute("data-consult-motion", "running");
  await page
    .getByRole("link", { name: "What you receive", exact: true })
    .click();
  await expect
    .poll(() =>
      page
        .locator("#practical-outputs")
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(110);
  await page.locator(".consulting-priority-map").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator("[data-consult-path]")
        .evaluate((el) =>
          Number.parseFloat(getComputedStyle(el).strokeDashoffset),
        ),
    )
    .toBe(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(root).toHaveAttribute("data-consult-motion", "static");
  await expect(page.locator("[data-consult-path]")).not.toHaveAttribute(
    "style",
    /stroke-dashoffset/,
  );
  await expect(page.locator("#outputs-title")).toBeVisible();
});

test("both consulting films defer loading, loop in view and stop behind menus or offscreen", async ({
  page,
}) => {
  test.setTimeout(75000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/consulting");
  const films = page.locator(".section-video");
  await expect(films).toHaveCount(2);
  await expect(films.nth(0).locator("video")).not.toHaveAttribute("src", /./);
  await expect(films.nth(1).locator("video")).not.toHaveAttribute("src", /./);
  for (const [index, stem] of [
    "consulting-discussion",
    "consulting-perspective",
  ].entries()) {
    const film = films.nth(index),
      video = film.locator("video");
    await film.scrollIntoViewIfNeeded();
    await expect(
      film.getByRole("button", { name: "Pause video" }),
    ).toBeVisible();
    await expect(video).toHaveAttribute("src", `/media/${stem}.mp4`);
    await expect
      .poll(() => video.evaluate((v) => (v as HTMLVideoElement).paused))
      .toBe(false);
    await page.locator(".menu-trigger").click();
    await expect
      .poll(() => video.evaluate((v) => (v as HTMLVideoElement).paused))
      .toBe(true);
    await page.keyboard.press("Escape");
    await expect
      .poll(() => video.evaluate((v) => (v as HTMLVideoElement).paused))
      .toBe(false);
    const wraps = await video.evaluate(
      (v) =>
        new Promise<number>((resolve) => {
          const video = v as HTMLVideoElement;
          let previous = video.currentTime,
            count = 0;
          const finish = () => {
            clearTimeout(timer);
            video.removeEventListener("timeupdate", tick);
            resolve(count);
          };
          const tick = () => {
            if (video.currentTime < previous - 1) count++;
            previous = video.currentTime;
            if (count >= 2) finish();
          };
          const timer = setTimeout(finish, 21000);
          video.addEventListener("timeupdate", tick);
        }),
    );
    expect(wraps, stem).toBeGreaterThanOrEqual(2);
    await mkdir(evidence, { recursive: true });
    await page.screenshot({ path: `${evidence}/${stem}-desktop.png` });
  }
  await page.locator(".consulting-closing").scrollIntoViewIfNeeded();
  for (const video of await page.locator("video").all())
    await expect
      .poll(() => video.evaluate((v) => (v as HTMLVideoElement).paused))
      .toBe(true);
});

test("consulting reflows with accessible copy, native FAQs and original figures", async ({
  page,
}) => {
  test.setTimeout(90000);
  await mkdir(evidence, { recursive: true });
  for (const width of [320, 390, 768, 1024, 1440, 1920, 667]) {
    await page.setViewportSize({ width, height: width === 667 ? 375 : 1000 });
    await page.goto("/consulting");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `${width}px`,
    ).toBe(true);
    const clipped = await page
      .locator(
        ".consulting-page h1, .consulting-page h2, .consulting-page h3, .consulting-priority-map p",
      )
      .evaluateAll((nodes) =>
        nodes
          .filter((node) => node.scrollWidth > node.clientWidth + 1)
          .map((node) => node.textContent),
      );
    expect(clipped, `${width}px headings and diagram labels`).toEqual([]);
    if (width === 1440 || width === 390) {
      await page.screenshot({ path: `${evidence}/hero-${width}.png` });
      const question = page.locator(".consulting-faq summary").first();
      await question.focus();
      await page.keyboard.press("Enter");
      await expect(page.locator(".consulting-faq").first()).toHaveAttribute(
        "open",
        "",
      );
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        `${width}px`,
      ).toEqual([]);
      await page.screenshot({
        path: `${evidence}/page-${width}.png`,
        fullPage: true,
      });
      await page.locator(".consulting-priority-map").scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${evidence}/outputs-${width}.png` });
    }
  }
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/consulting");
  await page.addStyleTag({
    content:
      "body{font-size:200%!important} p,a,button,summary{font-size:1em!important}",
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
});

test("mobile, reduced motion and save-data show posters with deliberate manual playback", async ({
  page,
}) => {
  for (const mode of ["mobile", "reduced", "save-data"]) {
    await page.setViewportSize({
      width: mode === "mobile" ? 390 : 1440,
      height: 1000,
    });
    await page.emulateMedia({
      reducedMotion: mode === "reduced" ? "reduce" : "no-preference",
    });
    if (mode === "save-data")
      await page.addInitScript(() =>
        Object.defineProperty(navigator, "connection", {
          value: {
            saveData: true,
            addEventListener() {},
            removeEventListener() {},
          },
        }),
      );
    await page.goto("/consulting");
    await expect(page.locator(".consulting-page")).toHaveAttribute(
      "data-consult-motion",
      "static",
    );
    const film = page.locator(".section-video").first();
    await film.scrollIntoViewIfNeeded();
    await expect(film.locator("video")).not.toHaveAttribute("src", /./);
    await expect(film.locator("img")).toBeVisible();
    await film.getByRole("button", { name: "Play video" }).click();
    await expect(
      film.getByRole("button", { name: "Pause video" }),
    ).toBeVisible();
    await film.getByRole("button", { name: "Pause video" }).click();
    await expect
      .poll(() =>
        film.locator("video").evaluate((v) => (v as HTMLVideoElement).paused),
      )
      .toBe(true);
    // Resume explicitly so this mode does not leak a user pause into the next pass.
    await film.getByRole("button", { name: "Play video" }).click();
  }
});

test("consulting remains useful without JavaScript and with unavailable graphics or media", async ({
  page,
  browser,
}) => {
  await page.goto("/consulting");
  const origin = new URL(page.url()).origin;
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL: origin,
    viewport: { width: 390, height: 844 },
  });
  try {
    const plain = await context.newPage();
    await plain.goto("/consulting");
    await expect(plain.locator("main h1")).toBeVisible();
    await expect(plain.locator(".consulting-advisory-item")).toHaveCount(6);
    await plain.locator(".consulting-faq summary").first().click();
    await expect(plain.locator(".consulting-faq p").first()).toBeVisible();
    await plain.locator(".menu-trigger").click();
    await expect(
      plain.locator('#menu-panel a[href="/consulting"]'),
    ).toBeVisible();
  } finally {
    await context.close();
  }
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      return type.includes("webgl")
        ? null
        : Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  await page.route("**/media/consulting-*.mp4", (route) => route.abort());
  await page.goto("/consulting");
  await expect(page.locator("main h1")).toBeVisible();
  const film = page.locator(".section-video").first();
  await film.scrollIntoViewIfNeeded();
  await expect(film.locator(".cinema-status")).toHaveText(
    "Video unavailable. Showing the still image.",
  );
  await expect(film.locator("img")).toBeVisible();
});
