const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {}
  },
  defaultCommandTimeout: 10000,
  env: {
    BASE_URL: 'http://localhost:3000',
    EMAIL: process.env.REACT_APP_EMAIL,
    PASSWORD: process.env.REACT_APP_PASSWORD,
    TOKEN: process.env.REACT_APP_GOOGLE_API_KEY
  }
})
