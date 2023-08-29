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

// Import commands.js using ES2015 syntax:
import './commands'
import './page-methods/login-methods'
import './page-methods/home-methods'
import './page-methods/signup-methods'
import './element-locators/home-locators'
import './element-locators/login-locators'
import './element-locators/signup-locators'
import './element-locators/dashboard-locators'
import './page-methods/dashboard-methods'
import './element-locators/login-locators'
import './element-locators/create-event-forms-locators'
import './page-methods/event-methods'
import './element-locators/user-settings-locators'
import './page-methods/user-settings-methods'
import './page-methods/api-methods/api-login'
import './page-methods/api-methods/api-event1'
import './page-methods/api-methods/api-event2'
import './element-locators/events-and-filters-locators'
import './element-locators/checkout-locators'
import './page-methods/checkout-methods'
import './page-methods/api-methods/api-upcoming-events'
import './page-methods/api-methods/api-transactions'
import './page-methods/admin-methods/memberships-methods'
// Alternatively you can use CommonJS syntax:
// require('./commands')