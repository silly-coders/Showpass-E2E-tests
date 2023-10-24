describe("Test checkout process by ", () => {
  before(function () {
    cy.clearAllSessionStorage();
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
      // Click 'Next'
      cy.clickNextButtonDuringCheckoutAngular();
      // Click 'REVIEW' tab
      cy.get('md-tab-item[role="tab"] > span')
        .eq(3)
        .contains("Review")
        .should("exist")
        .click({ force: true })
        .wait(700)
        .click({force: true});
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
          cy.clickNextButtonDuringCheckoutAngular();
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
  it(
    "verifying 'One time - renewal frequency' membership group order details-TA-95",
    { tags: ["e2e", "membership-group"] },
    function () {
      let uniqueMembershipName = "test-group-1698096389";
      cy.fixture("testdata.json").then(function (testdata) {
        this.testdata = testdata;
        cy.navigateToHomePage();
        cy.logIntoPortal(this.testdata.userForOrganization3and4);
        // *** Open the membership group on the portal front-end ***
        // Navigate to the group name to view its front-end page and be able to purchased membership
        cy.visit(`/m/${uniqueMembershipName.toLowerCase()}/`);
        // Verify that URL contains the group name
        cy.url().should("include", uniqueMembershipName.toLowerCase());
        // Verify group name in the header
        cy.getChakraSkeletonH1HeaderByText(uniqueMembershipName);
        // Verify group description
        cy.get('div[data-testid="card"] > div > p')
          .should("exist")
          .should("be.visible")
          .should("have.text", this.testdata.testGroup3.membershipDescription);
        // Click 'BUY MEMBERSHIPS'
        cy.chakraParagraphButtonByText("BUY MEMBERSHIPS").click({
          force: true,
        });
        // Ensure a modal window shows up
        cy.getChakraModalWindow();
        // Add tickets to cart base on "purchaseLimit" (1 ticket type available)
        cy.addMembershipLevelsToCart(
          1,
          this.testdata.membershipLevel2.purchaseLimit
        );
        // Click 'Checkout' button
        cy.clickChakraButtonByText("CHECKOUT");
      });
      // Complete the order
      // Click 'REVIEW' tab
      cy.get('md-tab-item[role="tab"] > span')
        .eq(3)
        .contains("Review")
        .should("exist")
        .click({ force: true });
      // *** Review page
      // Verify the 'Review' header
      cy.get('span[class^="md-title strong"]')
        .contains("Review")
        .should("be.visible");
      // Click 'Next'
      cy.clickNextButtonDuringCheckoutAngular();
      // *** Purchase Info page ***
      // Verify the 'Purchaser Info' header
      cy.get('h2[class^="md-title strong"]')
        .contains("Purchaser Info")
        .should("be.visible");
      // Enter 'Confirm Email'
      cy.typeText(
        'input[ng-model="confirmEmail"]',
        0,
        this.testdata.userForOrganization3and4.userEmail
      );
      // Click 'Next'
      cy.get(
        'button[class^="md-raised md-primary pull-right"][type="submit"] > span'
      )
        .eq(0)
        .contains("Next")
        .click({ force: true });
      cy.wait(300);
      // Populate GUEST INFO
      // Type First Name
      cy.typeText(
        'input[name^="first_name"]',
        0,
        this.testdata.userForOrganization3and4.userFirstName
      );
      // Type Last Name
      cy.typeText(
        'input[name^="last_name"]',
        0,
        this.testdata.userForOrganization3and4.userLastName
      );
      // Type phone number
      cy.typeText(
        'input[name^="phone"]',
        0,
        this.testdata.userForOrganization3and4.phoneNumber
      );
      cy.wait(300);
      // Type email
      cy.typeText(
        'input[ng-model="g.info_email"]',
        0,
        this.testdata.userForOrganization3and4.userEmail
      );
      cy.wait(300);
      // Submit payment
      // Click 'Next'
      cy.get(
        'button[class^="md-raised md-primary pull-right"][type="submit"] > span[ng-if*="!cart.$loading"]'
      )
        .eq(1)
        .contains("Next")
        .click({ force: true });
      cy.wait(300);
      // Click the 'PAYMENT' tab
      cy.get('md-tab-item[role="tab"] > span[ng-if="!cart.isFree()"]')
        .last()
        .contains("Payment")
        .should("exist")
        .click({ force: true });
      cy.wait(500);
      // Verify the 'Payment Method' header
      cy.get('h2[class^="md-title strong"]')
        .eq(1)
        .contains("Payment Method")
        .should("exist")
        .scrollIntoView({ force: true })
        .should("be.visible");
      cy.wait(700);
      // Click 'Pay $XX.XX CAD'
      cy.get('button[ng-click="setBillingAndShippingFields()"][type="submit"]')
        .should("exist")
        .scrollIntoView({ force: true })
        .click({ force: true });
      cy.wait(1000);
      // Verify data loading indicator appearance and disappearance
      cy.get(
        'div[class="full-loader"] > md-progress-circular[role="progressbar"] > svg'
      )
        .should("exist")
        .should("be.visible");
      cy.wait(5000);
      Cypress.config("defaultCommandTimeout", 7000);
      // Ensure the data loading indicator disappears
      cy.get(
        'div[class="full-loader"] > md-progress-circular[role="progressbar"]'
      ).should("not.exist");
      // Ensure the order confirmation page shows up
      cy.get('h1[class^="md-display"]')
        .should("exist")
        .should("be.visible")
        .should("contain.text", "Thank you!");
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
      // ***** Verify order details *****
      // Verify invoice header
      cy.log("Verify invoice header");
      cy.get('div[data-testid="invoice-header"] > p > a')
        .contains(uniqueMembershipName)
        .should("exist")
        .scrollIntoView({ force: true })
        .should("be.visible");
      // Verify barcode presence
      cy.get('div[class^="css"] > canvas')
        .should("exist")
        .scrollIntoView({ force: true })
        .should("be.visible");
      // Verify full user name, verify Level and verify Expiry Date
      let textItems = [
        "Userfor ForTesting",
        "test-group-1698096389-level",
        "Sep 18, 2030",
      ];
      for (let i = 0; i < textItems.length; i++) {
        cy.log(`Going to verify the following text label: ${textItems.at(i)}`);
        cy.get('div[data-testid="invoice-item-0"] > div > div')
          .eq(2)
          .find('p[class^="chakra-text"]')
          .contains(textItems.at(i));
      }
    }
  );
  // ***************************************************************************
  it(
    "replenishing membership group ticket stock",
    { tags: ["e2e", "membership-group"] },
    function () {
      cy.fixture("testdata.json").then(function (testdata) {
        this.testdata = testdata;
        cy.navigateToHomePage();
        cy.logIntoPortal(this.testdata.userForOrganization3and4);
        cy.log(
          'Going to replenish the "test-group-1698096389" membership level stock.'
        );
        // PLEASE PAY ATTENTION BEFORE CHANGING THIS MEMBERSHIP GROUP
        let uniqueMembershipName = "test-group-1698096389";
        cy.visit(`/dashboard/memberships/`);

        const getIframeBody = () => {
          return cy
            .get('iframe[class="full-width flex-direction-column flex-fill"]')
            .eq(0)
            .its("0.contentDocument.body")
            .should("not.be.empty")
            .then(cy.wrap);
        };
        // Click the 'Edit group' button
        getIframeBody()
          .find(
            'button[aria-label="Edit membership level"][href^="/manage/memberships/"]'
          )
          .last()
          .scrollIntoView({ force: true })
          .click({ force: true });
        // Wait for the 'Membership Levels' tab
        getIframeBody()
          .find('button[class^="chakra-tabs__tab"][id="tabs-1--tab-1"]')
          .should("exist")
          .scrollIntoView({ force: true })
          .click({ force: true });
        cy.wait(500);
        // Ensure the 'New Level' button shows up
        getIframeBody()
          .find('button[class^="chakra-button"] > span')
          .contains("New Level")
          .should("exist");
        // Click the 'Edit level' pencil button
        getIframeBody()
          .find('button[aria-label="Edit membership level"]')
          .first()
          .scrollIntoView({ force: true })
          .click({ force: true });
        // Ensure the 'Edit Level' tab shows up
        getIframeBody()
          .find('button[class^="chakra-tabs__tab"][id="tabs-1--tab-2"]')
          .contains("Edit Level")
          .should("exist")
          .scrollIntoView({ force: true });
        // Populate the 'Inventory' field with a new value
        getIframeBody()
          .find('input[name="inventory"]')
          .should("exist")
          .scrollIntoView({ force: true });
        getIframeBody()
          .find('input[name="inventory"]')
          .clear()
          .type("10000", { force: true });
        // Click 'Save Level'
        getIframeBody()
          .find('button[class^="chakra-button"] > span')
          .contains("Save Level")
          .should("exist")
          .click({ force: true });
        // Verify Success message
        getIframeBody()
          .find('div[status="success"]')
          .should("exist")
          .should("be.visible");
      });
    }
  );
  // ***************************************************************************
});
