const playwright = require('eslint-plugin-playwright');
const jest = require('eslint-plugin-jest');

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 12, // Enables ECMAScript 2021 features
      sourceType: 'module', // Allows import/export syntax
      globals: {
        browser: 'readonly', // Adds Playwright's browser global
        page: 'readonly', // Adds Playwright's page global
        jest: 'readonly', // Adds Jest globals if you're using Jest
      },
    },
    plugins: {
      playwright, // Use the plugin object for Playwright
      jest, // Use the plugin object for Jest
    },
    rules: {
      'no-console': 'warn', // Warn about console usage
      'playwright/no-wait-for-timeout': 'error', // Example rule for Playwright
      'jest/consistent-test-it': ['error', { fn: 'it' }],
    },
  },
];