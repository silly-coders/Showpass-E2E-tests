describe("Test checkout process by ", () => {
  before(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
    });
  });
  // ***************************************************************************
  it(
    "verifying that tickets can be selected and added-TA-40",
    { tags: ["e2e"] },
    function () {
      cy.logIntoPortal(this.testdata.userDetails);
      cy.enterEventNameIntoSearchField(this.testdata.events.event3.eventName);
      cy.getSearchResultModalWindow();
      cy.selectSearchItemByItemName(this.testdata.events.event3.eventName);
      // Click 'BUY PASSES'
      cy.chakraParagraphButtonByText("BUY TICKETS")
        .eq(0)
        .click({ force: true });
      // Add 3 tickets from each ticket type (2 ticket types in total)
      cy.addTicketsToCart(2, 3);
    }
  );
  // ***************************************************************************
  it(
    "verifying that Interac is not available for purchases below 30 dollars-TA-92",
    { tags: ["e2e"] },
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
      // Click 'REVIEW' tab
      cy.get('md-tab-item[role="tab"] > span')
        .eq(3)
        .contains("Review")
        .should("exist")
        .click({ force: true })
        .wait(500)
        .click({ force: true });
      // *** Review page
      // Verify the 'Review' header
      cy.get('span[class^="md-title strong"]')
        .contains("Review")
        .should("be.visible");
      // Verify that the order amount is below $30
      cy.get('strong > span[ng-if="!selectedPaymentPlan"]').then(($value) => {
        let orderAmountString = $value.text().trim();
        let orderAmount = parseFloat(orderAmountString.replace(/\$/g, ""));
        cy.log(`The order amount is ${orderAmount}`);
        if (orderAmount > 29.99) {
          cy.log(
            "Looks like the order amount is larger than $30. Can't verify the 'Interac' button absense. Finishing the test."
          );
          throw new Error(
            "Looks like the order amount is larger than $30. Can't verify the 'Interac' button absense. Finishing the test."
          );
        } else {
          // Click 'Next'
          cy.get('button[ng-click="nextStep()"]')
            .eq(0)
            .should("exist")
            .click({ force: true });
          cy.get(300);
          // *** Purchase Info page ***
          // Verify the 'Purchaser Info' header
          cy.get('h2[class^="md-title strong"]')
            .contains("Purchaser Info")
            .should("be.visible");
          // Enter 'Confirm Email'
          cy.typeText(
            'input[ng-model="confirmEmail"]',
            0,
            this.testdata.userForSingleBarcodeTesting.userEmail
          );
          // Click 'Next'
          cy.get(
            'button[class^="md-raised md-primary pull-right"][type="submit"] > span'
          )
            .eq(0)
            .contains("Next")
            .click({ force: true });
          cy.wait(900);
          // *** 'Payment' page ***
          // Ensure the 'Interac' radio button is not available
          cy.get('div[class="payment-type layout-row"] > div > p')
            .last()
            .contains("Interac")
            .should("not.be.visible");
        }
      });
    }
  );
  // ***************************************************************************
});
