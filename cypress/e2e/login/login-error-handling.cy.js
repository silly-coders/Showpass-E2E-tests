describe("Verify invalid login inputs and errors by ", () => {
  before(function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
    });
  });
  // ***************************************************************************
  it(
    "providing a few sets of incorrect credentials and clicking login-TA-98",
    { tags: ["e2e", "smoke"] },
    function () {
      // Navigate to Home page
      cy.navigateToHomePage();
      // Click 'Log in' button
      cy.clickLoginOnHomePage();
      // Wait for the Login modal window
      cy.get('section[class^="chakra-modal__content"][role="dialog"]')
        .should("exist")
        .should("be.visible");
      // Click 'Log In' right away without providing credentials
      cy.get('button[type="submit"][class^="chakra-button"] > span')
        .eq(1)
        .contains("Log In")
        .should("exist")
        .click({ force: true });
      // Verify error message under the 'Email Address' input field
      cy.verifyErrorUnderEmailAddressField("Email is required");
      // Verify error message under the 'Password' input field
      cy.verifyErrorUnderPasswordField("Password is required");
      // Provide invalid email address
      let invalidEmailAddress = ["test-email@", "test-email@mail", "@mail.com"];
      for (let i = 0; i < invalidEmailAddress.length; i++) {
        cy.log(
          "Going to verify the following invalid email input: " +
            invalidEmailAddress.at(i)
        );
        // Input value into the Email Address field
        cy.populateEmailAddressField(invalidEmailAddress.at(i));
        cy.clickLogInButtonOnModalWindow();
        cy.wait(300);
        // Verify error message under the 'Email Address' input field
        cy.verifyErrorUnderEmailAddressField("Invalid email address");
      }
      // ***** Verify the right top toast error message
      // Provide a valid email and invalid password
      cy.populateEmailAddressField(this.testdata.userDetails.userEmail);
      cy.populatePasswordField("pwdForTesting123");
      cy.clickLogInButtonOnModalWindow();
      cy.wait(700);
      // Verify error message
      cy.get('div[status="error"] > div > div > p')
        .should("exist")
        .scrollIntoView({ force: true })
        .should("be.visible")
        .should("have.text", "Unable to log in with provided credentials.");
    }
  );
  // ***************************************************************************
  it(
    "verifying Password Reset error handling-TA-108",
    { tags: ["e2e", "smoke"] },
    function () {
      // Navigate to Home page
      cy.navigateToHomePage();
      // Click 'Log in' button
      cy.clickLoginOnHomePage();
      // Wait for the Login modal window
      cy.get('section[class^="chakra-modal__content"][role="dialog"]')
        .should("exist")
        .should("be.visible");
      // Click 'Forgot your password?'
      cy.clickChakraButtonByText("Forgot your password?");
      // Ensure the 'Password Reset' modal shows up
      cy.getH1HeaderByText("Password Reset");
      // Click 'Send Reset Link' without providing an email
      cy.getChakraButtonByText("Send Reset Link").click({ force: true });
      // Verify inline validation error
      cy.getChakraInlineValidationError(0, "Email is required");
      // Provide invalid email address
      let invalidEmailAddress = ["test-email@", "test-email@mail", "@mail.com"];
      for (let i = 0; i < invalidEmailAddress.length; i++) {
        cy.log(
          "Going to verify the following invalid email input: " +
            invalidEmailAddress.at(i)
        );
        // Input value into the Email Address field
        cy.populateEmailAddressField(invalidEmailAddress.at(i));
        // Click 'Send Reset Link' without providing an email
        cy.getChakraButtonByText("Send Reset Link").click({ force: true });
        cy.wait(100);
        // Verify error message under the 'Email Address' input field
        cy.verifyErrorUnderEmailAddressField("Invalid email address");
      }
    }
  );
  // ***************************************************************************
});
