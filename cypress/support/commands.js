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

/*
 * Get locator by data-testid
 */
Cypress.Commands.add("getByDataTestId", (dataTestId) => {
  cy.log(`Requested element: [data-testid="${dataTestId}"]`);
  return cy
    .get(`[data-testid="${dataTestId}"]`)
    .should("exist")
    .should("be.visible");
});
/*
 * 'Save' button
 */
Cypress.Commands.add("getSaveButton", () => {
  return cy
    .get('button[type="submit"]')
    .contains("Save")
    .should("exist")
    .should("be.visible");
});
/**
 * Get a drop-down menu item by it's text
 * @param itemText
 */
Cypress.Commands.add("getDropDownItem", (itemText) => {
  cy.log(
    `Requested element: button[class^="chakra-menu__menuitem"].contains(${itemText})`
  );
  return cy
    .get(`button[class^="chakra-menu__menuitem"]`)
    .contains(itemText)
    .should("exist")
    .should("be.visible");
});
/**
 * Get a left side menu item by its text
 * @param itemText
 */
Cypress.Commands.add("getLeftSideMenuItemByText", (itemText) => {
  cy.log(`Requested element: ${itemText}`);
  return cy
    .get(`span[class="snapnav"]`)
    .contains(itemText, { matchCase: false })
    .should("exist")
    .should("be.visible");
});
/**
 * Get a 'chakra' button by its text
 * @param itemText
 */
Cypress.Commands.add("getChakraButtonByText", (itemText) => {
  cy.log(`Requested element: ${itemText}`);
  return cy
    .get(`button[class^="chakra-button"]`)
    .contains(itemText)
    .should("exist")
    .should("be.visible");
});
/**
 * Get a 'chakra' form label by its text
 * @param itemText
 */
Cypress.Commands.add("getChakraFormLabel", (itemText) => {
  cy.log(`Requested element: ${itemText}`);
  return cy
    .get(`label[class^="chakra-form__label"]`)
    .contains(itemText)
    .should("exist")
    .should("be.visible");
});
/**
 * Get h1 header by text
 * @param itemText
 */
Cypress.Commands.add("getH1HeaderByText", (itemText) => {
  cy.log(`Requested element: ${itemText}`);
  return cy
    .get(`h1[class^="css"]`)
    .contains(itemText)
    .should("exist")
    .should("be.visible");
});
/**
 * Get h2 header by text
 * @param itemText
 */
Cypress.Commands.add("getH2HeaderByText", (itemText) => {
  cy.log(`Requested element: ${itemText}`);
  return cy
    .get(`h2[class^="css"]`)
    .contains(itemText)
    .should("exist")
    .should("be.visible");
});
/**
 * Get a 'chakra-input' field by a particular attribute
 * @param attrType
 * @param attrValue
 */
Cypress.Commands.add("getChakraInputFieldByAttr", (attrType, attrValue) => {
  cy.log(`Requested element: input[${attrType}="${attrValue}`);
  return cy
    .get(`div[class^="chakra-input"] > input[${attrType}="${attrValue}"]`)
    .should("exist")
    .should("be.visible");
});
/**
 * Get an 'input-element' by a particular attribute
 * @param attrType
 * @param attrValue
 */
Cypress.Commands.add("getInputElementByAttr", (attrType, attrValue) => {
  cy.log(`Requested element: input[${attrType}="${attrValue}`);
  return cy
    .get(`div[class^="chakra-input"] > input[${attrType}="${attrValue}"]`)
    .should("exist")
    .should("be.visible");
});
/**
 * Get selected drop-down value by id and text
 * @param id
 * @param itemText
 */
Cypress.Commands.add("getSelectedDropDownValueByText", (id,itemText) => {
  cy.log(`Requested element by id: ${id} + and by text: ${itemText}`);
  return cy.get(`button[id="${id}"] > div`)
    .contains(itemText)
    .should("exist")
    .should("be.visible");
});
/**
 * Get chakra-switch-input by its index on the page
 * @param index
 */
Cypress.Commands.add("getChakraSwitchSelectorByIndex", (index) => {
  cy.log(`Requested switch-input-selector index is: ${index}`);
  return cy.get('input[class="chakra-switch__input"]').eq(index)
    .should("exist")
    .should("be.visible");
});
/**
 * Get chakra-text by the label index on the page
 * Once identified the text verification can be performed
 * @param index
 */
Cypress.Commands.add("getChakraTextLabelByIndex", (index) => {
  cy.log(`Requested text label index is: ${index}`);
  return cy.get('div[class^="css"] > p[class^="chakra-text"]').eq(index)
    .should("exist")
    .should("be.visible");
});
/**
 * Get an iFrame body by name
 * @param iFrameName
 */
Cypress.Commands.add("getIframeBody", (title) => {
  cy.log(`Requested element title: ${title}`);
  return cy.get(`iframe[title="${title}"]`).then(cy.wrap);
});
/**
 * Get chakra-form error message by text
 * @param errorText
 */
Cypress.Commands.add("getInlineError", (errorText) => {
  cy.log(`Error message text: ${errorText}`);
  return cy
    .get('div[class^="chakra-form__error-message"]')
    .contains(errorText)
    .should("exist")
    .should("be.visible");
});
/**
 * Click the 'Cancel' button
 */
Cypress.Commands.add("clickCancelButton", () => {
  cy.log("Going to clickCancelButton()");
  cy.getChakraButtonByText("Cancel").scrollIntoView();
  cy.getChakraButtonByText("Cancel")
    .should("exist")
    .should("be.visible")
    .click({ force: true });
});
/**
 * Verify that an element does NOT exist
 * @param elementLocator
 * @param elementIndex
 */
Cypress.Commands.add("verifyElementDoesNotExist", (elementLocator,elementIndex) => {
  cy.log(`Requested element: ${elementLocator}`);
  return cy
    .get(elementLocator).eq(elementIndex)
    .should("not.exist");
});
