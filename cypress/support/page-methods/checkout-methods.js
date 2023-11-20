/**
 * Method to complete an order after adding tickets to the cart
 * @param userDetails
 * @param creditCardDetails
 */
Cypress.Commands.add(
  "completeOrderOnAngular",
  (userDetails, creditCardDetails) => {
    cy.log("Going to completeOrderOnAngular()");
    cy.log("Click 'Check out as a guest' if the button shows up");
    cy.clickButtonIfAvailableBasedOnLocatorIndexText(
      `button[ng-click="beginGuestCheckout(); amplitudeEvent.track('Checkout: Guest Checkout')"] > span`,
      0,
      "Check out as a Guest"
    );
    cy.wait(300);
    // *** More Events page
    // Click 'Next'
    cy.clickNextButtonDuringCheckoutAngular();
    cy.log("Click 'REVIEW' tab");
    cy.get('md-tab-item[role="tab"] > span')
      .eq(3)
      .contains("Review")
      .should("exist")
      .click({ force: true });
    cy.wait(700);
    // *** Review page
    cy.log("Verify the 'Review' header");
    cy.get('span[class^="md-title strong"]')
      .contains("Review")
      .should("be.visible");
    // Click 'Next'
    cy.clickNextButtonDuringCheckoutAngular();
    // *** Purchase Info page ***
    cy.log("Verify the 'Purchaser Info' header");
    cy.get('h2[class^="md-title strong"]')
      .contains("Purchaser Info")
      .should("be.visible");
    // Enter 'Confirm Email'
    cy.typeText('input[ng-model="confirmEmail"]', 0, userDetails.userEmail);
    cy.log("Click 'Next'");
    cy.get(
      'button[class^="md-raised md-primary pull-right"][type="submit"] > span'
    )
      .eq(0)
      .contains("Next")
      .click({ force: true });
    cy.wait(300);
    cy.log("Verify the 'Payment Method' header");
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
    cy.log("Select the first address in the list");
    cy.get('span[md-highlight-text="AddressAutoController.selectedAddress"]')
      .eq(0)
      .should("be.visible")
      .click({ force: true });
      cy.log("Enter Payment Information");
    cy.wait(300);
    cy.typeText(
      'input[name="ccName"]',
      0,
      `${userDetails.userFirstName} ${userDetails.userLastName}`
    );
    // Populate credit card info
    cy.populateCreditCardInformationFormInAngular(creditCardDetails);
    cy.log("Click 'Pay $XX.XX CAD'");
    cy.get('button[ng-click="setBillingAndShippingFields()"][type="submit"]')
      .should("be.visible")
      .click({ force: true });
    cy.wait(5000);
    Cypress.config("defaultCommandTimeout", 9000);
    cy.log("Ensure the data loading indicator disappears");
    cy.get(
      'div[class="full-loader"] > md-progress-circular[role="progressbar"]'
    ).should("not.exist");
    cy.log("Ensure the 'Thank you' message shows up after a payment is completed");
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
    cy.log("Populate Credit Card number");
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
    cy.log("Populate Expiry date");
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
    cy.log("Populate CVC number");
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
  cy.log("Click 'Check out as a guest' if the button shows up");
  cy.clickButtonIfAvailableBasedOnLocatorIndexText(
    `button[ng-click="beginGuestCheckout(); amplitudeEvent.track('Checkout: Guest Checkout')"] > span`,
    0,
    "Check out as a Guest"
  );
  cy.wait(300);
  // *** More Events page
  // Click 'Next'
  cy.clickNextButtonDuringCheckoutAngular();
  cy.log("Click 'REVIEW' tab");
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
  cy.clickNextButtonDuringCheckoutAngular();
  // *** Purchase Info page ***
  // Verify the 'Purchaser Info' header
  cy.get('h2[class^="md-title strong"]')
    .contains("Purchaser Info")
    .should("be.visible");
  cy.log("Enter 'Confirm Email'");
  cy.get('input[ng-model="confirmEmail"]')
    .should("be.visible")
    .type(userDetails.userEmail);
  cy.log("Click 'Next'");
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
    cy.log("Click 'Check out as a guest' if the button shows up");
    cy.clickButtonIfAvailableBasedOnLocatorIndexText(
      `button[ng-click="beginGuestCheckout(); amplitudeEvent.track('Checkout: Guest Checkout')"] > span`,
      0,
      "Check out as a Guest"
    );
    cy.wait(300);
    // *** More Events page
    // Click 'Next'
    cy.clickNextButtonDuringCheckoutAngular();
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
    cy.clickNextButtonDuringCheckoutAngular();
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
      .clear({ force: true })
      .type(`${userDetails.userFirstName} ${userDetails.userLastName}`);
    // Enter 'Phone'
    cy.get('input[type="tel"]')
      .eq(0)
      .should("exist")
      .scrollIntoView({ force: true })
      .clear({ force: true })
      .type(`${userDetails.phoneNumber}`);
    // Enter 'Email'
    cy.get('input[type="email"]')
      .eq(0)
      .should("exist")
      .scrollIntoView({ force: true })
      .clear({ force: true })
      .type(userDetails.userEmail);
    // Enter 'Confirm Email'
    cy.get('input[ng-model="confirmEmail"]')
      .eq(0)
      .should("be.visible")
      .clear({ force: true })
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
    cy.wait(3000);
    Cypress.config("defaultCommandTimeout", 9000);
    cy.get(
      'div[class="full-loader"] > md-progress-circular[role="progressbar"]'
    ).should("not.exist");
    // Ensure the 'Thank you' message shows up after a payment is completed
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
    cy.log("Going to addTicketsToCartAndProceedToCheckout()");
    cy.get('button[class^="chakra-button"] > p')
      .contains("BUY TICKETS")
      .click({ force: true });
    // Add 3 tickets from each ticket type (2 ticket types in total)
    cy.addTicketsToCart(2, numberOfTicketsForEachTicketType);
    // Click 'Checkout' button
    cy.clickChakraButtonByText("CHECKOUT");
    cy.wait(900);
    // *******
    // If 'Login' button still shows up in AngularJS log into the app
    cy.get("body").then(($body) => {
      if ($body.find('a[class^="md-button"][href="/accounts/login/"]').length) {
        cy.log("Login button in AngularJS shows up. Going to log in.");
        // Find and click 'Login' button
        cy.get('a[class^="md-button"][href="/accounts/login/"]').as(
          "loginButton"
        );
        cy.get("@loginButton")
          .should("exist")
          .should("be.visible")
          .click({ force: true });
        // Click React Login button
        cy.clickLoginOnHomePage();
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
  cy.clickNextButtonDuringCheckoutAngular();
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
  cy.get("@interacRadioButton").click({force: true});
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
  cy.get('select[id="accountType"]').select("Savings");
  cy.wait(500);
  // Make sure the 'Send Now' button shows up and click it
  cy.get('input[id="btnsend"]')
    .should("exist")
    .scrollIntoView({ force: true })
    .click({ force: true });
  cy.wait(900);
  // *** Confirmation page ***
  // Click 'Next'
  cy.get('input[id="btnNext"]').should("exist").click({ force: true });
  cy.wait(700);
  // Verify data loading indicator disappearance
  cy.wait(3000);
  Cypress.config("defaultCommandTimeout", 7000);
  // Ensure the data loading indicator disappears
  cy.get(
    'div[class="full-loader"] > md-progress-circular[role="progressbar"]'
  ).should("not.exist");
});
// *********************************************************************
/**
 * Method to click AngularJS 'Next' button during checkout
 */
Cypress.Commands.add("clickNextButtonDuringCheckoutAngular", () => {
  cy.log("Going to clickNextButtonDuringCheckoutAngular()");
  // Click 'Next'
  cy.get(
    'button[ng-click="nextStep()"][class^="md-raised md-primary pull-right"] > span'
  )
    .eq(1)
    .should("exist")
    .scrollIntoView({ force: true })
    .wait(300)
    .click({ force: true });
  cy.get(300);
});
// *********************************************************************
/**
 * Method to complete an order with a saved payment method
 * @param userDetails
 */
Cypress.Commands.add(
  "completeOrderWithSavedPaymentMethodOnAngular",
  (userDetails) => {
    cy.log("Going to completeOrderWithSavedPaymentMethodOnAngular()");
    // *** More Events page
    // Click 'Next'
    cy.clickNextButtonDuringCheckoutAngular();
    // Click 'REVIEW' tab
    cy.get('md-tab-item[role="tab"] > span')
      .eq(3)
      .contains("Review")
      .should("exist")
      .click({ force: true });
    cy.wait(700);
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
    cy.typeText('input[ng-model="confirmEmail"]', 0, userDetails.userEmail);
    // Click 'Next'
    cy.get(
      'button[class^="md-raised md-primary pull-right"][type="submit"] > span'
    )
      .eq(0)
      .contains("Next")
      .click({ force: true });
    cy.wait(300);
    // Click the 'PAYMENT' tab
    cy.get('md-tab-item[role="tab"] > span[ng-if="!cart.isFree()"]')
      .last()
      .contains("Payment")
      .should("exist")
      .click({ force: true });
    cy.wait(1500);
    // Wait for the 'Pay with link' button area to show up
    cy.get('div[class^="payment-details-express-pay"]').as("payWithLinkButton");
    cy.get("@payWithLinkButton").should("exist");
    // Click 'Pay $XX.XX CAD'
    cy.get('button[ng-click="setBillingAndShippingFields()"][type="submit"]')
      .should("exist")
      .scrollIntoView({ force: true })
      .wait(700);
    cy.get('button[ng-click="setBillingAndShippingFields()"][type="submit"]')
      .should("be.visible")
      .click({ force: true })
      .wait(900);
    // If the 'Pay $XX.XX CAD' button still shows up click it again
    cy.clickPayButtonToSubmitPaymentIfAvailable();
    // Verify data loading indicator disappearance
    cy.wait(3000);
    Cypress.config("defaultCommandTimeout", 9000);
    // Ensure the data loading indicator disappears
    cy.get(
      'div[class="full-loader"] > md-progress-circular[role="progressbar"]'
    ).should("not.exist");
    // Ensure the 'Thank you' message shows up after a payment is completed
    cy.get('h1[class^="md-display"]')
      .should("exist")
      .should("be.visible")
      .should("contain.text", "Thank you!");
  }
);
// *********************************************************************
/**
 * Method to click the 'Pay $XX.XX CAD' button if it's available
 */
Cypress.Commands.add("clickPayButtonToSubmitPaymentIfAvailable", () => {
  // If the 'Pay $XX.XX CAD' button still shows up click it again
  cy.log("Going to clickPayButtonToSubmitPaymentIfAvailable()");
  cy.wait(500);
  cy.get("body").then(($body) => {
    if (
      $body.find(
        'button[ng-click="setBillingAndShippingFields()"][type="submit"] > span > span[ng-show="!cart.isFree() && !isWaitlistBasket"]'
      ).length
    ) {
      cy.log(
        "'Pay $XX.XX CAD' button still shows up. Going to submit payment again."
      );
      // Click the 'Pay $XX.XX CAD' button
      cy.get(
        'button[ng-click="setBillingAndShippingFields()"][type="submit"]'
      ).as("payButton");
      cy.get("@payButton").should("be.visible").click({ force: true });
    }
  });
});
// *********************************************************************
/**
 * Method to add tickets to cart and proceed to checkout with Login tab button on Angular
 * @param userDetails
 * @param numberOfTicketsForEachTicketType
 */
Cypress.Commands.add(
  "addTicketsToCartAndProceedToCheckoutWithLoginViaTabButtonAngular",
  (userDetails, numberOfTicketsForEachTicketType) => {
    cy.log(
      "Going to addTicketsToCartAndProceedToCheckoutWithLoginViaTabButtonAngular()"
    );
    cy.get('button[class^="chakra-button"] > p')
      .contains("BUY TICKETS")
      .click({ force: true });
    // Add 'numberOfTicketsForEachTicketType' tickets from each ticket type (2 ticket types in total)
    cy.addTicketsToCartNoApiValidation(2, numberOfTicketsForEachTicketType);
    // Click 'Checkout' button
    cy.clickChakraButtonByText("CHECKOUT");
    cy.wait(900);
    // *******
    // If 'Login' button still shows up in AngularJS log into the app
    cy.get("body").then(($body) => {
      if (
        $body.find(
          "md-tab-item[class='md-tab ng-scope ng-isolate-scope md-ink-ripple'] > span"
        ).length
      ) {
        cy.log("Login button in AngularJS shows up. Going to log in.");
        // Find and click 'Login' button
        cy.get(
          "md-tab-item[class='md-tab ng-scope ng-isolate-scope md-ink-ripple'] > span"
        )
          .contains("Login")
          .as("loginButton");
        cy.get("@loginButton")
          .should("exist")
          .scrollIntoView({ force: true })
          .should("be.visible")
          .click({ force: true });
        // Enter email
        cy.get('input[name="email"][ng-model="loginData.email"]')
          .should("exist")
          .scrollIntoView({ force: true })
          .should("be.visible")
          .clear({ force: true })
          .type(userDetails.userEmail)
          .wait(500);
        // Enter password
        cy.get('input[name="password"][ng-model="loginData.password"]')
          .should("exist")
          .scrollIntoView({ force: true })
          .should("be.visible")
          .clear({ force: true })
          .type(userDetails.userPassword)
          .wait(500);
        // Click 'Login'
        cy.get('button[type="submit"] > span')
          .contains("Login")
          .should("exist")
          .scrollIntoView({ force: true })
          .should("be.visible")
          .click({ force: true });
      }
      cy.wait(900);
    });
    // Wait for the cart timer to show up
    cy.get('span[ng-if="cart.timer.info.totalSeconds"]').should("be.visible");
  }
);
// *********************************************************************
/**
 * Get event or a membershipo group description
 * @param descriptionText
 */
Cypress.Commands.add("getEventOrGroupDescriptionByText", (descriptionText) => {
  cy.log(
    "Going to getEventOrGroupDescriptionByText with the following text: [ " +
    descriptionText +
      " ]"
  );
  return cy
    .get('div[data-testid="description-container"] > div > p')
    .eq(0)
    .should("exist")
    .scrollIntoView({force: true})
    .should("be.visible")
    .should("have.text", descriptionText);
});