import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test.describe('Amazon Login Test', () => {
  test('T1-Should navigate to login page and check email input visibility', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.expectToBeVisible(loginPage.emailInput);
  });

  test('T2-Should fill email and click continue', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.enterEmail(process.env.EMAIL!);
    await loginPage.enterPassword(process.env.PASSWORD!);
  });
});
