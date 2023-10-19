describe("Verify purchased tickets by ", () => {
  beforeEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
    });
  });
  after(function () {
    cy.log(
      "Going to replenish the 'verify-payment-event-1697684780' ticket stock."
    );
    cy.visit(
      `/dashboard/events/verify-payment-event-1697684780/manage/#/edit`
    );
    // Add more tickets to the first ticket type
    cy.get('input[name="ticketTypeInventory0"]')
      .should("exist")
      .scrollIntoView({ force: true })
      .should("be.visible")
      .clear({ force: true })
      .type(150000);
    // Add more tickets to the first ticket type
    cy.get('input[name="ticketTypeInventory1"]')
      .should("exist")
      .scrollIntoView({ force: true })
      .should("be.visible")
      .clear({ force: true })
      .type(150000);
    // Click Save
    cy.get('button[ng-click="saveEvent()"]').as("saveButton");
    cy.get("@saveButton").should("exist").click({ force: true });
    cy.wait(1000);
  });
  // ***************************************************************************
  it(
    "ensuring that an event owner can purchase tickets with a single barcode-TA-68",
    { tags: ["e2e", "barcodes", "orders", "smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userForSingleBarcodeTesting);
      cy.navigateToDashboard(this.testdata.userForSingleBarcodeTesting);
      cy.clickHamburgerMenu();
      cy.clickCreateEventButton();
      // Ensure the page title shows up
      cy.get('span[class="title"]').contains("Basic Info").should("be.visible");
      let uniqueEventName = "automation-event-" + Math.floor(Date.now() / 1000);
      cy.createNewEventAngular(uniqueEventName, this.testdata.testEvent1);
      // Click 'Showpass' logo to navigate to the 'Home' page
      cy.get('a[class="navbar-brand"] > img[class="logo-nav"]')
        .should("be.visible")
        .click({ force: true });
      // Log out
      cy.clickMainMenuAndLogOut();
      // Open just created event
      cy.visit(`/s/events/all/?q=${uniqueEventName}`);
      cy.url().should("contain", uniqueEventName);
      // Click on the event card to open the event
      cy.getChakraSkeletonItem()
        .contains(uniqueEventName)
        .click({ force: true });
      cy.url().should("contain", uniqueEventName);
      // Add tickets to cart and proceed to checkout
      cy.addTicketsToCartAndProceedToCheckout(
        this.testdata.userForSingleBarcodeTesting,
        1
      );
      // Complete the order
      cy.completeOrderOnAngular(
        this.testdata.userForSingleBarcodeTesting,
        this.testdata.visaDebitForTesting
      );
      // Navigate to 'My Orders' page
      cy.visit("/account/my-orders/");
      // Click the first 'View Order' button at the very top
      cy.get('button[class^="chakra-button"] > div > div > span')
        .eq(0)
        .contains("View Order")
        .as("viewOrderButton");
      cy.get("@viewOrderButton").click().wait(500);
      // Make sure the 'Back' button on the 'Order' page shows up
      cy.getChakraButtonByText("Back");
      // Ensure there is only one invoice barcode
      cy.log(
        `Going to verify that there is only one barcode for the following event: ${uniqueEventName}`
      );
      cy.get('div[data-testid="invoice-barcode-items"]').should(
        "have.length",
        1
      );
    }
  );
  // ***************************************************************************
  it(
    "ensuring that regular users can purchase event tickets with a single barcode-TA-71",
    { tags: ["e2e", "barcodes", "orders", "smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userForSingleBarcodeTesting);
      cy.navigateToDashboard(this.testdata.userForSingleBarcodeTesting);
      cy.clickHamburgerMenu();
      cy.clickCreateEventButton();
      // Ensure the page title shows up
      cy.get('span[class="title"]').contains("Basic Info").should("be.visible");
      let uniqueEventName = "automation-event-" + Math.floor(Date.now() / 1000);
      cy.createNewEventAngular(uniqueEventName, this.testdata.testEvent1);
      // Click 'Showpass' logo to navigate to the 'Home' page
      cy.get('a[class="navbar-brand"] > img[class="logo-nav"]')
        .should("be.visible")
        .click({ force: true });
      // Sign out
      cy.clickUsernameOnTopBar();
      cy.signOut();
      // Log into the portal as another user
      cy.logIntoPortal(this.testdata.userDetails);
      // Open just created event
      cy.visit(`/s/events/all/?q=${uniqueEventName}`);
      cy.url().should("contain", uniqueEventName);
      // Click on the event card to open the event
      cy.getChakraSkeletonItem()
        .contains(uniqueEventName)
        .click({ force: true });
      cy.url().should("contain", uniqueEventName);
      cy.get('button[class^="chakra-button"] > p')
        .contains("BUY TICKETS")
        .click({ force: true });
      // Add 3 tickets from each ticket type (2 ticket types in total)
      cy.addTicketsToCart(2, 1);
      // Click 'Checkout' button
      cy.clickChakraButtonByText("CHECKOUT");
      // Wait for the next page
      cy.get('span[ng-if="cart.timer.info.totalSeconds"]').should("be.visible");
      // Complete the order
      cy.completeOrderOnAngular(
        this.testdata.userDetails,
        this.testdata.visaDebitForTesting
      );
      // Click 'Showpass' logo to navigate to the 'Home' page
      cy.get('.container > [href="/"] > .logo')
        .should("exist")
        .should("be.visible")
        .click({ force: true });
      // Log into the portal to verify order details
      cy.logIntoPortal(this.testdata.userDetails);
      // Navigate to 'My Orders' page
      cy.visit("/account/my-orders/");
      // Click the first 'View Order' button at the very top
      cy.get('button[class^="chakra-button"] > div > div > span')
        .eq(0)
        .contains("View Order")
        .as("viewOrderButton");
      cy.get("@viewOrderButton").click().wait(500);
      // Make sure the 'Back' button on the 'Order' page shows up
      cy.getChakraButtonByText("Back");
      // Ensure there is only one invoice barcode
      cy.log(
        `Going to verify that there is only one barcode for the following event: ${uniqueEventName}`
      );
      cy.get('div[data-testid="invoice-barcode-items"]').should(
        "have.length",
        1
      );
    }
  );
  // ***************************************************************************
  it(
    "ensuring that guests are able to purchase event tickets-TA-87",
    { tags: ["e2e", "barcodes", "orders", "smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userForSingleBarcodeTesting);
      cy.navigateToDashboard(this.testdata.userForSingleBarcodeTesting);
      cy.clickHamburgerMenu();
      cy.clickCreateEventButton();
      // Ensure the page title shows up
      cy.get('span[class="title"]').contains("Basic Info").should("be.visible");
      let uniqueEventName = "automation-event-" + Math.floor(Date.now() / 1000);
      cy.createNewEventAngular(uniqueEventName, this.testdata.testEvent1);
      // Click 'Showpass' logo to navigate to the 'Home' page
      cy.get('a[class="navbar-brand"] > img[class="logo-nav"]')
        .should("be.visible")
        .click({ force: true });
      // Sign out
      cy.clickUsernameOnTopBar();
      cy.signOut();
      // Navigate to the web portal and find just created event
      cy.visit(`/s/events/all/?q=${uniqueEventName}`);
      cy.url().should("contain", uniqueEventName);
      // Click on the event card to open the event
      cy.getChakraSkeletonItem()
        .contains(uniqueEventName)
        .click({ force: true });
      cy.url().should("contain", uniqueEventName);
      cy.get('button[class^="chakra-button"] > p')
        .contains("BUY TICKETS")
        .click({ force: true });
      // Add 3 tickets from each ticket type (2 ticket types in total)
      cy.addTicketsToCart(2, 1);
      // Click 'Checkout' button
      cy.clickChakraButtonByText("CHECKOUT");
      // Wait for the next page
      cy.get('span[ng-if="cart.timer.info.totalSeconds"]').should("be.visible");
      // Complete the order
      cy.completeOrderAsGuestOnAngular(
        this.testdata.userDetails,
        this.testdata.visaDebitForTesting
      );
    }
  );
  // ***************************************************************************
  it(
    "ensuring that Interac can be used to purchase tickets-TA-90",
    { tags: ["e2e", "barcodes", "orders", "smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userForSingleBarcodeTesting);
      // Do not change event or event name as the tickets get added to this event in the after() hook
      let uniqueEventName = "verify-payment-event-1697684780";
      // Open just created event
      cy.visit(`/s/events/all/?q=${uniqueEventName}`);
      cy.url().should("contain", uniqueEventName);
      // Click on the event card to open the event
      cy.getChakraSkeletonItem()
        .contains(uniqueEventName)
        .click({ force: true });
      cy.url().should("contain", uniqueEventName);
      // Add tickets to cart and proceed to checkout
      cy.addTicketsToCartAndProceedToCheckout(
        this.testdata.userForSingleBarcodeTesting,
        3
      );
      // Complete the order using Interac
      cy.completeOrderWithInteracPayment(
        this.testdata.userForSingleBarcodeTesting
      );
      // Ensure the 'Thank you' page show up
      cy.log("Ensure the 'Thank you' page show up");
      cy.get('h1[class^="md-display"]')
        .should("exist")
        .should("be.visible")
        .should("contain.text", "Thank you!");
    }
  );
  // ***************************************************************************
});
