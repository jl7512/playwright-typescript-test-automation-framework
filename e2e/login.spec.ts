import { test, expect } from '../src/fixtures/test-fixtures';
import Users from '../src/users/users';

test.describe('Login', () => {
  test.afterEach(async ({ resetAppState }) => {
    await resetAppState();
  });

  test('user can successfully log in as a standard user', async ({ loginPage, inventoryPage, baseURL }) => {
    const { standardUser } = Users;
    const { username, password } = standardUser;

    await loginPage.page.goto(baseURL);
    await loginPage.login(username, password);
    await expect(inventoryPage.title).toBeVisible();
    await expect(inventoryPage.productsContainer).toBeVisible();
  });
});
