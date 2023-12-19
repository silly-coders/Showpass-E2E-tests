describe("Verify purchased tickets by ", () => {
  beforeEach(function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
    });
  });

  // ***************************************************************************
  it(
    "ensuring that an event owner can purchase tickets with a single barcode-TA-68",
    { tags: ["e2e", "barcodes", "orders", "smoke", "checkout"] },
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
      // Ensure the 'Search events' field on the 'Home' page shows up
  cy.verifyElementPresenceByLocatorAndIndex(
    'input[id="EventSearchInput-input"]',
    0, {timeout: 3000}
  );  
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
      cy.addTicketsToCartAndProceedToCheckoutWithLoginViaTabButtonAngular(
        this.testdata.regularUserForOrganization3and4,
        1
      );
      // Verify if tickets were properly added to cart
      cy.throwErrorIfNoTicketsInCart();
      // Complete the order
      cy.completeOrderWithSavedPaymentMethodOnAngular(
        this.testdata.regularUserForOrganization3and4
      );
      // Navigate to 'My Orders' page
      cy.visit("/account/my-orders/").wait(900);
      cy.openOrderByOrderId();
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
    { tags: ["e2e", "barcodes", "orders", "smoke", "checkout"] },
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
      cy.visit(`/s/events/all/?q=${uniqueEventName}`);
      cy.url().should("contain", uniqueEventName).wait(700);
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
      // Verify if tickets were properly added to cart
      cy.throwErrorIfNoTicketsInCart();
      // Complete the order
      cy.completeOrderWithSavedPaymentMethodOnAngular(
        this.testdata.userForOrganization3and4
      );
      // Click 'Showpass' logo to navigate to the 'Home' page
      cy.get('.container > [href="/"] > .logo')
        .should("exist")
        .should("be.visible")
        .click({ force: true });
      // Ensure the 'Search events' field on the 'Home' page shows up
  cy.verifyElementPresenceByLocatorAndIndex(
    'input[id="EventSearchInput-input"]',
    0, {timeout: 3000}
  );  
      // Navigate to 'My Orders' page
      cy.visit("/account/my-orders/").wait(900);
      cy.openOrderByOrderId();
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
    { tags: ["e2e", "barcodes", "orders", "smoke", "checkout"] },
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
      // Sign out
      cy.clickUsernameOnTopBar();
      cy.clickLogOutButton();
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
      cy.url().should("contain", uniqueEventName).wait(700);
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
      // Verify if tickets were properly added to cart
      cy.throwErrorIfNoTicketsInCart();
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
    { tags: ["e2e", "orders", "smoke", "checkout"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userForSingleBarcodeTesting);
      // Do not change event or event name as the tickets get added to this event in the after() hook
      let uniqueEventName = "verify-payment-event-1697684780";
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
        .should("contain.text", "Thank you!", {timeout: 5000});
      cy.saveOrderIdInJson();
      // Navigate to 'My Orders' page
      cy.visit("/account/my-orders/").wait(900);
      cy.openOrderByOrderId();
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
    { tags: ["e2e", "orders", "smoke", "checkout"] },
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
      cy.navigateToHomePage();
      cy.registerNewUserByProvidingUniqueEmail(userDetails);
      let totalExpectedNumberOfEventDays = 5;
      // Do not change event or event name as the tickets get added to this event in the after() hook
      let uniqueEventName = "Test-multiple-days-event";
      // Open just created event
      cy.visit(`/s/events/all/?q=${uniqueEventName.toLowerCase()}`);
      cy.url().should("contain", uniqueEventName.toLowerCase()).wait(700);
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
        .click({ force: true })
        .wait(900);
      // If still or already NOT logged in - log into the portal
      cy.logInIfStillLoggedOut(userDetails);
      // Navigate to 'My Orders' page
      cy.visit("/account/my-orders/").wait(900);
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
    "replenishing event ticket stock for TA-90 (purchases.cy.js)",
    { tags: ["e2e", "barcodes", "orders", "smoke", "checkout"] },
    function () {
      cy.log("Going to replenish the event ticket stock (purchases.cy.js)");
      cy.replenishEventTicketStock(
        this.testdata.userForSingleBarcodeTesting,
        "verify-payment-event-1697684780"
      );
    }
  );
  // ***************************************************************************
  it(
    "ensuring that tickets in staging with multiple barcodes contain all crucial event data-TA-120",
    { tags: ["e2e", "barcodes", "orders", "smoke", "checkout"] },
    function () {
      cy.navigateToHomePage();
      let uniqueEventName = "automation-event-1701885025";
      // Open the event
      cy.visit(`/s/events/all/?q=${uniqueEventName}`);
      cy.url().should("contain", uniqueEventName).wait(700);
      // Click on the event card to open the event
      cy.getChakraSkeletonItem()
        .contains(uniqueEventName)
        .click({ force: true });
      cy.url().should("contain", uniqueEventName);
      // Click 'Buy tickets'
      cy.chakraParagraphButtonByText("BUY TICKETS")
        .eq(0)
        .click({ force: true });
      // Add tickets to cart
      cy.log("Add 1 ticket from each ticket type (2 ticket types in total)");
      cy.addTicketsToCart(2, 1);
      // Click 'Checkout' button
      cy.clickChakraButtonByText("CHECKOUT");
      // NOTE: !!! There is a limit on how many credit card transactions a user can make
      // As such we will be using a new unique user each time we purchase a tiket
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
      // Complete order as a guest
      cy.completeOrderAsGuestOnAngular(
        userDetails,
        this.testdata.visaDebitForTesting
      );
      // Save the staging-order href value in cypress/fixtures/dynamic-values.json for later
      cy.get(
        'a[class^="md-button md-raised md-primary"][ng-href*="/account/my-orders/invoice-staging/"]'
      )
        .invoke("attr", "ng-href")
        .then((href) => {
          cy.log(`Going to save the URL in "dynamic-values.json": [${href}]`);
          // Save href value in the JSON file
          cy.writeFile("cypress/fixtures/dynamic-values.json", {
            stagingOrderHref: href,
          });
        });
      // Remove the 'target' attribute from the 'Add to wallet' button to open URL in the same tab and then click the button
      cy.get(
        'a[class^="md-button md-raised md-primary"][ng-href*="/account/my-orders/invoice-staging/"]'
      )
        .should("exist")
        .invoke("removeAttr", "target")
        .click({ force: true })
        .wait(900);
      // Click on the Showpass logo to move to the Home page
      cy.verifyShowpassLogoAppearance().first().click({force: true});  
      // Open order URL taken from cypress/fixtures/dynamic-values.json
      cy.readFile("cypress/fixtures/dynamic-values.json").then((value) => {
        cy.log(`Going to open the following order: ${value.stagingOrderHref}`);
        cy.visit(value.stagingOrderHref).wait(900);
        cy.visit(value.stagingOrderHref).wait(900);
        cy.url().should("contain", "/account/my-orders/");
      });
      // Save the order transaction ID in cypress/fixtures/dynamic-values.json for later
      // Trim the full text value by keeping only the ID itself
      cy.get('div[class^="css"] > h1[class^="css"]')
        .eq(0)
        .as("orderPageHeader");
      cy.get("@orderPageHeader")
        .should("exist")
        .then(($value) => {
          const textValue = $value.text();
          // Keep the ID only
          let stagingOrderId = textValue.substring(textValue.indexOf(" ") + 1);
          cy.log(`Current Order transaction ID is: ${stagingOrderId}`);
          cy.url().should("contain", `/account/my-orders/${stagingOrderId}`);
          // Save Order transaction ID in the JSON file under fixtures
          cy.writeFile("cypress/fixtures/dynamic-values.json", {
            stagingOrderId: stagingOrderId,
          });
        });
      // *** Ticket details validation
      // Verify the following elements existance
      let elementlocators = {
        ticketheader: 'div[data-testid="invoice-header"] > p',
        barcodeQrCode: 'div[data-testid^="ticket-barcode"]',
        nameOnTicket: 'p[data-testid="name-on-ticket"]',
        barcodeIdText: 'p[data-testid="barcode-text"]',
        ticketCategory: 'p[data-testid="ticket-type-name"]',
      };
      for (let i = 0; i < Object.keys(elementlocators).length; i++) {
        cy.log(
          `Going to verify this element now: ${Object.keys(elementlocators).at(
            i
          )}`
        );
        cy.log(
          `FOUND IN TOTAL ${
            Object.keys(elementlocators).length
          } elements with locator: ${Object.values(elementlocators).at(i)}`
        );
        cy.get(Object.values(elementlocators).at(i))
          .should("exist")
          .should("have.lengthOf", 2);
        cy.log(
          "Key: " +
            Object.keys(elementlocators).at(i) +
            ", Value: " +
            Object.values(elementlocators).at(i)
        );
      }
      for (let j = 0; j < 2; j++) {
        // Verify header on all tickets
        cy.get(Object.values(elementlocators).at(0))
          .eq(j)
          .should("exist")
          .should("contain.text", uniqueEventName.toLowerCase());
        // Verify name on all tickets
        cy.get(Object.values(elementlocators).at(2))
          .eq(j)
          .should("exist")
          .should("contain.text", userDetails.username);
      }
      // Verify all ticket categories
      cy.get(Object.values(elementlocators).at(4))
        .should("exist")
        .should("contain.text", "VIP");
      cy.get(Object.values(elementlocators).at(4))
        .should("exist")
        .should("contain.text", "Regular admission");
    }
  );
  // ***************************************************************************
  it(
    "replenishing event ticket stock for TA-120 (multiple barcodes in staging)",
    { tags: ["e2e", "barcodes", "orders", "smoke", "checkout"] },
    function () {
      cy.log(
        "Going to replenish the 'automation-event-1701885025' event ticket stock (purchases.cy.js)"
      );
      cy.replenishEventTicketStock(
        this.testdata.regularUserForOrganization5,
        "automation-event-1701885025"
      );
    }
  );
  // ***************************************************************************
  it(
    "ensuring that tickets in staging with a SINGLE barcode contain all event data-TA-121",
    { tags: ["e2e", "barcodes", "orders", "smoke", "checkout"] },
    function () {
      cy.navigateToHomePage();
      let uniqueEventName = "verify-payment-event-1697684780/";
      // Open the event
      cy.visit(`/${uniqueEventName}/`);
      cy.url().should("contain", uniqueEventName).wait(700);
      // Click 'Buy tickets'
      cy.chakraParagraphButtonByText("BUY TICKETS")
        .eq(0)
        .click({ force: true });
      // Add tickets to cart
      cy.log("Add 1 ticket from each ticket type (2 ticket types in total)");
      cy.addTicketsToCart(2, 1);
      // Click 'Checkout' button
      cy.clickChakraButtonByText("CHECKOUT");
      // NOTE: !!! There is a limit on how many credit card transactions a user can make
      // As such we will be using a new unique user each time we purchase a tiket
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
      // Complete order as a guest
      cy.completeOrderAsGuestOnAngular(
        userDetails,
        this.testdata.visaDebitForTesting
      );
      // Save the staging-order href value in cypress/fixtures/dynamic-values.json for later
      cy.get(
        'a[class^="md-button md-raised md-primary"][ng-href*="/account/my-orders/invoice-staging/"]'
      )
        .invoke("attr", "ng-href")
        .then((href) => {
          cy.log(`Going to save the URL in "dynamic-values.json": [${href}]`);
          // Save href value in the JSON file
          cy.writeFile("cypress/fixtures/dynamic-values.json", {
            stagingOrderHref: href,
          });
        });
      // Remove the 'target' attribute from the 'Add to wallet' button to open URL in the same tab and then click the button
      cy.get(
        'a[class^="md-button md-raised md-primary"][ng-href*="/account/my-orders/invoice-staging/"]'
      )
        .should("exist")
        .invoke("removeAttr", "target")
        .click({ force: true })
        .wait(900);
      // Click on the Showpass logo to move to the Home page
      cy.verifyShowpassLogoAppearance().first().click({force: true});
      // Open order URL taken from cypress/fixtures/dynamic-values.json
      cy.readFile("cypress/fixtures/dynamic-values.json").then((value) => {
        cy.log(`Going to open the following order: ${value.stagingOrderHref}`);
        cy.visit(value.stagingOrderHref).wait(900);
        cy.visit(value.stagingOrderHref).wait(900);
        cy.url().should("contain", "/account/my-orders/");
      });
      // Save the order transaction ID in cypress/fixtures/dynamic-values.json for later
      // Trim the full text value by keeping only the ID itself
      cy.get('div[class^="css"] > h1[class^="css"]')
        .eq(0)
        .as("orderPageHeader");
      cy.get("@orderPageHeader")
        .should("exist")
        .then(($value) => {
          const textValue = $value.text();
          // Keep the ID only
          let stagingOrderId = textValue.substring(textValue.indexOf(" ") + 1);
          cy.log(`Current Order transaction ID is: ${stagingOrderId}`);
          cy.url().should("contain", `/account/my-orders/${stagingOrderId}`);
          // Save Order transaction ID in the JSON file under fixtures
          cy.writeFile("cypress/fixtures/dynamic-values.json", {
            stagingOrderId: stagingOrderId,
          });
        });
      // *** Ticket details validation
      // Verify the main grey section with the barcode and other event details
      let eventDetails = [
        "Name on Ticket",
        "User ForTesting",
        "Barcode",
        "Items",
        "Regular admission",
        "verify-payment-event-1697684780",
        "Starts",
        "19th Oct, 2023 | 9:00 PM MDT",
        "Ends",
        "15th Oct, 2035 | 10:00 PM MDT",
        "VIP",
      ];
      for (let i = 0; i < eventDetails.length; i++) {
        cy.log(`Going to verify the following text: ${eventDetails.at(i)}`);
        cy.get('div[data-testid="invoice-barcode"]')
          .find('div[class^="css"] > p[class^="chakra-text"]')
          .contains(eventDetails.at(i))
          .should("exist");
      }
      // Verify the barcode presence
      cy.get('div[class^="css"] > canvas[aria-label="qr code icon"]').should(
        "exist"
      );
      cy.get('div[data-testid="invoice-barcode"] > div')
        .eq(1)
        .find('span[status="info"]')
        .contains("Order Barcode");
    }
  );
  // ***************************************************************************
});
