describe("Verify destructive profile updates by ", () => {
  before(function () {
    cy.clearAllSessionStorage();
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
    { tags: ["e2e", "smoke"] },
    function () {
      // Sign in using the new password
      cy.clickLoginOnHomePage();
      let userDetails = {
        userEmail: this.testdata.userForUpdates.emailForPwdChange,
        userPassword: this.testdata.userForUpdates.userPassword,
      };
      cy.loginOnlyIntoPortal(userDetails);
      cy.clickUsernameOnTopBar();
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
      cy.clickUsernameOnTopBar();
      cy.signOut();
      // Sign in using the new password
      cy.clickLoginOnHomePage();
      cy.loginOnlyIntoPortal(userDetails);
      cy.clickUsernameOnTopBar();
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
  it("updating user's email-TA-30", { tags: ["e2e", "smoke"] }, function () {
    cy.logIntoPortal(this.testdata.userForUpdates);
    cy.clickUsernameOnTopBar();
    cy.selectProfileDropDownItem();
    cy.clickEmailButton();
    var updatedEmail = "qa+156@showpass.com";
    cy.getChakraInputFieldByAttr("id", "email").type(updatedEmail, {
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
    cy.verifyInputFieldAttr("id", "currentEmail", "value", updatedEmail);
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
    { tags: ["e2e", "smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userForUpdates);
      cy.clickUsernameOnTopBar();
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
