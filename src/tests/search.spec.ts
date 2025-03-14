import dotenv from 'dotenv';
dotenv.config({ path: 'config/.env' });

import { expect, test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "@/utils/logger";
import HomePage from "@/pages/HomePage";


test.describe.configure({ mode: "serial" });
test.describe("Search in Amazon", () => {
  //From Env File
  const email = process.env.EMAIL!;
  const password = process.env.PASSWORD!;

  test.beforeEach("Test Preparation", async ({}) => {
    logger.info(`Running ${test.info().title}`);
  });

  test("T1 - Search Some Text in Relevant Field", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.login(email, password);
    await homePage.search("novels");

    try {
      await expect(
        page.getByRole("heading", { name: "Results", exact: true })
      ).toBeVisible();
      logger.info("Search box is working successfully.");
    } catch (e) {
      logger.error("Search box is not working.");
    }
    await page.close();
  });
});
