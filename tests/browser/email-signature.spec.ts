import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { signatureDesigns } from "../../src/lib/email-signature";

async function fillEmployee(page: Page) {
  await page.getByLabel("Full name", { exact: false }).fill("Example Employee");
  await page
    .getByLabel("Designation", { exact: false })
    .fill("Senior Consultant — Talent Advisory");
  await page
    .getByLabel("Work email", { exact: false })
    .fill("example.employee@arnoldconsultants.com");
  await page
    .getByLabel("Phone number", { exact: false })
    .fill("+91 98765 43210");
  await page
    .getByLabel("LinkedIn profile", { exact: false })
    .fill("https://www.linkedin.com/in/example-employee?trk=test");
}

test("direct route is unlisted, noindex and presents the current office", async ({
  page,
  request,
}) => {
  const response = await page.goto("/email-signature");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your signature.",
  );
  expect(
    await page.locator('meta[name="robots"]').getAttribute("content"),
  ).toContain("noindex");
  await expect(page.locator(".sig-preview")).toContainText("Synerge Workspace");
  await expect(page.locator(".sig-preview img")).toHaveJSProperty(
    "naturalWidth",
    364,
  );
  await expect(
    page.locator(
      'header a[href="/email-signature"], footer a[href="/email-signature"]',
    ),
  ).toHaveCount(0);
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain(
    "email-signature",
  );
  const csp = response?.headers()["content-security-policy"] || "";
  expect(csp).toContain("object-src 'none'");
  expect(csp).toContain("frame-ancestors 'none'");
});

test("live preview, optional fields, validation and clear details", async ({
  page,
}) => {
  await page.goto("/email-signature");
  await page
    .getByRole("button", { name: "Copy signature", exact: true })
    .click();
  await expect(page.getByLabel("Full name", { exact: false })).toBeFocused();
  await expect(
    page.getByText("Enter your full name.", { exact: true }),
  ).toBeVisible();
  await fillEmployee(page);
  await expect(page.locator(".sig-preview")).toContainText("Example Employee");
  await expect(
    page.locator('.sig-preview a[href="tel:+919876543210"]'),
  ).toBeVisible();
  await expect(
    page.locator(
      '.sig-preview a[href="https://www.linkedin.com/in/example-employee"]',
    ),
  ).toBeVisible();
  await page
    .getByLabel("LinkedIn profile", { exact: false })
    .fill("https://evil.example");
  await page
    .getByRole("button", { name: "Copy signature", exact: true })
    .click();
  await expect(
    page.getByLabel("LinkedIn profile", { exact: false }),
  ).toBeFocused();
  await expect(
    page.getByLabel("LinkedIn profile", { exact: false }),
  ).toHaveAttribute("aria-invalid", "true");
  await page.getByRole("button", { name: "Clear details" }).click();
  await expect(page.getByLabel("Full name", { exact: false })).toHaveValue("");
  await expect(page.locator('.sig-preview a[href^="tel:"]')).toHaveCount(0);
  await expect(page.locator('.sig-preview a[href*="/company/"]')).toBeVisible();
});

test("clipboard contains formatted HTML, safe links and a public absolute PNG", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/email-signature");
  await fillEmployee(page);
  await page
    .getByRole("button", { name: "Copy signature", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("Signature copied.");
  const clipboard = await page.evaluate(async () => {
    const items = await navigator.clipboard.read();
    const item = items[0];
    return {
      html: await (await item.getType("text/html")).text(),
      plain: await (await item.getType("text/plain")).text(),
    };
  });
  expect(clipboard.html).toContain("<table");
  expect(clipboard.html).toContain(
    "https://armold.netlify.app/media/email-signature/arnold-logo.png",
  );
  expect(clipboard.html).toContain(
    "mailto:example.employee@arnoldconsultants.com",
  );
  expect(clipboard.html).not.toContain("127.0.0.1");
  expect(clipboard.plain).toContain("Example Employee");
  expect(clipboard.plain).not.toContain("Best regards");
  // A rich editor paste checks clipboard transport, not actual Gmail rendering.
  await page.evaluate(() => {
    const editor = document.createElement("div");
    editor.id = "qa-paste-editor";
    editor.contentEditable = "true";
    document.querySelector(".sig-shell")!.append(editor);
    editor.focus();
  });
  await page.keyboard.press(
    process.platform === "darwin" ? "Meta+V" : "Control+V",
  );
  await expect(page.locator("#qa-paste-editor table").first()).toBeVisible();
  await expect(page.locator("#qa-paste-editor")).toContainText(
    "Example Employee",
  );
});

test("blocked clipboard gives a usable manual selection", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        write: async () => {
          throw new Error("Denied");
        },
      },
    });
    document.execCommand = () => false;
  });
  await page.goto("/email-signature");
  await fillEmployee(page);
  await page
    .getByRole("button", { name: "Copy signature", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Automatic copy was blocked.",
  );
  await page
    .getByRole("button", { name: "Select signature for manual copy" })
    .click();
  expect(
    await page.evaluate(() => window.getSelection()?.toString()),
  ).toContain("Example Employee");
  await expect(page.locator(".sig-preview img")).toHaveAttribute(
    "src",
    "https://armold.netlify.app/media/email-signature/arnold-logo.png",
  );
});

test("three named designs preserve details and download the chosen HTML", async ({
  page,
}) => {
  await page.goto("/email-signature");
  await fillEmployee(page);
  for (const { id, name } of signatureDesigns) {
    await page.getByRole("radio", { name: new RegExp(`^${name}`) }).check();
    await expect(page.locator(".sig-preview > table")).toHaveAttribute(
      "data-signature-design",
      id,
    );
    await expect(page.locator(".sig-preview")).toContainText(
      "Example Employee",
    );
    const downloadPromise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "Download signature", exact: true })
      .click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe(
      `arnold-signature-example-employee-${id}.html`,
    );
    const stream = await download.createReadStream();
    const chunks: Buffer[] = [];
    for await (const chunk of stream!) chunks.push(Buffer.from(chunk));
    const html = Buffer.concat(chunks).toString("utf8");
    expect(html).toContain(`data-signature-design="${id}"`);
    expect(html).toContain(
      "https://armold.netlify.app/media/email-signature/arnold-logo.png",
    );
    expect(html).not.toContain("<script");
    expect(html).not.toContain("127.0.0.1");
    await mkdir("output/playwright/email-signature", { recursive: true });
    await page
      .locator(".sig-preview-section")
      .screenshot({
        path: `output/playwright/email-signature/design-${id}.png`,
      });
  }
});

test("employee data does not become markup, a request or persistent storage", async ({
  page,
}) => {
  await page.goto("/email-signature");
  await fillEmployee(page);
  const personalRequests: string[] = [];
  page.on("request", (request) => {
    if (
      /example.employee|9876543210|alert\(/.test(
        request.url() + (request.postData() || ""),
      )
    )
      personalRequests.push(request.url());
  });
  await page
    .getByLabel("Full name", { exact: false })
    .fill('<img src=x onerror="alert(1)">');
  await expect(page.locator(".sig-preview")).toContainText(
    '<img src=x onerror="alert(1)">',
  );
  await expect(page.locator('.sig-preview img[src="x"]')).toHaveCount(0);
  expect(personalRequests).toEqual([]);
  const storage = await page.evaluate(() => ({
    local: { ...localStorage },
    session: { ...sessionStorage },
  }));
  expect(JSON.stringify(storage)).not.toContain("example.employee");
  await page.reload();
  await expect(page.getByLabel("Work email", { exact: false })).toHaveValue("");
});

for (const width of [320, 390, 768, 1440]) {
  test(`responsive layout and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/email-signature");
    await fillEmployee(page);
    for (const { name } of signatureDesigns) {
      await page.getByRole("radio", { name: new RegExp(`^${name}`) }).check();
      await page.getByLabel("Full name", { exact: false }).fill("A".repeat(80));
      await page
        .getByLabel("Designation", { exact: false })
        .fill(
          "Workforce Solutions and Executive Search — ".repeat(3).slice(0, 100),
        );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
    }
    const results = await new AxeBuilder({ page })
      .include(".sig-tool")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await mkdir("output/playwright/email-signature", { recursive: true });
    await page.getByRole("button", { name: "Clear details" }).click();
    await fillEmployee(page);
    await page.getByRole("radio", { name: /^Classic/ }).check();
    await page.getByLabel("Work email", { exact: false }).blur();
    await page.screenshot({
      path: `output/playwright/email-signature/generator-${width}.png`,
      fullPage: true,
    });
  });
}

test("keyboard focus is visible and no-JavaScript form does not submit personal data", async ({
  page,
  browser,
}) => {
  await page.goto("/email-signature");
  await page.getByLabel("Full name", { exact: false }).focus();
  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Designation", { exact: false })).toBeFocused();
  expect(
    await page
      .getByLabel("Designation", { exact: false })
      .evaluate((element) => getComputedStyle(element).outlineStyle),
  ).not.toBe("none");
  const context = await browser.newContext({ javaScriptEnabled: false });
  const noScript = await context.newPage();
  await noScript.goto(`${new URL(page.url()).origin}/email-signature`);
  await expect(
    noScript.getByText("Turn on JavaScript", { exact: false }),
  ).toBeVisible();
  await expect(
    noScript.getByLabel("Full name", { exact: false }),
  ).toBeDisabled();
  await expect(
    noScript.getByRole("button", { name: "Copy signature", exact: true }),
  ).toBeDisabled();
  await context.close();
});
