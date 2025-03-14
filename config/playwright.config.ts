import { PlaywrightTestConfig, devices } from "@playwright/test";
import path from "path";
import * as dotenv from 'dotenv';

dotenv.config({ path: 'config/.env' });

const config: PlaywrightTestConfig = {
  testDir: path.join(__dirname, "../src/tests"),
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ["line"],
    ["allure-playwright"],
    ["html", { outputFolder: "playwright-report" }],
  ],
  use: {
    baseURL: "https://www.amazon.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
    headless: process.env.HEADLESS === "false",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: ["--disable-gpu", "--disable-dev-shm-usage", "--no-sandbox"],
        },
      },
    },
    /*
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    */
  ],
  outputDir: path.join(__dirname, "../test-results"),
};

export default config;
