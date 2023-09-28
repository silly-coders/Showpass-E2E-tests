let uniqueEventName = "automation-event-" + Math.floor(Date.now() / 1000);
// Verify ticket purchase process for all the mobile screen resolutions mentioned below  
const mobileScreenSizes = [
  [390, 844] // iPhone 12 Pro
//[360, 740], // Samsung Galaxy S8+
];
describe("Test the mobile phone view by ", () => {
  before(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userForSingleBarcodeTesting);
      cy.navigateToDashboard(this.testdata.userForSingleBarcodeTesting);
      cy.clickHamburgerMenu();
      cy.clickCreateEventButton();
      // Ensure the page title shows up
      cy.get('span[class="title"]').contains("Basic Info").should("be.visible");
      cy.createNewEventAngular(uniqueEventName, this.testdata.testEvent1);
      // Click 'Showpass' logo to navigate to the 'Home' page
      cy.get('a[class="navbar-brand"] > img[class="logo-nav"]')
        .should("be.visible")
        .click({ force: true });
      // Sign out
      cy.clickUsernameOnTopBar();
      cy.signOut();
    });
  });

  // ***************************************************************************
  it.skip(
    "ensuring that regular users can purchase event tickets-TA-78",
    { tags: ["e2e", "mobile-view", "smoke"] },
    function () {
      mobileScreenSizes.forEach((size) => {
        cy.fixture("testdata.json").then(function (testdata) {
          this.testdata = testdata;
          cy.log(`Going to test the following mobile resolution: ${size}`);
          /// *** Regular user logs in and purchases a ticket in mobile view
          cy.viewport(size[0], size[1]);
          //cy.viewport(390, 844); // iPhone 12 PRO view in browser
          // Log into the portal as a regular user
          cy.getChakraButtonByAttribute("aria-label", "Main menu").click({
            force: true,
          });
          cy.logIntoPortalInMobileView(this.testdata.userDetails);
          // Open just created event
          //let uniqueEventName = "automation-event-1695742649";
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
          cy.get('span[ng-if="cart.timer.info.totalSeconds"]').should(
            "be.visible"
          );
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
          // Refresh page
          cy.reload();  
          // Log into the portal to verify order details
          cy.getChakraButtonByAttribute("aria-label", "Main menu").click({
            force: true,
          });
          cy.logIntoPortalInMobileView(this.testdata.userDetails);
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
          // Scroll into view the invoice barcode section
          cy.get('div[data-testid="invoice-barcode"]')
          .should('exist')
          .scrollIntoView({force: true})
          ;
          // Verify that the items are present
          cy.get('div[data-testid^="invoice-order-breakdown-item-0"]')
          .should('exist')
          .scrollIntoView({force: true})
          .should('be.visible')
          ;
          // Open main menu and sign out
          cy.getChakraButtonByAttribute("aria-label", "Main menu").click({
            force: true,
          });
          // Sign out
          cy.get(
            'div[class^="chakra-modal__body"] > div > button[class^="chakra-button"]'
          )
            .eq(9)
            .contains("Log Out")
            .should("exist")
            .scrollIntoView({ force: true })
            .should("be.visible")
            .click({ force: true });
          cy.wait(700);
          cy.get(
            'div[class^="chakra-modal__body"] > div > button[class^="chakra-button"]'
          ).should("not.exist");
          cy.getChakraButtonByAttribute("aria-label", "Main menu").should(
            "be.visible"
          );
        });
      });
    }
  );
});
