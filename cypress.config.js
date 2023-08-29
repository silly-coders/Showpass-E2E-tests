const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://beta.showpass.com',
    viewportHeight: 1440,
    viewportWidth: 1536,
    frontLoadingDelay: 5000,
    defaultCommandTimeout: 7000,
    retries: { "runMode": 1, "openMode": 0 },
    chromeWebSecurity: false,
    projectId: 'e9axi7'
  },
});
