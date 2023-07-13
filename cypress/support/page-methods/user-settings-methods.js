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
 * Verify 'Card Information' form element appearance
 */
Cypress.Commands.add("verifyCardInfoFormAppearance", () => {
  cy.log("Going to verifyCardInfoFormAppearance()");
  // 'Card Information' sub-header
  cy.getH2HeaderByText("Card Information");
  cy.getSaveButton().click({ force: true });
  // Label
  cy.getChakraFormLabel("Name on Card");
  // Field
  cy.getChakraInputFieldByAttr("placeholder", "Name on Card");
  // Inline error
  cy.getInlineError("Name on Card is required");
  cy.getChakraFormLabel("Card Number");
  // 'Card Number' iFrame
  cy.getIframeBody("Secure card number input frame")
    .should("exist")
    .should("be.visible");
  cy.getInlineError("Card Number is required");
  cy.getChakraFormLabel("Expiry");
  // 'Expiry' iFrame
  cy.getIframeBody("Secure expiration date input frame")
    .should("exist")
    .should("be.visible");
  cy.getInlineError("Expiry is required");
  cy.getChakraFormLabel("CVC");
  // 'CVC' iFrame
  cy.getIframeBody("Secure CVC input frame")
    .should("exist")
    .should("be.visible");
  cy.getInlineError("Security code is required");
});

/**
 * Verify 'Billing Address' form element appearance
 */
Cypress.Commands.add("verifyBillingAddressFormAppearance", () => {
  cy.log("Going to verifyBillingAddressFormAppearance()");
  // 'Billing Address' sub-header
  cy.getH2HeaderByText("Billing Address");
  cy.getSaveButton().click({ force: true });
  // Label
  cy.getChakraFormLabel("Search Address");
  // Field
  cy.get('input[placeholder="Search Address"]')
    .should("exist")
    .should("be.visible");
  cy.getChakraFormLabel("Street Address");
  cy.getChakraInputFieldByAttr("id", "address_line1");
  cy.getSaveButton().scrollIntoView();
  cy.getInlineError("Street address is required");
  cy.getChakraFormLabel("City");
  cy.getChakraInputFieldByAttr("id", "address_city");
  cy.getInlineError("City is required");
  cy.getChakraFormLabel("Country");
  cy.get('button[id="address-country-toggle-button"]')
    .should("exist")
    .should("be.visible");
  cy.getInlineError("Country is required");
  cy.getChakraFormLabel("Region");
  cy.get('button[id="address_state-toggle-button"]')
    .should("exist")
    .should("be.visible");
  cy.getChakraFormLabel("Postal Code");
  cy.getChakraInputFieldByAttr("id", "address_zip");
  cy.getInlineError("Postal code is required");
});
