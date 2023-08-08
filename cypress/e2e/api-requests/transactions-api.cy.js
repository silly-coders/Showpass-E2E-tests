describe("Test trasactions API by ", () => {
    before(function () {
      cy.clearLocalStorage();
      cy.clearCookies();
    });
  
    beforeEach(function () {
      cy.fixture("testdata.json").then(function (testdata) {
        this.testdata = testdata;
      });
      cy.fixture("packages-transactions.json").then(function (transactionsJSON) {
        this.transactionsJSON = transactionsJSON;
      });
      cy.navigateToHomePage();
    });
    // ***************************************************************************
    it("verifying a purchased ticket package payload-TA-51", function () {
      const apiRequest = "/api/user/financials/invoices/v2/*";
      cy.intercept(apiRequest).as("myOrdersPageLoaded");
      cy.logIntoPortal(this.testdata.userForTicketPackages);
      cy.clickUsernameAfterLoggingIn();
      cy.selectOrdersDropDownItem();
      cy.wait("@myOrdersPageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
      const orderIdUrl = `/account/my-orders/${this.transactionsJSON.transaction987.transaction_id}`;
      cy.log("Going to open the following order by Order ID: " + orderIdUrl);
      cy.visit(orderIdUrl);
      // Verify the first order receipt page
      cy.url().should("include", "account/my-orders/1e-d67b-428a-9748-d638af16e987/");
      cy.verifyOrder987Payload(this.transactionsJSON.transaction987);
    });
    // ***************************************************************************
  });
  