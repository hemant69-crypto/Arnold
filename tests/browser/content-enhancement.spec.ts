import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { enhancementSections } from "../../src/content/enhancements";
import { company } from "../../src/content/company";
import { mkdir, readFile, writeFile } from "node:fs/promises";

test("all 23 enhanced routes contain their three chapters, unique anchors and working contextual links", async ({
  page,
}) => {
  test.setTimeout(180000);
  const targets = new Map<string, Set<string>>();
  const links: { source: string; href: string }[] = [];
  let count = 0;
  const audit = [];
  for (const [route, sections] of Object.entries(enhancementSections)) {
    await page.goto(route);
    for (const { id, title } of sections) {
      const section = page.locator(`main [data-enhancement="${id}"]`);
      await expect(section, `${route}/${id}`).toHaveCount(1);
      await expect(section.locator("h2")).toHaveText(
        route === "/thank-you" && id === "thank3"
          ? "Useful routes while you prepare."
          : title,
      );
      expect(
        (await section.innerText()).split(/\s+/).length,
        route,
      ).toBeGreaterThan(30);
      count++;
    }
    const ids = await page
      .locator("[id]")
      .evaluateAll((nodes) => nodes.map((node) => node.id));
    expect(ids.length, route).toBe(new Set(ids).size);
    targets.set(route, new Set(ids));
    const text = await page.locator("main").innerText();
    audit.push({
      route,
      words: text.trim().split(/\s+/).length,
      sections: sections.map((s) => ({ id: s.id, title: s.title })),
      headings: await page
        .locator("main h1, main h2, main h3")
        .allTextContents(),
    });
    for (const href of await page
      .locator('main .chapter-resources a[href^="/"]')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")!)))
      links.push({ source: route, href });
  }
  expect(count).toBe(69);
  for (const { source, href } of links) {
    const [path, hash] = href.split("#");
    if (hash && targets.has(path))
      expect(targets.get(path)?.has(hash), `${source} → ${href}`).toBe(true);
  }
  await mkdir("output/content-enhancement", { recursive: true });
  await writeFile(
    "output/content-enhancement/page-content-audit.json",
    JSON.stringify(
      {
        buildId: (await readFile(".next/BUILD_ID", "utf8")).trim(),
        date: new Date().toISOString(),
        routes: audit,
        contextualLinks: links,
        totalSections: count,
      },
      null,
      2,
    ),
  );
});

test("direct homepage anchors remain stable through initial logo hydration and visitor preferences", async ({
  browser,
  baseURL,
}) => {
  for (const width of [1440, 390]) {
    for (const preference of ["ordinary", "reduced", "save-data"]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        reducedMotion: preference === "reduced" ? "reduce" : "no-preference",
      });
      if (preference === "save-data")
        await context.addInitScript(() =>
          Object.defineProperty(navigator, "connection", {
            value: Object.assign(new EventTarget(), { saveData: true }),
          }),
        );
      const page = await context.newPage();
      await page.goto(`${baseURL}/#gcc-technology`);
      const strip = page.locator(".client-strip");
      await expect(strip).toHaveAttribute(
        "data-mode",
        preference === "reduced"
          ? "static"
          : preference === "save-data"
            ? "still"
            : "moving",
      );
      await expect
        .poll(
          () =>
            page
              .locator("#gcc-technology")
              .evaluate((node) => Math.round(node.getBoundingClientRect().top)),
          { message: `${width}px / ${preference}` },
        )
        .toBe(110);
      await context.close();
    }
  }
});

test("enhanced content reflows at 320px and keeps table headings associated with their values", async ({
  page,
}) => {
  test.setTimeout(180000);
  await page.setViewportSize({ width: 320, height: 740 });
  for (const route of Object.keys(enhancementSections)) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      route,
    ).toBe(true);
    for (const table of await page.locator("main .content-table table").all()) {
      await expect(table.locator("caption")).toBeVisible();
      expect(
        await table.locator('thead th[scope="col"]').count(),
      ).toBeGreaterThan(0);
      expect(
        await table.locator('tbody th[scope="row"]').count(),
      ).toBeGreaterThan(0);
      expect(
        await table
          .locator("td")
          .evaluateAll((cells) =>
            cells.every((cell) => !!cell.getAttribute("data-label")),
          ),
      ).toBe(true);
    }
  }
});

test("client strip is compact, moves right, pauses and preserves a deliberate pause across navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const strip = page.locator(".client-strip");
  await strip.scrollIntoViewIfNeeded();
  await page.mouse.move(1, 1);
  await expect(strip).toHaveAttribute("data-running", "true");
  await expect(
    strip.getByRole("heading", { name: "Trusted by clients", exact: true }),
  ).toBeVisible();
  await expect(strip.locator('ul:not([aria-hidden="true"]) img')).toHaveCount(
    10,
  );
  const box = await strip.boundingBox();
  expect(box!.height).toBeLessThan(160);
  expect(box!.width).toBeLessThan(1440);
  const track = strip.locator(".client-logo-track");
  const position = () =>
    track.evaluate(
      (node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).m41,
    );
  const before = await position();
  await expect.poll(position).toBeGreaterThan(before + 1);
  await strip.getByRole("button", { name: "Pause client logos" }).click();
  await page.mouse.move(1, 1);
  await expect(strip).toHaveAttribute("data-running", "false");
  await expect(
    strip.getByRole("button", { name: "Resume client logos" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.locator('footer a[href="/about"]').click();
  await page.locator("footer .wordmark").click();
  await page.locator(".client-strip").scrollIntoViewIfNeeded();
  await expect(page.locator(".client-strip")).toHaveAttribute(
    "data-running",
    "false",
  );
  await expect(
    page.getByRole("button", { name: "Resume client logos" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("logo motion pauses for hover, keyboard focus, global pause and the open menu", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const strip = page.locator(".client-strip");
  await strip.scrollIntoViewIfNeeded();
  await page.mouse.move(1, 1);
  await expect(strip).toHaveAttribute("data-running", "true");
  const animation = () =>
    strip
      .locator(".client-logo-track")
      .evaluate((node) => getComputedStyle(node).animationPlayState);
  await strip.hover();
  expect(await animation()).toBe("paused");
  await page.mouse.move(1, 1);
  await strip.getByRole("button").focus();
  expect(await animation()).toBe("paused");
  await page.locator("#main").focus();
  await page.locator(".menu summary").click();
  await expect(strip).toHaveAttribute("data-running", "false");
  await page.keyboard.press("Escape");
  await strip.scrollIntoViewIfNeeded();
  await page.mouse.move(1, 1);
  await page.evaluate(() => {
    sessionStorage.setItem("arnold-motion-paused", "true");
    window.dispatchEvent(new Event("arnold-preference"));
  });
  await expect(strip).toHaveAttribute("data-running", "false");
});

test("reduced motion and no JavaScript retain all original logo names without an animated duplicate", async ({
  page,
  browser,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator(".client-strip").scrollIntoViewIfNeeded();
  await expect(page.locator(".client-strip")).toHaveAttribute(
    "data-mode",
    "static",
  );
  await expect(
    page.locator('.client-logo-group[aria-hidden="true"]'),
  ).toBeHidden();
  await expect(page.locator(".client-strip-control")).toBeHidden();
  await expect(
    page.locator('.client-logo-group:not([aria-hidden="true"]) img'),
  ).toHaveCount(10);
  expect(
    await page
      .locator(".client-logo-track")
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe("none");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const plain = await context.newPage();
  await plain.goto("http://127.0.0.1:3001/");
  await expect(
    plain.locator('.client-logo-group:not([aria-hidden="true"]) img'),
  ).toHaveCount(10);
  await expect(
    plain.locator('.client-logo-group[aria-hidden="true"]'),
  ).toBeHidden();
  await plain.goto("http://127.0.0.1:3001/capabilities/permanent-staffing");
  await expect(plain.locator("#perm2 table")).toBeVisible();
  await context.close();
});

test("verified social links and integration states remain truthful", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/about",
    "/contact",
    "/opportunities",
    "/insights",
  ]) {
    await page.goto(route);
    await expect(
      page.locator(`footer a[href="${company.linkedin}"]`),
    ).toHaveCount(1);
    await expect(
      page.locator(`#menu-panel a[href="${company.linkedin}"]`),
    ).toHaveCount(1);
    if (route !== "/")
      await expect(
        page.locator(`main a[href="${company.linkedin}"]`),
      ).toHaveCount(1);
  }
  await expect(page.locator('iframe[src*="linkedin"]')).toHaveCount(0);
  await page.goto("/opportunities");
  await expect(
    page.getByRole("heading", {
      name: "The application portal is not connected yet.",
    }),
  ).toBeVisible();
  await page.goto("/contact");
  await expect(page.getByRole("button", { name: /send/i })).toBeDisabled();
  await page.goto("/thank-you");
  await expect(page.locator("h1")).toHaveText(
    "There is no confirmed enquiry for this visit.",
  );
});

test("new editorial compositions meet automated WCAG checks on desktop and mobile", async ({
  page,
}) => {
  test.setTimeout(240000);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/capabilities",
      "/expertise",
      "/insights",
      "/about",
      "/capabilities/permanent-staffing",
      "/capabilities/recruitment-process-outsourcing",
      "/contact",
      "/opportunities",
      "/privacy",
      "/thank-you",
    ]) {
      await page.goto(route);
      const landmarkNames = await page
        .locator(".chapter-resources")
        .evaluateAll((nodes) =>
          nodes.map((node) => node.getAttribute("aria-label")),
        );
      expect(
        new Set(landmarkNames).size,
        `${route} distinct related-reading landmarks`,
      ).toBe(landmarkNames.length);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(result.violations, `${route} at ${width}`).toEqual([]);
      if (route === "/" || route === "/capabilities") {
        const labels = await new AxeBuilder({ page })
          .withRules(["label-content-name-mismatch"])
          .analyze();
        expect(labels.violations, `${route} matching labels at ${width}`).toEqual(
          [],
        );
        if (route === "/") {
          await page
            .getByRole("button", { name: "Preview Hindi headline" })
            .click();
          await expect(page.locator("main h1")).toHaveAttribute("lang", "hi");
          const hindiLabels = await new AxeBuilder({ page })
            .withRules(["label-content-name-mismatch"])
            .analyze();
          expect(hindiLabels.violations, `Hindi control at ${width}`).toEqual([]);
        }
      }
    }
  }
});

test("capture representative design evidence", async ({ page }) => {
  test.setTimeout(120000);
  for (const [route, id, name] of [
    ["/", ".client-strip", "client-strip"],
    ["/capabilities", "#cap2", "capabilities-comparison"],
    ["/capabilities/permanent-staffing", "#perm2", "shortlist-example"],
    ["/expertise", "#exp2", "expertise-context"],
    ["/about", "#about1", "company-story"],
  ]) {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(route);
      await page.locator(id).scrollIntoViewIfNeeded();
      await page.screenshot({
        path: `output/playwright/content-enhancement/${name}-${width}.png`,
        fullPage: false,
      });
      await page.locator(id).screenshot({
        path: `output/playwright/content-enhancement/${name}-${width}-section.png`,
      });
    }
  }
});
