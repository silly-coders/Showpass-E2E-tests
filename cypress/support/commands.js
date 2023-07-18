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
    .scrollIntoView()
    .should("be.visible");
});
/*
 * Click 'Save' button
 */
Cypress.Commands.add("clickSaveButton", () => {
  cy.log("Going to clickSaveButton");
  return cy
    .get('button[type="submit"]')
    .contains("Save")
    .should("exist")
    .scrollIntoView()
    .should("be.visible")
    .click({ force: true });
});
/*
 * Click (X) button to close top right message
 */
Cypress.Commands.add("clickButtonXtoCloseMessage", () => {
  cy.log("Going to clickButtonXtoCloseMessage");
  return cy
    .get('button[aria-label="Close alert message"]')
    .eq(0)
    .should("exist")
    .scrollIntoView()
    .should("be.visible")
    .click({ force: true });
});
/*
 * Verify top right 'Success' message content
 */
Cypress.Commands.add("verifyTopRightSuccessMessage", (messageText) => {
  cy.log(
    "Going to verifyTopRightSuccessMessage with the following text: [ " +
      messageText +
      " ]"
  );
  return cy
    .get('div[status="success"]')
    .eq(0)
    .contains(messageText)
    .should("exist")
    .should("be.visible");
});
/*
 * Verify top right 'Error' message content
 */
Cypress.Commands.add("verifyTopRightErrorMessage", (messageText) => {
  cy.log(
    "Going to verifyTopRightErrorMessage with the following text: [ " +
      messageText +
      " ]"
  );
  return cy
    .get('div[status="error"]')
    .eq(0)
    .contains(messageText)
    .should("exist")
    .should("be.visible");
});
/**
 * Get a drop-down menu item by it's text
 * @param itemText
 */
Cypress.Commands.add("getDropDownItem", (itemText) => {
  cy.log(
    `Requested getDropDownItem element: button[class^="chakra-menu__menuitem"].contains(${itemText})`
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
  cy.log(`Requested getLeftSideMenuItemByText element: ${itemText}`);
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
  cy.log(`Requested getChakraButtonByText element: ${itemText}`);
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
  cy.log(`Requested getChakraFormLabel element: ${itemText}`);
  return cy
    .get(`label[class^="chakra-form__label"]`)
    .contains(itemText)
    .should("exist")
    .should("be.visible");
});
/**
 * Get a 'chakra-form-label by index and text
 * @param elementIndex
 * @param labelText
 */
Cypress.Commands.add(
  "getChakraFormLabelByIndexAndText",
  (elementIndex, labelText) => {
    cy.log(
      `Requested getChakraFormLabelByIndexAndText with this text: ${labelText}`
    );
    return cy
      .get(`label[class^="chakra-form__label"]`)
      .eq(elementIndex)
      .contains(labelText)
      .should("exist")
      .should("be.visible");
  }
);
/**
 * Get h1 header by text
 * @param itemText
 */
Cypress.Commands.add("getH1HeaderByText", (itemText) => {
  cy.log(`Requested getH1HeaderByText element: ${itemText}`);
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
  cy.log(`Requested getH2HeaderByText element: ${itemText}`);
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
  cy.log(
    `Requested getChakraInputFieldByAttr element: input[${attrType}="${attrValue}`
  );
  return cy
    .get(`div[class^="chakra-input"] > input[${attrType}="${attrValue}"]`)
    .should("exist")
    .should("be.visible");
});
/**
 * Get a 'chakra-form-error-message' inline validation by index and text
 * @param elementIndex
 * @param messageText
 */
Cypress.Commands.add(
  "getChakraInlineValidationError",
  (elementIndex, messageText) => {
    cy.log(
      "Requested getChakraInlineValidationError element text: " + messageText
    );
    return cy
      .get('div[class^="chakra-form__error-message"]')
      .eq(elementIndex)
      .should("exist")
      .should("be.visible");
  }
);
/**
 * Get an 'input-element' by a particular attribute
 * @param attrType
 * @param attrValue
 */
Cypress.Commands.add("getInputElementByAttr", (attrType, attrValue) => {
  cy.log(
    `Requested getInputElementByAttr element: input[${attrType}="${attrValue}`
  );
  return cy
    .get(`div[class^="chakra-input"] > input[${attrType}="${attrValue}"]`)
    .should("exist")
    .scrollIntoView()
    .should("be.visible");
});
/**
 * Clear a chakra-input-field by providing a field attribute
 */
Cypress.Commands.add("clearInputFieldByAttr", (attrType, attrValue) => {
  cy.log(
    `Requested clearInputFieldByAttr element: input[${attrType}="${attrValue}`
  );
  return cy.getInputElementByAttr(attrType, attrValue)
  .scrollIntoView()
  .should("be.visible")
  .clear({ force: true });
});
/**
 * Get selected drop-down value by id and text
 * @param id
 * @param itemText
 */
Cypress.Commands.add("getSelectedDropDownValueByText", (id, itemText) => {
  cy.log(`getSelectedDropDownValueByText  id: ${id} + text: ${itemText}`);
  return cy
    .get(`button[id="${id}"] > div`)
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
  return cy
    .get('input[class="chakra-switch__input"]')
    .eq(index)
    .should("exist")
    .should("be.visible");
});
/**
 * Verify that chakra-switch selector is enabled
 * @param index
 */
Cypress.Commands.add("verifyChakraSwitchSelectorIsEnabled", (index) => {
  cy.log("Going to verifyChakraSwitchSelectorIsEnabled");
  return cy
    .get('label[class^="chakra-switch"]')
    .eq(index)
    .should("exist")
    .should("be.visible")
    .should("have.attr", "data-checked");
});
/**
 * Verify that chakra-switch selector is disabled
 * @param index
 */
Cypress.Commands.add("verifyChakraSwitchSelectorIsDisabled", (index) => {
  cy.log("Going to verifyChakraSwitchSelectorIsDisabled");
  return cy
    .get('label[class^="chakra-switch"]')
    .eq(index)
    .should("exist")
    .should("be.visible")
    .should("not.have.attr", "data-checked");
});
/**
 * Get chakra-text by the label index on the page
 * Once identified the text verification can be performed
 * @param index
 */
Cypress.Commands.add("getChakraTextLabelByIndex", (index) => {
  cy.log(`Requested text label index is: ${index}`);
  return cy
    .get('div[class^="css"] > p[class^="chakra-text"]')
    .eq(index)
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
Cypress.Commands.add(
  "verifyElementDoesNotExist",
  (elementLocator, elementIndex) => {
    cy.log(
      "Going to verifyElementDoesNotExist. Element locator: " +
        elementLocator +
        "Element index: " +
        elementIndex
    );
    return cy.get(elementLocator).eq(elementIndex).should("not.exist");
  }
);
/**
 * Check if a chakra-switch selector is NOT enabled and enable it
 */
Cypress.Commands.add(
  "verifyAndTurnOnChakraSwitchSelectorIfDisabled",
  (index) => {
    cy.log("Going to verifyAndTurnOnChakraSwitchSelectorIfDisabled()");
    // If the chakra-switch selector is disabled from the get go enable it first to run the test
    cy.get('label[class^="chakra-switch"]')
      .eq(index)
      .then(($label) => {
        var attr = $label.attr("data-checked");
        cy.log("Attribute was: " + attr);
        if (typeof attr == "undefined") {
          cy.toggleSwitchSelector(index);
          // Verify the 'All Notifications' selector is ENABLED
          cy.verifyChakraSwitchSelectorIsEnabled(index);
        }
      });
  }
);
