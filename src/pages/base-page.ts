import { Page } from '@playwright/test';

export default class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  input(id: string) {
    return this.page.locator(`input[id="${id}"]`);
  }

  get menuButton() {
    return this.page.locator('button[id="react-burger-menu-btn"]');
  }

  get resetAppStateLink() {
    return this.page.locator('a[data-test="reset-sidebar-link"]');
  }

  get shoppingCartLink() {
    return this.page.locator('a[data-test="shopping-cart-link"]');
  }
}
