import { Page } from '@playwright/test';

import BasePage from './base-page';

export default class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get emailInput() {
    return this.input('user-name');
  }

  private get passwordInput() {
    return this.input('password');
  }

  private get loginButton() {
    
    // The login button is an input element
    return this.input('login-button');
  }

  public async login(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
