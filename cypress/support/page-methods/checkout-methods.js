/**
 * Method to complete an order after adding tickets to the cart
 * @param userDetails
 * @param creditCardDetails
 */
Cypress.Commands.add(
  "completeOrderOnAngular",
  (userDetails, creditCardDetails) => {
    cy.log("Going to completeOrderOnAngular()");
    // Click 'Check out as a guest' if the button shows up
    cy.clickButtonIfAvailableBasedOnLocatorIndexText(
      `button[ng-click="beginGuestCheckout(); amplitudeEvent.track('Checkout: Guest Checkout')"] > span`,
      0,
      "Check out as a Guest"
    );
    cy.wait(300);
    // *** More Events page
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
    cy.typeText('input[ng-model="confirmEmail"]', 0, userDetails.userEmail);
    // Click 'Next'
    cy.get(
      'button[class^="md-raised md-primary pull-right"][type="submit"] > span'
    )
      .eq(0)
      .contains("Next")
      .click({ force: true });
    cy.wait(300);
    // Verify the 'Payment Method' header
    cy.get('h2[class^="md-title strong"]').should("exist");
    cy.wait(300);
    // Scroll the header into view
    cy.get('h2[class^="md-title strong"]')
      .eq(0)
      .scrollIntoView({ force: true });
    // Wait for the 'Pay with link' iFrame to load
    cy.wait(3000);
    // Enter 'Billing Address'
    cy.typeText(
      'input[type="search"]',
      0,
      "150 King Street West, Toronto, ON, Canada"
    );
    cy.wait(3000);
    // Select the first address in the list
    cy.get('span[md-highlight-text="AddressAutoController.selectedAddress"]')
      .eq(0)
      .should("be.visible")
      .click({ force: true });
    // Enter Payment Information
    cy.wait(300);
    cy.typeText(
      'input[name="ccName"]',
      0,
      `${userDetails.userFirstName} ${userDetails.userLastName}`
    );
    // Populate credit card info
    cy.populateCreditCardInformationFormInAngular(creditCardDetails);
    // Click 'Pay $XX.XX CAD'
    cy.get('button[ng-click="setBillingAndShippingFields()"][type="submit"]')
      .should("be.visible")
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
  }
);
// *********************************************************************
/**
 * Populate 'Credit Card Information' in Angular
 * @param creditCardDetails
 */
Cypress.Commands.add(
  "populateCreditCardInformationFormInAngular",
  (creditCardDetails) => {
    cy.log("Going to populateCreditCardInformationFormInAngular()");
    cy.wait(300);
    // Populate Credit Card number
    const getIframeBody1 = () => {
      return cy
        .get('iframe[name*="privateStripeFrame"]')
        .eq(1)
        .its("0.contentDocument.body")
        .should("not.be.empty")
        .then(cy.wrap);
    };
    getIframeBody1()
      .find('input[class^="InputElement"]')
      .scrollIntoView({ force: true })
      .type(" ", { force: true })
      .type(creditCardDetails.cardNumber, { force: true });
    cy.wait(300);
    // Populate Expiry date
    const getIframeBody2 = () => {
      return cy
        .get('iframe[name*="privateStripeFrame"]')
        .eq(2)
        .its("0.contentDocument.body")
        .should("not.be.empty")
        .then(cy.wrap);
    };
    getIframeBody2()
      .find('input[class^="InputElement"]')
      .scrollIntoView({ force: true })
      .type(" ", { force: true })
      .type(creditCardDetails.expiry, { force: true });
    cy.wait(300);
    // Populate CVC number
    const getIframeBody3 = () => {
      return cy
        .get('iframe[name*="privateStripeFrame"]')
        .eq(3)
        .its("0.contentDocument.body")
        .should("not.be.empty")
        .then(cy.wrap);
    };
    getIframeBody3()
      .find('input[class^="InputElement"]')
      .scrollIntoView({ force: true })
      .type(" ", { force: true })
      .type(creditCardDetails.cvcNumber, { force: true });
    cy.wait(300);
  }
);
// *********************************************************************
/**
 * Method to go through checkout after adding tickets to the cart
 */
Cypress.Commands.add("goThroughCheckoutBeforePayment", (userDetails) => {
  cy.log("Going to goThroughCheckoutBeforePayment()");
  // Click 'Check out as a guest' if the button shows up
  cy.clickButtonIfAvailableBasedOnLocatorIndexText(
    `button[ng-click="beginGuestCheckout(); amplitudeEvent.track('Checkout: Guest Checkout')"] > span`,
    0,
    "Check out as a Guest"
  );
  cy.wait(300);
  // *** More Events page
  // Click 'REVIEW' tab
  cy.get('md-tab-item[role="tab"] > span')
    .eq(3)
    .contains("Review")
    .should("exist")
    .click({ force: true })
    .wait(300)
    .click({ force: true });
  // *** Review page
  // Verify the 'Review' header
  cy.get('span[class^="md-title strong"]')
    .contains("Review")
    .should("be.visible");
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
  cy.get('input[ng-model="confirmEmail"]')
    .should("be.visible")
    .type(userDetails.userEmail);
  // Click 'Next'
  cy.get(
    'button[class^="md-raised md-primary pull-right"][type="submit"] > span'
  )
    .eq(0)
    .contains("Next")
    .click({ force: true });
  cy.get(300);
});
// *********************************************************************
/**
 * Method to complete an order as A GUEST after adding tickets to the cart
 */
Cypress.Commands.add(
  "completeOrderAsGuestOnAngular",
  (userDetails, creditCardDetails) => {
    cy.log("Going to completeOrderAsGuestOnAngular()");
    // Click 'Check out as a guest' if the button shows up
    cy.clickButtonIfAvailableBasedOnLocatorIndexText(
      `button[ng-click="beginGuestCheckout(); amplitudeEvent.track('Checkout: Guest Checkout')"] > span`,
      0,
      "Check out as a Guest"
    );
    cy.wait(300);
    // *** More Events page
    // Click 'REVIEW' tab
    cy.get('md-tab-item[role="tab"] > span')
      .eq(3)
      .contains("Review")
      .should("exist")
      .click({ force: true })
      .wait(300)
      .click({ force: true });
    // *** Review page
    // Verify the 'Review' header
    cy.get('span[class^="md-title strong"]')
      .contains("Review")
      .should("be.visible");
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
    // Enter 'Full Name'
    cy.get('input[name="name"]')
      .eq(0)
      .should("exist")
      .scrollIntoView({ force: true })
      .type(`${userDetails.userFirstName} ${userDetails.userLastName}`);
    // Enter 'Phone'
    cy.get('input[type="tel"]')
      .eq(0)
      .should("exist")
      .scrollIntoView({ force: true })
      .type(`${userDetails.phoneNumber}`);
    // Enter 'Email'
    cy.get('input[type="email"]')
      .eq(0)
      .should("exist")
      .scrollIntoView({ force: true })
      .type(userDetails.userEmail);
    // Enter 'Confirm Email'
    cy.get('input[ng-model="confirmEmail"]')
      .eq(0)
      .should("be.visible")
      .type(userDetails.userEmail);

    // Click 'Next' to go to 'Payment'
    cy.get(
      'button[class^="md-raised md-primary pull-right"][type="submit"] > span'
    )
      .eq(0)
      .contains("Next")
      .click({ force: true });
    cy.get(300);
    // Verify the 'Payment Method' header
    cy.get('h2[class^="md-title strong"]').should("exist");
    // Scroll the header into view
    cy.get('h2[class^="md-title strong"]')
      .eq(0)
      .scrollIntoView({ force: true });
    // Wait for the 'Pay with link' iFrame to load
    cy.wait(3000);
    // Enter 'Billing Address'
    cy.get('input[type="search"]').as("addressField");
    cy.get("@addressField").should("exist").scrollIntoView({ force: true });
    cy.get("@addressField").type("150 King Street West, Toronto, ON, Canada", {
      force: true,
    });
    cy.wait(3000);
    // Select the first address in the list
    cy.get('span[md-highlight-text="AddressAutoController.selectedAddress"]')
      .eq(0)
      .should("be.visible")
      .click({ force: true });
    // Enter Payment Information
    cy.get('input[name="ccName"]')
      .should("be.visible")
      .type(`${userDetails.userFirstName} ${userDetails.userLastName}`);
    // Populate credit card info
    cy.populateCreditCardInformationFormInAngular(creditCardDetails);
    // Click 'Pay $XX.XX CAD'
    cy.get('button[ng-click="setBillingAndShippingFields()"][type="submit"]')
      .should("be.visible")
      .click({ force: true });
    cy.wait(1000);
    // Verify data loading indicator appearance and disappearance
    cy.get(
      'div[class="full-loader"] > md-progress-circular[role="progressbar"] > svg'
    )
      .should("exist")
      .should("be.visible");
    cy.wait(3000);
    cy.get(
      'div[class="full-loader"] > md-progress-circular[role="progressbar"]'
    ).should("not.exist");
    // Ensure the order confirmation page shows up
    cy.get('h1[class^="md-display"]')
      .should("exist")
      .should("be.visible")
      .should("contain.text", "Thank you!");
  }
);
// *********************************************************************
/**
 * Method to add tickets to cart and proceed to checkout
 * @param userDetails
 * @param numberOfTicketsForEachTicketType
 */
Cypress.Commands.add(
  "addTicketsToCartAndProceedToCheckout",
  (userDetails, numberOfTicketsForEachTicketType) => {
    cy.log("Going to completeOrderAsGuestOnAngular()");
    cy.get('button[class^="chakra-button"] > p')
      .contains("BUY TICKETS")
      .click({ force: true });
    // Add 3 tickets from each ticket type (2 ticket types in total)
    cy.addTicketsToCart(2, numberOfTicketsForEachTicketType);
    // Click 'Checkout' button
    cy.clickChakraButtonByText("CHECKOUT");
    // *******
    // If 'Login' button still shows up in AngularJS log into the app
    cy.get("body").then(($body) => {
      if ($body.find('a[class^="md-button"][href="/accounts/login/"]').length) {
        cy.log("Login button in AngularJS shows up. Going to log in.");
        // Find and click 'Login' button
        cy.get('a[class^="md-button"][href="/accounts/login/"] > span').as(
          "loginButton"
        );
        cy.get("@loginButton")
          .should("exist")
          .should("be.visible")
          .click({ force: true });
        // Log into the application
        cy.loginOnlyIntoPortal(userDetails);
        // Click the cart counter to move to checkout
        cy.visit("/checkout/");
      }
    });
    // Wait for the cart timer to show up
    cy.get('span[ng-if="cart.timer.info.totalSeconds"]').should("be.visible");
  }
);
// *********************************************************************
/**
 * Method to complete an order with Interac payment
 * @param userDetails
 * @param creditCardDetails
 */
Cypress.Commands.add("completeOrderWithInteracPayment", (userDetails) => {
  cy.log("Going to completeOrderWithInteracPayment()");
  // Click 'Next'
  cy.get('button[ng-click="nextStep()"]')
    .eq(0)
    .should("exist")
    .click({ force: true });
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
  cy.typeText('input[ng-model="confirmEmail"]', 0, userDetails.userEmail);
  // Click 'Next'
  cy.get(
    'button[class^="md-raised md-primary pull-right"][type="submit"] > span'
  )
    .eq(0)
    .contains("Next")
    .click({ force: true });
  cy.wait(900);
  // *** 'Payment' page ***
  // Select 'Interac' radio button
  cy.get('div[class="payment-type layout-row"] > div > p')
    .last()
    .contains("Interac")
    .as("interacRadioButton");
  cy.get("@interacRadioButton").should("exist").scrollIntoView({ force: true });
  cy.get("@interacRadioButton").should('be.visible').click({ force: true });
  cy.wait(500);
  // Ensure Interac text shows up
  cy.get('div[class^="text-center"] > p')
    .should("exist")
    .should("contain.text", "INTERAC Online allows you to make");
  // Enter 'Billing Address'
  cy.typeText(
    'input[type="search"]',
    0,
    "150 King Street West, Toronto, ON, Canada"
  );
  cy.wait(3000);
  // Select the first address in the list
  cy.get('span[md-highlight-text="AddressAutoController.selectedAddress"]')
    .eq(0)
    .should("be.visible")
    .click({ force: true });
  cy.wait(1500);
  // Ensure postal code shows up
  cy.get('input[name="postalField"]')
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible");
  // Click 'Pay $XX.XX CAD' button
  cy.log(`Click 'Pay $XX.XX CAD' button`);
  cy.get('button[ng-click="setBillingAndShippingFields()"][type="submit"]')
    .should("be.visible")
    .click({ force: true });
  cy.wait(900);
  // Make sure 'Interac' page shows up
  cy.get('div[id="amount"] > p[id="first"]')
    .should("exist")
    .should("be.visible");
  // Click 'Bank 1'
  cy.get('input[id="btnBank"][value="Test Bank1"]')
    .first()
    .should("exist")
    .click({ force: true });
  cy.wait(300);
  // Wait for the 'Card Number' field and enter card number
  cy.typeText('input[id="userid"]', 0, "45459090");
  // Enter password
  cy.typeText('input[id="userpassword"]', 0, "TestPwd");
  // Click 'Login'
  cy.get('input[id="btnlogin"]')
    .first()
    .should("exist")
    .scrollIntoView({ force: true })
    .click({ force: true });
  cy.wait(700);
  // *** 'Payment Details' page
  // Select 'Savings' account
  cy.get('select[id="accountType"]').select('Savings');
  cy.wait(500);
  // Make sure the 'Send Now' button shows up and click it
  cy.get('input[id="btnsend"]')
    .should("exist")
    .scrollIntoView({ force: true })
    .click({ force: true });
  cy.wait(900);
  // *** Confirmation page ***
  // Click 'Next'
  cy.get('input[id="btnNext"]')
    .should("exist")
    .click({ force: true });
  cy.wait(700);
  // Verify data loading indicator appearance and disappearance
  cy.get(
    'div[class="full-loader"] > md-progress-circular[role="progressbar"] > svg'
  )
    .should("exist")
    .should("be.visible");
  cy.wait(3000);
  Cypress.config("defaultCommandTimeout", 7000);
  // Ensure the data loading indicator disappears
  cy.get(
    'div[class="full-loader"] > md-progress-circular[role="progressbar"]'
  ).should("not.exist");
});
// *********************************************************************
