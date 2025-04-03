const dev = 'https://www.saucedemo.com';
const staging = 'https://www.saucedemo.com';
const uat = 'https://www.saucedemo.com';

export const getBaseUrl = () => {
  const env = process.env.ENV;
  if (!env) throw new Error('Please specify an environment using the ENV environment variable.');

  switch (env) {
    case 'dev':
      return dev;
    case 'staging':
      return staging;
    case 'uat':
      return uat;
    default:
      throw new Error(
        `Unknown environment: ${env}.\nPlease specify one of the following valid environments: dev, staging, uat.`
      );
  }
};
