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
  it(
    "a single event discount code can be created based on the price percentage and applied for all order items-TA-115",
    { tags: ["e2e", "discounts", "appearance"] },
    function () {
      let uniqueDiscountName =
        Math.floor(Date.now() / 1000) + "-automation-discount";
      let discountDetails = {
        discountCode: uniqueDiscountName,
        discountDescription: `Discount description for ${uniqueDiscountName}.`,
        discountAmountPercentage: 10,
        usageLimitPerCustomer: 100,
        itemLimitPerCustomer: 30,
        overallUsageLimit: 1000,
        type: "Regular",
      };
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.regularUserForOrganization5).wait(700);
      cy.visit("/manage/events/discounts/").wait(700);
      // Verify Discounts header
      cy.get('div[class="page-content"] > p[class^="chakra-text"]')
        .should("exist")
        .should("have.text", "Discounts");
      // Click 'Create discount'
      cy.verifyElementPresenceByLocatorAndText(
        'button[data-testid="create-discount-link"]',
        "Create discount"
      ).click({ force: true });
      // Populate the Discount form sections
      cy.populateDiscountTypeDiscountCodeSection(discountDetails);
      cy.populateDiscountAmountPercentageEntireOrderSection(discountDetails);
      cy.populateEventAmountOffEntireOrderForAllItemsSection();
      cy.populateLimitsSection(discountDetails);
      cy.checkAcceptedLocationsCheckboxes();
      // Click Save to submit the form
      cy.get('button[data-testid="discounts-form-submit-button"]')
        .should("exist")
        .should("not.be.disabled")
        .scrollIntoView({ force: true })
        .click({ force: true })
        .wait(900);
      // Verify 'Success' message
      cy.verifyTopRightSuccessMessage("Success");
      cy.clickButtonXtoCloseMessage();
      // Verify discount details in grid
      cy.verifyDiscountDetailsInGridColumns(discountDetails);
      // Open just created Discount code
      cy.openDiscountCodeEntryByRowIndex("0");
      // Verify the discount details
      cy.verifyDiscountTypeSectionOfExistingForm(discountDetails);
      // Verify the 'Discount Amount' section details
      let discountAmountDetails = {
        percentageButton: "selected",
        amount: 10,
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
});
