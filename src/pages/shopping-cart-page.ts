import { Page } from '@playwright/test';

import BasePage from './base-page';

export default class ShoppingCartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public getProductsInCart() {
    return this.page.locator('div[data-test="inventory-item-name"]');
  }

  public get checkoutButton() {
    return this.page.getByRole('button', { name: 'Checkout' });
  }

  private async inputField(name: string) {
    const input = this.page.getByRole('textbox', { name });
    const matched = await input.count() > 0;
    if (matched) {
      return input;
    }
    throw new Error(`Cannot locate input field with name: ${name}`);
  }

  private get firstNameInput() {
    return this.inputField('First Name');
  }

  private get lastNameInput() {
    return this.inputField('Last Name');
  }

  private get postCodeInput() {
    return this.inputField('Zip/Postal Code');
  }

  private get continueButton() {
    return this.page.getByRole('button', { name: 'Continue' });
  }

  public async fillInCheckoutInformation(firstName: string, lastName: string, postCode: string) {
    const firstNameInput = await this.firstNameInput;
    await firstNameInput.fill(firstName);

    const lastNameInput = await this.lastNameInput;
    await lastNameInput.fill(lastName);

    const postCodeInput = await this.postCodeInput;
    await postCodeInput.fill(postCode);

    await this.continueButton.click();
  }
}
