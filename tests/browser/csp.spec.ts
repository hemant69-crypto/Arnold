import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { allRoutes } from "../../src/content/routes";

test("every HTML route and 404 allow exactly their rendered inline scripts", async ({
  request,
}) => {
  for (const path of [...allRoutes, "/missing-csp-check"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(
      path === "/missing-csp-check" ? 404 : 200,
    );
    const policy = response.headers()["content-security-policy"];
    expect(policy, path).toBeTruthy();
    const scripts = policy
      .split(";")
      .find((part) => part.trim().startsWith("script-src "))!;
    expect(scripts).not.toContain("unsafe-inline");
    expect(scripts).not.toContain("unsafe-eval");
    const nonce = scripts.match(/'nonce-([^']+)'/)?.[1];
    const html = await response.text();
    let inlineCount = 0;
    for (const match of html.matchAll(
      /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
    )) {
      if (/\bsrc\s*=/.test(match[1]) || !match[2]) continue;
      inlineCount++;
      if (nonce) expect(match[1], path).toContain(`nonce="${nonce}"`);
      else {
        const hash = createHash("sha256").update(match[2]).digest("base64");
        expect(scripts, path).toContain(`'sha256-${hash}'`);
      }
    }
    expect(inlineCount, path).toBeGreaterThan(0);
    expect(response.headers()["x-robots-tag"], path).toBe("noindex, nofollow");
  }
});

test("dynamic pages use fresh nonces and private uncached responses", async ({
  request,
}) => {
  for (const path of ["/contact", "/thank-you"]) {
    const nonces = [];
    for (let i = 0; i < 2; i++) {
      const response = await request.get(path);
      const policy = response.headers()["content-security-policy"];
      nonces.push(policy.match(/'nonce-([^']+)'/)?.[1]);
      expect(nonces.at(-1)).toBeTruthy();
      expect(response.headers()["cache-control"]).toContain("private");
      expect(response.headers()["cache-control"]).toContain("no-store");
    }
    expect(nonces[0]).not.toBe(nonces[1]);
  }
});

test("browser blocks an unapproved inline script while the site still works", async ({
  page,
}) => {
  for (const path of ["/", "/contact"]) {
    await page.route(`**${path === "/" ? "/" : path}`, async (route) => {
      const response = await route.fetch();
      const body = (await response.text()).replace(
        "</body>",
        "<script>document.documentElement.dataset.cspProbe = 'executed'</script></body>",
      );
      await route.fulfill({ response, body });
    });
    await page.goto(path);
    await expect(page.locator("main h1")).toBeVisible();
    const executed = await page.evaluate(
      () => document.documentElement.dataset.cspProbe,
    );
    expect(executed).toBeUndefined();
  }
});
