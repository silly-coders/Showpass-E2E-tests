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

  it("changing user's current password-TA-29", function () {
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
      this.testdata.invalidPasswordInputsAndErrors.newValidPassword,
      this.testdata.invalidPasswordInputsAndErrors.newValidPassword
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
      .type(this.testdata.invalidPasswordInputsAndErrors.newValidPassword);
    cy.clickLogInButtonOnModalWindow();
    cy.clickUsernameAfterLoggingIn();
    cy.selectProfileDropDownItem();
    cy.clickPasswordButton();
    // Change back the password
    cy.populateOldNewAndConfirmPwdFields(
      this.testdata.invalidPasswordInputsAndErrors.newValidPassword,
      this.testdata.userForUpdates.userPassword,
      this.testdata.userForUpdates.userPassword
    );
    cy.clickSaveButton();
    cy.verifyTopRightSuccessMessage(
      this.testdata.userForUpdates.pwdUpdateSuccessMsg
    );
    cy.clickButtonXtoCloseMessage();
  });

  it("updating user's email-TA-30", function () {
    cy.logIntoPortal(this.testdata.userForUpdates);
    cy.clickUsernameAfterLoggingIn();
    cy.selectProfileDropDownItem();
    cy.clickEmailButton();
    var uniqueUserEmail =
      "test-user-" + Math.floor(Date.now() / 1000) + "@mailinator.com";
    cy.getChakraInputFieldByAttr("id", "email").type(uniqueUserEmail);
    cy.getChakraInputFieldByAttr("id", "password").type(
      this.testdata.userDetails.userPassword
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
      this.testdata.userForUpdates.userEmail
    );
    cy.getChakraInputFieldByAttr("id", "password").type(
      this.testdata.userDetails.userPassword
    );
    cy.clickSaveButton();
    cy.verifyTopRightSuccessMessage(
      this.testdata.userForUpdates.emailWasUpdatedMsg
    );
    cy.clickButtonXtoCloseMessage();
  });
});
