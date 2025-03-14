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
    
    // Locator tanımlamaları
    this.emailInput = this.page.locator('#ap_email');
    this.continueButton = this.page.locator('#continue');
    this.passwordInput = this.page.locator('#ap_password');
    this.signInButton = this.page.locator('#signInSubmit');
    this.errorMessage = this.page.locator('.a-alert-content');
    this.keepSignedInCheckbox = this.page.locator('#rememberMe');
    this.forgotPasswordLink = this.page.locator('#auth-fpp-link-bottom');
    this.createAccountButton = this.page.locator('#createAccountSubmit');
  }
  
  /**
   * Login sayfasına git
   */
  async navigateToLoginPage(): Promise<void> {
    logger.info('Navigating to login page');
    await this.navigate('https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2F&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0');
  }
  
  /**
   * Email girin ve devam edin
   * @param email Kullanıcı email adresi
   */
  async enterEmail(email: string): Promise<void> {
    logger.info(`Entering email: ${email}`);
    await this.fill(this.emailInput, email);
    await this.click(this.continueButton);
  }
  
  /**
   * Şifre girin ve oturum açın
   * @param password Kullanıcı şifresi
   * @param keepSignedIn Oturumu açık tut seçeneği (opsiyonel)
   */
  async enterPassword(password: string, keepSignedIn: boolean = false): Promise<void> {
    logger.info(`Entering password and signing in`);
    await this.fill(this.passwordInput, password);
    
    if (keepSignedIn) {
      await this.click(this.keepSignedInCheckbox);
    }
    
    await this.click(this.signInButton);
  }
  
  /**
   * Amazon hesabına giriş yap
   * @param email Kullanıcı email adresi
   * @param password Kullanıcı şifresi
   * @param keepSignedIn Oturumu açık tut seçeneği (opsiyonel)
   */
  async login(email: string, password: string, keepSignedIn: boolean = false): Promise<void> {
    logger.info(`Logging in with email: ${email}`);
    await this.navigateToLoginPage();
    await this.enterEmail(email);
    await this.enterPassword(password, keepSignedIn);
    
    // Login sonrası ana sayfanın yüklenmesini bekle
    await this.waitForPageLoad();
  }
  
  /**
   * Şifremi unuttum bağlantısına tıkla
   */
  async clickForgotPassword(): Promise<void> {
    logger.info('Clicking on forgot password link');
    await this.click(this.forgotPasswordLink);
  }
  
  /**
   * Yeni hesap oluştur butonuna tıkla
   */
  async clickCreateAccount(): Promise<void> {
    logger.info('Clicking on create account button');
    await this.click(this.createAccountButton);
  }
  
  /**
   * Hata mesajı var mı kontrol et
   * @returns Hata mesajı varsa true, yoksa false
   */
  async hasError(): Promise<boolean> {
    logger.info('Checking if error message is present');
    return await this.errorMessage.isVisible();
  }
  
  /**
   * Hata mesajını getir
   * @returns Hata mesajı metni
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