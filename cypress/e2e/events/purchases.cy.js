describe("Verify purchased tickets by ", () => {
  beforeEach(function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
    });
  });

  // ***************************************************************************
  it(
    "ensuring that an event owner can purchase tickets with a single barcode-TA-68",
    { tags: ["e2e", "barcodes", "orders", "smoke"] },
    function () {
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
      cy.addTicketsToCartAndProceedToCheckoutWithLoginViaTabButtonAngular(
        this.testdata.regularUserForOrganization3and4,
        1
      );
      // Complete the order
      cy.completeOrderWithSavedPaymentMethodOnAngular(
        this.testdata.regularUserForOrganization3and4
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
      // ***** Verify order details *****
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
      cy.signOut();
      // Open just created event
      cy.visit(`/s/events/all/?q=${uniqueEventName}`);
      cy.url().should("contain", uniqueEventName);
      // Click on the event card to open the event
      cy.getChakraSkeletonItem()
        .contains(uniqueEventName)
        .click({ force: true });
      cy.url().should("contain", uniqueEventName);
     // Add tickets to cart and proceed to checkout
     cy.addTicketsToCartAndProceedToCheckoutWithLoginViaTabButtonAngular(
      this.testdata.userForOrganization3and4,
      1
    );
    // Complete the order
    cy.completeOrderWithSavedPaymentMethodOnAngular(
      this.testdata.userForOrganization3and4
    );
      // Click 'Showpass' logo to navigate to the 'Home' page
      cy.get('.container > [href="/"] > .logo')
        .should("exist")
        .should("be.visible")
        .click({ force: true });
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
      var uniqueUserEmail =
        "qa+" + Math.floor(Date.now() / 1000) + "@showpass.com";
      let userDetails = {
        userEmail: uniqueUserEmail,
        userPassword: "!@Newuser2023",
        userFirstName: "User",
        userLastName: "ForTesting",
        phoneNumber: "8883331155",
        username: "User ForTesting",
      };
      cy.registerNewUserByProvidingUniqueEmail(userDetails);
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
        userDetails,
        this.testdata.visaDebitForTesting
      );
    }
  );
  // ***************************************************************************
  it(
    "ensuring that Interac can be used to purchase tickets-TA-90",
    { tags: ["e2e", "orders", "smoke"] },
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
      // Verify order details
      // Verify event names within the 'Items' section for all ticket types
      for (let i = 0; i < 2; i++) {
        cy.log(
          'Going to verify event name within the "Items" section for both ticket types'
        );
        cy.get(
          `div[data-testid="invoice-barcode-item-${i}"] > div > div > p`
        ).contains(uniqueEventName);
      }
    }
  );
  // ***************************************************************************
  it(
    "verifying that multiple day event tickets can be purchased-TA-93",
    { tags: ["e2e", "orders", "smoke"] },
    function () {
      var uniqueUserEmail =
        "qa+" + Math.floor(Date.now() / 1000) + "@showpass.com";
      let userDetails = {
        userEmail: uniqueUserEmail,
        userPassword: "!@Newuser2023",
        userFirstName: "User",
        userLastName: "ForTesting",
        phoneNumber: "8883331155",
        username: "User ForTesting",
      };
      cy.registerNewUserByProvidingUniqueEmail(userDetails);
      let totalExpectedNumberOfEventDays = 5;
      // Do not change event or event name as the tickets get added to this event in the after() hook
      let uniqueEventName = "Test-multiple-days-event";
      // Open just created event
      cy.visit(`/s/events/all/?q=${uniqueEventName.toLowerCase()}`);
      cy.url().should("contain", uniqueEventName.toLowerCase());
      // Click on the event card to open the event
      cy.getChakraSkeletonItem()
        .contains(uniqueEventName)
        .click({ force: true });
      cy.url().should("contain", uniqueEventName.toLowerCase());
      // Click 'BUY TICKETS'
      cy.get('button[class^="chakra-button"] > p')
        .contains("BUY TICKETS")
        .click({ force: true });
      // Verify that the 'Tickets' modal windo showed up
      cy.getChakraModalWindow();
      cy.get('header[class^="chakra-modal__header"] > div > div > p')
        .first()
        .should("contain.text", "Tickets");
      // Verify a total number of all multiple-day tickets available
      cy.log(
        "Verifying that a number of recurring events (available event days) is correct."
      );
      cy.get('div[data-testid="recurring-timeslot-modal"]')
        .find('div[data-testid="card"]')
        .then(($value) => {
          let totalEventDaysCount = $value.length;
          expect(totalEventDaysCount).to.equal(
            totalExpectedNumberOfEventDays,
            "Looks like the total number of recurring events is NOT correct."
          );
        });
      // ***** Add tickets for each event day to cart *****
      for (let i = 0; i < totalExpectedNumberOfEventDays; i++) {
        cy.log(`Going to add event day # ${i + 1} to cart.`);
        // Click the event day card
        cy.get('div[data-testid="recurring-timeslot-modal"]')
          .find('div[data-testid="card"]')
          .eq(i)
          .should("exist")
          .scrollIntoView({ force: true })
          .click({ force: true });
        // Wait for the plus (+) button to show up
        cy.wait(700);
        cy.get('button[class^="chakra-button"][aria-label="Add item"]')
          .should("exist")
          .should("be.visible");
        // Add ticket(s) to cart
        cy.addTicketsToCartNoApiValidation(1, 1);
        cy.wait(300);
        // Click 'Back' to navigate back and select more tickets
        cy.getChakraButtonByText("Back")
          .should("exist")
          .should("be.visible")
          .click({ force: true });
        cy.wait(700);
        // Ensure you are on the 'Select a Date' modal window
        cy.get('div[data-testid="card"]')
          .first()
          .should("exist")
          .scrollIntoView({ force: true })
          .should("be.visible");
      }
      // Click 'Checkout' button
      cy.clickChakraButtonByText("CHECKOUT");
      // Complete the order
      cy.completeOrderAsGuestOnAngular(
        userDetails,
        this.testdata.visaDebitForTesting
      );
      // Click 'Showpass' logo to navigate to the 'Home' page
      cy.get('.container > [href="/"] > .logo')
        .should("exist")
        .should("be.visible")
        .click({ force: true });
      // Navigate to 'My Orders' page
      cy.visit("/account/my-orders/");
      // ***** Verify my order details *****
      // Click the first 'View Order' button at the very top
      cy.get('button[class^="chakra-button"] > div > div > span')
        .eq(0)
        .contains("View Order")
        .as("viewOrderButton");
      cy.get("@viewOrderButton").click().wait(500);
      // Make sure the 'Back' button on the 'Order' page shows up
      cy.getChakraButtonByText("Back");
      // Verify the number of purchased items in the order
      cy.get('div[data-testid="invoice-barcode-items"]')
        .find('div[data-testid^="invoice-barcode-item"]')
        .then(($value) => {
          let totalPurchasedItems = $value.length;
          expect(totalPurchasedItems).to.equal(
            totalExpectedNumberOfEventDays,
            "Looks like the total number of purchased items is NOT correct."
          );
        });
      // Verify item details
      for (let j = 0; j < totalExpectedNumberOfEventDays; j++) {
        cy.get('div[data-testid="invoice-barcode-items"]')
          .find(`div[data-testid="invoice-barcode-item-${j}"] > div > div > p`)
          .eq(0)
          .should("have.text", "Regular admission");
        cy.get('div[data-testid="invoice-barcode-items"]')
          .find(`div[data-testid="invoice-barcode-item-${j}"] > div > div > p`)
          .eq(1)
          .should("have.text", "Test-multiple-days-event");
        cy.get('div[data-testid="invoice-barcode-items"]')
          .find(`div[data-testid="invoice-barcode-item-${j}"] > div > div > p`)
          .eq(3)
          .should("contain.text", "Oct, 2023 |");
        cy.get('div[data-testid="invoice-barcode-items"]')
          .find(`div[data-testid="invoice-barcode-item-${j}"] > div > div > p`)
          .eq(5)
          .should("contain.text", "Nov, 2035 |");
      }
    }
  );
  // ***************************************************************************
  it(
    "replenishing event ticket stock (purchases.cy.js)",
    { tags: ["e2e", "barcodes", "orders", "smoke"] },
    function () {
      cy.log("Going to replenish the event ticket stock (purchases.cy.js)");
      cy.logIntoPortal(this.testdata.userForSingleBarcodeTesting);
      // Do not change event or event name as the tickets get added to this event for further testing
      let uniqueEventName = "verify-payment-event-1697684780";
      cy.visit(`/dashboard/events/${uniqueEventName}/manage/#/edit`);
      cy.wait(3000);
      // Add more tickets to the first ticket type
      cy.get('input[name="ticketTypeInventory0"]')
        .should("exist")
        .scrollIntoView({ force: true })
        .should("be.visible")
        .clear({ force: true })
        .type(1500000);
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
    }
  );
  // ***************************************************************************
});
