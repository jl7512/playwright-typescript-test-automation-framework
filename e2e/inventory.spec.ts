import { test, expect } from '../src/fixtures/test-fixtures';
import { sortHighToLow, sortZtoA } from '../src/utils/sort';

test.describe('Inventory', () => {
  test.beforeEach(async ({ logInAsStandardUser }) => {
    await logInAsStandardUser();
  });

  test.afterEach(async ({ resetAppState }) => {
    await resetAppState();
  });

  test('user should see 6 items displayed on the inventory page', async ({ inventoryPage }) => {
    await expect(inventoryPage.title).toBeVisible();
    await expect(inventoryPage.productsContainer).toBeVisible();

    const productItems = await inventoryPage.getAllProductItems();
    const addToCartButtons = await inventoryPage.getAllAddToCartButtons();
    await expect(productItems).toHaveLength(6);
    await expect(addToCartButtons).toHaveLength(6);
  });

  test('user should be able to sort all product items by high to low price', async ({ inventoryPage }) => {
    await inventoryPage.sortItemsByPriceHighToLow();

    // Get all product prices text
    const productPricesText = await inventoryPage.getAllProductPricesText();

    // Remove the £ symbol since prices are strings in the format of "£10.99" so that we can parse the prices as float
    const actualProductPrices = productPricesText.map((price) =>
      price === null ? 0 : parseFloat(price.replace('£', ''))
    );

    // Spread actualProductPrices to a new array to avoid mutating the original array
    // Sort the product prices array from high to low then compare the arrays
    const expectedSortedProductPrices = sortHighToLow([...actualProductPrices]);
    await expect(actualProductPrices).toStrictEqual(expectedSortedProductPrices);
  });

  test('user should be able to sort product items by name, Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortItemsByNameZToA();

    // Get all product names text
    const productNamesText = await inventoryPage.getAllProductNamesText();

    // If there are any strings that are null, return empty string
    const actualProductNames = productNamesText.map((name) => (name === null ? '' : name));

    // Spread the elements to a new array to avoid mutating the original array
    // Sort the product names in the alphabetical order then compare the arrays
    const expectedSortedProductNames = sortZtoA([...actualProductNames]);
    await expect(actualProductNames).toStrictEqual(expectedSortedProductNames);
  });
});
