import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';
import logger from '../utils/logger';

export default class HomePage extends BasePage {
  // Locators
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly accountList: Locator;
  readonly cartIcon: Locator;
  readonly logo: Locator;
  readonly navigationBar: Locator;
  readonly hamburgerMenu: Locator;
  readonly accountName: Locator;
  readonly deliveryLocationButton: Locator;
  readonly languageSelector: Locator;
  
  constructor(page: Page) {
    super(page);
    
    // Locator tanımlamaları
    this.searchBox = this.page.locator('#twotabsearchtextbox');
    this.searchButton = this.page.locator('#nav-search-submit-button');
    this.accountList = this.page.locator('#nav-link-accountList');
    this.cartIcon = this.page.locator('#nav-cart');
    this.logo = this.page.locator('#nav-logo');
    this.navigationBar = this.page.locator('#nav-main');
    this.hamburgerMenu = this.page.locator('#nav-hamburger-menu');
    this.accountName = this.page.locator('#nav-link-accountList-nav-line-1');
    this.deliveryLocationButton = this.page.locator('#nav-global-location-popover-link');
    this.languageSelector = this.page.locator('#icp-nav-flyout');
  }
  
  /**
   * Ana sayfaya git
   */
  async navigateToHomePage(): Promise<void> {
    logger.info('Navigating to home page');
    await this.navigate();
  }
  
  /**
   * Arama yap
   * @param searchTerm Arama terimi
   */
  async search(searchTerm: string): Promise<void> {
    logger.info(`Searching for: ${searchTerm}`);
    await this.fill(this.searchBox, searchTerm);
    await this.click(this.searchButton);
    await this.waitForPageLoad();
  }
  
  /**
   * Hesap ve Listeler menüsüne hover yap
   */
  async hoverAccountList(): Promise<void> {
    logger.info('Hovering over account list menu');
    await this.hover(this.accountList);
  }
  
  /**
   * Alışveriş sepetine git
   */
  async goToCart(): Promise<void> {
    logger.info('Going to cart');
    await this.click(this.cartIcon);
    await this.waitForPageLoad();
  }
  
  /**
   * Amazon logosuna tıkla (ana sayfaya dön)
   */
  async clickLogo(): Promise<void> {
    logger.info('Clicking on Amazon logo');
    await this.click(this.logo);
    await this.waitForPageLoad();
  }
  
  /**
   * Hamburger menüyü aç
   */
  async openHamburgerMenu(): Promise<void> {
    logger.info('Opening hamburger menu');
    await this.click(this.hamburgerMenu);
  }
  
  /**
   * Hesap adını al
   * @returns Hesap adı
   */
  async getAccountName(): Promise<string | null> {
    logger.info('Getting account name');
    return await this.accountName.textContent();
  }
  
  /**
   * Teslimat adresi popover'ını aç
   */
  async openDeliveryLocationPopover(): Promise<void> {
    logger.info('Opening delivery location popover');
    await this.click(this.deliveryLocationButton);
  }
  
  /**
   * Dil seçim menüsüne hover yap
   */
  async hoverLanguageSelector(): Promise<void> {
    logger.info('Hovering over language selector');
    await this.hover(this.languageSelector);
  }
  
  /**
   * Kullanıcının giriş yapmış olup olmadığını kontrol et
   * @returns Giriş yapılmışsa true, yapılmamışsa false
   */
  async isLoggedIn(): Promise<boolean> {
    const accountText = await this.accountName.textContent();
    const isLoggedIn = accountText !== 'Hello, sign in';
    logger.info(`Checking if user is logged in: ${isLoggedIn}`);
    return isLoggedIn;
  }
}