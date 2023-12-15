// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// load and register the grep feature using "require" function
// https://github.com/cypress-io/cypress/tree/develop/npm/grep
const registerCypressGrep = require('@cypress/grep')
registerCypressGrep()

// Turn off uncaught application errors to allow test to continue running
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

// Import commands.js using ES2015 syntax:
// *********************************************************************
// IMPORT LOCATORS
import './element-locators/home-locators'
import './element-locators/login-locators'
import './element-locators/signup-locators'
import './element-locators/dashboard-locators'
import './element-locators/login-locators'
import './element-locators/create-event-forms-locators'
import './element-locators/user-settings-locators'
import './element-locators/events-and-filters-locators'
// *********************************************************************
// IMPORT METHODS
import './commands'
import './page-methods/login-methods'
import './page-methods/home-methods'
import './page-methods/signup-methods'
import './page-methods/dashboard-methods'
import './page-methods/event-methods'
import './page-methods/user-settings-methods'
import './page-methods/api-methods/api-login'
import './page-methods/api-methods/api-event1'
import './page-methods/api-methods/api-event2'
import './page-methods/checkout-methods'
import './page-methods/api-methods/api-upcoming-events'
import './page-methods/api-methods/api-transactions'
import './page-methods/admin-methods/memberships-methods'
import './page-methods/Discounts/discounts-appearance-methods'
import './page-methods/Discounts/discounts-methods'
// *********************************************************************
// Alternatively you can use CommonJS syntax:
// require('./commands')