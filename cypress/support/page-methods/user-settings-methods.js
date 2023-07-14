/**
 * Click the 'Payment' button under 'Profile'
 */
Cypress.Commands.add("clickPaymentButton", () => {
  cy.log("Going to clickPaymentButton()");
  cy.getChakraButtonByText("Payment")
    .should("exist")
    .should("be.visible")
    .click();
});
/**
 * Click the 'Add payment method' button
 */
Cypress.Commands.add("clickAddPaymentMethodButton", () => {
  cy.log("Going to clickAddPaymentMethodButton()");
  cy.getChakraButtonByText("Add payment method")
    .should("exist")
    .should("be.visible")
    .click();
});
/**
 * Verify 'Card Information' form element appearance
 */
Cypress.Commands.add("verifyCardInfoFormAppearance", () => {
  cy.log("Going to verifyCardInfoFormAppearance()");
  // 'Card Information' sub-header
  cy.getH2HeaderByText("Card Information");
  // Label
  cy.getChakraFormLabel("Name on Card");
  // Field
  cy.getChakraInputFieldByAttr("placeholder", "Name on Card");
  // Inline error
  cy.getChakraFormLabel("Card Number");
  // 'Card Number' iFrame
  cy.getIframeBody("Secure card number input frame")
    .should("exist")
    .should("be.visible");
  cy.getChakraFormLabel("Expiry");
  // 'Expiry' iFrame
  cy.getIframeBody("Secure expiration date input frame")
    .should("exist")
    .should("be.visible");
  cy.getChakraFormLabel("CVC");
  // 'CVC' iFrame
  cy.getIframeBody("Secure CVC input frame")
    .should("exist")
    .should("be.visible");
});
/**
 * Verify 'Card Information' form inline errors
 */
Cypress.Commands.add("verifyCardInfoInlineErrors", () => {
  cy.log("Going to verifyCardInfoInlineErrors()");
  cy.getSaveButton().click({ force: true });
  cy.getInlineError("Name on Card is required");
  cy.getInlineError("Card Number is required");
  cy.getInlineError("Expiry is required");
  cy.getInlineError("Security code is required");
});

/**
 * Verify 'Billing Address' form element appearance
 */
Cypress.Commands.add("verifyBillingAddressFormAppearance", () => {
  cy.log("Going to verifyBillingAddressFormAppearance()");
  // 'Billing Address' sub-header
  cy.getH2HeaderByText("Billing Address");
  // Label
  cy.getChakraFormLabel("Search Address");
  // Field
  cy.getChakraInputFieldByAttr("id", "search-address-input");
  cy.getChakraFormLabel("Street Address");
  cy.getChakraInputFieldByAttr("id", "address_line1");
  cy.getSaveButton().scrollIntoView();
  cy.getChakraFormLabel("City");
  cy.getChakraInputFieldByAttr("id", "address_city");
  cy.getChakraFormLabel("Country");
  cy.get('button[id="address-country-toggle-button"]')
    .should("exist")
    .should("be.visible");
  cy.getChakraFormLabel("Region");
  cy.get('button[id="address_state-toggle-button"]')
    .should("exist")
    .should("be.visible");
  cy.getChakraFormLabel("Postal Code");
  cy.getChakraInputFieldByAttr("id", "address_zip");
});

/**
 * Verify 'Billing Address' form inline errors
 */
Cypress.Commands.add("verifyBillingAddressInlineErrors", () => {
  cy.log("Going to verifyBillingAddressInlineErrors()");
  cy.getSaveButton().click({ force: true });
  cy.getInlineError("Street address is required");
  cy.getInlineError("City is required");
  cy.getInlineError("Country is required");
  cy.getInlineError("Postal code is required");
});

/**
 * Populate 'Billing Address' form
 */
Cypress.Commands.add("populateBillingAddressForm", (userAddress) => {
  cy.log("Going to populateBillingAddressForm()");
  // Search Address field
  cy.getChakraInputFieldByAttr("id", "search-address-input").type(
    userAddress.fullAddress
  );
  cy.get('p[class^="chakra-text"]').contains("905 West Pender Street").click();
  cy.getChakraInputFieldByAttr("id", "search-address-input").should(
    "have.attr",
    "value",
    userAddress.fullAddress
  );
  // Country selector
  cy.getSelectedDropDownValueByText(
    "address-country-toggle-button",
    userAddress.country
  );
  // Region selector
  cy.getSelectedDropDownValueByText(
    "address_state-toggle-button",
    userAddress.regionForVerification
  );
  // Postal Code
  cy.getChakraInputFieldByAttr("id", "address_zip").should(
    "have.attr",
    "value",
    userAddress.postalCode
  );
  // Street Address field
  cy.getChakraInputFieldByAttr("id", "address_line1").should(
    "have.attr",
    "value",
    userAddress.streetAddressForVerification
  );
  // City field
  cy.getChakraInputFieldByAttr("id", "address_city").should(
    "have.attr",
    "value",
    userAddress.city
  );
});

/**
 * Populate 'Card Information' form
 * @todo figure out how to populate the iFrame credit card form
 */
Cypress.Commands.add("populateCardInformationForm", (creditCardDetails) => {
  //cy.log("Going to populateCardInformationForm()");
  cy.getStripeCardField("div.CardNumberField").type("4242424242424242");
});

/**
 * iFrame with Stripe
 * @todo figure out how to populate the iFrame credit card form
 */
Cypress.Commands.add("getStripeCardField", (selector, attempts = 0) => {
  Cypress.log({
    displayName: "getStripeCardField",
    message: `${selector}: ${attempts}`,
  });

  if (attempts > 50) throw new Error("too many attempts");

  return cy
    .get("iframe", { timeout: 10000, log: false })
    .eq(0, { timeout: 10000, log: false })
    .its("0.contentDocument", { timeout: 10000, log: false })
    .find("body", { log: false })
    .then((body) => {
      const cardField = body.find(selector);
      if (!cardField.length) {
        return cy.wait(300, { log: false }).then(() => {
          getStripeCardField(selector, ++attempts);
        });
      } else {
        return cy.wrap(cardField);
      }
    });
});
