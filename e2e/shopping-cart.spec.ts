import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Shopping cart', () => {
  test.beforeEach(async ({ logInAsStandardUser }) => {
    await logInAsStandardUser();
  });

  test.afterEach(async ({ resetAppState }) => {
    await resetAppState();
  });

  test('user can add an item to shopping cart and see the item in their shopping cart', async ({
    inventoryPage,
    shoppingCartPage,
  }) => {
    const productName = 'Sauce Labs Backpack';

    await inventoryPage.addItemToCart(productName);
    const numberOfItemInCart = await inventoryPage.getNumberOfItemsInCart();
    const isItemAddedToCart = await inventoryPage.isItemAddedToCart(productName);

    await inventoryPage.shoppingCartLink.click();
    const productsInCart = await shoppingCartPage.getProductsInCart().textContent();

    await expect(numberOfItemInCart).toHaveLength(1);
    await expect(isItemAddedToCart).toBeTruthy();
    await expect(productsInCart).toEqual(productName);

    await shoppingCartPage.checkoutButton.click();

    await shoppingCartPage.fillInCheckoutInformation('Jimmy', 'Luu', 'E8 9AS');

  });
});
