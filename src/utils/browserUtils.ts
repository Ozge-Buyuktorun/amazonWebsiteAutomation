import { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import logger from './logger';

export class BrowserUtils {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;

  /**
   * Tarayıcıyı başlatır
   * @param headless Tarayıcının görünürlük modu
   * @returns Browser instance
   */
  async launchBrowser(headless: boolean = false): Promise<Browser> {
    try {
      logger.info(`Launching browser with headless: ${headless}`);
      this.browser = await chromium.launch({
        headless,
        args: ['--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox']
      });
      return this.browser;
    } catch (error) {
      logger.error(`Failed to launch browser: ${error}`);
      throw error;
    }
  }

  /**
   * Yeni bir tarayıcı context oluşturur
   * @returns BrowserContext instance
   */
  async createContext(): Promise<BrowserContext> {
    try {
      if (!this.browser) {
        throw new Error('Browser not launched');
      }
      
      logger.info('Creating new browser context');
      this.context = await this.browser.newContext({
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      });
      return this.context;
    } catch (error) {
      logger.error(`Failed to create browser context: ${error}`);
      throw error;
    }
  }

  /**
   * Yeni bir sayfa oluşturur
   * @returns Page instance
   */
  async newPage(): Promise<Page> {
    try {
      if (!this.context) {
        throw new Error('Browser context not created');
      }
      
      logger.info('Creating new page');
      this.page = await this.context.newPage();
      return this.page;
    } catch (error) {
      logger.error(`Failed to create new page: ${error}`);
      throw error;
    }
  }

  /**
   * URL'e git
   * @param url Gidilecek URL
   */
  async goto(url: string): Promise<void> {
    try {
      if (!this.page) {
        throw new Error('Page not created');
      }
      
      logger.info(`Navigating to: ${url}`);
      await this.page.goto(url, { waitUntil: 'networkidle' });
    } catch (error) {
      logger.error(`Failed to navigate to ${url}: ${error}`);
      throw error;
    }
  }

  /**
   * Sayfanın yüklenmesini bekle
   * @param timeout Beklenecek süre (ms)
   */
  async waitForPageLoad(timeout: number = 30000): Promise<void> {
    try {
      if (!this.page) {
        throw new Error('Page not created');
      }
      
      logger.info('Waiting for page to load');
      await this.page.waitForLoadState('networkidle', { timeout });
    } catch (error) {
      logger.error(`Wait for page load timed out: ${error}`);
      throw error;
    }
  }

  /**
   * Tarayıcıyı kapat
   */
  async closeBrowser(): Promise<void> {
    try {
      logger.info('Closing browser');
      if (this.browser) {
        await this.browser.close();
        this.browser = null;
        this.context = null;
        this.page = null;
      }
    } catch (error) {
      logger.error(`Failed to close browser: ${error}`);
      throw error;
    }
  }

  /**
   * Mevcut sayfayı döndürür
   * @returns Current page or null
   */
  getPage(): Page | null {
    return this.page;
  }

  /**
   * Ekran görüntüsü alır
   * @param path Ekran görüntüsü kaydedilecek yol
   */
  async takeScreenshot(path: string): Promise<void> {
    try {
      if (!this.page) {
        throw new Error('Page not created');
      }
      
      logger.info(`Taking screenshot: ${path}`);
      await this.page.screenshot({ path, fullPage: true });
    } catch (error) {
      logger.error(`Failed to take screenshot: ${error}`);
      throw error;
    }
  }
}

export default new BrowserUtils();