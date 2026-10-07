import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
export default defineConfig({
  testDir: "./tests/browser",
  workers: 1,
  timeout: 60000,
  reporter: [["line"], ["json", { outputFile: "output/browser-results.json" }]],
  use: {
    baseURL: process.env.QA_ORIGIN ?? "http://127.0.0.1:3001",
    browserName: "chromium",
    launchOptions: existsSync(chrome) ? { executablePath: chrome } : {},
    screenshot: "only-on-failure",
  },
  outputDir: "output/playwright/results",
});
