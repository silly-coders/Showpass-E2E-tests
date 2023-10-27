describe("Verify user's profile by ", () => {
  beforeEach("navigate to Home page", function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
    });
  });
  //---------------------------------------------------------------------
  it(
    "checking the 'Card Information' form appearance-TA-16",
    { tags: ["e2e", "appearance"] },
    function () {
      cy.logIntoPortal(this.testdata.userForNotifications);
      cy.clickUsernameOnTopBar();
      cy.selectProfileDropDownItem();
      cy.clickPaymentButton();
      cy.clickAddPaymentMethodButton();
      cy.verifyCardInfoFormAppearance();
      cy.verifyCardInfoInlineErrors();
      cy.clickCancelButton();
    }
  );
  //---------------------------------------------------------------------
  it(
    "checking the 'Billing Address' form appearance-TA-16",
    { tags: ["e2e", "appearance"] },
    function () {
      cy.logIntoPortal(this.testdata.userForNotifications);
      cy.clickUsernameOnTopBar();
      cy.selectProfileDropDownItem();
      cy.clickPaymentButton();
      cy.clickAddPaymentMethodButton();
      cy.verifyBillingAddressFormAppearance();
      cy.verifyBillingAddressInlineErrors();
      cy.clickCancelButton();
    }
  );
  //---------------------------------------------------------------------
  it(
    "verifying that a 'Billing Address' form can be populated-TA-21",
    { tags: ["e2e", "smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userForNotifications);
      cy.clickUsernameOnTopBar();
      cy.selectProfileDropDownItem();
      cy.clickPaymentButton();
      cy.clickAddPaymentMethodButton();
      cy.populateBillingAddressForm(this.testdata.userAddress);
      cy.clickCancelButton();
    }
  );
  //---------------------------------------------------------------------
  it(
    "adding and deleting a new payment method-TA-17-18",
    { tags: ["e2e", "smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userForCreditCardTesting);
      cy.clickUsernameOnTopBar();
      cy.selectProfileDropDownItem();
      cy.clickPaymentButton();
      cy.wait(500);
      cy.deleteCreditCardIfExists();
      cy.populateCardInformationForm(this.testdata.visaDebitForTesting);
      cy.populateBillingAddressForm(this.testdata.userAddress);
      cy.wait(500);
      cy.clickSaveButton();
      cy.get('div[class^="chakra-toast"]')
        .should("be.visible")
        .should("contain.text", "Credit Card Saved");
      cy.clickButtonXtoCloseMessage();
    }
  );
  //---------------------------------------------------------------------
  it(
    "verifying that notifications can be turned on and off-TA-22",
    { tags: ["e2e", "smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userForNotifications);
      cy.clickUsernameOnTopBar();
      cy.selectProfileDropDownItem();
      cy.clickNotificationsButton();
      for (var i = 0; i < 16; i++) {
        // If the chakra-switch selector is disabled enable it before test
        cy.verifyAndTurnOnChakraSwitchSelectorIfDisabled(i);
        cy.verifyNotificationSelectors(i);
      }
      cy.clickSaveButton();
    }
  );
  //---------------------------------------------------------------------
  it(
    "verifying selector labels on the 'Notifications' page-TA-23",
    { tags: ["e2e", "smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userForNotifications);
      cy.clickUsernameOnTopBar();
      cy.selectProfileDropDownItem();
      cy.clickNotificationsButton();
      // Verify 'Notifications' page sections headers
      const notificationsPageSectionsHeaders = [
        this.testdata.notificationLabelsAtProfile.label1,
        this.testdata.notificationLabelsAtProfile.label2,
        this.testdata.notificationLabelsAtProfile.label7,
        this.testdata.notificationLabelsAtProfile.label11,
        this.testdata.notificationLabelsAtProfile.label16,
      ];
      for (let j = 0; j < notificationsPageSectionsHeaders.length; j++) {
        cy.verifyNotificationsPageSectionsHeaders(
          j,
          notificationsPageSectionsHeaders.at(j)
        );
      }
      // Verify notifications labels
      const allNotificationLabelsAtProfile = [
        this.testdata.notificationLabelsAtProfile.label3,
        this.testdata.notificationLabelsAtProfile.label4,
        this.testdata.notificationLabelsAtProfile.label5,
        this.testdata.notificationLabelsAtProfile.label6,
        this.testdata.notificationLabelsAtProfile.label8,
        this.testdata.notificationLabelsAtProfile.label9,
        this.testdata.notificationLabelsAtProfile.label10,
        this.testdata.notificationLabelsAtProfile.label12,
        this.testdata.notificationLabelsAtProfile.label13,
        this.testdata.notificationLabelsAtProfile.label14,
        this.testdata.notificationLabelsAtProfile.label15,
      ];
      for (let i = 0; i < allNotificationLabelsAtProfile.length; i++) {
        cy.verifySelectorLabelsWithinSectionsOnNotificationsPage(
          i,
          allNotificationLabelsAtProfile.at(i)
        );
      }
    }
  );
  //---------------------------------------------------------------------
  it(
    "verifying that notifications toggles disappear once 'All Notifications' selector is off-TA-24",
    { tags: ["e2e", "smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userForNotifications);
      cy.clickUsernameOnTopBar();
      cy.selectProfileDropDownItem();
      cy.clickNotificationsButton();
      // If the chakra-switch selector is disabled enable it before test
      for (var i = 0; i < 16; i++) {
        cy.verifyAndTurnOnChakraSwitchSelectorIfDisabled(i);
      }
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
      // Verify that all the disabled selectors are not present in DOM
      for (let i = 2; i < 16; i++) {
        cy.verifyElementDoesNotExist('input[class="chakra-switch__input"]', i);
      }
    }
  );
  //---------------------------------------------------------------------
  it(
    "verifying that updated notifications can be saved-TA-25",
    { tags: ["e2e", "smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userForNotifications);
      cy.clickUsernameOnTopBar();
      cy.selectProfileDropDownItem();
      cy.log(
        "***** Part 1: verify the toggle is ENABLED from the get go *****"
      );
      cy.clickNotificationsButton();
      cy.get('div[id="notifications-form-container"]')
      .find('p[class^="chakra-text"]')
      .first()
      .should('exist')
      .scrollIntoView({force: true})
      .should('be.visible')
      .should('contain.text', "All Notifications");
      // If the chakra-switch selector is disabled enable it before test
      for (var i = 0; i < 16; i++) {
        cy.verifyAndTurnOnChakraSwitchSelectorIfDisabled(i);
      }
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
    }
  );
  //---------------------------------------------------------------------
  it(
    "verifying 'Password' form appearance-TA-27",
    { tags: ["e2e", "appearance"] },
    function () {
      cy.logIntoPortal(this.testdata.userForNotifications);
      cy.clickUsernameOnTopBar();
      cy.selectProfileDropDownItem();
      cy.clickPasswordButton();
      cy.verifyPasswordFormAppearance();
      cy.getSaveButton();
    }
  );
  // ***************************************************************************
  it(
    "verifying 'Password' form inline validation-TA-26",
    { tags: ["e2e", "smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userForNotifications);
      cy.clickUsernameOnTopBar();
      cy.selectProfileDropDownItem();
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
    }
  );
  // ***************************************************************************
  it(
    "verifying invalid password inputs-TA-28",
    { tags: ["e2e", "smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userForNotifications);
      cy.clickUsernameOnTopBar();
      cy.selectProfileDropDownItem();
      cy.clickPasswordButton();
      cy.log("Case 1: Invalid old pwd, Valid new pwd, Valid confirm pwd");
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
      cy.log("Case 2: Valid old pwd, Valid new pwd, Invalid confirm pwd");
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
      cy.log("Case 3: Valid old pwd, No new pwd, Valid confirm pwd");
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
      cy.log("Case 4: Valid old pwd, Valid new pwd, Not matching confirm pwd");
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
      cy.log("Case 5: Valid old pwd, No new pwd, No confirm pwd");
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
    }
  );
  // ***************************************************************************
  it(
    "verifying 'Email' form appearance-TA-32",
    { tags: ["e2e", "appearance"] },
    function () {
      cy.logIntoPortal(this.testdata.userForNotifications);
      cy.clickUsernameOnTopBar();
      cy.selectProfileDropDownItem();
      cy.clickEmailButton();
      cy.verifyEmailFormAppearance(
        this.testdata.userForNotifications.userEmail
      );
    }
  );
  // ***************************************************************************
  it(
    "verifying 'Email' form inline validation errors-TA-33",
    { tags: ["e2e", "smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userForNotifications);
      cy.clickUsernameOnTopBar();
      cy.selectProfileDropDownItem();
      cy.clickEmailButton();
      cy.log("TA-33 Case 1");
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
      cy.log("TA-33 Case 2");
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
      cy.log("TA-33 Case 3");
      cy.getInputElementByAttr(
        "placeholder",
        this.testdata.inputFieldPlaceholders.newEmail
      ).type(this.testdata.userDetails.userEmail, { force: true });
      cy.clickSaveButton();
      cy.getChakraInlineValidationError(
        0,
        this.testdata.errorMessages.passwordRequired
      );
      cy.log("TA-33 Case 4");
      cy.getInputElementByAttr(
        "placeholder",
        this.testdata.inputFieldPlaceholders.password
      ).type("!*InvalidPassword#", { force: true });
      cy.clickSaveButton();
      cy.verifyTopRightErrorMessage(this.testdata.errorMessages.invalidPwd);
      cy.clickButtonXtoCloseMessage();
    }
  );
});
