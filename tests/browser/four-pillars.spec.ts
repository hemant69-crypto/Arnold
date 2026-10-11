import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

const destinations = [
  ["workforce-solutions", "Workforce Solutions"],
  ["background-verification", "Background Verification"],
  ["hr-advisory", "HR Advisory & Fractional HR Leadership"],
];

test("annotated homepage and four-column navigation keep Consulting prominent", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1414, height: 753 });
  await mkdir("output/playwright/four-pillars", { recursive: true });
  await page.goto("/");
  await expect(page.locator(".nav-groups > div")).toHaveCount(4);
  await expect(
    page.locator(".nav-groups > div").nth(0).locator("a"),
  ).toHaveText(["Home", "Consulting", "Talent & Search"]);
  await expect(
    page.locator(".nav-groups > div").nth(1).locator("a"),
  ).toHaveText([
    "Workforce Solutions",
    "Background Verification",
    "HR Advisory",
  ]);
  await expect(page.locator(".hero-bottom span")).toHaveCount(0);
  await expect(page.locator("#perspective .section-label")).toHaveText(
    "15+ years of market experience.",
  );
  const label = await page.locator(".experience-label").evaluate((el) => ({
    number: parseFloat(
      getComputedStyle(el.querySelector(".experience-number")!).fontSize,
    ),
    copy: parseFloat(getComputedStyle(el).fontSize),
  }));
  expect(label.number).toBeGreaterThan(label.copy);
  await expect(page.locator(".capability-scene h3")).toHaveText([
    "Talent Acquisition & Executive Search",
    "Workforce Solutions",
    "Background Verification",
    "HR Advisory & Fractional HR Leadership",
  ]);
  await expect(
    page.locator('.hero-actions a[href="/consulting"]'),
  ).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "output/playwright/four-pillars/home-1414.png",
  });
  await page.locator(".menu-trigger").click();
  await expect(page.locator('#menu-panel a[href="/capabilities"]')).toHaveText(
    "Talent & Search",
  );
  await expect(page.locator(".menu-service-details")).toHaveCount(0);
  for (const [slug] of destinations) {
    await expect(
      page.locator(`#menu-panel a[href="/capabilities/${slug}"]`),
    ).toHaveCount(1);
  }
  await page
    .locator("#menu-panel")
    .screenshot({ path: "output/playwright/four-pillars/menu-1414.png" });
  await page.keyboard.press("Escape");
  await expect(page.locator(".menu-trigger")).toBeFocused();
});

test("Capabilities content remains useful across Talent and its connected destinations", async ({
  page,
}) => {
  await page.goto("/capabilities");
  await expect(page.locator("main h1")).toHaveText(
    "Talent Acquisition & Executive Search.",
  );
  await expect(page.locator("#cap1 .chapter-list li")).toHaveCount(7);
  await expect(page.locator("#cap2 tbody tr")).toHaveCount(3);
  await expect(page.locator("#cap3 .chapter-list li")).toHaveCount(3);
  await expect(page.locator("#skills-intelligence")).toContainText(
    "confirmed specialist scope",
  );
  await expect(
    page.locator(
      '#workforce-models a[href="/capabilities/workforce-solutions"]',
    ),
  ).toHaveCount(1);
  await expect(page.locator(".connected-pillars .family")).toHaveCount(3);
  await page.goto("/capabilities/workforce-solutions#workforce-models");
  await expect(page.locator("#workforce-models tbody th")).toHaveText([
    "Permanent",
    "Contract & Temporary",
    "Contract-to-Hire",
    "RPO",
    "Executive Search",
  ]);
  await expect(page.locator("#workforce-requirement")).toContainText(
    "confirm the actual employment and payment arrangement",
  );
  await page.goto("/capabilities/hr-advisory");
  await expect(page.locator("#hr-starting-point")).toContainText(
    "required specialist involvement",
  );
  await expect(page.locator("#connected-capability")).toContainText(
    "available delivery scope and review",
  );
  await page.goto("/gcc");
  await expect(page.locator("#connected-gcc-capability")).toContainText(
    "hiring-wave roadmap",
  );
});

test("new pillar routes and interests work and reflow accessibly", async ({
  page,
}) => {
  test.setTimeout(120000);
  await mkdir("output/playwright/four-pillars", { recursive: true });
  for (const width of [1414, 390, 360]) {
    await page.setViewportSize({ width, height: width > 1000 ? 753 : 844 });
    for (const [slug, name] of destinations) {
      const response = await page.goto(`/capabilities/${slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator(".page-intro .section-label")).toHaveText(name);
      const ids = await page
        .locator("[id]")
        .evaluateAll((nodes) => nodes.map((n) => n.id));
      expect(new Set(ids).size).toBe(ids.length);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
      expect(
        (await page.locator("main").innerText()).split(/\s+/).length,
      ).toBeGreaterThan(650);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
      await page.screenshot({
        path: `output/playwright/four-pillars/${slug}-${width}.png`,
        fullPage: true,
      });
      await page
        .locator(`.page-intro a[href="/contact?interest=${slug}"]`)
        .click();
      await expect(page.locator('select[name="interest"]')).toHaveValue(slug);
      await expect(
        page.getByRole("button", { name: "Sending unavailable in preview" }),
      ).toBeDisabled();
    }
  }
  await page.goto("/capabilities");
  await page
    .locator('.page-intro a[href="/contact?interest=talent-search"]')
    .click();
  await expect(page.locator('select[name="interest"]')).toHaveValue(
    "talent-search",
  );
});

test("founder portrait precedes the About invitation and Insights covers four pillars", async ({
  page,
}) => {
  for (const width of [1414, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about#founder");
    await expect(page.locator("#founder-name")).toHaveText(
      "Cyril Nandan Nazareth",
    );
    expect(
      await page
        .locator("#founder")
        .evaluate((el) =>
          el.nextElementSibling?.classList.contains("conversation"),
        ),
    ).toBe(true);
    const portrait = page.locator(".founder-portrait img");
    await expect(portrait).toBeVisible();
    await portrait.evaluate(async (el) => {
      await (el as HTMLImageElement).decode();
    });
    expect(
      await portrait.evaluate((el) => (el as HTMLImageElement).naturalWidth),
    ).toBeGreaterThan(0);
    await expect(page.locator(".founder-link")).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/cyrilnandannazareth/",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    await page.locator("#founder").screenshot({
      path: `output/playwright/four-pillars/founder-${width}.png`,
    });
  }
  await page.goto("/insights");
  await expect(page.locator("#ins1 h2")).toHaveText(
    "Four service pillars. Practical perspectives.",
  );
  await expect(page.locator(".insight-item")).toHaveCount(8);
  for (const slug of [
    "choosing-a-workforce-model",
    "scoping-background-verification",
    "when-fractional-hr-leadership-fits",
  ]) {
    await page.locator(`main h3 a[href="/insights/${slug}"]`).click();
    await expect(page.locator("main h1")).toBeVisible();
    await page.getByRole("link", { name: "All perspectives" }).click();
  }
});
