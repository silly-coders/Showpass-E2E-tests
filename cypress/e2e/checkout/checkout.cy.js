describe("Test checkout process by ", () => {
  before(function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
    });
  });

  // ***************************************************************************
  it(
    "verifying that tickets can be selected and added to cart-TA-40",
    { tags: ["e2e"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.enterEventNameIntoSearchField(this.testdata.events.event3.eventName);
      cy.getSearchResultModalWindow();
      cy.selectSearchItemByItemName(this.testdata.events.event3.eventName);
      // Click 'BUY TICKETS'
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
      cy.navigateToHomePage();
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
    { tags: ["e2e", "membership-group", "orders"] },
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
        cy.getEventOrGroupDescriptionByText(
          this.testdata.testGroup3.membershipDescription
        );
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
      // Click 'Pay $XX.XX CAD'
      cy.get('button[ng-click="setBillingAndShippingFields()"][type="submit"]')
        .should("exist")
        .scrollIntoView({ force: true });
      cy.get(
        'button[ng-click="setBillingAndShippingFields()"][type="submit"]'
      ).click({ force: true });
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
      cy.visit("/account/my-orders/").wait(900);
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
    "replenishing membership group ticket stock (checkout.cy.js)",
    { tags: ["e2e", "membership-group"] },
    function () {
      cy.fixture("testdata.json").then(function (testdata) {
        this.testdata = testdata;
        cy.navigateToHomePage();
        cy.logIntoPortal(this.testdata.userForOrganization3and4);
        cy.log(
          'Going to replenish the "test-group-1698096389" membership level stock.'
        );
        // Intercept API request
        const profileApiRequest = "/api/auth/profile/";
        cy.intercept(profileApiRequest).as("userProfileLoaded");
        // PLEASE PAY ATTENTION BEFORE CHANGING THIS MEMBERSHIP GROUP
        let uniqueMembershipName = "test-group-1698096389";
        cy.visit(`/dashboard/memberships/`);
        cy.wait(900);
        // Wait for the API response for /memberships/membership-groups/
        cy.wait("@userProfileLoaded")
          .its("response.statusCode")
          .should("be.oneOf", [200, 201, 204]);
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
  it(
    "verifying that tickets can be removed from the Cart Summary-TA-97",
    { tags: ["e2e"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.visit(`/automation-event-3/`).wait(500);
      cy.log("Click 'BUY TICKETS'");
      cy.chakraParagraphButtonByText("BUY TICKETS")
        .eq(0)
        .click({ force: true });
      cy.log("Add 3 tickets from each ticket type (2 ticket types in total)");
      cy.addTicketsToCart(2, 1);
      cy.log("Click 'View Cart'");
      cy.get('footer[class^="chakra-modal__footer"] > div > button')
        .first()
        .contains("View Cart")
        .should("exist")
        .scrollIntoView({ force: true })
        .should("be.visible")
        .wait(300)
        .click({ force: true });
      cy.log("Verify Cart Summary dialog box header");
      cy.get('header[class^="chakra-modal__header"] > p')
        .contains("Cart Summary")
        .should("exist")
        .scrollIntoView({ force: true });
      cy.log("Verify cart quantity");
      cy.get('div[data-testid="cart-quantity-buttons"] > div')
        .first()
        .should("contain", "1");
      cy.get('div[data-testid="cart-quantity-buttons"] > div')
        .last()
        .should("contain", "1");
      cy.log("Going to click Delete buttons to remove items from cart");
      let deleteButtonsInTotal = 2;
      for (let i = 0; i < deleteButtonsInTotal; i++) {
        cy.get('button[class^="chakra-button"][aria-label="Delete"]')
          .eq(0)
          .should("exist")
          .scrollIntoView({ force: true })
          .should("be.visible")
          .click({ force: true })
          .wait(500);
      }
      cy.log('Verify that the "There are no items in your cart" text shows up');
      cy.get('div[class^="chakra-modal__body"] > div > p')
        .contains("There are no items in your cart")
        .should("exist")
        .should("be.visible");
      cy.log('Going to click "Cancel"');
      cy.get('div[class^="chakra-modal__body"]')
        .find('button[class^="chakra-button"]')
        .contains("Cancel")
        .eq(0)
        .should("exist")
        .click({ force: true });
      cy.log('Going to verify that the "Checkout" button is disabled');
      cy.get('footer[class^="chakra-modal__footer"] > div > button[disabled]')
        .contains("CHECKOUT")
        .wait(500)
        .should("exist");
    }
  );
  // ***************************************************************************
  it(
    "verifying that guest info forms show up for each ticket added to cart-TA-101",
    { tags: ["e2e", "appearance"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      // Open an event directly
      cy.visit(`/automation-event-restrictions-101120231100/`).wait(900);
      // Click 'BUY TICKETS'
      cy.get('button[data-testid="buy-button"] > p')
        .eq(1)
        .contains("BUY TICKETS")
        .should("exist")
        .scrollIntoView({ force: true })
        .should("be.visible")
        .click({ force: true })
        .wait(900);
      // Add 1 ticket from each ticket type (2 types in total) to cart and proceed to checkout
      // There will be 2 tickets in the cart
      cy.addTicketsToCartAndProceedToCheckout(this.testdata.userDetails, 1);
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
        this.testdata.userDetails.userEmail
      );
      // Click 'Next'
      cy.clickNextButtonDuringCheckoutAngular();
      // Wait for the GUEST INFO form header appearance
      cy.get('h3[class^="md-title strong"]')
        .eq(1)
        .should("exist")
        .scrollIntoView({ force: true })
        .should("contain.text", "Automation-event-restrictions-101120231100");
      // Confirm the number of GUEST INFO forms in total
      // There are 4 similar fields on each form (j<4)
      // There are 2 tickets in total added to cart (1 Regular and 1 VIP (i<2))
      // Verify that each form contains 4 fields based on the 'name' attribute
      let fieldNameAttrValue = ["first_name", "last_name", "phone", "email"];
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 4; j++) {
          cy.log("Going to verify the number of GUEST INFO forms and fields");
          // Verify First Name fields
          cy.get(`input[name^="${fieldNameAttrValue.at(j)}"]`)
            .eq(i)
            .should("exist")
            .scrollIntoView({ force: true });
          cy.wait(300);
        }
      }
    }
  );
  // ***************************************************************************
  it(
    "verifying that a free admission event can be created-TA-102",
    { tags: ["e2e"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.navigateToDashboard(this.testdata.userDetails);
      cy.clickHamburgerMenu();
      cy.clickCreateEventButton();
      // Ensure the page title shows up
      cy.get('span[class="title"]').contains("Basic Info").should("be.visible");
      let uniqueEventName = "automation-event-" + Math.floor(Date.now() / 1000);
      // Create a free admission event
      cy.createFreeAdmissionEventAngular(
        uniqueEventName,
        this.testdata.testEvent1
      );
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
      // Verify that it's a free admission event
      cy.get('div[data-testid="price-range"] > p')
        .eq(1)
        .should("exist")
        .should("contain.text", "Free");
      // Verify the 'Tickets are not required for this event.' statement
      cy.get('div[data-testid="card"] > div > h2')
        .should("exist")
        .should("contain.text", "Tickets are not required for this event.");
    }
  );
  // ***************************************************************************
});
