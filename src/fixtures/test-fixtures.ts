import { test as base, Page } from '@playwright/test';
import Users from '../users/users';

import { getBaseUrl } from '../utils/config';
import LoginPage from '../pages/login-page';
import InventoryPage from '../pages/inventory-page';
import ShoppingCartPage from '../pages/shopping-cart-page';

// Declare types for fixtures
type TestFixtures = {
  baseURL: string;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  shoppingCartPage: ShoppingCartPage;
  logInAsStandardUser: () => Promise<void>;
  resetAppState: () => Promise<void>;
};

// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<TestFixtures>({
  baseURL: getBaseUrl(),

  // Extend base test and page objects as fixtures
  loginPage: async ({ page }: { page: Page }, use) => {

    // Init the page object and use it in the test
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }: { page: Page }, use) => {
    await use(new InventoryPage(page));
  },
  shoppingCartPage: async ({ page }: { page: Page }, use) => {
    await use(new ShoppingCartPage(page));
  },
  
  // We modify cookies in the browser to start the test in a logged in state on the application
  // Without having to waste time going through the UI to log in
  logInAsStandardUser: async ({ page, baseURL }, use) => {
    await page.context().addCookies([
      {
        name: 'session-username',
        value: Users.standardUser.username,
        url: baseURL,
      },
    ]);
    await page.goto(`${baseURL}/inventory.html`);
    await use(async () => {});
  },
  resetAppState: async ({ inventoryPage }, use) => {
    await inventoryPage.menuButton.click();
    await inventoryPage.resetAppStateLink.click();
    await use(async () => {});
  },
});

export { expect } from '@playwright/test';
