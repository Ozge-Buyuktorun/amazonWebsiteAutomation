import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "@/utils/logger";

let loginPage: LoginPage;
const email = process.env.EMAIL!;
const password = process.env.PASSWORD!;

test.describe.configure({ mode: 'parallel' });
test.describe("Amazon Login Test", () => {
  test.beforeEach("Test Preparation", async ({ page }) => {
    logger.info(`Running ${test.info().title}`);
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test.afterEach('Teardown', async ({ page }) => {
    await page.close();
  });
  test("T1-Loading Home Page and Email Field Control", async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.expectToBeVisible(loginPage.emailInput);
  });

  test("T2-Control email and Password Field", async () => {
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
  });

  test("T3-Direct Login", async () => {
    await loginPage.login(email,password);
  });

});
