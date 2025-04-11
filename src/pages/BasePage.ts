import { Page, Locator, expect } from "@playwright/test";
import logger from "../utils/logger";

export default class BasePage {
  readonly page: Page;
  readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = "https://www.amazon.com";
  }

  /**
   * 
   * @param url We will go the the this url.
   */
  async navigate(url: string = ""): Promise<void> {
    try {
      const fullUrl = url ? url : this.baseUrl;
      await this.page.goto(fullUrl, { waitUntil: "networkidle" });
      logger.info(`The website navigation is completed succesfully.`);
    } catch (error) {
      logger.error(`The website navigation is failed.`);
      throw error;
    }
  }

  /**
   *  click process to the element
   * @param locator Clickable element locator.
   */
  async click(locator: Locator): Promise<void> {
    logger.info(`Clicking on element: ${locator}`);
    await locator.click();
  }

  /**
   * Fill the some text in to the locator field.
   * @param locator Write into this element.
   * @param text Text to write.
   */
  async fill(locator: Locator, text: string): Promise<void> {
    logger.info(`Filling text in element: ${locator}`);
    await locator.fill(text);
  }

  /**
   * Verify to the some text in to a element.
   * @param locator A element to be controlled.
   * @param text Expected Text ( String. )
   */
  async expectTextToBePresent(locator: Locator, text: string): Promise<void> {
    logger.info(
      `Expecting text "${text}" to be present in element: ${locator}`
    );
    await expect(locator).toContainText(text);
  }

  /**
   * Check if the element is visible or not.
   * @param locator Will be controlled this element.
   */
  async expectToBeVisible(locator: Locator): Promise<void> {
    logger.info(`Expecting element to be visible: ${locator}`);
    await expect(locator).toBeVisible();
  }

  /**
   * Check it the element to be hidden or not
   * @param locator Will be controlled this element.
   */
  async expectToBeHidden(locator: Locator): Promise<void> {
    logger.info(`Expecting element to be hidden: ${locator}`);
    await expect(locator).toBeHidden();
  }

  /**
   * Wait until element is visible
  * @param locator Element to wait for
  * @param timeout Time to wait (ms)
   */
  async waitForElementToBeVisible(
    locator: Locator,
    timeout: number = 30000
  ): Promise<void> {
    logger.info(`Waiting for element to be visible: ${locator}`);
    await locator.waitFor({ state: "visible", timeout });
  }

  /**
   * Wait until element disappears
   * @param locator Element to wait for
   * @param timeout Time to wait (ms)
   */
  async waitForElementToBeHidden(
    locator: Locator,
    timeout: number = 30000
  ): Promise<void> {
    logger.info(`Waiting for element to be hidden: ${locator}`);
    await locator.waitFor({ state: "hidden", timeout });
  }

  /**
   * Waiting to the load the page.
   */
  async waitForPageLoad(): Promise<void> {
    logger.info("Waiting for page to load");
    await this.page.waitForLoadState("domcontentloaded");
  }

  /**
   * Hover over an element
   * @param locator element to be hovered.
   */
  async hover(locator: Locator): Promise<void> {
    logger.info(`Hovering over element: ${locator}`);
    await locator.hover();
  }

  /**
   * Take a screenshot with using this asynch. function.
   * @param name File name.
   */
  async takeScreenshot(name: string): Promise<void> {
    logger.info(`Taking screenshot: ${name}`);
    await this.page.screenshot({
      path: `./screenshots/${name}.png`,
      fullPage: true,
    });
  }

  /**
   * Selects value from dropdown
   * @param locator Dropdown element
   * @param value Value to select.
   */
  async selectOption(locator: Locator, value: string): Promise<void> {
    logger.info(`Selecting option "${value}" from dropdown: ${locator}`);
    await locator.selectOption(value);
  }

  /**
   * Run the JavaScript Code.
   * @param script Script to be runned with JS.
   * @returns Return Value
   */
  async executeScript<T>(script: string): Promise<T> {
    logger.info(`Executing script: ${script}`);
    return await this.page.evaluate(script);
  }
}
