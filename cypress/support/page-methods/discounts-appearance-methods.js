// **************************************************************************
/**
 * Method to verify the 'Discount Type' section
 */
Cypress.Commands.add("verifyDiscountTypeSection", () => {
  cy.log(`Going to verifyDiscountTypeSection`);
  // Verify the 'Discount Type' header
  cy.verifyElementPresenceByLocatorAndIndex(
    'p[data-testid="heading"]',
    0
  ).should("have.text", "Discount Type");
  // Verify the 'Status' drop-down box ('Active')
  cy.getByDataTestId("discounts-form-change-status");
  // Verify the 'Discount Code' radio button and its label
  cy.verifyElementPresenceByLocatorAndIndex(
    'span[data-testid="ui-type-single"][data-checked]',
    0
  );
  cy.verifyElementPresenceByLocatorAndIndex(
    'span[class^="chakra-radio__label"][data-checked]',
    0
  );
  // Verify the 'Bulk Discount Codes' radio button and its label
  cy.verifyElementPresenceByLocatorAndIndex(
    'span[data-testid="ui-type-bulk"]',
    0
  );
  cy.verifyElementPresenceByLocatorAndText(
    'span[class^="chakra-radio__label"]',
    "Bulk Discount Codes"
  );
  // Verify 'Discount Code' header label
  cy.verifyElementPresenceByLocatorAndText(
    'p[class^="chakra-text"][data-testid="heading"]',
    "Discount Code"
  );
  // Verify the 'Customers will use this code at checkout' text
  cy.verifyElementPresenceByLocatorAndText(
    'p[class^="chakra-text"][data-testid="Text"]',
    "Customers will use this code at checkout"
  );
  // Verify the 'Discount Code' input field
  cy.verifyElementPresenceByLocatorAndIndex('input[data-testid="code"]', 0);
  // Verify the 'Discount Description' header text
  cy.verifyElementPresenceByLocatorAndText(
    'p[class^="chakra-text"][data-testid="heading"]',
    "Discount Description"
  );
  // Verify the 'This description will be shown when the discount is applied at checkout' text
  cy.verifyElementPresenceByLocatorAndText(
    'p[class^="chakra-text"][data-testid="Text"]',
    "This description will be shown when the discount is applied at checkout"
  );
  // Verify the 'Discount Description' input field
  cy.verifyElementPresenceByLocatorAndIndex(
    'input[data-testid="discount-code-description"]',
    0
  );
});
// **************************************************************************
/**
 * Method to verify the 'Discount Amount' section
 */
Cypress.Commands.add("verifyDiscountAmountSection", () => {
  cy.log(`Going to verifyDiscountAmountSection`);
  // Verify the 'Discount Amount' header
  cy.verifyElementPresenceByLocatorAndText(
    'p[data-testid="heading"]',
    "Discount Amount"
  );
  // Verify the 'Percentage' button
  cy.verifyElementPresenceByLocatorAndIndex(
    'div[value="percent"][data-testid="unit-percent"]',
    0
  );
  // Verify the 'Fixed Amount' button
  cy.verifyElementPresenceByLocatorAndIndex(
    'div[value="amount"][data-testid="unit-amount"]',
    0
  );
  // Verify the 'Discount Amount' field
  cy.verifyElementPresenceByLocatorAndIndex(
    'input[placeholder="Discount Amount"]',
    0
  );
  // Verify 'Amount off' label text
  cy.verifyElementPresenceByLocatorAndText(
    'p[class^="chakra-text"][data-testid="Text"]',
    "Amount off"
  );
  // Verify the 'Entire order' radio button and its text
  cy.verifyElementPresenceByLocatorAndIndex(
    'span[data-testid="apply-method-once"]',
    0
  );
  cy.verifyElementPresenceByLocatorAndText(
    'span[class^="chakra-radio__label"]',
    "Entire order"
  );
  // Verify the 'The discount amount will apply to the entire basket' text
  cy.verifyElementPresenceByLocatorAndText(
    'p[class^="chakra-text"]',
    "The discount amount will apply to the entire basket"
  );
  // Verify the 'Individual Items' radio button and its text
  cy.verifyElementPresenceByLocatorAndIndex(
    'span[data-testid="apply-method-to-each"]',
    0
  );
  cy.verifyElementPresenceByLocatorAndText(
    'span[class^="chakra-radio__label"]',
    "Individual items"
  );
  // Verify the 'The discount amount ($ off) will be subtracted from each item, not the basket total' text
  cy.verifyElementPresenceByLocatorAndText(
    'p[class^="chakra-text"]',
    "The discount amount ($ off) will be subtracted from each item, not the basket total"
  );
});
// **************************************************************************
/**
 * Method to verify the 'Amount off entire order' section
 */
Cypress.Commands.add("verifyAmountOffEntireOrderSection", () => {
  cy.log(`Going to verifyAmountOffEntireOrderSection`);
  // Verify the 'Amount off entire order' header text
  cy.verifyElementPresenceByLocatorAndIndex(
    'p[data-testid="permissions-title"]',
    0
  );
  // Verify the 'On' label text
  cy.verifyElementPresenceByLocatorAndText(
    'p[class^="chakra-text"][data-testid="Text"]',
    "On"
  );
  // Verify the 'All items of this type' radio button and its label
  cy.verifyElementPresenceByLocatorAndIndex(
    'span[data-testid="permission-type-disc-level-venue"]',
    0
  );
  cy.verifyElementPresenceByLocatorAndText(
    'span[class^="chakra-radio__label"]',
    "All items of this type"
  );
  // Verify the 'Certain items of this type' radio button and its label
  cy.verifyElementPresenceByLocatorAndIndex(
    'span[data-testid="permission-type-disc-level-ticket-type"]',
    0
  );
  cy.verifyElementPresenceByLocatorAndText(
    'span[class^="chakra-radio__label"]',
    "Certain items of this type"
  );
  // Verify the 'Everything except certain items of this type' radio button and its label
  cy.verifyElementPresenceByLocatorAndIndex(
    'span[data-testid="permission-type-disc-level-excluded-ticket-type"]',
    0
  );
  cy.verifyElementPresenceByLocatorAndText(
    'span[class^="chakra-radio__label"]',
    "Everything except certain items of this type"
  );
  // Verify the 'Item Type' label text
  cy.verifyElementPresenceByLocatorAndText(
    'p[class^="chakra-text"][data-testid="Text"]',
    "Item Type"
  );
  // Verify the 'Events' button
  cy.verifyElementPresenceByLocatorAndText('div[name="itemType"]', "Events");
  // Verify the 'Memberships' button
  cy.verifyElementPresenceByLocatorAndText(
    'div[name="itemType"]',
    "Memberships"
  );
  // Verify the 'Products' button
  cy.verifyElementPresenceByLocatorAndText('div[name="itemType"]', "Products");
  // Verify the 'Select an event' input field
  cy.verifyElementPresenceByLocatorAndIndex(
    'div[class^="chakra-input__group"][aria-owns="discount-event-menu"]',
    0
  );
});
// **************************************************************************
/**
 * Method to verify the 'Limits' section
 */
Cypress.Commands.add("verifyLimitsSection", () => {
  cy.log(`Going to verifyLimitsSection`);
  // Going to verify the headers
  let headers = [
    "Usage limit per customer",
    "Item limit per customer",
    "Overall usage limit",
  ];
  for (let i = 0; i < headers.length; i++) {
    cy.verifyElementPresenceByLocatorAndText(
      'p[class^="chakra-text"][data-testid="heading"]',
      headers.at(i)
    );
  }
  // Going to verify short description
  let itemText = [
    "Specifies the maximum number of times a single customer can utilize the discount",
    "Specifies the maximum number of times a customer can apply this discount to a specific item",
    "Specifies the maximum number of times the discount can be used",
  ];
  for (let i = 0; i < itemText.length; i++) {
    cy.verifyElementPresenceByLocatorAndText(
      'p[class^="chakra-text"][data-testid="Text"]',
      itemText.at(i)
    );
  }
  // Verify 3 limit input fields
  cy.verifyElementPresenceByLocatorAndIndex('input[name="perUserLimit"]', 0);
  cy.verifyElementPresenceByLocatorAndIndex('input[name="perEventLimit"]', 0);
  cy.verifyElementPresenceByLocatorAndIndex('input[name="limit"]', 0);
});
// **************************************************************************
/**
 * Method to verify the 'Active dates' section
 */
Cypress.Commands.add("verifyActiveDatesSection", () => {
  cy.log(`Going to verifyActiveDatesSection`);
  // Verify header
  cy.verifyElementPresenceByLocatorAndText(
    'p[class^="chakra-text"][data-testid="heading"]',
    "Active dates"
  );
  // Verify Date and Time pickers
  cy.verifyElementPresenceByLocatorAndIndex(
    'input[name="single_date_picker"]',
    0
  );
  cy.verifyElementPresenceByLocatorAndIndex(
    'input[data-testid="starts-on-time"]',
    0
  );
  // Verify the 'Set end date' checkbox
  cy.verifyElementPresenceByLocatorAndText(
    'span[class^="chakra-checkbox__label"]',
    "Set end date"
  );
  cy.verifyElementPresenceByLocatorAndIndex(
    'label[data-testid="set-end-date"] > span[class^="chakra-checkbox__control"]',
    0
  );
});
// **************************************************************************
/**
 * Method to verify the 'Accepted Locations section
 */
Cypress.Commands.add("verifyAcceptedLocationsSection", () => {
  cy.log(`Going to verifyAcceptedLocationsSection`);
  // Verify header
  cy.verifyElementPresenceByLocatorAndText(
    'p[class^="chakra-text"][data-testid="heading"]',
    "Accepted Locations"
  );
  // Verify the 'Box office' checkbox
  cy.verifyElementPresenceByLocatorAndText(
    'span[class^="chakra-checkbox__label"]',
    "Box office"
  );
  cy.verifyElementPresenceByLocatorAndIndex(
    'label[data-testid="allowed-box-office"] > span[class^="chakra-checkbox__control"]',
    0
  );
  // Verify the 'Online public checkout' checkbox
  cy.verifyElementPresenceByLocatorAndText(
    'span[class^="chakra-checkbox__label"]',
    "Online public checkout"
  );
  cy.verifyElementPresenceByLocatorAndIndex(
    'label[data-testid="allowed-public"] > span[class^="chakra-checkbox__control"]',
    0
  );
});
// **************************************************************************
/**
 * Method to verify the 'Cancel' and 'Save' buttons
 */
Cypress.Commands.add("verifyDiscountsFormCancelAndSaveButtons", () => {
  cy.log(`Going to verifyDiscountsFormCancelAndSaveButtons`);
  // Verify the 'Cancel' button
  cy.verifyElementPresenceByLocatorAndIndex(
    'button[data-testid="discounts-form-cancel-button"]',
    0
  );
  // Verify the 'Save' button
  cy.verifyElementPresenceByLocatorAndIndex(
    'button[data-testid="discounts-form-submit-button"]',
    0
  );
});
// **************************************************************************
