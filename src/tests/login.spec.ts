import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "@/utils/logger";

let loginPage: LoginPage;
test.describe("Amazon Login Test", () => {
  test.beforeAll("Test Preparation", async ({ page }) => {
    logger.info(`Running ${test.info().title}`);
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test.afterAll('Teardown', async ({ page }) => {
    await page.close();
    // ...
  });
  test("T1-Should navigate to login page and check email input visibility", async () => {
    await loginPage.expectToBeVisible(loginPage.emailInput);
  });

  test("T2-Should fill email and click continue", async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.enterEmail(process.env.EMAIL!);
    await loginPage.enterPassword(process.env.PASSWORD!);
  });
});
