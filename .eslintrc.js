/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
    'cypress/globals': true
  },
  plugins: ['react', 'jest', 'cypress'],
  settings: {
    react: {
      version: 'detect'
    }
  }
}
