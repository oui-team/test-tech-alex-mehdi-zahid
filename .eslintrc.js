module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  rules: {
    // Reminder:
    // "off" means 0 (turns the rule off completely)
    // "warn" means 1 (turns the rule on but won't make the linter fail)
    // "error" means 2 (turns the rule on and will make the linter fail)
    'no-console': 2, // This force the usage of a custom logger.
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
