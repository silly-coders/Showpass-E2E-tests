import { UserSettingLocators } from "../element-locators/user-settings-locators";
const userSettingLocators = new UserSettingLocators();
// *****************************************************************************
/**
 * Click the 'Payment' button under 'Profile'
 */
Cypress.Commands.add("clickPaymentButton", () => {
  cy.log("Going to clickPaymentButton()");
  cy.getChakraButtonByText("Payment")
    .should("exist")
    .scrollIntoView()
    .should("be.visible")
    .click();
});
// *****************************************************************************
/**
 * Click the 'Notifications' button under 'Profile'
 */
Cypress.Commands.add("clickNotificationsButton", () => {
  cy.log("Going to clickNotificationsButton()");
  cy.getChakraButtonByText("Notifications")
    .should("exist")
    .scrollIntoView()
    .should("be.visible")
    .click({ force: true });
});
// *****************************************************************************
/**
 * Click the 'Email' button under 'Profile'
 */
Cypress.Commands.add("clickEmailButton", () => {
  cy.log("Going to clickEmailButton()");
  cy.getChakraButtonByText("Email")
    .should("exist")
    .scrollIntoView()
    .should("be.visible")
    .click({ force: true })
    // An additional click is needed as the form doesn't show up
    .click({ force: true });
});
// *****************************************************************************
/**
 * Click the 'My Orders' button
 */
Cypress.Commands.add("clickMyOrdersButton", () => {
  cy.log("Going to clickMyOrdersButton()");
  cy.getChakraButtonByText("My Orders")
    .should("exist")
    .scrollIntoView()
    .should("be.visible")
    .click({ force: true })
    // An additional click is needed as the form doesn't show up
    .click({ force: true });
});
// *****************************************************************************
/**
 * Click the 'Password' button under 'Profile'
 */
Cypress.Commands.add("clickPasswordButton", () => {
  cy.log("Going to clickPasswordButton()");
  cy.getChakraButtonByText("Password")
    .should("exist")
    .scrollIntoView()
    .should("be.visible")
    .click({ force: true });
});
// *****************************************************************************
/**
 * Click the 'Personal Info' button under 'Profile'
 */
Cypress.Commands.add("clickPersonalInfoButton", () => {
  cy.log("Going to clickPersonalInfoButton()");
  cy.getChakraButtonByText("Personal Info")
    .should("exist")
    .scrollIntoView()
    .should("be.visible")
    .click({ force: true });
});
// *****************************************************************************
/**
 * Click the 'Add payment method' button
 */
Cypress.Commands.add("clickAddPaymentMethodButton", () => {
  cy.log("Going to clickAddPaymentMethodButton()");
  cy.getChakraButtonByText("Add payment method")
    .should("exist")
    .scrollIntoView()
    .should("be.visible")
    .click({ force: true });
});
// *****************************************************************************
/**
 * Verify 'Card Information' form element appearance
 */
Cypress.Commands.add("verifyCardInfoFormAppearance", () => {
  cy.log("Going to verifyCardInfoFormAppearance()");
  // 'Card Information' sub-header
  cy.getH2HeaderByText("Card Information");
  // Label
  cy.getChakraFormLabel("Name on Card");
  // Field
  cy.getChakraInputFieldByAttr("placeholder", "Name on Card");
  // Inline error
  cy.getChakraFormLabel("Card Number");
  // 'Card Number' iFrame
  cy.getIframeBody("Secure card number input frame")
    .should("exist")
    .should("be.visible");
  cy.getChakraFormLabel("Expiry");
  // 'Expiry' iFrame
  cy.getIframeBody("Secure expiration date input frame")
    .should("exist")
    .should("be.visible");
  cy.getChakraFormLabel("CVC");
  // 'CVC' iFrame
  cy.getIframeBody("Secure CVC input frame")
    .should("exist")
    .should("be.visible");
});
// *****************************************************************************
/**
 * Verify 'Card Information' form inline errors
 */
Cypress.Commands.add("verifyCardInfoInlineErrors", () => {
  cy.log("Going to verifyCardInfoInlineErrors()");
  cy.clickSaveButton();
  cy.getInlineError("Name on Card is required");
  cy.getInlineError("Card Number is required");
  cy.getInlineError("Expiry is required");
  cy.getInlineError("Security code is required");
});
// *****************************************************************************
/**
 * Verify 'Billing Address' form element appearance
 */
Cypress.Commands.add("verifyBillingAddressFormAppearance", () => {
  cy.log("Going to verifyBillingAddressFormAppearance()");
  // 'Billing Address' sub-header
  cy.getH2HeaderByText("Billing Address");
  // Label
  cy.getChakraFormLabel("Search Address");
  // Field
  cy.getChakraInputFieldByAttr("id", "search-address-input");
  cy.getChakraFormLabel("Street Address");
  cy.getChakraInputFieldByAttr("id", "address_line1");
  cy.getSaveButton().scrollIntoView();
  cy.getChakraFormLabel("City");
  cy.getChakraInputFieldByAttr("id", "address_city");
  cy.getChakraFormLabel("Country");
  cy.get('button[id="address-country-toggle-button"]')
    .should("exist")
    .should("be.visible");
  cy.getChakraFormLabel("Region");
  cy.get('button[id="address_state-toggle-button"]')
    .should("exist")
    .should("be.visible");
  cy.getChakraFormLabel("Postal Code");
  cy.getChakraInputFieldByAttr("id", "address_zip");
});
// *****************************************************************************
/**
 * Verify 'Billing Address' form inline errors
 */
Cypress.Commands.add("verifyBillingAddressInlineErrors", () => {
  cy.log("Going to verifyBillingAddressInlineErrors()");
  cy.getSaveButton().click({ force: true });
  cy.getInlineError("Street address is required");
  cy.getInlineError("City is required");
  cy.getInlineError("Country is required");
  cy.getInlineError("Postal code is required");
});
// *****************************************************************************
/**
 * Populate 'Billing Address' form
 * @param userAddress
 */
Cypress.Commands.add("populateBillingAddressForm", (userAddress) => {
  cy.log("Going to populateBillingAddressForm()");
  // Search Address field
  cy.getChakraInputFieldByAttr("id", "search-address-input").scrollIntoView({
    force: true,
  });
  cy.getChakraInputFieldByAttr("id", "search-address-input").type(
    userAddress.fullAddress
  );
  cy.get('p[class^="chakra-text"]').contains(userAddress.fullAddress).click();
  cy.getChakraInputFieldByAttr("id", "search-address-input").should(
    "have.attr",
    "value",
    userAddress.fullAddress
  );
  // Country selector
  cy.getSelectedDropDownValueByText(
    "address-country-toggle-button",
    userAddress.country
  );
  // Region selector
  cy.getSelectedDropDownValueByText(
    "address_state-toggle-button",
    userAddress.regionForVerification
  );
  // Postal Code
  cy.getChakraInputFieldByAttr("id", "address_zip").should(
    "have.attr",
    "value",
    userAddress.postalCode
  );
  // Street Address field
  cy.getChakraInputFieldByAttr("id", "address_line1").should(
    "have.attr",
    "value",
    userAddress.streetAddressForVerification
  );
  // City field
  cy.getChakraInputFieldByAttr("id", "address_city").should(
    "have.attr",
    "value",
    userAddress.city
  );
});
// *****************************************************************************
/**
 * Populate 'Card Information' form
 * @param creditCardDetails
 */
Cypress.Commands.add("populateCardInformationForm", (creditCardDetails) => {
  cy.log("Going to populateCardInformationForm()");
  // Populate Name on card
  cy.get("#name-on-card")
    .scrollIntoView()
    .should("be.visible")
    .type(creditCardDetails.nameOnCard);
  // Populate Credit Card number
  const getIframeBody1 = () => {
    return cy
      .get('iframe[name*="privateStripeFrame"]')
      .eq(0)
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap);
  };
  getIframeBody1()
    .find('input[class^="InputElement"]')
    .type(creditCardDetails.cardNumber);
  // Populate Expiry date
  const getIframeBody2 = () => {
    return cy
      .get('iframe[name*="privateStripeFrame"]')
      .eq(1)
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap);
  };
  getIframeBody2()
    .find('input[class^="InputElement"]')
    .type(creditCardDetails.expiry);
  // Populate CVC number
  const getIframeBody3 = () => {
    return cy
      .get('iframe[name*="privateStripeFrame"]')
      .eq(2)
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap);
  };
  getIframeBody3()
    .find('input[class^="InputElement"]')
    .type(creditCardDetails.cvcNumber);
});
// *****************************************************************************
/**
 * iFrame with Stripe
 * @todo to polish this method so that it can be used going forward
 */
Cypress.Commands.add("getStripeCardField", (selector, attempts = 0) => {
  Cypress.log({
    displayName: "getStripeCardField",
    message: `${selector}: ${attempts}`,
  });
  if (attempts > 50) throw new Error("too many attempts");
  return cy
    .get("iframe", { timeout: 10000, log: false })
    .eq(0, { timeout: 10000, log: false })
    .its("0.contentDocument", { timeout: 10000, log: false })
    .find("body", { log: false })
    .then((body) => {
      const cardField = body.find(selector);
      if (!cardField.length) {
        return cy.wait(300, { log: false }).then(() => {
          getStripeCardField(selector, ++attempts);
        });
      } else {
        return cy.wrap(cardField);
      }
    });
});
// *****************************************************************************
/**
 * Verify that 'Notifications' toggle can be turned on and off
 * @param elementIndex
 */
Cypress.Commands.add("verifyNotificationSelectors", (elementIndex) => {
  cy.log("Going to verifyNotificationSelectors()");
  cy.toggleSwitchSelector(elementIndex);
  cy.verifyChakraSwitchSelectorIsDisabled(elementIndex);
  cy.toggleSwitchSelector(elementIndex);
  cy.verifyChakraSwitchSelectorIsEnabled(elementIndex);
  cy.log("Finished verifyNotificationSelectors()");
});
// *****************************************************************************
/**
 * Turn on disabled notifications and save changes
 */
Cypress.Commands.add("turnOnDisabledNotifications", () => {
  cy.log("Going to turnOnDisabledNotifications()");
});
// *****************************************************************************
/**
 * Toggle chakra-switch-selector
 * @param elementIndex
 */
Cypress.Commands.add("toggleSwitchSelector", (elementIndex) => {
  cy.log("Going to toggleSwitchSelector()");
  cy.getChakraSwitchSelectorByIndex(elementIndex).click({ force: true });
});
// *****************************************************************************
/**
 * Verify all labels on the 'Notifications' page
 * @param elementIndex
 * @param elementLabel
 */
Cypress.Commands.add(
  "verifyToggleLabelsOnNotificationsPage",
  (elementIndex, elementLabel) => {
    cy.log("Going to verifyToggleLabelsOnNotificationsPage()");
    cy.log("Verifying the following label text: " + elementLabel);
    cy.getChakraTextLabelByIndex(elementIndex)
      .should("exist")
      .scrollIntoView({ force: true })
      .should("be.visible")
      .should("have.text", elementLabel);
  }
);
// *****************************************************************************
/**
 * Verify each notification label within a section (without section header)
 * @param elementIndex
 * @param elementLabel
 */
Cypress.Commands.add(
  "verifySelectorLabelsWithinSectionsOnNotificationsPage",
  (elementIndex, elementLabel) => {
    cy.log("Going to verifySelectorLabelsWithinSectionsOnNotificationsPage()");
    cy.log("Verifying the following label text: " + elementLabel);
    cy.get(`form > div[id='notifications-form-container'] > div > div`)
      .eq(elementIndex)
      .should("exist")
      .scrollIntoView({ force: true })
      .should("be.visible")
      .should("have.text", elementLabel);
  }
);
// *****************************************************************************
/**
 * Verify 'Notifications' page sections' headers
 * @param elementIndex
 * @param elementLabel
 */
Cypress.Commands.add(
  "verifyNotificationsPageSectionsHeaders",
  (elementIndex, elementLabel) => {
    cy.log("Going to verifyNotificationsPageSectionsHeaders()");
    cy.log("Verifying the following section header: " + elementLabel);
    cy.get(`form > div[id='notifications-form-container'] > div > p`)
      .eq(elementIndex)
      .should("exist")
      .scrollIntoView({ force: true })
      .should("be.visible")
      .should("have.text", elementLabel);
  }
);
// *****************************************************************************
/**
 * Verify 'Password' form element appearance
 */
Cypress.Commands.add("verifyPasswordFormAppearance", () => {
  cy.log("Going to verifyPasswordFormAppearance()");
  cy.getH1HeaderByText("Password");
  for (let i = 0; i < 3; i++) {
    const labels = ["Old Password", "New Password", "Confirm New Password"];
    // Verify labels appearance
    cy.getChakraFormLabelByIndexAndText(i, labels.at(i));
    // Verify input fields appearance
    cy.getChakraInputFieldByAttr("placeholder", labels.at(i));
  }
  // Verify 'Password Strength: 0%' label
  cy.getChakraFormLabelByIndexAndText(3, "Password Strength: 0%");
  // Verify password progress bar appearance
  userSettingLocators.getPasswordStrengthProgressBar();
});
// *****************************************************************************
/**
 * Verify 'Password' form inline validation
 */
Cypress.Commands.add("verifyPasswordFormInlineValidation", () => {
  cy.log("Going to verifyPasswordFormInlineValidation()");
  for (let i = 0; i < 3; i++) {
    const inlineValidationErrors = [
      "Password is required",
      "Password is required",
      "Passwords must match",
    ];
    cy.getChakraInlineValidationError(i, inlineValidationErrors.at(i));
  }
});
// *****************************************************************************
/**
 * Populate 'Old', 'New' and 'Confirm' password field at 'Profile'.
 * @param oldPwd
 * @param newPwd
 * @param confirmPwd
 */
Cypress.Commands.add(
  "populateOldNewAndConfirmPwdFields",
  (oldPwd, newPwd, confirmPwd) => {
    cy.log("Going to populateOldNewAndConfirmPwdFields()");
    cy.log(
      "oldPwd = " +
        oldPwd +
        "; newPwd = " +
        newPwd +
        "; confirmPwd = " +
        confirmPwd
    );
    cy.getInputElementByAttr("placeholder", "Old Password").type(oldPwd, {
      force: true,
    });
    cy.getInputElementByAttr("placeholder", "New Password").type(newPwd, {
      force: true,
    });
    cy.getInputElementByAttr("placeholder", "Confirm New Password").type(
      confirmPwd,
      { force: true }
    );
  }
);
// *****************************************************************************
/**
 * Clear 'Old', 'New' and 'Confirm' password fields
 */
Cypress.Commands.add("clearOldNewAndConfirmPwdFields", () => {
  cy.log("Going to clearOldNewAndConfirmPwdFields()");
  for (let i = 0; i < 3; i++) {
    const fieldPlaceholders = [
      "Old Password",
      "New Password",
      "Confirm New Password",
    ];
    cy.clearInputFieldByAttr("placeholder", fieldPlaceholders.at(i));
  }
});
// *****************************************************************************
/**
 * Verify 'Email' form overall appearance
 */
Cypress.Commands.add("verifyEmailFormAppearance", (emailAddress) => {
  cy.log("Going to verifyEmailFormAppearance()");
  cy.getH1HeaderByText("Email");
  for (let i = 0; i < 3; i++) {
    for (let j = 1; i < 3; i++) {
      const labels = ["Current Email", "New Email", "Password"];
      // Verify labels appearance
      cy.getChakraFormLabelByIndexAndText(i, labels.at(i));
      // Verify input fields appearance
      cy.getChakraInputFieldByAttr("placeholder", labels.at(j));
    }
  }
  cy.getChakraInputFieldByAttr("value", emailAddress);
  cy.getSaveButton();
});
// *****************************************************************************
/**
 * Verify 'My Showpass' page element appearance
 */
Cypress.Commands.add("verifyMyShowpassPageAppearance", () => {
  cy.log("Going to verifyMyShowpassPageAppearance()");
  cy.getH1HeaderByText("My Showpass");
  cy.getChakraHeaderH2("Universal QR Code");
  cy.get('p[class^="chakra-text"]')
    .contains("Use this QR code to scan everything attached to your account!")
    .should("exist")
    .should("be.visible");
  cy.verifyQrCodeAppearance();
});
// *****************************************************************************
/**
 * Get 'Transfer' button on the event ticket page
 * @param index
 */
Cypress.Commands.add("getTransferButtonByIndex", (index) => {
  cy.log("Going to getTransferButtonByIndex(index)");
  cy.get('button[data-testid="account-purchase-item-transfer-button"]')
    .eq(index)
    .should("exist")
    .scrollIntoView()
    .should("be.visible");
});
// *****************************************************************************
/**
 * Method to verify product item details
 * @param productItems
 */
Cypress.Commands.add("verifyProductItemsDetails", (productItem) => {
  cy.log("Going to verifyProductItemsDetails(productItems)");
  cy.log(
    `Going to verify the following product header: ${productItem.itemName}`
  );
  // Open item by name
  cy.get('div[id="upcoming-event-info-container"] > div > p:nth-child(1)')
    .contains(`${productItem.itemName}`)
    .click({ force: true });
  cy.wait(500);
  // Verify item header
  cy.get('div[data-testid="invoice-header"] > p').should(
    "have.text",
    `${productItem.itemName}`
  );
  // Verify name on ticket
  cy.get('p[data-testid="name-on-ticket"]').should(
    "have.text",
    productItem.nameOnProduct
  );
  // Verify product category
  cy.get('p[data-testid="ticket-type-name"]').should(
    "have.text",
    productItem.productCategory
  );
  // Verify barcode string
  cy.get('p[data-testid="barcode-text"]').should(
    "have.text",
    productItem.barcode
  );
  // Click 'Back'
  cy.getChakraButtonByText("Back").should("be.visible").click({ force: true });
  cy.wait(500);
});
// *****************************************************************************
