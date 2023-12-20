describe("Verify Discounts pages appearance by ", () => {
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
    "ensuring that 'Discount Codes' pages elements are present-TA-123-1",
    { tags: ["e2e", "discounts", "appearance"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.regularUserForOrganization5).wait(700);
      cy.visit("/manage/events/discounts/").wait(700);
      // Verify Discounts header
      cy.get('div[class="page-content"] > p[class^="chakra-text"]')
        .should("exist")
        .should("have.text", "Discounts");
      let discountsPageDataTestIds = {
        discountCodesTab: "tab-discount-codes",
        bulkDiscountsTab: "tab-bulk-discounts",
        createDiscountButton: "create-discount-link",
        searchByCodeOrDescriptionInputField: "search-by-code",
      };
      for (let i = 0; i < Object.keys(discountsPageDataTestIds).length; i++) {
        cy.log(
          "Element: " +
            Object.keys(discountsPageDataTestIds).at(i) +
            ", Locator: " +
            Object.values(discountsPageDataTestIds).at(i)
        );
        cy.getByDataTestId(Object.values(discountsPageDataTestIds).at(i))
          .scrollIntoView({ force: true })
          .should("be.visible");
      }
      // Verify the 'Search discount code' label
      cy.getChakraFormLabelByIndexAndText(0, "Search discount code");
      // Verify the 'Search events' label
      cy.getChakraFormLabelByIndexAndText(1, "Search events");
      // Verify the 'Search events' input field
      cy.getChakraInputGroupFieldByAttr(
        "aria-labelledby",
        "search-events-label"
      );
      // Verify discount table columns
      let columnNamesText = [
        "Code",
        "Type",
        "Description",
        "Discount Amount",
        "Total Limit",
        "Limit Per User",
        "Limit Per Item, Per User",
        "Status",
      ];
      for (let i = 0; i < columnNamesText.length; i++) {
        cy.log(
          "Going to verify the following column: " + columnNamesText.at(i)
        );
        cy.get('table[data-testid="discount-codes-table"] > thead > tr > th')
          .contains(columnNamesText.at(i))
          .should("exist")
          .scrollIntoView({ force: true })
          .should("be.visible");
      }
    }
  );
  // ***************************************************************************
  it.skip(
    "ensuring that 'Bulk Discounts' pages elements are present-TA-123-2",
    { tags: ["e2e", "discounts", "appearance"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.regularUserForOrganization5).wait(700);
      cy.visit("/manage/events/discounts/").wait(700);
      // Verify Discounts header
      cy.get('div[class="page-content"] > p[class^="chakra-text"]')
        .should("exist")
        .should("have.text", "Discounts");
      // Click the 'Bulk Discounts' tab
      cy.getByDataTestId("tab-bulk-discounts").click({ force: true });
      let discountsPageDataTestIds = {
        discountCodesTab: "tab-discount-codes",
        bulkDiscountsTab: "tab-bulk-discounts",
        createDiscountButton: "create-discount-link",
        searchByCodeOrDescriptionInputField: "search-by-code",
      };
      for (let i = 0; i < Object.keys(discountsPageDataTestIds).length; i++) {
        cy.log(
          "Element: " +
            Object.keys(discountsPageDataTestIds).at(i) +
            ", Locator: " +
            Object.values(discountsPageDataTestIds).at(i)
        );
        cy.getByDataTestId(Object.values(discountsPageDataTestIds).at(i))
          .scrollIntoView({ force: true })
          .should("be.visible");
      }
      // Verify the 'Search discount code' label
      cy.getChakraFormLabelByIndexAndText(0, "Search discount code");
      // Verify the 'Search events' label
      cy.getChakraFormLabelByIndexAndText(1, "Search events");
      // Verify the 'Search events' input field
      cy.getChakraInputGroupFieldByAttr(
        "aria-labelledby",
        "search-events-label"
      );
    }
  );
  // ***************************************************************************
  it.skip(
    "ensuring that the 'Create discount' page content is correct-TA-124",
    { tags: ["e2e", "discounts", "appearance"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.regularUserForOrganization5).wait(700);
      cy.visit("/manage/events/discounts/").wait(700);
      // Verify Discounts header
      cy.get('div[class="page-content"] > p[class^="chakra-text"]')
        .should("exist")
        .should("have.text", "Discounts");
      // Click the 'Create discount' page
      cy.getByDataTestId("create-discount-link")
        .scrollIntoView({ force: true })
        .click({ force: true });
      // Wait for the 'Discounts' (go-back) button/link
      cy.get('a[class^="chakra-link"] > div')
        .contains("Discounts")
        .should("exist", { timeout: 7000 })
        .scrollIntoView({ force: true })
        .should("be.visible");
      // Verify the 'Discount Type' section
      cy.verifyDiscountTypeSection();
      // Verify the 'Discount Amount' sections
      cy.verifyDiscountAmountSection();
      // Verify the 'Amount off entire order' section
      cy.verifyAmountOffEntireOrderSection();
      // Verify the 'Limits' section
      cy.verifyLimitsSection();
      // Verify the 'Active dates' section
      cy.verifyActiveDatesSection();
      // Verify the 'Accepted Locations' section
      cy.verifyAcceptedLocationsSection();
      // Verify the 'Cancel' and 'Save' buttons
      cy.verifyDiscountsFormCancelAndSaveButtons();
    }
  );
  // ***************************************************************************
  it.skip(
    "ensuring correct inline validation errors show up-TA-129",
    { tags: ["e2e", "discounts", "appearance"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.regularUserForOrganization5).wait(700);
      cy.visit("/manage/events/discounts/").wait(700);
      // Verify Discounts header
      cy.get('div[class="page-content"] > p[class^="chakra-text"]')
        .should("exist")
        .should("have.text", "Discounts");
      // Click the 'Create discount' page
      cy.getByDataTestId("create-discount-link")
        .scrollIntoView({ force: true })
        .click({ force: true });
      // Wait for the 'Discounts' (go-back) button/link
      cy.get('a[class^="chakra-link"] > div')
        .contains("Discounts")
        .should("exist", { timeout: 7000 })
        .scrollIntoView({ force: true })
        .should("be.visible");
      // Click 'Save' to submit the form
      cy.clickSaveDiscountForm();
      // Verify error messages
      let errorMessages = {
        discountCodeErrror: "Discount code is required",
        discountDescriptionError: "Discount description is required",
        discountAmountError: "Discount amount is required",
        acceptedLocationsError: "Accepted locations is required",
      };
      for (let i = 0; i < Object.keys(errorMessages).length; i++) {
        cy.log(
          "Verifying the following errorKey: " +
            Object.keys(errorMessages).at(i) +
            ", errorValue: " +
            Object.values(errorMessages).at(i)
        );
        cy.verifyElementPresenceByLocatorAndIndex(
          'div[id*="-feedback"][class^="chakra-form__error-message"]',
          i
        ).should("have.text", Object.values(errorMessages).at(i));
      }
    }
  );
  // ***************************************************************************
});
