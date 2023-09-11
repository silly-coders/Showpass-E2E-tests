describe("Verify purchased tickets by ", () => {
  beforeEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
    });
  });
// ***************************************************************************
  it(
    "ensuring a single barcode gets issued for all tickets within an order-TA-68",
    { tags: ["smoke"] },
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
});
