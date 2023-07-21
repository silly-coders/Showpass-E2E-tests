describe("Verify user's profile by ", () => {
  before(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.clickUsernameAfterLoggingIn();
      cy.selectProfileDropDownItem();
    });
  });

  it("checking the 'Card Information' form appearance-TA-16", function () {
    cy.clickPaymentButton();
    cy.clickAddPaymentMethodButton();
    cy.verifyCardInfoFormAppearance();
    cy.verifyCardInfoInlineErrors();
    cy.clickCancelButton();
  });

  it("checking the 'Billing Address' form appearance-TA-16", function () {
    cy.clickPaymentButton();
    cy.clickAddPaymentMethodButton();
    cy.verifyBillingAddressFormAppearance();
    cy.verifyBillingAddressInlineErrors();
    cy.clickCancelButton();
  });

  it("verifying that a 'Billing Address' form can be populated-TA-21", function () {
    cy.clickPaymentButton();
    cy.clickAddPaymentMethodButton();
    cy.populateBillingAddressForm(this.testdata.userAddress);
    cy.clickCancelButton();
  });

  it.skip("adding and deleting a new payment method-TA-17-18", function () {
    // TODO: figure out how to populate the iFrame credit card info
    // cy.clickPaymentButton();
    // cy.populateBillingAddressForm(this.testdata.userAddress);
    // cy.populateCardInformationForm();
  });

  it("verifying that notifications can be turned on and off-TA-22", function () {
    cy.clickNotificationsButton();
    // If the chakra-switch selector is disabled from the get go enable it first to run the test
    cy.verifyAndTurnOnChakraSwitchSelectorIfDisabled(0);
    // Total number of notification toggles on the page is 16
    for (var i = 0; i < 16; i++) {
      cy.verifyNotificationSelectors(i);
    }
    cy.clickSaveButton();
  });

  it("verifying selector labels on the 'Notifications' page-TA-23", function () {
    cy.clickNotificationsButton();
    for (let i = 0; i < 16; i++) {
      const allNotificationLabelsAtProfile = [
        "All Notifications",
        "SMS Notifications",
        "Guestlists",
        "New Purchases",
        "Ticket Transfers",
        "Campaigns",
        "Push Notifications",
        "Guestlists",
        "New Purchases",
        "Transfers",
        "Email Notifications",
        "Guestlists",
        "New Purchases",
        "Events",
        "Abandoned Carts",
        "Subscribe to promotions from Showpass",
      ];
      cy.verifyToggleLabelsOnNotificationsPage(
        i,
        allNotificationLabelsAtProfile.at(i)
      );
    }
  });

  it("verifying that notifications toggles disappear once 'All Notifications' selector is off-TA-24", function () {
    cy.clickNotificationsButton();
    // If the chakra-switch selector is disabled from the get go enable it first to run the test
    cy.verifyAndTurnOnChakraSwitchSelectorIfDisabled(0);
    cy.toggleSwitchSelector(0);
    // Verify that 'All Notifications' toggle is off
    cy.verifyToggleLabelsOnNotificationsPage(0, "All Notifications");
    cy.verifyChakraSwitchSelectorIsDisabled(0);
    // Verify that the 'Subscribe to promotions from Showpass' toggle is still enabled
    cy.verifyChakraSwitchSelectorIsEnabled(1);
    cy.verifyToggleLabelsOnNotificationsPage(
      1,
      "Subscribe to promotions from Showpass"
    );
    // Verify that all the disabled selectors are not present
    for (let i = 2; i < 16; i++) {
      cy.verifyElementDoesNotExist('input[class="chakra-switch__input"]', i);
    }
  });

  it("verifying that updated notifications can be saved-TA-25", function () {
    cy.log("***** Part 1: verify the toggle is ENABLED from the get go *****");
    cy.clickNotificationsButton();
    cy.verifyToggleLabelsOnNotificationsPage(0, "All Notifications");
    // If the chakra-switch selector is disabled from the get go enable it first to run the test
    cy.verifyAndTurnOnChakraSwitchSelectorIfDisabled(0);
    // Turn off the 'All Notifications' selector
    cy.toggleSwitchSelector(0);
    // Save and verify changes
    cy.clickSaveButton();
    // Verify and close the 'Success' message
    cy.verifyTopRightSuccessMessage(
      "Your notification preferences have been updated"
    );
    cy.clickButtonXtoCloseMessage();
    cy.log("***** Part 2: verify the toggle is DISABLED *****");
    // Load the 'Notifications' page again
    cy.clickNotificationsButton();
    // Verify the 'All Notifications' selector is DISABLED
    cy.verifyChakraSwitchSelectorIsDisabled(0);
    // Turn ON the 'All Notifications' selector
    cy.toggleSwitchSelector(0);
    // Save changes
    cy.clickSaveButton();
    cy.log("***** Part 3: verify the toggle is ENABLED again *****");
    // Verify and close the 'Success' message
    cy.verifyTopRightSuccessMessage(
      "Your notification preferences have been updated"
    );
    cy.clickButtonXtoCloseMessage();
    // Verify the 'All Notifications' selector is ENABLED
    cy.verifyChakraSwitchSelectorIsEnabled(0);
  });

  it("verifying 'Password' form appearance-TA-27", function () {
    cy.clickPasswordButton();
    cy.verifyPasswordFormAppearance();
    cy.getSaveButton();
  });

  it("verifying 'Password' form inline validation-TA-26", function () {
    cy.clickPasswordButton();
    for (let i = 0; i < 3; i++) {
      const fieldPlaceholders = [
        this.testdata.inputFieldPlaceholders.oldPwd,
        this.testdata.inputFieldPlaceholders.newPwd,
        this.testdata.inputFieldPlaceholders.confirmNewPwd,
      ];
      cy.clearInputFieldByAttr("placeholder", fieldPlaceholders.at(i));
    }
    cy.clickSaveButton();
    cy.verifyPasswordFormInlineValidation();
  });

  it("verifying invalid password inputs-TA-28", function () {
    cy.clickPasswordButton();
    // Case 1: Invalid old pwd, Valid new pwd, Valid confirm pwd
    cy.populateOldNewAndConfirmPwdFields(
      this.testdata.invalidPasswordInputsAndErrors.noSpecialCharPassword,
      this.testdata.invalidPasswordInputsAndErrors.newValidPassword,
      this.testdata.invalidPasswordInputsAndErrors.newValidPassword
    );
    cy.clickSaveButton();
    cy.verifyTopRightErrorMessage(
      this.testdata.invalidPasswordInputsAndErrors.oldPwdInvalidPwdMessage
    );
    cy.clickButtonXtoCloseMessage();
    cy.clearOldNewAndConfirmPwdFields();
    // Case 2: Valid old pwd, Valid new pwd, Invalid confirm pwd
    cy.populateOldNewAndConfirmPwdFields(
      this.testdata.userDetails.userPassword,
      this.testdata.invalidPasswordInputsAndErrors.newValidPassword,
      this.testdata.invalidPasswordInputsAndErrors.noSpecialCharPassword
    );
    cy.clickSaveButton();
    cy.getChakraInlineValidationError(
      0,
      this.testdata.invalidPasswordInputsAndErrors.mustBeAtLeast7Char
    );
    cy.clearOldNewAndConfirmPwdFields();
    // Case 3: Valid old pwd, No new pwd, Valid confirm pwd
    cy.getInputElementByAttr("placeholder", "Old Password").type(
      this.testdata.userDetails.userPassword,
      { force: true }
    );
    cy.getInputElementByAttr("placeholder", "Confirm New Password").type(
      this.testdata.invalidPasswordInputsAndErrors.newValidPassword,
      { force: true }
    );
    cy.clickSaveButton();
    cy.getChakraInlineValidationError(
      0,
      this.testdata.invalidPasswordInputsAndErrors.pwdIsRequired
    );
    cy.clearOldNewAndConfirmPwdFields();
    // Case 4: Valid old pwd, Valid new pwd, Not matching confirm pwd
    cy.populateOldNewAndConfirmPwdFields(
      this.testdata.userDetails.userPassword,
      this.testdata.invalidPasswordInputsAndErrors.newValidPassword,
      this.testdata.invalidPasswordInputsAndErrors.notMatchingPwd
    );
    cy.clickSaveButton();
    cy.getChakraInlineValidationError(
      0,
      this.testdata.invalidPasswordInputsAndErrors.pwdMustMatch
    );
    cy.clearOldNewAndConfirmPwdFields();
    // Case 5: Valid old pwd, No new pwd, No confirm pwd
    cy.getInputElementByAttr("placeholder", "Old Password").type(
      this.testdata.userDetails.userPassword,
      { force: true }
    );
    cy.clickSaveButton();
    cy.getChakraInlineValidationError(
      0,
      this.testdata.invalidPasswordInputsAndErrors.pwdIsRequired
    );
    cy.getChakraInlineValidationError(
      1,
      this.testdata.invalidPasswordInputsAndErrors.pwdIsRequired
    );
  });

  it("verifying 'Email' form appearance-TA-32", function () {
    cy.clickEmailButton();
    cy.verifyEmailFormAppearance(this.testdata.userDetails.userEmail);
  });

  it("verifying 'Email' form inline validation errors-TA-33", function () {
    cy.clickEmailButton();
    // Case 1:
    for (let i = 0; i < 2; i++) {
      const placeholders = [
        this.testdata.inputFieldPlaceholders.newEmail,
        this.testdata.inputFieldPlaceholders.password,
      ];
      cy.clearInputFieldByAttr("placeholder", placeholders.at(i));
    }
    cy.clickSaveButton();
    cy.getChakraInlineValidationError(
      0,
      this.testdata.errorMessages.emailRequired
    );
    cy.getChakraInlineValidationError(
      1,
      this.testdata.errorMessages.passwordRequired
    );
    // Case 2:
    cy.getInputElementByAttr(
      "placeholder",
      this.testdata.inputFieldPlaceholders.password
    ).type(this.testdata.userDetails.userPassword, { force: true });
    cy.clickSaveButton();
    cy.getChakraInlineValidationError(
      0,
      this.testdata.errorMessages.emailRequired
    );
    cy.clearInputFieldByAttr(
      "placeholder",
      this.testdata.inputFieldPlaceholders.password
    );
    // Case 3:
    cy.getInputElementByAttr(
      "placeholder",
      this.testdata.inputFieldPlaceholders.newEmail
    ).type(this.testdata.userDetails.userEmail, { force: true });
    cy.clickSaveButton();
    cy.getChakraInlineValidationError(
      0,
      this.testdata.errorMessages.passwordRequired
    );
    // Case 4:
    cy.getInputElementByAttr(
      "placeholder",
      this.testdata.inputFieldPlaceholders.password
    ).type("!*InvalidPassword#", { force: true });
    cy.clickSaveButton();
    cy.verifyTopRightErrorMessage(this.testdata.errorMessages.invalidPwd);
    cy.clickButtonXtoCloseMessage();
  });
});
