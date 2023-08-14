const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://beta.showpass.com',
    viewportHeight: 960,
    viewportWidth: 1536,
    frontLoadingDelay: 5000,
    retries: { "runMode": 1, "openMode": 0 },
    chromeWebSecurity: false
  },
});
