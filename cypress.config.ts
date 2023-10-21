const { defineConfig } = require('cypress')
const envLocal = require('./.env.local.json')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {}
  },
  defaultCommandTimeout: 10000,
  env: {
    BASE_URL: 'http://localhost:3000',
    ...envLocal
  }
})
