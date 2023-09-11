describe("Verify destructive profile updates by ", () => {
  before(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
    });
  });
// ***************************************************************************
  it(
    "changing user's current password-TA-29",
    { tags: ["smoke"] },
    function () {
      // Sign in using the new password
      cy.clickLoginOnHomePage();
      cy.getInputElementByAttr("placeholder", "Email Address")
        .should("exist")
        .should("be.visible")
        .type(this.testdata.userForUpdates.emailForPwdChange);
      cy.getInputElementByAttr("placeholder", "Password")
        .should("exist")
        .should("be.visible")
        .type(this.testdata.userForUpdates.userPassword);
      cy.clickLogInButtonOnModalWindow();
      cy.clickUsernameAfterLoggingIn();
      cy.selectProfileDropDownItem();
      cy.clickPasswordButton();
      // Change the current password
      cy.populateOldNewAndConfirmPwdFields(
        this.testdata.userForUpdates.userPassword,
        this.testdata.userDetails.userPassword,
        this.testdata.userDetails.userPassword
      );
      cy.clickSaveButton();
      cy.verifyTopRightSuccessMessage(
        this.testdata.userForUpdates.pwdUpdateSuccessMsg
      );
      cy.clickButtonXtoCloseMessage();
      cy.clickUsernameAfterLoggingIn();
      cy.signOut();
      // Sign in using the new password
      cy.clickLoginOnHomePage();
      cy.getInputElementByAttr("placeholder", "Email Address")
        .should("exist")
        .should("be.visible")
        .type(this.testdata.userForUpdates.emailForPwdChange);
      cy.getInputElementByAttr("placeholder", "Password")
        .should("exist")
        .should("be.visible")
        .type(this.testdata.userDetails.userPassword);
      cy.clickLogInButtonOnModalWindow();
      cy.clickUsernameAfterLoggingIn();
      cy.selectProfileDropDownItem();
      cy.clickPasswordButton();
      // Change back the password
      cy.populateOldNewAndConfirmPwdFields(
        this.testdata.userDetails.userPassword,
        this.testdata.userForUpdates.userPassword,
        this.testdata.userForUpdates.userPassword
      );
      cy.clickSaveButton();
      cy.verifyTopRightSuccessMessage(
        this.testdata.userForUpdates.pwdUpdateSuccessMsg
      );
      cy.clickButtonXtoCloseMessage();
    }
  );
// ***************************************************************************
  it("updating user's email-TA-30", { tags: ["smoke"] }, function () {
    cy.logIntoPortal(this.testdata.userForUpdates);
    cy.clickUsernameAfterLoggingIn();
    cy.selectProfileDropDownItem();
    cy.clickEmailButton();
    var uniqueUserEmail =
      "test-user-" + Math.floor(Date.now() / 1000) + "@mailinator.com";
    cy.getChakraInputFieldByAttr("id", "email").type(uniqueUserEmail, {
      force: true,
    });
    cy.getChakraInputFieldByAttr("id", "password").type(
      this.testdata.userDetails.userPassword,
      { force: true }
    );
    cy.clickSaveButton();
    cy.verifyTopRightSuccessMessage(
      this.testdata.userForUpdates.emailWasUpdatedMsg
    );
    cy.clickButtonXtoCloseMessage();
    cy.reload();
    // Verify the updated email value
    cy.verifyInputFieldAttr("id", "currentEmail", "value", uniqueUserEmail);
    // Change it back to the original email
    cy.getChakraInputFieldByAttr("id", "email").type(
      this.testdata.userForUpdates.userEmail,
      { force: true }
    );
    cy.getChakraInputFieldByAttr("id", "password").type(
      this.testdata.userDetails.userPassword,
      { force: true }
    );
    cy.clickSaveButton();
    cy.verifyTopRightSuccessMessage(
      this.testdata.userForUpdates.emailWasUpdatedMsg
    );
    cy.clickButtonXtoCloseMessage();
  });
// ***************************************************************************
  it(
    "verifying that 'Personal Info' can be updated-TA-34",
    { tags: ["smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userForUpdates);
      cy.clickUsernameAfterLoggingIn();
      cy.selectProfileDropDownItem();
      cy.clickPersonalInfoButton();
      // Clear and populate input fields
      for (let i = 0; i < 2; i++) {
        const placeholders = [
          this.testdata.inputFieldPlaceholders.firstName,
          this.testdata.inputFieldPlaceholders.lastName,
        ];
        const values = [
          this.testdata.userForUpdates.userFirstName,
          this.testdata.userForUpdates.userLastName,
        ];
        cy.clearInputFieldByAttr("placeholder", placeholders.at(i));
        cy.getChakraInputFieldByAttr("placeholder", placeholders.at(i)).type(
          values.at(i),
          {
            force: true,
          }
        );
      }
      cy.getPhoneInputFieldByPlaceholder(
        this.testdata.inputFieldPlaceholders.phoneNumber
      )
        .clear({ force: true })
        .type(this.testdata.userDetails.phoneNumber, { force: true });
      cy.clickSaveButton();
      cy.verifyTopRightSuccessMessage(
        this.testdata.userForUpdates.profileUpdateSuccess
      );
      // Verify input field values after saving changes
      for (let i = 0; i < 2; i++) {
        const placeholders = [
          this.testdata.inputFieldPlaceholders.firstName,
          this.testdata.inputFieldPlaceholders.lastName,
        ];
        const values = [
          this.testdata.userForUpdates.userFirstName,
          this.testdata.userForUpdates.userLastName,
        ];
        cy.verifyChakraInputFieldValue(
          "placeholder",
          placeholders.at(i),
          values.at(i)
        );
      }
      cy.getPhoneInputFieldByPlaceholder(
        this.testdata.inputFieldPlaceholders.phoneNumber
      )
        .should("have.attr", "value", this.testdata.userDetails.phoneNumber)
        .should("be.visible");
    }
  );
// ***************************************************************************  
});
