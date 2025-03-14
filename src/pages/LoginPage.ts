import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';
import logger from '../utils/logger';

export default class LoginPage extends BasePage {
  // Locators
  readonly emailInput: Locator;
  readonly continueButton: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;
  readonly keepSignedInCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);

    // Definition of Some Locators
    this.emailInput = this.page.locator('#ap_email');
    this.continueButton = this.page.locator('//input[@id="continue"]');
    this.passwordInput = this.page.locator('#ap_password');
    this.signInButton = this.page.locator('#signInSubmit');
    this.errorMessage = this.page.locator('.a-alert-content');
    this.keepSignedInCheckbox = this.page.locator('#rememberMe');
    this.forgotPasswordLink = this.page.locator('#auth-fpp-link-bottom');
    this.createAccountButton = this.page.locator('#createAccountSubmit');
  }

  /**
   * Go to login page
   */
  async navigateToLoginPage(): Promise<void> {
    logger.info('Navigating to login page');
    await this.navigate(process.env.HOMEPAGE);
  }

  /**
   * Enter email field with any email
   * @param email User email adress
   */
  async enterEmail(email: string): Promise<void> {
    logger.info(`Entering email: ${email}`);

    await this.expectToBeVisible(this.emailInput);
    await this.fill(this.emailInput, email);
    await this.click(this.continueButton);
  }

  /**
   * Fill in the password and continue with this function
   * @param password User Password
   * @param keepSignedIn Keep Sing in (optional)
   */
  async enterPassword(password: string, keepSignedIn: boolean = false): Promise<void> {
    logger.info(`Entering password and signing in`);
    await this.expectToBeVisible(this.passwordInput);
    await this.fill(this.passwordInput, password);

    if (keepSignedIn) {
      await this.click(this.keepSignedInCheckbox);
    }

    await this.click(this.signInButton);
  }

  /**
   * Login to the amazon website with your email
   * @param email User Email
   * @param password User Password 
   * @param keepSignedIn Keep sign in (optional)
   */
  async login(email: string, password: string, keepSignedIn: boolean = false): Promise<void> {
    logger.info(`Logging in with email: ${email}`);
    try{
      await this.navigateToLoginPage();
      await this.enterEmail(email);
      await this.enterPassword(password, keepSignedIn);
      await this.waitForPageLoad();
    }catch(e){
      logger.warn(`Logging in with email: ${email || 'NOT SET!'}`);
    }
  }

  /**
   * Click the link about forget password
   */
  async clickForgotPassword(): Promise<void> {
    logger.info('Clicking on forgot password link');
    await this.click(this.forgotPasswordLink);
  }

  /**
   * Click the new account creating button
   */
  async clickCreateAccount(): Promise<void> {
    logger.info('Clicking on create account button');
    await this.click(this.createAccountButton);
  }

  /**
   * Control the error message
   * @returns Return a false or true boolean value
   */
  async hasError(): Promise<boolean> {
    logger.info('Checking if error message is present');
    return await this.errorMessage.isVisible();
  }

  /**
   * Give the error message
   * @returns Index and details of rror message
   */
  async getErrorMessage(): Promise<string | null> {
    if (await this.hasError()) {
      const errorText = await this.errorMessage.textContent();
      logger.info(`Error message found: ${errorText}`);
      return errorText;
    }
    logger.info('No error message found');
    return null;
  }
}