/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
    'cypress/globals': true
  },
  plugins: ['jest', 'cypress']
  /* extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'jest', 'cypress'],
  settings: {
    react: {
      version: 'detect'
    }
  } */
}
