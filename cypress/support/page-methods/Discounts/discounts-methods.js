// **************************************************************************
/**
 * Method to populate the Discount Type - 'Discount Code' section
 * @param discountDetails
 */
Cypress.Commands.add(
  "populateDiscountTypeDiscountCodeSection",
  (discountDetails) => {
    if (!discountDetails)
      throw new Error("Discount details weren't provided! Need them.");
    cy.log(
      "***** Going to populateDiscountTypeDiscountCodeSection(discountDetails) *****"
    );
    // Verify the Discounts page header
    cy.verifyElementPresenceByLocatorAndText(
      'span[class^="chakra-text"]',
      "Discounts"
    );
    // Click 'Discount Code' radio button
    cy.verifyElementPresenceByLocatorAndIndex(
      'span[data-testid="ui-type-single"]',
      0
    ).click({ force: true });
    // Populate Discount Code
    cy.verifyElementPresenceByLocatorAndIndex(
      'input[data-testid="code"][class^="chakra-input"]',
      0
    ).type(discountDetails.discountCode);
    // Populate Discount Description
    cy.verifyElementPresenceByLocatorAndIndex(
      'input[data-testid="discount-code-description"][class^="chakra-input"]',
      0
    ).type(discountDetails.discountDescription);
  }
);
// **************************************************************************
/**
 * Method to populate the Discount Amount - 'Percentage (Entire Order)' section
 * @param discountDetails
 */
Cypress.Commands.add(
  "populateDiscountAmountPercentageEntireOrderSection",
  (discountDetails) => {
    if (!discountDetails)
      throw new Error("Discount details weren't provided! Need them.");
    cy.log(
      "***** Going to populateDiscountAmountPercentageEntireOrderSection(discountDetails) *****"
    );
    // Verify the Discounts page header
    cy.verifyElementPresenceByLocatorAndText(
      'span[class^="chakra-text"]',
      "Discounts"
    );
    // Click the 'Percentage' button
    cy.verifyElementPresenceByLocatorAndIndex(
      'div[data-testid="unit-percent"]',
      0
    ).click({ force: true });
    // Type a Discount Amount
    cy.verifyElementPresenceByLocatorAndIndex(
      'input[data-testid="percentage"][inputmode="numeric"]',
      0
    ).type(discountDetails.discountAmountPercentage);
    // Ensure the 'Entire Order' radio button is selected
    cy.verifyElementPresenceByLocatorAndIndex(
      'span[data-testid="apply-method-once"][data-checked]',
      0
    );
  }
);
// **************************************************************************
/**
 * Method to populate the Amount off entire order - for an event 'On All items of this type' section
 */
Cypress.Commands.add(
  "populateEventAmountOffEntireOrderForAllItemsSection",
  () => {
    cy.log(
      "***** Going to populateEventAmountOffEntireOrderForAllItemsSection() *****"
    );
    // Verify the Discounts page header
    cy.verifyElementPresenceByLocatorAndText(
      'span[class^="chakra-text"]',
      "Discounts"
    );
    // Click the 'All items of this type' radio button
    cy.verifyElementPresenceByLocatorAndIndex(
      'span[data-testid="permission-type-disc-level-venue"]',
      0
    ).click({ force: true });
    // Click the 'Events' item type button
    cy.verifyElementPresenceByLocatorAndText(
      'div[data-testid="item-type-ticket"]',
      "Events"
    ).click({ force: true });
  }
);
// **************************************************************************
/**
 * Method to populate the Amount off entire order - for an event 'On All items of this type' section
 * @param discountDetails
 */
Cypress.Commands.add("populateLimitsSection", (discountDetails) => {
  if (!discountDetails)
    throw new Error("Discount details weren't provided! Need them.");
  cy.log("***** Going to populateLimitsSection(discountDetails) *****");
  // Verify the Discounts page header
  cy.verifyElementPresenceByLocatorAndText(
    'span[class^="chakra-text"]',
    "Discounts"
  );
  // Populate the 'Usage limit per customer' field
  cy.verifyElementPresenceByLocatorAndIndex(
    'input[data-testid="per-user-limit"]',
    0
  ).type(discountDetails.usageLimitPerCustomer);
  // Populate the 'Item limit per customer' field
  cy.verifyElementPresenceByLocatorAndIndex(
    'input[data-testid="per-event-limit"]',
    0
  ).type(discountDetails.itemLimitPerCustomer);
  // Populate the 'Overall usage limit' field
  cy.verifyElementPresenceByLocatorAndIndex(
    'input[data-testid="limit"]',
    0
  ).type(discountDetails.overallUsageLimit);
});
// **************************************************************************
/**
 * Method to select the Accepted Locations check-boxes ('Box office' | 'Online public checkout')
 */
Cypress.Commands.add("checkAcceptedLocationsCheckboxes", () => {
  cy.log("***** Going to checkAcceptedLocationsCheckboxes() *****");
  // Verify the Discounts page header
  cy.verifyElementPresenceByLocatorAndText(
    'span[class^="chakra-text"]',
    "Discounts"
  );
  // Check the 'Box office' checkbox
  cy.verifyElementPresenceByLocatorAndIndex(
    'label[data-testid="allowed-box-office"] > span[class^="chakra-checkbox__control"]',
    0
  ).click({ force: true });
  // Check the 'Online public checkout' checkbox
  cy.verifyElementPresenceByLocatorAndIndex(
    'label[data-testid="allowed-public"] > span[class^="chakra-checkbox__control"]',
    0
  ).click({ force: true });
});
// **************************************************************************
/**
 * Method to verify discount details in the grid columns
 * @param discountDetails
 */
Cypress.Commands.add(
  "verifyDiscountDetailsInGridColumns",
  (discountDetails) => {
    cy.log(
      "***** Going to verifyDiscountDetailsInGridColumns(discountDetails) *****"
    );
    if (!discountDetails)
      throw new Error("Discount details weren't provided! Need them.");
    // Make sure the new record appears in the table (in grid)
    let discountDetailsInGrid = {
      code: discountDetails.discountCode.toUpperCase(),
      type: discountDetails.type,
      description: discountDetails.discountDescription,
      discountAmount: `${discountDetails.discountAmountPercentage}.00%`,
      totalLimit: discountDetails.overallUsageLimit,
      limitPerUser: discountDetails.usageLimitPerCustomer,
      limitPerItem: discountDetails.itemLimitPerCustomer,
      status: "Active",
    };
    for (let i = 0; i < Object.keys(discountDetailsInGrid).length; i++) {
      cy.log(
        "Key: " +
          Object.keys(discountDetailsInGrid).at(i) +
          ", Value: " +
          Object.values(discountDetailsInGrid).at(i)
      );
      cy.get('tr[role="row"] > td[role="gridcell"]')
        .eq(i)
        .should("exist", { timeout: 7000 })
        .should("contain.text", Object.values(discountDetailsInGrid).at(i));
      //
    }
  }
);
// **************************************************************************
/**
 * Method to open and view a discount code entry by row index
 * @param rowIndex
 */
Cypress.Commands.add("openDiscountCodeEntryByRowIndex", (rowIndex) => {
  cy.log("***** Going to openDiscountCodeEntryByRowIndex(rowIndex) *****");
  if (!rowIndex) throw new Error("Table row index wasn't provided! Need it.");
  // Click the '3-dots-button' on the right hand side of a row
  cy.get(
    `div[aria-label='Options'][data-testid="${rowIndex}-table-action-button"]`
  )
    .should("exist", { timeout: 5000 })
    .click({ force: true })
    .wait(700);
  // Click Edit to view the entry details
  cy.verifyElementPresenceByLocatorAndText(
    `button[data-testid='${rowIndex}-edit-action'] > div > p`,
    "Edit"
  )
    .click({ force: true })
    .wait(700);
  // Verify the Discounts page header
  cy.verifyElementPresenceByLocatorAndText(
    'span[class^="chakra-text"]',
    "Discounts"
  );
});
// **************************************************************************
/**
 * Method to verify the 'Discount Type' section of an existing form
 * @param discountDetails
 */
Cypress.Commands.add(
  "verifyDiscountTypeSectionOfExistingForm",
  (discountDetails) => {
    if (!discountDetails)
      throw new Error("Discount details weren't provided! Need them.");
    cy.log(
      "***** Going to verifyDiscountTypeSectionOfExistingForm(discountDetails) *****"
    );
    // Verify the Discounts page header
    cy.verifyElementPresenceByLocatorAndText(
      'span[class^="chakra-text"]',
      "Discounts"
    );
    // Verify Discount Code
    cy.get('input[data-testid="code"][name="code"]')
      .should("exist", { timeout: 5000 })
      .should("have.value", discountDetails.discountCode.toUpperCase());
    // Verify Discount Description
    cy.verifyElementPresenceByLocatorAndIndex(
      'input[data-testid="discount-code-description"][class^="chakra-input"]',
      0
    ).should("have.value", discountDetails.discountDescription);
  }
);
// **************************************************************************
/**
 * Method to verify the 'Discount Amount' section of an existing form
 * @param discountAmountDetails
 */
Cypress.Commands.add(
  "verifyDiscountAmountSectionOfExistingForm",
  (discountAmountDetails) => {
    if (!discountAmountDetails)
      throw new Error("Discount Amount details weren't provided! Need them.");
    cy.log(
      "***** Going to verifyDiscountAmountSectionOfExistingForm(discountAmountDetails) *****"
    );
    // Button can exist or exist and being selected
    if (discountAmountDetails.percentageButton) {
      cy.log('Now verifying the "Percentage" button.');
      // If the button is 'selected' check this
      cy.log(
        `Percentage button expected status: ${discountAmountDetails.percentageButton}`
      );
      if (discountAmountDetails.percentageButton == "selected") {
        cy.log("Percentage button should be selected");
        cy.verifyElementPresenceByLocatorAndIndex(
          'div[data-testid="unit-percent"][data-checked]',
          0
        );
      } else {
        // Percentage button exists but is NOT selected
        cy.log("Percentage button should not be selected");
        cy.get('div[data-testid="unit-percent"]').should(
          "not.have.attr",
          "data-checked"
        );
      }
    }
    // Button can exist or exist and being selected
    if (discountAmountDetails.fixedAmountButton) {
      cy.log('Now verifying the "Fixed Amount" button.');
      cy.log(
        `Fixed Amount button expected status: ${discountAmountDetails.fixedAmountButton}`
      );
      if (discountAmountDetails.fixedAmountButton == "selected") {
        cy.verifyElementPresenceByLocatorAndIndex(
          'div[data-testid="unit-amount"][data-checked]',
          0
        );
      } else {
        // Fixed Amount button exists but is NOT selected
        cy.log("Fixed amount button should not be selected");
        cy.get('div[data-testid="unit-amount"]').should(
          "not.have.attr",
          "data-checked"
        );
      }
    }
    if (discountAmountDetails.amount) {
      cy.log('Now verifying the "Amount" value.');
      cy.verifyElementPresenceByLocatorAndIndex(
        'input[data-testid="percentage"]',
        0
      ).should("have.value", `${discountAmountDetails.amount}.00`);
    }
    // Radio button can exist or exist and being selected
    if (discountAmountDetails.entireOrderRadioButton) {
      cy.log('Now verifying the "Entire Order" radio button.');
      cy.verifyElementPresenceByLocatorAndIndex(
        'span[data-testid="apply-method-once"][data-checked]',
        0
      );
    }
    // Radio button can exist or exist and being selected
    if (discountAmountDetails.individualItemsRadioButton) {
      cy.log('Now verifying the "Individual Items" radio button.');
      cy.verifyElementPresenceByLocatorAndIndex(
        'span[data-testid="apply-method-to-each"][data-checked]',
        0
      );
    }
  }
);
// **************************************************************************
/**
 * Method to verify the 'Amount off entire order' section of an existing form
 * @param amountOffEntireOrderDetails
 */
Cypress.Commands.add(
  "verifyAmountOffEntireOrderSectionOfExistingForm",
  (amountOffEntireOrderDetails) => {
    if (!amountOffEntireOrderDetails)
      throw new Error(
        "Amount Off Entire Order details weren't provided! Need them."
      );
    cy.log(
      "***** Going to verifyAmountOffEntireOrderSectionOfExistingForm(amountOffEntireOrderDetails) *****"
    );
    // Radio button can exist or exist and being selected
    if (amountOffEntireOrderDetails.allItemsOfThisTypeRadioButton) {
      cy.log('Now verifying the "All items of this type" radio button.');
      cy.log(
        `"All Items Of This Type" radio button expected status: ${amountOffEntireOrderDetails.allItemsOfThisTypeRadioButton}`
      );
      if (
        amountOffEntireOrderDetails.allItemsOfThisTypeRadioButton == "selected"
      ) {
        cy.log('"All Items Of This Type" radio button should be selected');
        cy.verifyElementPresenceByLocatorAndIndex(
          'div[data-testid="unit-percent"][data-checked]',
          0
        );
      }
      // If the button doesn't have the 'data-checked' attribute that means the button is not selected
      else {
        cy.log(
          '"All Items Of This Type" radio button should NOT be selected but should exist'
        );
        cy.get('div[data-testid="unit-percent"]')
          .should("exist")
          .should("not.have.attr", "data-checked");
      }
    }
    // Radio button can exist or exist and being selected
    if (amountOffEntireOrderDetails.certainItemsOfThisTypeRadioButton) {
      cy.log('Now verifying the "Certain items of this type" radio button.');
      cy.log(
        `"Certain Items Of This Type" radio button expected status: ${amountOffEntireOrderDetails.everythingExceptCertainItemsRadioButton}`
      );
      if (
        amountOffEntireOrderDetails.everythingExceptCertainItemsRadioButton ==
        "selected"
      ) {
        cy.log('"Certain items of this type" radio button should be selected');
        cy.get('span[data-testid="permission-type-disc-level-ticket-type"]')
          .should("exist")
          .should("have.attr", "data-checked");
      } else {
        cy.log(
          '"Certain items of this type" radio button should exist but should NOT be selected'
        );
        cy.get('span[data-testid="permission-type-disc-level-ticket-type"]')
          .should("exist")
          .should("not.have.attr", "data-checked");
      }
    }
    // Radio button can exist or exist and being selected
    if (amountOffEntireOrderDetails.everythingExceptCertainItemsRadioButton) {
      cy.log(
        'Now verifying the "Everything except certain items of this type" radio button.'
      );
      cy.log(
        `"Everything Except Certain Items Of This Type" radio button expected status: ${amountOffEntireOrderDetails.everythingExceptCertainItemsRadioButton}`
      );
      if (
        amountOffEntireOrderDetails.everythingExceptCertainItemsRadioButton ==
        "selected"
      ) {
        cy.log(
          '"Everything except certain items of this type" radio button should be selected'
        );
        cy.get(
          'span[data-testid="permission-type-disc-level-excluded-ticket-type"]'
        )
          .should("exist")
          .should("have.attr", "data-checked");
      } else {
        cy.log(
          '"Everything except certain items of this type" radio button should exist but should NOT be selected'
        );
        cy.get(
          'span[data-testid="permission-type-disc-level-excluded-ticket-type"]'
        )
          .should("exist")
          .should("not.have.attr", "data-checked");
      }
    }
    // Button can exist or exist and being selected
    if (amountOffEntireOrderDetails.eventsItemTypeButton) {
      cy.log('Now verifying the "Events - Item Type" button.');
      cy.log(
        `"Events" button expected status: ${amountOffEntireOrderDetails.eventsItemTypeButton}`
      );
      if (amountOffEntireOrderDetails.eventsItemTypeButton == "selected") {
        cy.log('"Events" button should be selected');
        cy.get('div[data-testid="item-type-ticket"]')
          .should("exist")
          .should("have.attr", "data-checked");
      } else {
        cy.log('"Events" button should exist but should NOT be selected');
        cy.get('div[data-testid="item-type-ticket"]')
          .should("exist")
          .should("not.have.attr", "data-checked");
      }
    }
    // Button can exist or exist and being selected
    if (amountOffEntireOrderDetails.membershipsItemTypeButton) {
      cy.log('Now verifying the "Memberships - Item Type" button.');
      cy.log(
        `"Memberships" button expected status: ${amountOffEntireOrderDetails.membershipsItemTypeButton}`
      );
      if (amountOffEntireOrderDetails.membershipsItemTypeButton == "selected") {
        cy.log('"Memberships" button should be selected');
        cy.get('div[data-testid="item-type-membership"]')
          .should("exist")
          .should("have.attr", "data-checked");
      } else {
        cy.log(
          '"Memberships" radio button should exist but should NOT be selected'
        );
        cy.get('div[data-testid="item-type-membership"]')
          .should("exist")
          .should("not.have.attr", "data-checked");
      }
    }
    // Button can exist or exist and being selected
    if (amountOffEntireOrderDetails.productsItemTypeButton) {
      cy.log('Now verifying the "Products - Item Type" button.');
      cy.log(
        `"Products" button expected status: ${amountOffEntireOrderDetails.productsItemTypeButton}`
      );
      if (amountOffEntireOrderDetails.productsItemTypeButton == "selected") {
        cy.log('"Products" button should be selected');
        cy.get('div[data-testid="item-type-product"]')
          .should("exist")
          .should("have.attr", "data-checked");
      } else {
        cy.log('"Products" button should exist but should NOT be selected');
        cy.get('div[data-testid="item-type-product"]')
          .should("exist")
          .should("not.have.attr", "data-checked");
      }
    }
    // Button can exist or exist and being selected
    if (amountOffEntireOrderDetails.singleButton) {
      cy.log('Now verifying the "Single" button.');
      cy.log(
        `Single button expected status: ${amountOffEntireOrderDetails.singleButton}`
      );
      if (amountOffEntireOrderDetails.singleButton == "selected") {
        cy.log('"Single" button should be selected');
        cy.get('span[data-testid=""]')
          .should("exist")
          .should("have.attr", "data-checked");
      } else {
        cy.log('"Single" button should exist but should NOT be selected');
        cy.get('span[data-testid=""]')
          .should("exist")
          .should("not.have.attr", "data-checked");
      }
    }
    // Button can exist or exist and being selected
    if (amountOffEntireOrderDetails.parentButton) {
      cy.log('Now verifying the "Parent" button.');
      cy.log(
        `"Parent" button expected status: ${amountOffEntireOrderDetails.parentButton}`
      );
      if (amountOffEntireOrderDetails.parentButton == "selected") {
        cy.log('"Parent" radio button should be selected');
        cy.get('div[value="parent"]')
          .contains("Parent")
          .should("exist")
          .should("have.attr", "data-checked");
      } else {
        cy.log('"Parent" radio button should exist but should NOT be selected');
        cy.get('div[value="parent"]')
          .contains("Parent")
          .should("exist")
          .should("not.have.attr", "data-checked");
      }
    }
    // Button can exist or exist and being selected
    if (amountOffEntireOrderDetails.templateButton) {
      cy.log('Now verifying the "Template" button.');
      cy.log(
        `"Template" button expected status: ${amountOffEntireOrderDetails.parentButton}`
      );
      if (amountOffEntireOrderDetails.templateButton == "selected") {
        cy.log('"Template" radio button should be selected');
        cy.get('div[value="template"]')
          .contains("Template")
          .should("exist")
          .should("have.attr", "data-checked");
      } else {
        cy.log(
          '"Template" radio button should exist but should NOT be selected'
        );
        cy.get('div[value="template"]')
          .contains("Template")
          .should("exist")
          .should("not.have.attr", "data-checked");
      }
    }
    // Verify the 'Search' input field
    if (amountOffEntireOrderDetails.searchInputField) {
      cy.log('Now verifying the "Search" input field.');
      cy.get('input[data-testid="search-combo-box-input"]');
    }
    // Verify the 'Search' input field placeholder
    if (amountOffEntireOrderDetails.searchInputFieldPlaceholder) {
      cy.log('Now verifying the "Search" input field placeholder.');
      cy.get('input[data-testid="search-combo-box-input"]')
        .should("exist")
        .should(
          "have.attr",
          "placeholder",
          amountOffEntireOrderDetails.searchInputFieldPlaceholder
        );
    }
  }
);
// **************************************************************************
/**
 * Method to verify the 'Limits' section of an existing form
 * @param limitsSectionDetails
 */
Cypress.Commands.add(
  "verifyLimitsSectionOfExistingForm",
  (limitsSectionDetails) => {
    if (!limitsSectionDetails)
      throw new Error("'Limits' section details weren't provided! Need them.");
    cy.log(
      "***** Going to verifyLimitsSectionOfExistingForm(limitsSectionDetails) *****"
    );
    // Verify the section header existence
    cy.verifyElementPresenceByLocatorAndText(
      'p[class^="chakra-text"][data-testid="heading"]',
      "Limits"
    );
    // Verify the Limits values
    //usageLimitPerCustomerValue
    // Verify the 'Usage limit per customer' input value
    if (limitsSectionDetails.usageLimitPerCustomerValue) {
      cy.log(
        `Verifying the following "Usage limit per customer" input value: ${limitsSectionDetails.usageLimitPerCustomerValue}`
      );
      cy.get('input[data-testid="per-user-limit"]')
        .should("exist")
        .should("have.value", limitsSectionDetails.usageLimitPerCustomerValue);
    }
    // Verify the 'Item limit per customer' input value
    if (limitsSectionDetails.itemLimitPerCustomerValue) {
      cy.log(
        `Verifying the following "Item limit per customer" input value: ${limitsSectionDetails.itemLimitPerCustomerValue}`
      );
      cy.get('input[data-testid="per-event-limit"]')
        .should("exist")
        .should("have.value", limitsSectionDetails.itemLimitPerCustomerValue);
    }
    // Verify the 'Overall usage limit' input value
    if (limitsSectionDetails.overallUsageLimitValue) {
      cy.log(
        `Verifying the following "Overall usage limit" input value: ${limitsSectionDetails.overallUsageLimitValue}`
      );
      cy.get('input[data-testid="limit"]')
        .should("exist")
        .should("have.value", limitsSectionDetails.overallUsageLimitValue);
    }
  }
);
// **************************************************************************
/**
 * Method to verify the 'Active dates' section of an existing form
 * @param activeDatesDetails
 */
Cypress.Commands.add(
  "verifyActiveDatesSectionOfExistingForm",
  (activeDatesDetails) => {
    if (!activeDatesDetails)
      throw new Error(
        "'Active dates' section details weren't provided! Need them."
      );
    cy.log(
      "***** Going to verifyActiveDatesSectionOfExistingForm(activeDatesDetails) *****"
    );
    if (activeDatesDetails.setEndDate) {
      cy.log('Verifying the "Set end date" checkbox');
      cy.log(
        `"Set end date" checkbox expected status is: ${activeDatesDetails.setEndDate}`
      );
      if (activeDatesDetails.setEndDate == "selected") {
        cy.log('"Set end date" checkbox should be selected');
        cy.get(
          'label[data-testid="set-end-date"] > input[class="chakra-checkbox__input"]'
        )
          .should("exist")
          .should("have.attr", "data-checked");
      } else {
        cy.log(
          '"Set end date" checkbox should exist but should NOT be selected'
        );
        cy.get(
          'label[data-testid="set-end-date"] > input[class="chakra-checkbox__input"]'
        )
          .should("exist")
          .should("not.have.attr", "data-checked");
      }
    }
  }
);
// **************************************************************************
/**
 * Method to verify the 'Accepted Locations' section of an existing form
 * @param acceptedLocationsDetails
 */
Cypress.Commands.add(
  "verifyActiveDatesSectionOfExistingForm",
  (acceptedLocationsDetails) => {
    if (!acceptedLocationsDetails)
      throw new Error(
        "'Accepted Locations' section details weren't provided! Need them."
      );
    cy.log(
      "***** Going to verifyActiveDatesSectionOfExistingForm(acceptedLocationsDetails) *****"
    );
    // 'Box office' checkbox verification
    if (acceptedLocationsDetails.boxOfficeCheckbox) {
      cy.log('Verifying the "Box office" checkbox');
      cy.log(
        `"Box office" checkbox expected status is: ${acceptedLocationsDetails.boxOfficeCheckbox}`
      );
      if (acceptedLocationsDetails.boxOfficeCheckbox == "selected") {
        cy.log('"Box office" checkbox should be selected');
        cy.get('label[data-testid="allowed-box-office"]')
          .should("exist")
          .should("have.attr", "data-checked");
      } else {
        cy.log('"Box Office" checkbox should exist but should NOT be selected');
        cy.get('label[data-testid="allowed-box-office"]')
          .should("exist")
          .should("not.have.attr", "data-checked");
      }
    }
    // 'Online public checkout' checkbox verification
    if (acceptedLocationsDetails.onlinePublicCheckoutCheckbox) {
      cy.log('Verifying the "Online public checkout" checkbox');
      cy.log(
        `"Online public checkout" checkbox expected status is: ${acceptedLocationsDetails.onlinePublicCheckoutCheckbox}`
      );
      if (acceptedLocationsDetails.onlinePublicCheckoutCheckbox == "selected") {
        cy.log('"Online public checkout" checkbox should be selected');
        cy.get('label[data-testid="allowed-public"]')
          .should("exist")
          .should("have.attr", "data-checked");
      } else {
        cy.log(
          '"Online public checkout" checkbox should exist but should NOT be selected'
        );
        cy.get('label[data-testid="allowed-public"]')
          .should("exist")
          .should("not.have.attr", "data-checked");
      }
    }
  }
);
// **************************************************************************
