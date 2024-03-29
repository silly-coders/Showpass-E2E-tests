describe("Test checkout process by ", () => {
  beforeEach("navigate to Home page", function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
    });
  });

  // ***************************************************************************
  it(
    "verifying that tickets can be selected and added to cart-TA-40",
    { tags: ["e2e", "checkout"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.wait(700);
      const apiUpcomingEvents =
        "/api/public/venues/qa-team-organization/upcoming-events/*";
      cy.intercept(apiUpcomingEvents).as("apiUpcomingEvents");
      cy.visit(this.testdata.events.event3.eventUrl);
      cy.wait(300);
      cy.wait("@apiUpcomingEvents")
        .its("response.statusCode")
        .should(
          "be.oneOf",
          [200, 204],
          "Verifying the Upcoming Events response status code."
        );
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
    { tags: ["e2e", "checkout"] },
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
      cy.url().should("contain", uniqueEventName).wait(700);
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
      // Verify if tickets were properly added to cart
      cy.throwErrorIfNoTicketsInCart();
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
      cy.navigateToReviewPageIfStillNotThere();
      // *** Review page
      // Verify the 'Review' header
      cy.get('span[class^="md-title strong"]')
        .contains("Review")
        .should("be.visible");
      // Verify that the order amount is below $30
      cy.get('strong > span[ng-if="!selectedPaymentPlan"]').then(($value) => {
        let orderAmountString = $value.text().trim();
        // Keep only number
        let orderAmount = parseFloat(orderAmountString.replace(/\$/g, ""));
        cy.log(`The order amount is ${orderAmount}`);
        if (orderAmount > 29.99) {
          throw new Error(
            "Order amount is larger than $30. Can't verify the 'Interac' button absence. Make the amount less than $30 and run the test again."
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
    { tags: ["e2e", "membership-group", "orders", "checkout"] },
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
        cy.url()
          .should("include", uniqueMembershipName.toLowerCase())
          .wait(700);
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
      // Verify if tickets were properly added to cart
      cy.throwErrorIfNoTicketsInCart();
      // Complete the order
      // Click 'REVIEW' tab
      cy.get('md-tab-item[role="tab"] > span')
        .eq(3)
        .contains("Review")
        .should("exist")
        .click({ force: true });
      cy.navigateToReviewPageIfStillNotThere();
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
      // Ensure the data loading indicator disappears
      cy.get(
        'div[class="full-loader"] > md-progress-circular[role="progressbar"]',
        { timeout: 9000 }
      ).should("not.exist");
      // Ensure the order confirmation page shows up
      cy.get('h1[class^="md-display"]')
        .should("exist")
        .should("be.visible")
        .should("contain.text", "Thank you!");
      // Save the Order/Transaction ID in cypress/fixtures/dynamic-values.json
      cy.saveOrderIdInJson();
      // Navigate to 'My Orders' page
      cy.visit("/account/my-orders/").wait(900);
      // Retrieve Order ID from cypress/fixtures/dynamic-values.json
      cy.openOrderByOrderId();
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
    { tags: ["e2e", "membership-group", "checkout"] },
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
        cy.visit(`/dashboard/memberships/`).wait(900);
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
    { tags: ["e2e", "checkout"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.visit(`/automation-event-3/`).wait(700);
      cy.log("Click 'BUY TICKETS'");
      cy.chakraParagraphButtonByText("BUY TICKETS")
        .eq(0)
        .click({ force: true });
      cy.log("Add 1 ticket from each ticket type (2 ticket types in total)");
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
        cy.getChakraSpinnerLoadingIndicator().should("not.exist");
        cy.wait(500);
        cy.getChakraSpinnerLoadingIndicator().should("not.exist");
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
    { tags: ["e2e", "appearance", "checkout"] },
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
      // Verify if tickets were properly added to cart
      cy.throwErrorIfNoTicketsInCart();
      // Click 'REVIEW' tab
      cy.get('md-tab-item[role="tab"] > span')
        .eq(3)
        .contains("Review")
        .should("exist")
        .click({ force: true });
      cy.navigateToReviewPageIfStillNotThere();
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
    { tags: ["e2e", "checkout"] },
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
      cy.url().should("contain", uniqueEventName).wait(700);
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
      cy.get('div[id="description"] > div[data-testid="card"] > div > h2')
        .should("exist")
        .should("contain.text", "Tickets are not required for this event.");
    }
  );
  // ***************************************************************************
  it(
    "ensuring that ticket pricing and taxes during checkout are correct-TA-105",
    { tags: ["e2e", "orders", "smoke", "checkout"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.regularUserForOrganization3and4);
      cy.navigateToDashboard(this.testdata.regularUserForOrganization3and4);
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
      cy.clickLogOutButton();
      cy.wait(700);
      // Open just created event
      cy.visit(`/${uniqueEventName}/`);
      cy.url().should("contain", uniqueEventName).wait(700);
      // ***** Begin verifying pricing and taxes
      // Click 'BUY TICKETS'
      cy.chakraParagraphButtonByText("BUY TICKETS")
        .eq(0)
        .click({ force: true });
      // Wait for the 'Tickets' modal window
      cy.get('header[class^="chakra-modal__header"] > div > div > p')
        .first()
        .should("have.text", "Tickets");
      // ***** Verify the 'Regular admission' ticket pricing and taxes
      cy.get('div[data-testid="ticket-types-card-container"]')
        .first()
        .find('h3[class^="chakra-heading"] > span')
        .first()
        .should("have.text", "$6.63");
      // Left hand fee value
      cy.get('div[data-testid="ticket-types-card-container"]')
        .first()
        .find('p[class^="chakra-text"] > span')
        .first()
        .should("have.text", "$5.50");
      // Right hand fee value
      cy.get('div[data-testid="ticket-types-card-container"]')
        .first()
        .find('p[class^="chakra-text"] > span')
        .eq(1)
        .should("have.text", "$1.13");
      // ***** Verify the 'VIP' ticket pricing and taxes
      cy.get('header[class^="chakra-modal__header"] > div > div > p')
        .first()
        .should("have.text", "Tickets");
      // ***** Verify the 'Regular admission' ticket pricing and taxes
      cy.get('div[data-testid="ticket-types-card-container"]')
        .last()
        .find('h3[class^="chakra-heading"] > span')
        .first()
        .should("have.text", "$11.82");
      // Left hand fee value
      cy.get('div[data-testid="ticket-types-card-container"]')
        .last()
        .find('p[class^="chakra-text"] > span')
        .first()
        .should("have.text", "$10.50");
      // Right hand fee value
      cy.get('div[data-testid="ticket-types-card-container"]')
        .last()
        .find('p[class^="chakra-text"] > span')
        .eq(1)
        .should("have.text", "$1.32");
      // Add tickets to cart and proceed to checkout
      cy.addTicketsToCartAndProceedToCheckoutWithLoginViaTabButtonAngular(
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
      cy.navigateToReviewPageIfStillNotThere();
      // *** Review page
      // Verify the 'Review' header
      cy.get('span[class^="md-title strong"]')
        .contains("Review")
        .should("exist")
        .should("be.visible");
      // ***** Verify pricing and taxes on the 'Review' page in AngularJS
      // Regular admission ticket
      cy.get('td[ng-if="!cart.basket.absorb_enabled"] > span')
        .first()
        .should("exist")
        .should("have.text", "$5.50");
      // VIP ticket
      cy.get('td[ng-if="!cart.basket.absorb_enabled"] > span')
        .last()
        .should("exist")
        .should("have.text", "$10.50");
      // Verify Sub Total
      cy.get('div[class="cart-breakdown"]')
        .find(
          `span[ng-bind="cart.basket.subtotal_1 | currencySymbol:paymentVenue.currency:'en'"]`
        )
        .should("exist")
        .should("have.text", "$16.00");
      // Verify Service Fees
      cy.get('div[class="cart-breakdown"]')
        .find(
          `span[ng-bind="cart.getInternalFeesTotal() | currencySymbol:paymentVenue.currency:'en'"]`
        )
        .should("exist")
        .should("have.text", "$2.45");
      // Verify Grand Total
      cy.get('div[class="cart-breakdown"]')
        .find(`span[ng-if="!selectedPaymentPlan"]`)
        .first()
        .should("exist")
        .should("have.text", "$18.45 CAD");
    }
  );
  // ***************************************************************************
  it(
    "verifying an error message when tickets can't be pruchased at the same time-TA-107",
    { tags: ["e2e", "checkout"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.regularUserForOrganization3and4);
      cy.navigateToDashboard(this.testdata.regularUserForOrganization3and4);
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
      cy.clickLogOutButton();
      // Open just created event
      cy.visit(`/${uniqueEventName}/`);
      cy.url().should("contain", uniqueEventName).wait(700);
      // Click 'BUY TICKETS'
      cy.chakraParagraphButtonByText("BUY TICKETS")
        .eq(0)
        .click({ force: true });
      // Wait for the 'Tickets' modal window
      cy.get('header[class^="chakra-modal__header"] > div > div > p')
        .first()
        .should("have.text", "Tickets");
      // Add tickets to cart
      cy.addTicketsToCart(2, 1);
      // Close modal window by clicking (X)
      cy.get('button[class^="chakra-modal__close-btn"][aria-label="Close"]')
        .should("exist")
        .click({ force: true });
      // Go to Home page by clicking Showpass logo
      cy.get('img[alt="showpass"]').should("be.visible").click({ force: true });
      const apiUpcomingEvents =
        "/api/public/venues/qa-team-organization/upcoming-events/*";
      cy.intercept(apiUpcomingEvents).as("apiUpcomingEvents");
      // Open another event
      cy.visit("/automation-event-3/");
      cy.url().should("contain", "/automation-event-3/");
      cy.wait(300);
      cy.wait("@apiUpcomingEvents")
        .its("response.statusCode")
        .should(
          "be.oneOf",
          [200, 204],
          "Verifying the Upcoming Events response status code."
        );
      // Click 'BUY TICKETS'
      cy.chakraParagraphButtonByText("BUY TICKETS")
        .eq(0)
        .click({ force: true });
      // Click 'Add item' button (+) to add a ticket to cart
      cy.getChakraSpinnerLoadingIndicator().should("not.exist");
      cy.get('button[class^="chakra-button"][aria-label="Add item"]')
        .first()
        .as("addItemToCartButton");
      cy.get("@addItemToCartButton").should("exist").click({ force: true });
      // Verify the error message content
      cy.get('div[status="error"][class^="css"] > div > div > p')
        .first()
        .as("errorMsg");
      cy.get("@errorMsg")
        .should("exist")
        .scrollIntoView({ force: true })
        .should(
          "contain.text",
          "Sorry, you have items in your cart that cannot be purchased at the same time. Please finish your current purchase or clear your cart and try again."
        );
      cy.get("@errorMsg")
        .should("exist")
        .scrollIntoView({ force: true })
        .should("be.visible");
    }
  );
  // ***************************************************************************
});
