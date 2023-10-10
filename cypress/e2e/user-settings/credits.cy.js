describe("Verify 'Credits' page by ", () => {
  beforeEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      const apiRequest = "/api/user/financials/discounts/credits/";
      cy.intercept(apiRequest).as("pageLoaded");
      this.testdata = testdata;
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.clickUsernameOnTopBar();
      // Navigate to the 'Credits' page
      cy.getDropDownItem("Credits").click({ force: true });
      cy.url().should("include", "/account/credits/");
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
    });
  });
  // ***************************************************************************
  it(
    "checking the page overall appearance-TA-54",
    { tags: ["e2e", "appearance"] },
    function () {
      // Page headers and sub-headers
      cy.getH1HeaderByText("Credits");
      // 'Universal Credits' section
      cy.getChakraHeaderH2("Universal Credits");
      cy.getChakraTextLabelByText("Showpass Universal Credits");
      cy.getChakraTextLabelByText("Available Credit");
      cy.getChakraTextLabelByText("$0.00");
      cy.getChakraButtonByText("View Available Events")
        .should("exist")
        .should("be.visible")
        .should("have.css", "background-color", "rgba(0, 0, 0, 0)");
      // 'Organizer Credits' section
      cy.getChakraHeaderH2("Organizer Credits");
      cy.get('div[class^="css"]')
        .contains("No organizer credits found")
        .should("be.visible")
        .should("have.css", "background-color", "rgb(156, 163, 175)")
        .should("have.css", "color", "rgb(255, 255, 255)");
      // 'Ticket Credits' section
      cy.getChakraHeaderH2("Ticket Credits");
      cy.get('div[class^="css"]')
        .contains("No ticket credits found")
        .should("be.visible")
        .should("have.css", "background-color", "rgb(156, 163, 175)")
        .should("have.css", "color", "rgb(255, 255, 255)");
      // 'Let's redeem your gift card' section
      cy.getChakraHeaderH2("Let's redeem your gift card");
      cy.get('label[for="redemption_code"]')
        .should("exist")
        .should("be.visible");
      cy.getChakraInputFieldByAttr("placeholder", "Code")
        .should("exist")
        .should("be.visible")
        .clear();
      cy.get('button[type="submit"]')
        .eq(0)
        .should("exist")
        .should("not.be.enabled")
        .should("have.css", "background-color", "rgb(133, 182, 186)")
        .click({ force: true });
      // Verify error message under the 'Code' field
      cy.getInlineError("Code is required");
    }
  );
  // ***************************************************************************
});
