describe("Test My Orders by ", () => {
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
  it("verifying a ticket package purchase-TA-50", function () {
    const apiRequest = "/api/user/financials/invoices/v2/*";
    cy.intercept(apiRequest).as("myOrdersPageLoaded");
    cy.logIntoPortal(this.testdata.userForTicketPackages);
    cy.clickUsernameAfterLoggingIn();
    cy.selectOrdersDropDownItem();
    cy.wait("@myOrdersPageLoaded")
      .its("response.statusCode")
      .should("be.oneOf", [200, 204]);
    const orderIdUrl = `/account/my-orders/?s=${this.transactionsJSON.transactions.transaction_id}`;
    cy.log("Going to open the following order by Order ID: " + orderIdUrl);
    cy.visit(orderIdUrl);
    // Verify the first order receipt page
    cy.url().should("include", "/account/my-orders/");
    cy.getChakraHeaderH2("Receipt");
    cy.getChakraHeaderH2("Purchase");
    const orderReceiptLabelsFirstPage = [
      "101 9 Ave SW",
      "Order ID",
      this.transactionsJSON.transactions.transaction_id,
      "Created On",
      "Aug 4, 2023 | 11:59 AM MDT",
      "Paid",
      "$100.04 CAD",
      "Payment",
      "**** **** **** 4242",
      "Ticket-type-2 - Test Automation event 3 (DO NOT MODIFY)",
      "Main ticket for package 1 - Test Automation event 3 (DO NOT MODIFY)",
      "Ticket-type-3 - Test Automation event 3 (DO NOT MODIFY)",
    ];
    for (let i = 0; i < orderReceiptLabelsFirstPage.length; i++) {
      cy.log(
        "Verifying the following text: " + orderReceiptLabelsFirstPage.at(i)
      );
      cy.getChakraTextLabelByText(orderReceiptLabelsFirstPage.at(i));
    }
    cy.getChakraButtonByText("View Order");
    cy.getChakraAccordionButtonByText("Order Options");
    // Navigate to the 'View Order' page
    cy.clickChakraButtonByText("View Order");
    cy.getChakraButtonByText("Back").should("be.visible");
    // Order receipt verification process begins here
    cy.getH1HeaderByText(
      `Order ${this.transactionsJSON.transactions.transaction_id}`
    );
    cy.url().should("include", "/account/my-orders/");
    cy.getChakraHeaderH2("Receipt");
    cy.getChakraHeaderH2("Purchase");
    const orderReceiptLabels = [
      "Back",
      this.transactionsJSON.transactions.invoice_items[0].event.name,
      this.transactionsJSON.transactions.invoice_items[0].event.location
        .street_name,
      "130 King St W",
      "Toronto, Ontario",
      "Event Starts",
      "Thu Aug 3, 2023",
      "9:00 PM MDT",
      "Event Ends",
      "Sat Sep 1, 2035",
      "12:00 AM MDT",
      "Name on Ticket",
      "User ForTesting",
      "Barcode",
      "RYSRL0UM2",
      "Ticket Category",
      "Main ticket for package 1",
      "Order ID",
      this.transactionsJSON.transactions.transaction_id,
      "Created On",
      "Aug 4, 2023 | 11:59 AM MDT",
      "Paid",
      "$100.04 CAD",
      "Payment",
      "**** **** **** 4242",
      "Have questions about your order?",
      "No problem! Here are your options.",
    ];
    for (let i = 0; i < orderReceiptLabels.length; i++) {
      cy.log("Verifying the following text: " + orderReceiptLabels.at(i));
      cy.getChakraTextLabelByText(orderReceiptLabels.at(i));
    }
  });
  // ***************************************************************************
});
