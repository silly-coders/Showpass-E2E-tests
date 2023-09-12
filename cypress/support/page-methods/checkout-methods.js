/**
 * Method to complete an order after adding tickets to the cart
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
    // Click 'Next'
    cy.get('button[ng-click="nextStep()"]')
      .eq(0)
      .should("be.visible")
      .click({ force: true });
    cy.wait(300);
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
    // Verify the 'Payment Method' header
    cy.get('h2[class^="md-title strong"]').should("exist");
    // Enter 'Billing Address'
    cy.get('input[type="search"]')
      .should("be.visible")
      .type("150 King Street West, Toronto, ON, Canada");
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
    cy.wait(700);
    // Verify data loading indicator appearance and disappearance
    cy.get(
      'div[class="full-loader"] > md-progress-circular[role="progressbar"]'
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

/**
 * Populate 'Credit Card Information' in Angular
 * @param creditCardDetails
 */
Cypress.Commands.add(
  "populateCreditCardInformationFormInAngular",
  (creditCardDetails) => {
    cy.log("Going to populateCreditCardInformationFormInAngular()");
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
      .type(creditCardDetails.expiry);
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
      .type(creditCardDetails.cvcNumber);
    cy.wait(300);
  }
);
