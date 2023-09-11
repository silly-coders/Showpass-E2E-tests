describe("Test My Orders by ", () => {
  beforeEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
    });
    cy.fixture("packages-transactions.json").then(function (transactionsJSON) {
      this.transactionsJSON = transactionsJSON;
    });
    cy.navigateToHomePage();
  });

  // ***************************************************************************
  it("verifying a ticket package purchase-987-TA-50", function () {
    const apiRequest = "/api/user/financials/invoices/v2/*";
    cy.intercept(apiRequest).as("myOrdersPageLoaded");
    const viewOrderRequest = "**/api/public/events/*";
    cy.intercept(viewOrderRequest).as("viewOrder");
    cy.logIntoPortal(this.testdata.userForTicketPackages);
    cy.clickUsernameAfterLoggingIn();
    cy.selectOrdersDropDownItem();
    cy.wait("@myOrdersPageLoaded")
      .its("response.statusCode")
      .should("be.oneOf", [200, 204]);
    const orderIdUrl = `/account/my-orders/?s=${this.transactionsJSON.transaction987.transaction_id}`;
    cy.log("Going to open the following order by Order ID: " + orderIdUrl);
    cy.visit(orderIdUrl);
    // Verify the first order receipt page
    cy.url().should("include", "/account/my-orders/");
    cy.getChakraHeaderH2("Receipt");
    cy.getChakraHeaderH2("Purchase");
    // Verify address label
    cy.get('div[class^="chakra-container"]')
      .eq(0)
      .contains("101 9 Ave SW")
      .should("be.visible");
    const orderReceiptLabelsSecondBlock = [
      "Order ID",
      this.transactionsJSON.transaction987.transaction_id,
      "Created On",
      "Aug 4, 2023 |",
      "Paid",
      "$100.04 CAD",
      "Payment",
      "**** **** **** 4242",
    ];
    for (let i = 0; i < orderReceiptLabelsSecondBlock.length; i++) {
      cy.log(
        "Verifying the following text: " + orderReceiptLabelsSecondBlock.at(i)
      );
      cy.get('div[class^="chakra-container"]')
        .eq(2)
        .find('div[class^="css"] > p[class^="chakra-text"]')
        .eq(i)
        .contains(orderReceiptLabelsSecondBlock.at(i));
    }
    const orderReceiptLabelsThirdBlock = [
      "Ticket-type-2 - Test Automation event 3 (DO NOT MODIFY)",
      "Main ticket for package 1 - Test Automation event 3 (DO NOT MODIFY)",
      "Ticket-type-3 - Test Automation event 3 (DO NOT MODIFY)",
    ];
    for (let i = 0; i < orderReceiptLabelsThirdBlock.length; i++) {
      cy.log(
        "Verifying the following text: " + orderReceiptLabelsThirdBlock.at(i)
      );
      cy.get('div[class^="chakra-container"]')
        .eq(3)
        .find('div[class^="css"] > p[class^="chakra-text"]:nth-child(1)')
        .contains(orderReceiptLabelsThirdBlock.at(i));
    }
    // *** Verify sections at the bottom of the page
    cy.getChakraButtonByText("View Order");
    cy.getChakraAccordionButtonByText("Order Options");
    // Click 'Order Options' and verify control underneath
    cy.getChakraAccordionButtonByText("Order Options").click();
    const orderOptions = [
      "Download tickets",
      "Contact the organizer",
      "Transfer to a friend",
      "Resend confirmation email",
    ];
    for (let i = 0; i < orderOptions.length; i++) {
      cy.log(
        "Verifying the following 'Order Options' drop-down item: " +
          orderOptions.at(i)
      );
      cy.getChakraButtonByText(orderOptions.at(i));
    }
    // Navigate to the 'View Order' page
    cy.clickChakraButtonByText("View Order");
    cy.getChakraButtonByText("Back").should("be.visible");
    // Order receipt verification process begins here
    cy.getH1HeaderByText(
      `Order ${this.transactionsJSON.transaction987.transaction_id}`
    );
    cy.url().should("include", "/account/my-orders/");
    cy.wait("@viewOrder", { timeout: 20000 })
      .its("response.statusCode")
      .should("be.oneOf", [200, 204]);
    cy.getChakraHeaderH2("Receipt");
    cy.getChakraHeaderH2("Purchase");
    // Verify Event Name
    cy.get('a[class^="chakra-link"][href*="automation-event"]')
      .eq(0)
      .should("exist")
      .should("be.visible")
      .should(
        "have.text",
        this.transactionsJSON.transaction987.invoice_items[0].event.name
      );
    const orderReceiptLabels = [
      "Back",
      this.transactionsJSON.transaction987.invoice_items[0].event.location
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
      this.transactionsJSON.transaction987.transaction_id,
      "Created On",
      "Aug 4, 2023 |",
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
  it("verifying a ticket package purchase-23fff-TA-53", function () {
    const apiRequest = "/api/user/financials/invoices/v2/*";
    cy.intercept(apiRequest).as("myOrdersPageLoaded");
    const viewOrderRequest = "**/api/public/events/*";
    cy.intercept(viewOrderRequest).as("viewOrder");
    cy.logIntoPortal(this.testdata.userForTicketPackages);
    cy.clickUsernameAfterLoggingIn();
    cy.selectOrdersDropDownItem();
    cy.wait("@myOrdersPageLoaded")
      .its("response.statusCode")
      .should("be.oneOf", [200, 204]);
    const orderIdUrl = `/account/my-orders/?s=${this.transactionsJSON.transaction23fff.transaction_id}`;
    cy.log("Going to open the following order by Order ID: " + orderIdUrl);
    cy.visit(orderIdUrl);
    // Verify the first order receipt page
    cy.url().should("include", "/account/my-orders/");
    cy.getChakraHeaderH2("Receipt");
    cy.getChakraHeaderH2("Purchase");
    // Verify address label
    cy.get('div[class^="chakra-container"]')
      .eq(0)
      .contains("101 9 Ave SW")
      .should("be.visible");
    const orderReceiptLabelsSecondBlock = [
      "Order ID",
      this.transactionsJSON.transaction23fff.transaction_id,
      "Created On",
      "Aug 9, 2023 |",
      "Paid",
      "$200.98 CAD",
      "Payment",
      "**** **** **** 4242",
    ];
    for (let i = 0; i < orderReceiptLabelsSecondBlock.length; i++) {
      cy.log(
        "Verifying the following text: " + orderReceiptLabelsSecondBlock.at(i)
      );
      cy.get('div[class^="chakra-container"]')
        .eq(2)
        .find('div[class^="css"] > p[class^="chakra-text"]')
        .eq(i)
        .contains(orderReceiptLabelsSecondBlock.at(i));
    }
    const orderReceiptLabelsThirdBlock = [
      "Ticket-type-2 - Test Automation event 3 (DO NOT MODIFY)",
      "Ticket-type-3 - Test Automation event 3 (DO NOT MODIFY)",
      "Ticket-type-2 - Test Automation event 3 (DO NOT MODIFY)",
      "...and 3 more items",
    ];
    for (let i = 0; i < orderReceiptLabelsThirdBlock.length; i++) {
      cy.log(
        "Verifying the following text: " + orderReceiptLabelsThirdBlock.at(i)
      );
      cy.get('div[class^="chakra-container"]')
        .eq(3)
        .find('div[class^="css"] > p[class^="chakra-text"]:nth-child(1)')
        .contains(orderReceiptLabelsThirdBlock.at(i));
    }
    // *** Verify sections at the bottom of the page
    cy.getChakraButtonByText("View Order");
    cy.getChakraAccordionButtonByText("Order Options");
    // Click 'Order Options' and verify control underneath
    cy.getChakraAccordionButtonByText("Order Options").click();
    const orderOptions = [
      "Download tickets",
      "Contact the organizer",
      "Transfer to a friend",
      "Resend confirmation email",
    ];
    for (let i = 0; i < orderOptions.length; i++) {
      cy.log(
        "Verifying the following 'Order Options' drop-down item: " +
          orderOptions.at(i)
      );
      cy.getChakraButtonByText(orderOptions.at(i));
    }
    // Navigate to the 'View Order' page
    cy.clickChakraButtonByText("View Order");
    cy.getChakraButtonByText("Back").should("be.visible");
    // Order receipt verification process begins here
    cy.getH1HeaderByText(
      `Order ${this.transactionsJSON.transaction23fff.transaction_id}`
    );
    cy.url().should("include", "31-0341-465e-a1a7-910944b23fff");
    cy.wait("@viewOrder", { timeout: 20000 })
      .its("response.statusCode")
      .should("be.oneOf", [200, 204]);
    cy.getChakraHeaderH2("Receipt");
    cy.getChakraHeaderH2("Purchase");
    // Verify Event Name
    cy.get('a[class^="chakra-link"][href*="automation-event"]')
      .eq(0)
      .should("exist")
      .should("be.visible")
      .should(
        "have.text",
        this.transactionsJSON.transaction23fff.invoice_items[0].event.name
      );
    const orderReceiptLabels = [
      "Back",
      this.transactionsJSON.transaction23fff.invoice_items[0].event.location
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
      "Ticket Category",
      "Ticket-type-2",
      "Order ID",
      this.transactionsJSON.transaction23fff.transaction_id,
      "Created On",
      "Aug 9, 2023 |",
      "Paid",
      "$200.98 CAD",
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
});
