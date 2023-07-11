
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


/**
 * Get locator by data-testid
 */
Cypress.Commands.add("getByDataTestId", (dataTestId) => {
  return cy.get(`[data-testid="${dataTestId}"]`);
});
/**
 * Get a drop-down menu item by it's text
 * @param itemText
 */
Cypress.Commands.add("getDropDownItem", (itemText) => {
  return cy.get(`button[class^="chakra-menu__menuitem"]`).contains(itemText);
});
/**
 * Get a left side menu item by its text
 * @param itemText
 */
Cypress.Commands.add("getLeftSideMenuItemByText", (itemText) => {
  return cy.get(`span[class="snapnav"]`).contains(itemText,  { matchCase: false });
});
