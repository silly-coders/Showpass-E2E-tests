describe("Verify that", () => {
  beforeEach(function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
    });
  });

  // ***************************************************************************
  it.skip(
    "a single event discount code can be created based on the price percentage and applied to all order items-TA-115",
    { tags: ["e2e", "discounts", "appearance"] },
    function () {
      let uniqueDiscountName =
        Math.floor(Date.now() / 1000) + "-automation-discount";
      let discountDetails = {
        discountCode: uniqueDiscountName,
        discountDescription: `Discount description for ${uniqueDiscountName}.`,
        discountAmountPercentage: "10.00%",
        usageLimitPerCustomer: 100,
        itemLimitPerCustomer: 30,
        overallUsageLimit: 1000,
        type: "Regular",
        itemType: "events",
        amountOffItemsOn: "allItemsOfThisType",
      };
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.regularUserForOrganization5).wait(700);
      cy.visit("/manage/events/discounts/").wait(700);
      // Verify Discounts header
      cy.get('div[class="page-content"] > p[class^="chakra-text"]')
        .should("exist")
        .should("have.text", "Discounts").wait(700);
      // Click 'Create discount'
      cy.verifyElementPresenceByLocatorAndText(
        'button[data-testid="create-discount-link"]',
        "Create discount"
      ).click({ force: true });
      // Populate the Discount form sections
      cy.populateDiscountTypeDiscountCodeSection(discountDetails);
      cy.populateDiscountAmountPercentageEntireOrderSection(discountDetails);
      cy.populateAmountOffEntireOrderSection(discountDetails);
      cy.populateLimitsSection(discountDetails);
      cy.checkAcceptedLocationsCheckboxes();
      // Click Save to submit the form
      cy.clickSaveDiscountForm();
      // Verify 'Success' message
      cy.verifyTopRightSuccessMessage("Success");
      cy.clickButtonXtoCloseMessage();
      // ***** VERIFICATION BEGINS HERE *****
      // Verify discount details in grid
      cy.verifyDiscountDetailsInGridColumns(discountDetails);
      // Open just created Discount code
      cy.openDiscountCodeEntryByRowIndex("0");
      // Verify the discount details
      cy.verifyDiscountTypeSectionOfExistingForm(discountDetails);
      // Verify the 'Discount Amount' section details
      let discountAmountDetails = {
        percentageButton: "selected",
        percentage: "10.00",
        entireOrderRadioButton: "selected",
      };
      cy.verifyDiscountAmountSectionOfExistingForm(discountAmountDetails);
      // Verify the 'Amount off entire order'
      let amountOffEntireOrderDetails = {
        allItemsOfThisTypeRadioButton: "selected",
        eventsItemTypeButton: "selected",
        membershipsItemTypeButton: "exists",
        productsItemTypeButton: "exists",
      };
      cy.verifyAmountOffEntireOrderSectionOfExistingForm(
        amountOffEntireOrderDetails
      );
      // Verify the 'Limits' section details
      let limitsSectionDetails = {
        usageLimitPerCustomerValue: "100",
        itemLimitPerCustomerValue: "30",
        overallUsageLimitValue: "1000",
      };
      cy.verifyLimitsSectionOfExistingForm(limitsSectionDetails);
      // Verify the 'Active dates' section
      let activeDatesDetails = {
        setEndDate: "exists",
      };
      cy.verifyActiveDatesSectionOfExistingForm(activeDatesDetails);
      // Verify the 'Accepted Locations' section
      let acceptedLocationsDetails = {
        boxOfficeCheckbox: "selected",
        onlinePublicCheckoutCheckbox: "selected",
      };
      cy.verifyActiveDatesSectionOfExistingForm(acceptedLocationsDetails);
    }
  );
  // ***************************************************************************
  it.skip(
    "a single event discount code can be created as an amount and applied to all order items-TA-112",
    { tags: ["e2e", "discounts", "appearance"] },
    function () {
      let uniqueDiscountName =
        Math.floor(Date.now() / 1000) + "-automation-discount";
      let discountDetails = {
        discountCode: uniqueDiscountName,
        discountDescription: `Discount description for ${uniqueDiscountName}.`,
        discountAmountPercentage: "$1.50",
        usageLimitPerCustomer: 25,
        itemLimitPerCustomer: 3,
        overallUsageLimit: 7,
        type: "Regular",
        amountOff: "entireOrder",
        itemType: "events",
        amountOffItemsOn: "allItemsOfThisType",
      };
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.regularUserForOrganization5).wait(700);
      cy.visit("/manage/events/discounts/").wait(700);
      // Verify Discounts header
      cy.get('div[class="page-content"] > p[class^="chakra-text"]')
        .should("exist")
        .should("have.text", "Discounts").wait(700);
      // Click 'Create discount'
      cy.verifyElementPresenceByLocatorAndText(
        'button[data-testid="create-discount-link"]',
        "Create discount"
      ).click({ force: true });
      // Populate 'Discount Code' and 'Discount Description'
      cy.populateDiscountTypeDiscountCodeSection(discountDetails);
      // Populate 'Discount Amount'
      cy.populateFixedAmountOnDiscountAmountSection(discountDetails);
      // Populate event 'Amount off entire order'
      cy.populateAmountOffEntireOrderSection(discountDetails);
      // Populate 'Limits'
      cy.populateLimitsSection(discountDetails);
      // Populate 'Accepted Locations'
      cy.checkAcceptedLocationsCheckboxes();
      // Click Save to submit the form
      cy.clickSaveDiscountForm();
      // Verify 'Success' message
      cy.verifyTopRightSuccessMessage("Success");
      cy.clickButtonXtoCloseMessage();
      // ***** VERIFICATION BEGINS HERE *****
      // Verify discount details in grid
      cy.verifyDiscountDetailsInGridColumns(discountDetails);
      // Open just created Discount code
      cy.openDiscountCodeEntryByRowIndex("0");
      // Verify the discount details
      cy.verifyDiscountTypeSectionOfExistingForm(discountDetails);
      // Verify the 'Discount Amount' section details
      let discountAmountDetails = {
        fixedAmountButton: "selected",
        percentageButton: "exists",
        amount: "1.50",
        entireOrderRadioButton: "selected",
        individualItemsRadioButton: "exists",
      };
      cy.verifyDiscountAmountSectionOfExistingForm(discountAmountDetails);
      // Verify the 'Amount off entire order'
      let amountOffEntireOrderDetails = {
        allItemsOfThisTypeRadioButton: "selected",
        eventsItemTypeButton: "selected",
        membershipsItemTypeButton: "exists",
        productsItemTypeButton: "exists",
      };
      cy.verifyAmountOffEntireOrderSectionOfExistingForm(
        amountOffEntireOrderDetails
      );
      // Verify the 'Limits' section details
      let limitsSectionDetails = {
        usageLimitPerCustomerValue: "25",
        itemLimitPerCustomerValue: "3",
        overallUsageLimitValue: "7",
      };
      cy.verifyLimitsSectionOfExistingForm(limitsSectionDetails);
      // Verify the 'Active dates' section
      let activeDatesDetails = {
        setEndDate: "exists",
      };
      cy.verifyActiveDatesSectionOfExistingForm(activeDatesDetails);
      // Verify the 'Accepted Locations' section
      let acceptedLocationsDetails = {
        boxOfficeCheckbox: "selected",
        onlinePublicCheckoutCheckbox: "selected",
      };
      cy.verifyActiveDatesSectionOfExistingForm(acceptedLocationsDetails);
    }
  );
  // ***************************************************************************
  it.skip(
    "a 'Single Discount Code' can be created as an 'Amount' and applied to 'Individual Items'-TA-127",
    { tags: ["e2e", "discounts", "appearance"] },
    function () {
      let uniqueDiscountName =
        Math.floor(Date.now() / 1000) + "-automation-discount";
      let discountDetails = {
        discountCode: uniqueDiscountName,
        discountDescription: `Discount description for ${uniqueDiscountName}.`,
        discountAmountPercentage: "$5.25",
        usageLimitPerCustomer: 0,
        itemLimitPerCustomer: 0,
        overallUsageLimit: 0,
        type: "Regular",
        amountOff: "individualItems",
        itemType: "events",
        amountOffItemsOn: "allItemsOfThisType",
      };
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.regularUserForOrganization5).wait(700);
      cy.visit("/manage/events/discounts/").wait(700);
      // Verify Discounts header
      cy.get('div[class="page-content"] > p[class^="chakra-text"]')
        .should("exist")
        .should("have.text", "Discounts").wait(700);
      // Click 'Create discount'
      cy.verifyElementPresenceByLocatorAndText(
        'button[data-testid="create-discount-link"]',
        "Create discount"
      ).click({ force: true });
      // Populate 'Discount Code' and 'Discount Description'
      cy.populateDiscountTypeDiscountCodeSection(discountDetails);
      // Populate 'Discount Amount'
      cy.populateFixedAmountOnDiscountAmountSection(discountDetails);
      // Populate event 'Amount off entire order'
      cy.populateAmountOffEntireOrderSection(discountDetails);
      // Populate 'Limits'
      cy.populateLimitsSection(discountDetails);
      // Populate 'Accepted Locations'
      cy.checkAcceptedLocationsCheckboxes();
      // Click Save to submit the form
      cy.clickSaveDiscountForm();
      // Verify 'Success' message
      cy.verifyTopRightSuccessMessage("Success");
      cy.clickButtonXtoCloseMessage();
      // ***** VERIFICATION BEGINS HERE *****
      // Verify discount details in grid
      cy.verifyDiscountDetailsInGridColumns(discountDetails);
      // Open just created Discount code
      cy.openDiscountCodeEntryByRowIndex("0");
      // Verify the discount details
      cy.verifyDiscountTypeSectionOfExistingForm(discountDetails);
      // Verify the 'Discount Amount' section details
      let discountAmountDetails = {
        fixedAmountButton: "selected",
        percentageButton: "exists",
        amount: "5.25",
        entireOrderRadioButton: "exists",
        individualItemsRadioButton: "selected",
      };
      cy.verifyDiscountAmountSectionOfExistingForm(discountAmountDetails);
      // Verify the 'Amount off entire order'
      let amountOffEntireOrderDetails = {
        allItemsOfThisTypeRadioButton: "selected",
        eventsItemTypeButton: "selected",
        membershipsItemTypeButton: "exists",
        productsItemTypeButton: "exists",
      };
      cy.verifyAmountOffEntireOrderSectionOfExistingForm(
        amountOffEntireOrderDetails
      );
      // Verify the 'Limits' section details
      let limitsSectionDetails = {
        usageLimitPerCustomerValue: "0",
        itemLimitPerCustomerValue: "0",
        overallUsageLimitValue: "0",
      };
      cy.verifyLimitsSectionOfExistingForm(limitsSectionDetails);
      // Verify the 'Active dates' section
      let activeDatesDetails = {
        setEndDate: "exists",
      };
      cy.verifyActiveDatesSectionOfExistingForm(activeDatesDetails);
      // Verify the 'Accepted Locations' section
      let acceptedLocationsDetails = {
        boxOfficeCheckbox: "selected",
        onlinePublicCheckoutCheckbox: "selected",
      };
      cy.verifyActiveDatesSectionOfExistingForm(acceptedLocationsDetails);
    }
  );
  // ***************************************************************************
  it.skip(
    "a 'Single Discount Code' for 'Individual Items' can be applied as an 'Amount' to 'Certain items of this type'-TA-130",
    { tags: ["e2e", "discounts", "appearance"] },
    function () {
      let uniqueDiscountName =
        Math.floor(Date.now() / 1000) + "-automation-discount";
      let discountDetails = {
        discountCode: uniqueDiscountName,
        discountDescription: `Discount description for ${uniqueDiscountName}.`,
        discountAmountPercentage: "$3.20",
        usageLimitPerCustomer: 10,
        itemLimitPerCustomer: 15,
        overallUsageLimit: 20,
        type: "Regular",
        amountOff: "individualItems",
        itemType: "events",
        amountOffItemsOn: "certainItemsOfThisType",
      };
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.regularUserForOrganization5).wait(700);
      cy.visit("/manage/events/discounts/").wait(700);
      // Verify Discounts header
      cy.get('div[class="page-content"] > p[class^="chakra-text"]')
        .should("exist")
        .should("have.text", "Discounts").wait(700);
      // Click 'Create discount'
      cy.verifyElementPresenceByLocatorAndText(
        'button[data-testid="create-discount-link"]',
        "Create discount"
      ).click({ force: true });
      // Populate 'Discount Code' and 'Discount Description'
      cy.populateDiscountTypeDiscountCodeSection(discountDetails);
      // Populate 'Discount Amount'
      cy.populateFixedAmountOnDiscountAmountSection(discountDetails);
       // Populate event 'Amount off entire order'
       cy.populateAmountOffEntireOrderSection(discountDetails);
       // Populate 'Accepted Locations'
      cy.checkAcceptedLocationsCheckboxes();
      // Click Save to submit the form
      cy.clickSaveDiscountForm();
      // Verify 'Success' message
      cy.verifyTopRightSuccessMessage("Success");
      cy.clickButtonXtoCloseMessage();
      // ***** VERIFICATION BEGINS HERE *****
    });
  // ***************************************************************************
});
