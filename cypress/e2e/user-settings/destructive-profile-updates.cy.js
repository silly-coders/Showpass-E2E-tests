describe("Verify destructive profile updates by ", () => {
    before(function () {
      cy.clearLocalStorage();
      cy.clearCookies();
    });
  
    beforeEach("navigate to Home page", function () {
      cy.fixture("testdata.json").then(function (testdata) {
        this.testdata = testdata;
        cy.navigateToHomePage();
        cy.logIntoPortal(this.testdata.userForUpdates);
        cy.clickUsernameAfterLoggingIn();
        cy.selectProfileDropDownItem();
      });
    });
  
    it("changing user's current password-TA-29", function () {
      cy.clickPasswordButton();
      // Change the current password
      cy.populateOldNewAndConfirmPwdFields(
        this.testdata.userDetails.userPassword,
        this.testdata.invalidPasswordInputsAndErrors.newValidPassword,
        this.testdata.invalidPasswordInputsAndErrors.newValidPassword
      );
      cy.clickSaveButton();
      cy.verifyTopRightSuccessMessage(this.testdata.userForUpdates.pwdUpdateSuccessMsg);
      cy.clickButtonXtoCloseMessage();
      cy.clickUsernameAfterLoggingIn();
      cy.signOut();
      // Sign in using the new password
      cy.clickLoginOnHomePage();
      cy.getInputElementByAttr('placeholder','Email Address')
        .should("exist")
        .should("be.visible")
        .type(this.testdata.userForUpdates.userEmail);
      cy.getInputElementByAttr('placeholder','Password')
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
        this.testdata.userDetails.userPassword,
        this.testdata.userDetails.userPassword
      );
      cy.clickSaveButton();
      cy.verifyTopRightSuccessMessage(this.testdata.userForUpdates.pwdUpdateSuccessMsg);
      cy.clickButtonXtoCloseMessage();
    });
  });