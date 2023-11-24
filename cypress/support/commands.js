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

/**
 * Method to get session storage
 */
Cypress.Commands.add("getSessionStorage", (key) => {
  cy.log(`Going to getSessionStorage(${key})`);
  cy.window().then((window) => window.sessionStorage.getItem(key));
});
/**
 * Method to set session storage
 */
Cypress.Commands.add("setSessionStorage", (key, value) => {
  cy.log(`Going to setSessionStorage(${key}, ${value})`);
  cy.window().then((window) => {
    window.sessionStorage.setItem(key, value);
  });
});
/*
 * Wait for the API amplitude success
 */
Cypress.Commands.add("waitForApiAmplitudeSuccess", () => {
  cy.log(`Request URL https://api.amplitude.com/`);
  cy.intercept("https://api.amplitude.com/").as("amplitude");
  cy.wait("@amplitude");
});
/**
 * Get QR code by index
 * @param index
 */
Cypress.Commands.add("getQrCodeByIndex", (index) => {
  cy.log(`Requested element: getQrCodeByIndex(${index})`);
  return cy
    .get('div[class="swiper-wrapper"] > div > div > canvas')
    .eq(index)
    .should("exist");
});
/**
 * Get data loading indicator (chakra-spinner)
 */
Cypress.Commands.add("getChakraSpinnerLoadingIndicator", () => {
  cy.log(`Requested element: getChakraSpinnerLoadingIndicator`);
  return cy.get(".chakra-spinner");
});
/**
 * Get locator by data-testid
 * @param dataTestId
 */
Cypress.Commands.add("getByDataTestId", (dataTestId) => {
  cy.log(`Requested element: [data-testid="${dataTestId}"]`);
  return cy
    .get(`[data-testid="${dataTestId}"]`)
    .should("exist");
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
/**
 * Get 'Phone' input field by 'Placeholder'
 * @param placeholder
 */
Cypress.Commands.add("getPhoneInputFieldByPlaceholder", (placeholder) => {
  cy.log(`Going to getPhoneInputFieldByPlaceholder(div[class*="react-tel-input"] > input[placeholder="${placeholder}"])`);
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
 * Click 'Log In' button on a modal window
 */
Cypress.Commands.add("clickLogInButtonOnModalWindow", () => {
  cy.log("Going to clickLogInButtonOnModalWindow");
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
/**
 * Verify top right 'Success' message content
 * @param messageText
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
/**
 * Verify top right 'Error' message content
 * @param messageText
 */
Cypress.Commands.add("verifyTopRightErrorMessage", (messageText) => {
  cy.log(`Going to verifyTopRightErrorMessage(${messageText})`)
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
    `Going to getDropDownItem element: button[class^="chakra-menu__menuitem"].contains(${itemText})`
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
    `Going to getChakraButtonByText element: button[class^="chakra-button"].contains(${itemText})`
  );
  return cy
    .get('button[class^="chakra-button"]')
    .contains(itemText)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible");
});
/**
 * Get a chakra-accordion-button by text
 * @param itemText
 */
Cypress.Commands.add("getChakraAccordionButtonByText", (itemText) => {
  cy.log(
    `Going to getChakraAccordionButtonByText('button[class^="chakra-accordion__button"].contains(${itemText})')`
  );
  return cy
    .get('button[class^="chakra-accordion__button"]')
    .contains(itemText)
    .should("exist")
    .scrollIntoView({ force: true })
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
    `Going to getChakraButtonByAttribute element: button[class^="chakra-button"][${attrType}="${attrValue}"]`
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
  cy.log("Going to getChakraParagraphButtonByText element: " + buttonText);
  return cy
    .get('button[class^="chakra-button"] > p[class^="chakra-text"]')
    .contains(buttonText)
    .eq(0)
    .should("exist")
    .scrollIntoView({ force: true });
});
/**
 * Get a left side menu item by its text
 * @param itemText
 */
Cypress.Commands.add("getLeftSideMenuItemByText", (itemText) => {
  cy.log(`Going to getLeftSideMenuItemByText element: ${itemText}`);
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
  cy.log(`Going to getChakraFormLabel element: ${itemText}`);
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
  cy.log(`Going to getParagraphSubHeaderByText element: ${itemText}`);
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
      `Going to getChakraFormLabelByIndexAndText with index(${elementIndex}) and text: ${labelText}`
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
  cy.log(`Going to getImageByAlt element: ${altAttr}`);
  return cy.get(`img[alt="${altAttr}"]`).should("exist").should("be.visible");
});
/**
 * Get h1 header by text
 * @param itemText
 */
Cypress.Commands.add("getH1HeaderByText", (itemText) => {
  cy.log(`Going to getH1HeaderByText element: ${itemText}`);
  return cy
    .get(`h1[class^="css"]`)
    .contains(itemText)
    .should("exist")
    .scrollIntoView({force: true})
    .should("be.visible");
});
/**
 * Get chakra-skeleton-h1 header by text
 * @param itemText
 */
Cypress.Commands.add("getChakraSkeletonH1HeaderByText", (itemText) => {
  cy.log(`Going to getChakraSkeletonH1HeaderByText element: ${itemText}`);
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
  cy.log("Going to getChakraHeaderH3 element with the following text: " + itemText);
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
  cy.log(`Going to getH3HrefHeaderByText element: ${itemText}`);
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
  cy.log(`Going to getH2HeaderByText element: ${itemText}`);
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
  cy.log("Going to getChakraHeaderH2 element with the following text: " + itemText);
  return cy
    .get(`h2[class^="chakra-heading"]`)
    .contains(itemText)
    .should("exist")
    .should("be.visible");
});
/**
 * Get h2 chakra-text
 * @param itemText
 */
Cypress.Commands.add("getH2ChakraTextByText", (itemText) => {
  cy.log(`Going to getH2ChakraTextByText element: ${itemText}`);
  return cy
    .get(`h2[class^="chakra-text"]`)
    .contains(itemText)
    .should("exist")
    .should("be.visible");
});
/**
 * Get h4 chakra-text
 * @param itemText
 */
Cypress.Commands.add("getH4ChakraTextByText", (itemText) => {
  cy.log(`Going to getH4ChakraTextByText element: ${itemText}`);
  return cy
    .get(`h4[class^="chakra-text"]`)
    .contains(itemText)
    .should("exist")
    .should("be.visible");
});
/**
 * Get a 'swiper-slide' by a particular attribute
 * @param attrType
 * @param attrValue
 */
Cypress.Commands.add("getSwiperSlideByAttr", (attrType, attrValue) => {
  cy.log(`Going to getSwiperSlideByAttr element: input[${attrType}="${attrValue}`);
  return cy
    .get(`div[class^="swiper-slide"] > a[${attrType}="${attrValue}"]`)
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
    `Going to getChakraInputFieldByAttr element: input[${attrType}="${attrValue}`
  );
  return cy
    .get(`div[class^="chakra-input"] > input[${attrType}="${attrValue}"]`)
    .should("exist")
    .should("be.visible");
});
/**
 * Get a 'chakra-link' button by any attribute
 * @param attrType
 * @param attrValue
 */
Cypress.Commands.add("getChakraLinkButtonByAttr", (attrType, attrValue) => {
  cy.log(
    `Going to getChakraLinkButtonByAttr element: input[${attrType}="${attrValue}`
  );
  return cy
    .get(`a[class^="chakra-link"][${attrType}="${attrValue}"]`)
    .should("exist")
    .should("be.visible");
});
/**
 * Get a 'chakra-input_group' field by a particular attribute
 * @param attrType
 * @param attrValue
 */
Cypress.Commands.add(
  "getChakraInputGroupFieldByAttr",
  (attrType, attrValue) => {
    cy.log(
      `Going to getChakraInputGroupFieldByAttr element: input[${attrType}="${attrValue}`
    );
    return cy
      .get(
        `div[class^="chakra-input__group"] > input[${attrType}="${attrValue}"]`
      )
      .should("exist")
      .scrollIntoView()
      .should("be.visible");
  }
);
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
      `Going to verifyChakraInputFieldValue element: input[${attrType}="${attrValue}`
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
      `Going to getChakraInlineValidationError element with index(${elementIndex}) and text: ` + messageText
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
    `Going to getInputElementByAttr element: input[${attrType}="${attrValue}`
  );
  return cy
    .get(`div[class^="chakra-input"] > input[${attrType}="${attrValue}"]`)
    .should("exist")
    .scrollIntoView()
    .should("be.visible");
});
/**
 * Clear a chakra-input-field by providing a field attribute
 * @param attrType
 * @param attrValue
 */
Cypress.Commands.add("clearInputFieldByAttr", (attrType, attrValue) => {
  cy.log(
    `Going to clearInputFieldByAttr element: input[${attrType}="${attrValue}`
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
  cy.log(`Going to getSelectedDropDownValueByText  id: ${id} + text: ${itemText}`);
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
  cy.log(`Going to getChakraSwitchSelectorByIndex(input[class="chakra-switch__input"]) with index: ${index}`);
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
  cy.log("Going to verifyChakraSwitchSelectorIsEnabled with index: " + index);
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
  cy.log(`Going to getChakraTextLabelByIndex with index: ${index}`);
  return cy
    .get('div[class^="css"] > p[class^="chakra-text"]')
    .eq(index)
    .should("exist")
    .scrollIntoView({force: true})
    .should("be.visible");
});
/**
 * Get chakra-text by the label text
 * @param text
 */
Cypress.Commands.add("getChakraTextLabelByText", (text) => {
  cy.log(`Going to getChakraTextLabelByText with index: ${text}`);
  return cy
    .get('div[class^="css"] > p[class^="chakra-text"]')
    .contains(text)
    .should("exist")
    .should("be.visible");
});
/**
 * Get an iFrame body by name
 * @param title
 */
Cypress.Commands.add("getIframeBody", (title) => {
  cy.log(`Going to getIframeBody with title: ${title}`);
  return cy.get(`iframe[title="${title}"]`).then(cy.wrap);
});
/**
 * Get chakra-form error message by text
 * @param errorText
 */
Cypress.Commands.add("getInlineError", (errorText) => {
  cy.log(`Going to getIframeBody with text: ${errorText}`);
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
 * @param index
 */
Cypress.Commands.add(
  "verifyAndTurnOnChakraSwitchSelectorIfDisabled",
  (index) => {
    cy.log("Going to verifyAndTurnOnChakraSwitchSelectorIfDisabled() with index: " + index);
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
    cy.log(`Going to verifyInputFieldAttr (input[${attrType}="${attrValue})`);
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
    `Going to getChakraSkeletonItem element: div[class^="chakra-skeleton"] > p`
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
  cy.log(`Going to verifyChakraSkeletonItemText(${itemText}) with index: ${itemIndex}`);
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
 * @param eventName
 */
Cypress.Commands.add(
  "enterEventNameIntoSearchLocationOrEventField",
  (eventName) => {
    cy.log(`Going to enterEventNameIntoSearchLocationOrEventField(${eventName})`);
    // Not always the search criteria gets properly entered from the first time
    for (let i = 1; i < 3; i++) {
      cy.log('Going to getSearchLocationOrEventInputField()');
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
  cy.log(`Going to inputCustomValueIntoCombobox(${text}) with index=${elementIndex}`);
  // Click the combobox
  cy.getChakraInputFieldByAttr("role", "combobox").as("combobox");
  cy.get("@combobox").eq(elementIndex).click().type(text);
  cy.get("@combobox").eq(elementIndex).type("{enter}");
});
/**
 * Get a chakra-breadcrumb-list-item by index on the page
 * @param index
 */
Cypress.Commands.add("getChakraBreadcrumbListItem", (index) => {
  cy.log(
    `Going to getChakraBreadcrumbListItem element: li[class^="chakra-breadcrumb__list-item"] with index=${index}`
  );
  return cy
    .get('li[class^="chakra-breadcrumb__list-item"]')
    .eq(index)
    .should("exist")
    .should("be.visible");
});
/**
 * Click a button if not disabled
 * @param buttonLocator
 * @param index
 */
Cypress.Commands.add("clickButtonIfNotDisabled", (buttonLocator, index) => {
  cy.log(`Going to clickButtonIfNotDisabled element: ${buttonLocator}.eq(${index})`);
  return cy
    .get(`${buttonLocator}`)
    .eq(index)
    .then(($button) => {
      if (!$button.attr("disabled")) {
        cy.log(`Going to click this button: ${buttonLocator}.eq(${index})`);
        cy.get(`${buttonLocator}`)
          .eq(index)
          .should("exist")
          .should("be.visible")
          .click({ force: true });
      } else {
        cy.log(
          `Button: ${buttonLocator}.eq(${index}) is disabled. Can't click it.`
        );
      }
    });
});
/**
 * Get chakra-modal window
 */
Cypress.Commands.add("getChakraModalWindow", () => {
  cy.log(`Going to getChakraModalWindow()`);
  return cy
    .get('section[class^="chakra-modal__content"]')
    .should("exist")
    .should("be.visible");
});
/**
 * Get chakra-modal-header
 */
Cypress.Commands.add("getChakraModalHeader", () => {
  cy.log(`Going to getChakraModalHeader()`);
  return cy
    .get('section[class^="chakra-modal__header"]')
    .should("exist")
    .should("be.visible");
});
/**
 * Method to delete an existing credit card
 *
 */
Cypress.Commands.add("deleteCreditCardIfExists", () => {
  cy.log("Going to deleteCreditCardIfExists()");
  // Ensure you are on the 'Payment Methods' page
  cy.get('h1[class^="css"]')
    .contains("Payment Methods")
    .as("paymentMethodsHeader");
  cy.get("@paymentMethodsHeader").should("exist").should("be.visible");
  cy.get("body").then(($body) => {
    if (
      $body.find(
        'button[class^="chakra-button chakra-menu__menu-button"][aria-label="More"]'
      ).length
    ) {
      cy.get(
        'button[class^="chakra-button chakra-menu__menu-button"][aria-label="More"]'
      )
        .scrollIntoView({ force: true })
        .click({ force: true });
      // Click 'Delete' to delete credit card
      cy.getDropDownItem("Delete").click({ force: true });
      // Confirm deletion on the 'Delete Payment Method' confirmation
      cy.getChakraModalWindow();
      cy.get('header[id^="chakra-modal--header"]').should(
        "contain.text",
        "Delete Payment Method"
      );
      cy.getChakraButtonByText("Delete").click({ force: true });
    }
  });
});
/**
 * Get a chakra-button-label by text
 * @param itemText
 */
Cypress.Commands.add("getChakraButtonLabelByText", (itemText) => {
  cy.log(`Going to getChakraButtonLabelByText().contains(${itemText})`);
  return cy
    .get('p[class^="chakra-text button-label"]')
    .contains(itemText)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible");
});
/**
 * Get a button by an attribute
 * @param attrType
 * @param attrValue
 */
Cypress.Commands.add("getButtonByAttribute", (attrType, attrValue) => {
  cy.log(
    `Going to getButtonByAttribute element: button[${attrType}="${attrValue}"]`
  );
  return cy
    .get(`button[${attrType}="${attrValue}"]`)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible");
});
/**
 * Select li-option by text
 * @param itemText
 */
Cypress.Commands.add("selectOptionByText", (itemText) => {
  cy.log(`Going to selectOptionByText(${itemText})`);
  return cy
    .get(`li[role="option"] > div[class^="chakra-text"]`)
    .contains(itemText)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .click({ force: true });
});
/**
 * Get a pre-container-editor to input text
 */
Cypress.Commands.add("getPreContainerEditor", () => {
  cy.log(`Going to getPreContainerEditor()`);
  return cy.get(".ql-editor").should("exist").should("be.visible");
});
/**
 * Get a chakra-tab-button by text
 * @param itemText
 */
Cypress.Commands.add("getChakraTabButtonByText", (itemText) => {
  cy.log(`Going to getChakraTabButtonByText(${itemText})`);
  return cy
    .get('button[class^="chakra-tabs__tab"]')
    .contains(itemText)
    .should("exist")
    .should("be.visible");
});
/**
 * Get a gridcell-text
 * @param itemText
 * @param gridcellIndex
 */
Cypress.Commands.add("getGridcellLabelByText", (gridcellIndex, itemText) => {
  cy.log(
    `Going to getGridcellLabelByText().eq(${gridcellIndex}).contains(${itemText})`
  );
  return cy
    .get('td[role="gridcell"] > p')
    .eq(gridcellIndex)
    .contains(itemText)
    .should("exist")
    .should("be.visible");
});
/**
 * Store a value in the Cypress.env object
 * @param key
 * @param value
 */
Cypress.Commands.add("storeValueInCypressEnvBasedOnKey", (key, value) => {
  cy.log(
    `Going to store the [${value}] value under the following key: [${key}]`
  );
  Cypress.env(key, value);
});
/**
 * Get a radio button
 * @param attrType
 * @param attrValue
 */
Cypress.Commands.add("getRadioButtonByAttribute", (attrType, attrValue) => {
  cy.log(
    `Going to getRadioButtonByAttribute element: input[type="radio"][${attrType}="${attrValue}"]`
  );
  return cy
    .get(`input[type="radio"][${attrType}="${attrValue}"]`)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible");
});
/**
 * Click 'X' button to close a chakra-modal window
 */
Cypress.Commands.add("closeModalWindowByClickingX", () => {
  cy.log(`Going to closeModalWindowByClickingX()`);
  return cy
    .get('button[class^="chakra-modal__close-btn"]')
    .should("exist")
    .should("be.visible")
    .click({ force: true });
});
/**
 * Get invoice header when watching purchased tickets
 */
Cypress.Commands.add("getTicketInvoiceHeader", () => {
  cy.log(
    `Going to getTicketInvoiceHeader: div[data-testid="invoice-header"] > p > a`
  );
  return cy
    .get(`div[data-testid="invoice-header"] > p > a`)
    .should("exist")
    .should("be.visible");
});
/**
 * Method to click a button if it exists based on locator | index | text
 * @param elementLocator
 * @param index
 * @param buttonText
 *
 */
Cypress.Commands.add(
  "clickButtonIfAvailableBasedOnLocatorIndexText",
  (elementLocator, index, buttonText) => {
    cy.log(
      `Going to clickButtonIfAvailableBasedOnLocatorIndexText cy.get('${elementLocator}').eq(${index}).contains("${buttonText}")`
    );
    cy.get("body").then(($body) => {
      if ($body.find(`${elementLocator}`).eq(index).length) {
        cy.get(`${elementLocator}`)
          .eq(index)
          .contains(`${buttonText}`)
          .scrollIntoView({ force: true })
          .click({ force: true });
      } else {
        cy.log(
          `Wasn't able to find the button: cy.get("${elementLocator}").eq(${index}).contains("${buttonText}"). Can't click it.`
        );
      }
    });
  }
);
/**
 * Get chakra modal header
 * @param itemText
 */
Cypress.Commands.add("getChakraModalHeader", (itemText) => {
  cy.log(
    `Going to getChakraModalHeader: header[class^="chakra-modal__header"][id^="chakra-modal--header"].contains(${itemText})`
  );
  return cy
    .get(`header[class^="chakra-modal__header"][id^="chakra-modal--header"]`)
    .contains(itemText)
    .should("exist")
    .should("be.visible");
});
/**
 * Click main menu and log out
 */
Cypress.Commands.add("clickMainMenuAndLogOut", () => {
  cy.log("Going to clickMainMenuAndLogOut()");
  // Click main menu
  cy.get('button[class*="chakra-menu__menu-button"]')
    .eq(1)
    .should("exist")
    .should("be.visible")
    .click({ force: true });
  // Click 'Log Out'
  cy.get('button[class^="chakra-menu__menuitem"][data-index="9"]')
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .click({ force: true });
});
/**
 * Custom type text command
 * @param elementLocator
 * @param elementIndex
 * @param text
 */
Cypress.Commands.add("typeText", (elementLocator, elementIndex, text) => {
  cy.log(
    "Going to typeText. Element locator: " +
      elementLocator +
      "Element index: " +
      elementIndex
  );
  cy.log("Typing the following text: " + text);
  cy.get(elementLocator)
    .eq(elementIndex)
    .should("exist")
    .scrollIntoView({ force: true });
  cy.get(elementLocator)
    .eq(elementIndex)
    .clear({ force: true })
    .type(text);
});
