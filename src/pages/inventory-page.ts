import { Locator, Page } from '@playwright/test';

import BasePage from './base-page';

enum SortType {
  PRICE_LOW_TO_HIGH = 'Price (low to high)',
  PRICE_HIGH_TO_LOW = 'Price (high to low)',
  NAME_A_TO_Z = 'Name (A to Z)',
  NAME_Z_TO_A = 'Name (Z to A)',
}

export default class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private getProductItem(productName: string): Locator {
    return this.page.locator('div[data-test="inventory-item"]').filter({ hasText: productName });
  }

  public get title() {
    return this.page.locator('span[data-test="title"]');
  }

  public get productsContainer() {
    return this.page.locator('div[data-test="inventory-container"]');
  }

  public async getAllProductItems() {
    return this.page.locator('div[data-test="inventory-item"]').all();
  }

  public async getAllProductPrices() {
    return this.page.locator('div[data-test="inventory-item-price"]').all();
  }

  public async getAllProductPricesText() {
    const productPriceElements = await this.getAllProductPrices();
    return Promise.all(productPriceElements.map((productPriceElement) => productPriceElement.textContent()));
  }

  public async getAllProductNamesText() {
    const productNames = await this.page.locator('div[data-test="inventory-item-name"]').all();
    return Promise.all(productNames.map((productName) => productName.textContent()));
  }

  public async getAllAddToCartButtons() {
    return this.page.locator('button.btn_inventory').all();
  }

  public async addItemToCart(productName: string) {
    const addToCartButton = this.getProductItem(productName).locator('button.btn_inventory');
    await addToCartButton.click();
  }

  public async getNumberOfItemsInCart() {
    return this.page.locator('span[data-test="shopping-cart-badge"]').textContent();
  }

  public async isItemAddedToCart(productName: string) {
    const buttonText = await this.getProductItem(productName).locator('button.btn_inventory').textContent();
    return buttonText === 'Remove';
  }

  private async sortItemsBy(option: SortType) {
    const dropdownBox = this.page.locator('select[data-test="product-sort-container"]');
    await dropdownBox.selectOption({ label: option.toString() });
  }

  public async sortItemsByPriceHighToLow() {
    return this.sortItemsBy(SortType.PRICE_HIGH_TO_LOW);
  }

  public async sortItemsByPriceLowToHigh() {
    return this.sortItemsBy(SortType.PRICE_LOW_TO_HIGH);
  }

  public async sortItemsByNameAToZ() {
    return this.sortItemsBy(SortType.NAME_A_TO_Z);
  }

  public async sortItemsByNameZToA() {
    return this.sortItemsBy(SortType.NAME_Z_TO_A);
  }
}
