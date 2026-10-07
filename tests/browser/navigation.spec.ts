import { test, expect, type Locator, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { allRoutes } from "../../src/content/routes";

async function atPageTop(page: Page, path: string) {
  await expect(page).toHaveURL(
    (url) => url.pathname + url.search === path && !url.hash,
  );
  await expect(page.locator("main h1")).toBeVisible();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  // A smooth-scroll race can pass through zero before landing at section two.
  const drift = await page.evaluate(
    () =>
      new Promise<number>((resolve) => {
        const start = performance.now();
        let maximum = 0;
        const sample = () => {
          maximum = Math.max(maximum, Math.abs(scrollY));
          if (performance.now() - start >= 250) resolve(maximum);
          else requestAnimationFrame(sample);
        };
        sample();
      }),
  );
  expect(drift, `${path}: scroll must stay at the top after navigation`).toBe(
    0,
  );
  const heading = await page.locator("main h1").boundingBox();
  expect(heading!.y).toBeGreaterThan(0);
  expect(heading!.y).toBeLessThan(page.viewportSize()!.height);
}

async function follow(page: Page, link: Locator, path: string) {
  await link.click();
  await atPageTop(page, path);
}

async function menuLink(page: Page, path: string) {
  await page.locator(".menu-trigger").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await follow(page, page.locator(`#menu-panel a[href="${path}"]`), path);
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
  await expect(page.locator(".menu")).not.toHaveAttribute("open", "");
  expect(await page.locator("body").evaluate((el) => el.style.overflow)).toBe(
    "",
  );
}

test("grouped header links and wordmark open each page at the top", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const paths = await page
    .locator(".nav-groups a")
    .evaluateAll((links) => links.map((a) => a.getAttribute("href")!));
  for (const path of paths.filter((path) => path !== "/")) {
    await follow(page, page.locator(`.nav-groups a[href="${path}"]`), path);
    await follow(page, page.locator(".site-header .wordmark"), "/");
  }
  await expect(page.locator(".atmosphere canvas")).toHaveClass("is-ready");
  await expect(page.locator(".hero-headline")).toHaveAttribute(
    "data-font-ready",
    "true",
  );
  const headline = await page.locator(".hero-headline").boundingBox();
  await page.mouse.move(
    headline!.x + headline!.width / 2,
    headline!.y + headline!.height / 2,
  );
  await expect(page.locator(".hero-headline")).toHaveAttribute(
    "data-lens-active",
    "true",
  );
  const sceneImage = page.locator(".capability-scene img").first();
  await sceneImage.scrollIntoViewIfNeeded();
  const before = await sceneImage.evaluate(
    (el) => getComputedStyle(el).transform,
  );
  await page.mouse.wheel(0, 250);
  await expect
    .poll(() => sceneImage.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(before);
});

for (const width of [1440, 390]) {
  test(`expanded menu and footer navigate from deep scroll at ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const paths = await page
      .locator('#menu-panel a[href^="/"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")!));
    expect(new Set(paths).size).toBe(19);
    for (const path of paths) {
      await page.locator("footer").scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => scrollY)).toBeGreaterThan(300);
      await menuLink(page, path);
    }
    const footerPaths = await page
      .locator('footer a[href^="/"]')
      .evaluateAll((links) => [
        ...new Set(links.map((a) => a.getAttribute("href")!)),
      ]);
    for (const path of footerPaths) {
      await follow(
        page,
        page.locator(`footer a[href="${path}"]`).first(),
        path,
      );
    }
    // Re-selecting the current homepage from its footer is a fresh top intent.
    await follow(page, page.locator("footer .wordmark"), "/");
  });
}

test("content links, related pages and service-interest buttons arrive at the top", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const visited = new Set<string>();
  for (const path of allRoutes.filter((path) =>
    path.startsWith("/insights/"),
  )) {
    await menuLink(page, "/insights");
    await follow(page, page.locator(`main a[href="${path}"]`).first(), path);
    visited.add(path);
    await follow(
      page,
      page.getByRole("link", { name: "All perspectives" }),
      "/insights",
    );
  }
  for (const path of allRoutes.filter((path) =>
    path.startsWith("/expertise/"),
  )) {
    await menuLink(page, "/expertise");
    await follow(page, page.locator(`main a[href="${path}"]`).first(), path);
    visited.add(path);
    await follow(
      page,
      page.getByRole("link", { name: "All expertise" }),
      "/expertise",
    );
  }
  expect(visited.size).toBe(7);
  for (const interest of ["executive-search", "training", "hr-solutions"]) {
    await menuLink(page, `/capabilities/${interest}`);
    await follow(
      page,
      page.locator(`.page-intro a[href="/contact?interest=${interest}"]`),
      `/contact?interest=${interest}`,
    );
    await expect(page.locator('select[name="interest"]')).toHaveValue(interest);
  }
  await page.goto("/thank-you");
  await follow(
    page,
    page.getByRole("link", { name: "Go to contact" }),
    "/contact",
  );
  await page.goto("/a-route-that-does-not-exist");
  await follow(
    page,
    page.locator("main").getByRole("link", { name: "Home", exact: true }),
    "/",
  );
});

test("section anchors and browser history keep their intended positions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/about");
  await page.locator('.page-aside a[href="#focus"]').click();
  await expect(page).toHaveURL(/\/about#focus$/);
  await expect
    .poll(() =>
      page
        .locator("#focus")
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(190);
  const anchorY = await page.evaluate(() => scrollY);
  await page.locator(".menu-trigger").click();
  await expect(page.getByRole("dialog").locator("summary")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".menu")).not.toHaveAttribute("open", "");
  expect(await page.evaluate(() => scrollY)).toBe(anchorY);
  await menuLink(page, "/capabilities");
  await page.goBack();
  await expect(page).toHaveURL(/\/about#focus$/);
  await expect
    .poll(() =>
      page.evaluate((position) => Math.abs(scrollY - position), anchorY),
    )
    .toBeLessThan(2);
  await page.goForward();
  await atPageTop(page, "/capabilities");
  await menuLink(page, "/");
  await page.locator('.hero-bottom a[href="#perspective"]').click();
  await expect(page).toHaveURL(/\/#perspective$/);
  await expect
    .poll(() =>
      page
        .locator("#perspective")
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(110);
  await menuLink(page, "/");
  await page.keyboard.press("Tab");
  await page.getByRole("link", { name: "Skip to content" }).press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

test("expanded menu includes its close control and reflows accessibly at four breakpoints", async ({
  page,
}) => {
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.locator(".menu-trigger").click();
    const dialog = page.getByRole("dialog", {
      name: "Explore Arnold Consulting",
    });
    await expect(dialog.locator("summary")).toHaveText("Close");
    await expect
      .poll(() =>
        page
          .locator("#menu-panel")
          .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
      )
      .toBe(0);
    const menuLayout = await page.locator("#menu-panel").evaluate((panel) => ({
      columns: getComputedStyle(panel).gridTemplateColumns.split(/\s+/).length,
      navigationWidth: panel
        .querySelector(".expanded-nav")!
        .getBoundingClientRect().width,
    }));
    expect(menuLayout.columns, `menu grid at ${width}px`).toBe(
      width < 768 ? 1 : width < 1024 ? 2 : 3,
    );
    expect(menuLayout.navigationWidth).toBeGreaterThan(200);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    await dialog.locator("summary").click();
    await expect(page.locator(".menu")).not.toHaveAttribute("open", "");
  }
});

test("short-screen menu keeps keyboard focus visible and reopens at its beginning", async ({
  page,
}) => {
  await page.setViewportSize({ width: 667, height: 375 });
  await page.goto("/about");
  await page.locator('.page-aside a[href="#focus"]').click();
  await expect
    .poll(() =>
      page
        .locator("#focus")
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(190);
  const backgroundY = await page.evaluate(() => scrollY);
  const trigger = page.locator(".menu-trigger");
  await trigger.click();
  await expect(page.locator("#menu-panel a").first()).toBeFocused();
  await expect
    .poll(() =>
      page
        .locator("#menu-panel")
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(0);
  await page.keyboard.press("Shift+Tab");
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  const last = page.locator("#menu-panel a").last();
  await expect(last).toBeFocused();
  const lastBounds = await last.boundingBox();
  expect(lastBounds!.y).toBeGreaterThanOrEqual(0);
  expect(lastBounds!.y + lastBounds!.height).toBeLessThanOrEqual(375);
  expect(await page.evaluate(() => scrollY)).toBe(backgroundY);
  expect(
    await page.locator("#menu-panel").evaluate((el) => el.scrollTop),
  ).toBeGreaterThan(0);
  await page.keyboard.press("Escape");
  await expect(page.locator(".menu")).not.toHaveAttribute("open", "");
  await trigger.click();
  await expect(page.locator("#menu-panel a").first()).toBeFocused();
  expect(await page.locator("#menu-panel").evaluate((el) => el.scrollTop)).toBe(
    0,
  );
  await expect
    .poll(() =>
      page
        .locator("#menu-panel")
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(0);
  await page.screenshot({ path: "output/playwright/menu-landscape.png" });
});

test("all 27 pages retain header separation, responsive reflow and intact images", async ({
  page,
}) => {
  test.setTimeout(120000);
  await mkdir("output/playwright/navigation-audit", { recursive: true });
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of allRoutes) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => {
        const bounds = (selector: string) =>
          document.querySelector(selector)!.getBoundingClientRect();
        const header = bounds(".site-header");
        const title = bounds("main h1");
        const brand = bounds(".site-header .wordmark");
        const menu = bounds(".menu-trigger");
        const nav = bounds(".nav-groups");
        return {
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          titleGap: title.top - header.bottom,
          brandVisible: brand.left >= 0 && brand.right <= innerWidth,
          navBrandGap: nav.left - brand.right,
          navMenuGap: menu.left - nav.right,
        };
      });
      expect(layout.overflow, `${path} at ${width}px`).toBe(false);
      expect(
        layout.titleGap,
        `${path}: heading clears header at ${width}px`,
      ).toBeGreaterThan(20);
      expect(layout.brandVisible).toBe(true);
      if (width >= 768) {
        expect(
          layout.navBrandGap,
          `${path}: logo/nav separation`,
        ).toBeGreaterThanOrEqual(24);
        expect(
          layout.navMenuGap,
          `${path}: nav/menu separation`,
        ).toBeGreaterThanOrEqual(24);
      }
      const brokenImages = await page
        .locator("img")
        .evaluateAll(async (images) => {
          await Promise.all(
            images.map(async (image) => {
              (image as HTMLImageElement).loading = "eager";
              try {
                await (image as HTMLImageElement).decode();
              } catch {
                /* Report below. */
              }
            }),
          );
          return images
            .filter((image) => !(image as HTMLImageElement).naturalWidth)
            .map((image) => image.getAttribute("src"));
        });
      expect(brokenImages, `${path} at ${width}px`).toEqual([]);
      if (width !== 768) {
        await page.screenshot({
          path: `output/playwright/navigation-audit/${path === "/" ? "home" : path.slice(1).replaceAll("/", "_")}-${width}.png`,
          fullPage: true,
        });
      }
    }
  }
});
