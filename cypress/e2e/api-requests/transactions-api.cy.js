describe("Test trasactions API by ", () => {
  beforeEach(function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
    });
    cy.fixture("packages-transactions.json").then(function (transactionsJSON) {
      this.transactionsJSON = transactionsJSON;
    });
  });
  // ***************************************************************************
  // Transaction ID: 1e-d67b-428a-9748-d638af16e987
  it(
    "verifying a purchased ticket-987 package API-payload-TA-51",
    { tags: ["e2e"] },
    function () {
      cy.navigateToHomePage();
      const apiRequest = "/api/user/financials/invoices/v2/*";
      cy.intercept(apiRequest).as("myOrdersPageLoaded");
      cy.logIntoPortal(this.testdata.userForTicketPackages);
      cy.clickUsernameOnTopBar();
      cy.selectOrdersDropDownItem();
      cy.wait("@myOrdersPageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
      const orderIdUrl = `/account/my-orders/${this.transactionsJSON.transaction987.transaction_id}`;
      cy.log("Going to open the following order by Order ID: " + orderIdUrl);
      cy.visit(orderIdUrl);
      // Verify the first order receipt page
      cy.url().should(
        "include",
        "account/my-orders/1e-d67b-428a-9748-d638af16e987/"
      );
      cy.verifyOrder987Payload(this.transactionsJSON.transaction987);
    }
  );
  // ***************************************************************************
  // Transaction ID: 31-0341-465e-a1a7-910944b23fff
  it(
    "verifying a purchased ticket-23fff package API-payload-TA-52",
    { tags: ["e2e"] },
    function () {
      cy.navigateToHomePage();
      const apiRequest = "/api/user/financials/invoices/v2/*";
      cy.intercept(apiRequest).as("myOrdersPageLoaded");
      cy.logIntoPortal(this.testdata.userForTicketPackages);
      cy.clickUsernameOnTopBar();
      cy.selectOrdersDropDownItem();
      cy.wait("@myOrdersPageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
      const orderIdUrl = `/account/my-orders/${this.transactionsJSON.transaction23fff.transaction_id}`;
      cy.log("Going to open the following order by Order ID: " + orderIdUrl);
      cy.visit(orderIdUrl);
      // Verify the first order receipt page
      cy.url().should(
        "include",
        "account/my-orders/31-0341-465e-a1a7-910944b23fff/"
      );
      cy.verifyOrder23fffPayload(this.transactionsJSON.transaction23fff);
    }
  );
  // ***************************************************************************
});
