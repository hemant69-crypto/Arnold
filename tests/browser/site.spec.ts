import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { allRoutes } from "../../src/content/routes";
test("all 27 direct routes, metadata, internal links, no script policy errors and real 404", async ({
  page,
  request,
}) => {
  const failures: string[] = [];
  const titles = new Set<string>();
  const links = new Set<string>();
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("console", (msg) => {
    if (
      /violates.*Content Security Policy|Refused to execute|Refused to load/i.test(
        msg.text(),
      )
    )
      failures.push(msg.text());
  });
  expect(allRoutes).toHaveLength(27);
  for (const path of allRoutes) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    if (path !== "/") {
      await expect(page.locator('[lang="hi"]')).toHaveCount(0);
      expect(await page.locator("body").innerText()).not.toMatch(
        /[\u0900-\u097f]/,
      );
    }
    await expect(page.locator('.nav-groups a[href="/consulting"]')).toHaveCount(
      1,
    );
    await expect(page.locator('footer a[href="/consulting"]')).toHaveCount(1);
    titles.add(await page.title());
    expect(
      await page.locator('meta[name="description"]').getAttribute("content"),
    ).toBeTruthy();
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((nodes) =>
        nodes.map((n) => n.getAttribute("href")!.split(/[?#]/)[0]),
      );
    hrefs.forEach((href) => links.add(href));
  }
  expect(titles.size).toBe(allRoutes.length);
  expect(failures).toEqual([]);
  for (const href of links) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
  const missing = await page.goto("/a-route-that-does-not-exist");
  expect(missing?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "A different starting point." }),
  ).toBeVisible();
  expect(failures).toEqual([]);
});
test("representative pages pass automated WCAG 2.2 AA checks at desktop and mobile", async ({
  page,
}) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of [
      "/",
      "/capabilities",
      "/capabilities/executive-search",
      "/capabilities/recruitment-process-outsourcing",
      "/gcc",
      "/approach",
      "/capabilities/training",
      "/insights/planning-a-gcc-hiring-roadmap",
      "/opportunities",
      "/insights/building-human-capability-for-ai-enabled-work",
      "/insights/mapping-critical-skills-before-you-hire",
      "/contact",
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      await page.locator("img").evaluateAll(async (images) => {
        await Promise.all(
          images.map(async (image) => {
            (image as HTMLImageElement).loading = "eager";
            try {
              await (image as HTMLImageElement).decode();
            } catch {
              /* Browser failure remains visible. */
            }
          }),
        );
      });
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        result.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => n.target),
        })),
        `${path} at ${width}`,
      ).toEqual([]);
    }
  }
});
test("pause survives navigation; unavailable WebGL, media and fonts preserve the page", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pause effects" }).click();
  await page.goto("/about");
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Resume effects" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Resume effects" }).click();
  await expect(
    page.getByRole("button", { name: "Pause effects" }),
  ).toHaveAttribute("aria-pressed", "false");
  await page.locator(".cinema").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Pause video" }).click();
  await page.goto("/about");
  await page.goto("/");
  await page.locator(".cinema").scrollIntoViewIfNeeded();
  await expect(page.getByRole("button", { name: "Play video" })).toBeVisible();
  expect(
    await page.locator("video").evaluate((v) => (v as HTMLVideoElement).paused),
  ).toBe(true);
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (type.includes("webgl")) return null;
      return Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  await page.route("**/fonts/**", (route) => route.abort());
  await page.route("**/media/perspective.mp4", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator(".atmosphere canvas")).not.toHaveClass("is-ready");
  await expect(page.locator("main h1")).toBeVisible();
  await page.locator(".cinema").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Play video" }).click();
  await expect(page.locator(".cinema-status")).toHaveText(
    "Video unavailable. Showing the still image.",
  );
  await expect(page.locator(".cinema img")).toBeVisible();
});
test("responsive widths, landscape and text enlargement preserve reflow", async ({
  page,
}) => {
  for (const size of [
    { width: 320, height: 800 },
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1440, height: 1000 },
    { width: 1920, height: 1080 },
    { width: 667, height: 375 },
  ]) {
    await page.setViewportSize(size);
    for (const path of [
      "/",
      "/capabilities/recruitment-process-outsourcing",
      "/contact",
      "/insights/choosing-an-rpo-engagement",
    ]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${path} at ${size.width}`,
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
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
test("menu keyboard trap, escape, focus restoration, routing and background unlock", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.locator(".menu-trigger");
  await trigger.click();
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await expect(page.locator(".menu")).toHaveAttribute("open", "");
  await expect(page.locator("#menu-panel a").first()).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator(".menu-bottom a").last()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
  await trigger.click();
  await page
    .locator("#menu-panel")
    .getByRole("link", { name: "Executive Search", exact: true })
    .click();
  await expect(page).toHaveURL(/executive-search$/);
  await expect(page.locator(".menu")).not.toHaveAttribute("open", "");
  expect(
    await page.locator("body").evaluate((el) => el.style.overflow),
  ).not.toBe("hidden");
});
test("service interest, unavailable enquiry, neutral confirmation and ATS are truthful", async ({
  page,
  request,
}) => {
  await page.goto("/contact?interest=executive-search");
  await expect(page.locator('select[name="interest"]')).toHaveValue(
    "executive-search",
  );
  await expect(
    page.getByRole("button", { name: "Sending unavailable in preview" }),
  ).toBeDisabled();
  const response = await request.post("/api/enquiry", { data: {} });
  expect(response.status()).toBe(503);
  expect(await response.json()).not.toHaveProperty("accepted", true);
  await page.goto("/thank-you");
  await expect(
    page.getByRole("heading", {
      name: "There is no confirmed enquiry for this visit.",
    }),
  ).toBeVisible();
  await page.goto("/opportunities");
  await expect(
    page.getByRole("heading", {
      name: "The application portal is not connected yet.",
    }),
  ).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);
});
test("no JavaScript and reduced motion preserve content and disclosure navigation", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.locator("main h1")).toBeVisible();
  await page.locator(".menu-trigger").click();
  await expect(page.locator("#menu-panel")).toBeVisible();
  await page
    .locator("#menu-panel")
    .getByRole("link", { name: "Capabilities", exact: true })
    .click();
  await expect(page).toHaveURL(/capabilities$/);
  await context.close();
  const reduced = await browser.newContext({ reducedMotion: "reduce" });
  const rp = await reduced.newPage();
  await rp.goto(baseURL!);
  await expect(rp.locator(".motion-toggle")).not.toBeVisible();
  await expect(rp.locator(".atmosphere canvas")).not.toHaveClass("is-ready");
  await rp.locator(".cinema").scrollIntoViewIfNeeded();
  expect(
    await rp.locator("video").evaluate((v) => (v as HTMLVideoElement).paused),
  ).toBe(true);
  await reduced.close();
});
test("production headers and representative visual evidence", async ({
  page,
  request,
}) => {
  for (const path of ["/", "/contact"]) {
    const response = await request.get(path);
    const h = response.headers();
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["x-frame-options"]).toBe("DENY");
    const csp =
      h["content-security-policy"] ?? h["content-security-policy-report-only"];
    expect(csp).toContain("object-src 'none'");
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).not.toContain("script-src 'self' 'unsafe-inline'");
  }
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const [name, path] of [
      ["home", "/"],
      ["executive", "/capabilities/executive-search"],
      ["rpo", "/capabilities/recruitment-process-outsourcing"],
      ["contact", "/contact"],
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      await page.locator("img").evaluateAll(async (images) => {
        await Promise.all(
          images.map(async (image) => {
            const img = image as HTMLImageElement;
            img.loading = "eager";
            try {
              await img.decode();
            } catch {
              /* Retain visible failure. */
            }
          }),
        );
      });
      await page.screenshot({
        path: `output/playwright/${name}-${width}.png`,
        fullPage: true,
      });
      if (name === "home" && width === 1440)
        await page.screenshot({ path: "output/playwright/preview.png" });
    }
  }
});
