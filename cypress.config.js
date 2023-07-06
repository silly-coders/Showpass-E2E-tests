const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://beta.showpass.com',
    viewportHeight: 900,
    viewportWidth: 1440,
    frontLoadingDelay: 5000,
    retries: { "runMode": 0, "openMode": 0 },
  },
});
