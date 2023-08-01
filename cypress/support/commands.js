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
import { HomeLocators } from "../support/element-locators/home-locators";
import { LoginLocators } from "../support/element-locators/login-locators";
const homeLocators = new HomeLocators();
const loginLocators = new LoginLocators();

/*
 * Wait for the API amplitude success
 */
Cypress.Commands.add("waitForApiAmplitudeSuccess", () => {
  cy.log(`Request URL https://api.amplitude.com/`);
  cy.intercept('https://api.amplitude.com/').as('amplitude');
  cy.wait('@amplitude');
});
/*
 * Get data loading indicator (chakra-spinner)
 */
Cypress.Commands.add("getChakraSpinnerLoadingIndicator", () => {
  cy.log(`Requested element: getChakraSpinnerLoadingIndicator`);
  return cy
    .get('.chakra-spinner');
});

// cy.get('.chakra-spinner')
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
 * Get 'Phone' input field by 'Placeholder'
 */
Cypress.Commands.add("getPhoneInputFieldByPlaceholder", (placeholder) => {
  return cy
    .get(`div[class*="react-tel-input"] > input[placeholder="${placeholder}"]`)
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
 * Click 'Log In' button
 */
Cypress.Commands.add("clickLogInButtonOnModalWindow", () => {
  cy.log("Going to clickLogInButton");
  loginLocators
    .loginButtonOnLoginModalWindow()
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
 * Get a chakra-button by text
 * @param itemText
 */
Cypress.Commands.add("getChakraButtonByText", (itemText) => {
  cy.log(
    `Requested getChakraButtonByText element: button[class^="chakra-button"].contains(${itemText})`
  );
  return cy
    .get('button[class^="chakra-button"]')
    .contains(itemText)
    .should("exist")
    .scrollIntoView()
    .should("be.visible");
});
/**
 * Click a chakra button by text
 * @param itemText
 */
Cypress.Commands.add("clickChakraButtonByText", (itemText) => {
  cy.log(
    `Going to click the following button: button[class^="chakra-button"].contains(${itemText})`
  );
  cy.getChakraButtonByText(itemText).click({ force: true });
});
/**
 * Get a chakra-button by an attribute
 * @param attrType
 * @param attrValue
 */
Cypress.Commands.add("getChakraButtonByAttribute", (attrType, attrValue) => {
  cy.log(
    `Requested getChakraButtonByAttribute element: button[class^="chakra-button"][${attrType}="${attrValue}"]`
  );
  return cy
    .get(`button[class^="chakra-button"][${attrType}="${attrValue}"]`)
    .should("exist")
    .should("be.visible");
});
/**
 * Get chakra-paragraph-button by text
 * @param buttonText
 */
Cypress.Commands.add("chakraParagraphButtonByText", (buttonText) => {
  cy.log("Requested getChakraParagraphButtonByText element: " + buttonText);
  return cy
    .get('button[class^="chakra-button"] > p[class^="chakra-text"]')
    .contains(buttonText);
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
 * Get a paragraph sub-header by text
 * @param itemText
 */
Cypress.Commands.add("getParagraphSubHeaderByText", (itemText) => {
  cy.log(`Requested getParagraphSubHeaderByText element: ${itemText}`);
  return cy
    .get(`p[class^="chakra-text"]`)
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
 * Get image by the 'alt' attribute
 * @param altAttr
 */
Cypress.Commands.add("getImageByAlt", (altAttr) => {
  cy.log(`Requested getImageByAlt element: ${altAttr}`);
  return cy.get(`img[alt="${altAttr}"]`).should("exist").should("be.visible");
});
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
 * Get chakra-skeleton-h1 header by text
 * @param itemText
 */
Cypress.Commands.add("getChakraSkeletonH1HeaderByText", (itemText) => {
  cy.log(`Requested getChakraSkeletonH1HeaderByText element: ${itemText}`);
  return cy
    .get('div[class^="chakra-skeleton"] > h1[class^="chakra-text"]')
    .contains(itemText)
    .should("exist")
    .should("be.visible");
});
/**
 * Get a chakra-header-h3 by text
 * @param itemText
 */
Cypress.Commands.add("getChakraHeaderH3", (itemText) => {
  cy.log("getChakraHeaderH3 element with the following text: " + itemText);
  return cy
    .get(`h3[class^="chakra-heading"]`)
    .contains(itemText)
    .should("exist")
    .should("be.visible");
});
/**
 * Get h3-href header by text
 * @param itemText
 */
Cypress.Commands.add("getH3HrefHeaderByText", (itemText) => {
  cy.log(`Requested getH3HrefHeaderByText element: ${itemText}`);
  return cy
    .get('h3[class^="chakra-text"] > a[class^="chakra-link"]')
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
 * Get a chakra-header-h2 by text
 * @param itemText
 */
Cypress.Commands.add("getChakraHeaderH2", (itemText) => {
  cy.log("getChakraHeaderH2 element with the following text: " + itemText);
  return cy
    .get(`h2[class^="chakra-heading"]`)
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
 * Verify a 'chakra-input' field value
 * @param attrType
 * @param attrValue
 * @param inputValue
 */
Cypress.Commands.add(
  "verifyChakraInputFieldValue",
  (attrType, attrValue, inputValue) => {
    cy.log(
      `Requested verifyChakraInputFieldValue element: input[${attrType}="${attrValue}`
    );
    return cy
      .get(`div[class^="chakra-input"] > input[${attrType}="${attrValue}"]`)
      .should("have.attr", "value", inputValue)
      .should("be.visible");
  }
);
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
  return cy
    .getInputElementByAttr(attrType, attrValue)
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
 * Get chakra-text by the label text
 * @param text
 */
Cypress.Commands.add("getChakraTextLabelByText", (text) => {
  cy.log(`Requested text label index is: ${text}`);
  return cy
    .get('div[class^="css"] > p[class^="chakra-text"]')
    .contains(text)
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
/**
 * Click the 'Log Out' button
 */
Cypress.Commands.add("signOut", () => {
  cy.log("Going to signOut()");
  cy.getDropDownItem("Log Out").click({ force: true });
  homeLocators.searchEventsInputField().should("exist").should("be.visible");
});
/**
 * Verify input field attribute and its value
 * @param attrType
 * @param attrValue
 * @param attrToCheck
 * @param attrValueToCheck
 */
Cypress.Commands.add(
  "verifyInputFieldAttr",
  (attrType, attrValue, fieldValueToCheck, attrValueToCheck) => {
    cy.log(`Requested element: input[${attrType}="${attrValue}`);
    return cy
      .get(`div[class^="chakra-input"] > input[${attrType}="${attrValue}"]`)
      .should("exist")
      .scrollIntoView()
      .should("be.visible")
      .should("have.attr", fieldValueToCheck, attrValueToCheck);
  }
);
/**
 * Verify 'Showpass' logo appearance
 */
Cypress.Commands.add("verifyShowpassLogoAppearance", () => {
  cy.log("Going to verifyShowpassLogoAppearance()");
  cy.get('img[alt="showpass"]').should("exist").should("be.visible");
});
/**
 * Verify 'Universal QR Code' appearance
 */
Cypress.Commands.add("verifyQrCodeAppearance", () => {
  cy.log("Going to verifyQrCodeAppearance()");
  cy.get('img[alt="Universal QR Code"]').should("exist").should("be.visible");
});
/**
 * Get a chakra-skeleton paragraph item text
 */
Cypress.Commands.add("getChakraSkeletonItem", () => {
  cy.log(
    `Requested getChakraSkeletonItem element: div[class^="chakra-skeleton"] > p`
  );
  return cy
    .get('div[class^="chakra-skeleton"] > p')
    .should("exist")
    .should("be.visible");
});
/**
 * Verify 'chakra-skeleton' item text by item index
 * @param itemText
 * @param itemIndex
 */
Cypress.Commands.add("verifyChakraSkeletonItemText", (itemIndex, itemText) => {
  cy.log(`Going to verifyChakraSkeletonItemText(${itemText})`);
  cy.getChakraSkeletonItem()
    .eq(itemIndex)
    .should("exist")
    .scrollIntoView()
    .should("be.visible")
    .should("contain", itemText);
});
/**
 * 'Search location or event' input field within the 'Search' and 'Date' section
 */
Cypress.Commands.add("getSearchLocationOrEventInputField", () => {
  cy.log(`Going to getSearchLocationOrEventInputField()`);
  return cy
    .get('input[id="search-places-and-events-input"][role="combobox"]')
    .as("searchField")
    .get("@searchField")
    .should("exist")
    .should("be.visible");
});
/**
 * Method to enter event name into the 'Search location or event' field
 */
Cypress.Commands.add(
  "enterEventNameIntoSearchLocationOrEventField",
  (eventName) => {
    cy.log("Going to enterEventNameIntoSearchLocationOrEventField()");
    // Not always the search criteria gets properly entered from the first time
    for (let i = 1; i < 3; i++) {
      cy.getSearchLocationOrEventInputField().clear({ force: true });
      cy.getSearchLocationOrEventInputField().type(eventName, { force: true });
    }
  }
);
/**
 * Method to enter a custom value into combobox
 * @param text
 * @param elementIndex
 */
Cypress.Commands.add("inputCustomValueIntoCombobox", (elementIndex, text) => {
  cy.log("Going to inputCustomValueIntoCombobox(text)");
  // Click the combobox
  cy.getChakraInputFieldByAttr("role", "combobox").as("combobox");
  cy.get("@combobox").eq(elementIndex).click().type(text);
  cy.get("@combobox").eq(elementIndex).type("{enter}");
});
