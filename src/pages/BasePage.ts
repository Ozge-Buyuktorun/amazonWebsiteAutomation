import { Page, Locator, expect } from '@playwright/test';
import logger from '../utils/logger';

export default class BasePage {
  readonly page: Page;
  readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = 'https://www.amazon.com';
  }

  /**
   * Belirtilen URL'e gider
   * @param url Gidilecek URL
   */
  async navigate(url: string = ''): Promise<void> {
    const fullUrl = url ? url : this.baseUrl;
    logger.info(`Navigating to: ${fullUrl}`);
    await this.page.goto(fullUrl, { waitUntil: 'networkidle' });
  }

  /**
   * Elementte click işlemi yapar
   * @param locator Tıklanacak element
   */
  async click(locator: Locator): Promise<void> {
    logger.info(`Clicking on element: ${locator}`);
    await locator.click();
  }

  /**
   * Elemente metin yazar
   * @param locator Yazılacak element
   * @param text Yazılacak metin
   */
  async fill(locator: Locator, text: string): Promise<void> {
    logger.info(`Filling text in element: ${locator}`);
    await locator.fill(text);
  }

  /**
   * Elementte metin bulunduğunu doğrular
   * @param locator Kontrol edilecek element
   * @param text Beklenen metin
   */
  async expectTextToBePresent(locator: Locator, text: string): Promise<void> {
    logger.info(`Expecting text "${text}" to be present in element: ${locator}`);
    await expect(locator).toContainText(text);
  }

  /**
   * Elementin görünür olduğunu doğrular
   * @param locator Kontrol edilecek element
   */
  async expectToBeVisible(locator: Locator): Promise<void> {
    logger.info(`Expecting element to be visible: ${locator}`);
    await expect(locator).toBeVisible();
  }

  /**
   * Elementin görünür olmadığını doğrular
   * @param locator Kontrol edilecek element
   */
  async expectToBeHidden(locator: Locator): Promise<void> {
    logger.info(`Expecting element to be hidden: ${locator}`);
    await expect(locator).toBeHidden();
  }

  /**
   * Element görünür olana kadar bekler
   * @param locator Beklenecek element
   * @param timeout Beklenecek süre (ms)
   */
  async waitForElementToBeVisible(locator: Locator, timeout: number = 30000): Promise<void> {
    logger.info(`Waiting for element to be visible: ${locator}`);
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Element kaybolana kadar bekler
   * @param locator Beklenecek element
   * @param timeout Beklenecek süre (ms)
   */
  async waitForElementToBeHidden(locator: Locator, timeout: number = 30000): Promise<void> {
    logger.info(`Waiting for element to be hidden: ${locator}`);
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Sayfanın yüklenmesini bekler
   */
  async waitForPageLoad(): Promise<void> {
    logger.info('Waiting for page to load');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Bir elementi hover eder
   * @param locator Hover edilecek element
   */
  async hover(locator: Locator): Promise<void> {
    logger.info(`Hovering over element: ${locator}`);
    await locator.hover();
  }
  
  /**
   * Ekran görüntüsü alır
   * @param name Dosya adı
   */
  async takeScreenshot(name: string): Promise<void> {
    logger.info(`Taking screenshot: ${name}`);
    await this.page.screenshot({ path: `./screenshots/${name}.png`, fullPage: true });
  }
  
  /**
   * Dropdown'dan değer seçer
   * @param locator Dropdown elementi
   * @param value Seçilecek değer
   */
  async selectOption(locator: Locator, value: string): Promise<void> {
    logger.info(`Selecting option "${value}" from dropdown: ${locator}`);
    await locator.selectOption(value);
  }
  
  /**
   * JavaScript kodu çalıştırır
   * @param script Çalıştırılacak JavaScript kodu
   * @returns JavaScript kodunun dönüş değeri
   */
  async executeScript<T>(script: string): Promise<T> {
    logger.info(`Executing script: ${script}`);
    return await this.page.evaluate(script);
  }
}