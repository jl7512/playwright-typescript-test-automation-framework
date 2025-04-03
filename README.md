## Playwright TypeScript Test Automation Framework

### Installation

1. Clone the repository to your local file system

2. Change directory to your local file system

```
cd playwright-typescript-test-automation-framework
```

3. Execute the npm install command to install all dependencies

```
npm i
```

### Running tests

**Run all tests on a specific environment**

```
npm run test:dev
```

**Run tests headed**

By default playwright runs tests in headless mode. You can run them in headed mode by passing in the flag using `--`

```
npm run test:dev -- --headed
```

**Run a specific test file**

```
npm run test:dev -- login.spec.ts
```

### Configuration

The playwright config (`playwright.config.ts`) found at the root of the repository, defines the config for the playwright test runner.

## Page

`Page` provides a way to interact with a single tab in a `Browser` instance. One browser instance can have multiple page instances.

In order to initialise a `Page` you need to:

1. Launch a browser (chromium, firefox, webkit, etc), using `await webkit.launch()`.
2. Create a new browser context using `await browser.newContext()`. It won't share cookies/cache with other browser contexts.
3. Call `await context.newPage()` which will create a new page in that browser context and return the `Page`.

```
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.

(async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();
```

### Test Fixtures

Playwright leverages a concept called [test fixtures](https://playwright.dev/docs/test-fixtures), which can be used to initialise the environment for each test, giving the test everything it needs to initialise and nothing else. Test fixtures are also isolated between tests, so there is no risk of state being leaked into another test. You can group tests based on their meaning instead of common setup.

You can see `page` is provided by the test fixture in the `test` function. Usually `page` needs to be be initialised by launching a browser, creating a browser context and then a new page.

The `{ page }` argument is setup and destructured from the playwright test and is provided to the test function.

```
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page).toHaveTitle(/Playwright/);
});
```

Here is a list of pre-defined fixtures that are likely to be used a lot:

| Fixture     | Type              | Description                                                                                                           |
| ----------- | ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| page        | Page              | Isolated page for this test run.                                                                                      |
| context     | BrowserContext    | Isolated context for this test run. The page fixture belongs to this context as well. Learn how to configure context. |
| browser     | Browser           | Browsers are shared across tests to optimize resources. Learn how to configure browser.                               |
| browserName | string            | The name of the browser currently running the test. Either chromium, firefox or webkit.                               |
| request     | APIRequestContext | Isolated APIRequestContext instance for this test run.                                                                |

We create our own custom test fixture which initialises all the page objects so that you don't need to initialise the page objects in every test file.
You can find the custom test fixtures at [`./src/fixtures/`](\src\fixtures\test-fixtures.ts).

If we didn't use custom test fixtures to setup and use our page objects we would have to use this approach. Where we have a parent `test` function that initialises all the page objects that the child `test` functions use.

```
test('Login tests', async ({ page }) => {
  const loginPage = new LoginPage(page);

  test('Login to swaglabs as a standard user', async ({ baseURL }) => {
    const { standardUser } = Users;
    const { username, password } = standardUser;

    await loginPage.page.goto(baseURL);
    await loginPage.login(username, password);
    await expect(loginPage.inventoryContainer).toBeVisible();
  });
})
```

The above approach is perfectly fine but with the test fixture approach below, we minimize the use of boilerplate code to initialise page objects and don't require a parent `test` function to contain the tests. You can find this test at [./e2e/login.spec.ts](./e2e/login.spec.ts)

```
test('Login to swaglabs as a standard user', async ({ loginPage, baseURL }) => {
  const { standardUser } = Users;
  const { username, password } = standardUser;

  await loginPage.page.goto(baseURL);
  await loginPage.login(username, password);
  await expect(loginPage.inventoryContainer).toBeVisible();
});
```

### Page Objects

Page objects are a design pattern, generally they contain `getter` functions that return elements represented on the page or `helper` functions that help us perform certain actions on a page (such as logging in, selecting values from a dropdown, etc). By abstracting all things that can take place on a page into a singular page object, we enable more code reuse and a separation of concerns/responsibility. This results in making our test code maintainable, easy to update and refactor.

When creating a new page object, we extend the `BasePage` page object so that we can inherit some helper functions and avoid rewriting the same boilerplate code in every page object class. You can find all page objects located at [`./src/pages/`](./src/pages/)

In regards to actions taken on a page, Playwright will automatically wait for [actionability checks](https://playwright.dev/docs/actionability) before performing an action this reduces the chances of flaky tests.
