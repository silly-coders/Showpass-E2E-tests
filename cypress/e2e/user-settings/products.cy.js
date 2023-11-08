describe("Verify 'Products' page by ", () => {
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
    "checking the 'Product' page details for consistency and correctness-TA-72",
    { tags: ["e2e", "appearance"] },
    function () {
      const apiRequest = "**/account/products*";
      cy.intercept(apiRequest).as("pageLoaded");
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.clickUsernameOnTopBar();
      // Navigate to the 'Products' page
      cy.getDropDownItem("Products").click({ force: true });
      cy.url().should("include", "/account/products");
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
      // Page headers and sub-headers
      cy.getH1HeaderByText("Products");
      // Verify a list of products (product cards)
      let listOfProducts = [
        "Air Conditioning",
        "Cabin Utility Pricing",
        "Car Permit",
        "Mission Raceway Fan Tee",
        "Washer/Dryer Fee",
      ];
      for (let i = 0; i < listOfProducts.length; i++) {
        cy.log(
          `Going to verify the following product header: ${listOfProducts.at(
            i
          )}`
        );
        cy.get('div[id="upcoming-event-info-container"] > div > p:nth-child(1)')
          .eq(i)
          .should("exist")
          .should("be.visible")
          .should("have.text", listOfProducts.at(i));
        // Verify a bag icon with a number 1 next to it
        cy.get('img[data-testid="account-purchase-list-item-image"]')
          .eq(i)
          .should("exist")
          .should("be.visible");
        // Going to verify product thubmnails
        cy.get('div[id="upcoming-event-info-container"] > div > p:nth-child(2)')
          .eq(i)
          .should("exist")
          .should("be.visible");
      }
    }
  );
  // ***************************************************************************
  it(
    "checking each product item details-TA-73",
    { tags: ["e2e", "appearance"] },
    function () {
      const apiRequest = "**/account/products*";
      cy.intercept(apiRequest).as("pageLoaded");
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.clickUsernameOnTopBar();
      // Navigate to the 'Products' page
      cy.getDropDownItem("Products").click({ force: true });
      cy.url().should("include", "/account/products");
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
      // Page headers and sub-headers
      cy.getH1HeaderByText("Products");
      let productItems = [
        this.testdata.productItems.airCondit,
        this.testdata.productItems.cabinUtil,
        this.testdata.productItems.carPermit,
        this.testdata.productItems.fanTee,
        this.testdata.productItems.washerFee,
      ];
      for (let i = 0; i < productItems.length; i++) {
        cy.verifyProductItemsDetails(productItems.at(i));
      }
    }
  );
  // ***************************************************************************
});
