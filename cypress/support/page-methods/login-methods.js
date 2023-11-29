import { HomeLocators } from "../element-locators/home-locators";
import { LoginLocators } from "../element-locators/login-locators";
const homeLocators = new HomeLocators();
const loginLocators = new LoginLocators();
// *****************************************************************************
/**
 * Method to verify 'Login' modal window overall appearance
 */
Cypress.Commands.add("verifyLoginModalWindowAppearance", () => {
  cy.log("Going to verifyLoginModalWindowAppearance()");
  cy.clickLoginOnHomePage();
  loginLocators
    .showpassLogoOnModalWindow()
    .should("exist")
    .should("be.visible");
  loginLocators.welcomeBackHeader().should("exist").should("be.visible");
  loginLocators.dontHaveAnAccountText().should("exist").should("be.visible");
  loginLocators.signUpLink().should("exist").should("be.visible");
  loginLocators.emailAddressLabel().should("exist").should("be.visible");
  loginLocators.emailAddressInputField().should("exist").should("be.visible");
  loginLocators.passwordLabel().should("exist").should("be.visible");
  loginLocators.passwordInputField().should("exist").should("be.visible");
  loginLocators.forgotYourPasswordLink().should("exist").should("be.visible");
  loginLocators
    .loginButtonOnLoginModalWindow()
    .should("exist")
    .should("be.visible");
  loginLocators
    .theOrWordBelowLoginButton()
    .should("exist")
    .should("be.visible");
  loginLocators
    .signInUsingFacebookButtion()
    .should("exist")
    .should("be.visible");
});
// *****************************************************************************
/**
 * Method to log into the 'Showpass' portal
 * @argument userObject
 */
Cypress.Commands.add("logIntoPortal", (userObject) => {
  if (!userObject) throw new Error("You need to provide user credentials!");
  const log = Cypress.log({
    name: "Login",
    displayName: "LOGIN",
    message: [`🔐 Authenticating | User email: ${userObject.userEmail}`],
    autoEnd: false,
    color: "green",
  });
  const apiEnvelopBeforeLogin = "**/envelope/*";
  cy.intercept(apiEnvelopBeforeLogin).as("envelopeLoaded");
  cy.signOutIfLoggedIn();
  cy.clickLoginOnHomePage();
  cy.wait("@envelopeLoaded")
    .its("response.statusCode")
    .should(
      "be.oneOf",
      [200, 204],
      "Checking if the Login modal window got loaded"
    );
  loginLocators
    .emailAddressInputField()
    .should("exist")
    .should("be.visible")
    .clear({ force: true })
    .type(userObject.userEmail)
    .wait(150);
  loginLocators
    .passwordInputField()
    .should("exist")
    .should("be.visible")
    .clear({ force: true })
    .type(userObject.userPassword)
    .wait(150);
  loginLocators
    .emailAddressInputField()
    .should("have.value", userObject.userEmail)
    .wait(150);
  loginLocators
    .passwordInputField()
    .should("have.value", userObject.userPassword)
    .wait(150);
  const apiRequestProfile = "/api/auth/profile/";
  cy.intercept(apiRequestProfile).as("profileLoaded");
  loginLocators
    .loginButtonOnLoginModalWindow()
    .should("exist")
    .should("be.visible")
    .wait(300)
    .click({ force: true });
  cy.wait(500);
  cy.log('Going to confirm the folloing API: "/api/auth/profile/"');
  cy.wait("@profileLoaded")
    .its("response.statusCode")
    .should(
      "be.oneOf",
      [200, 204],
      "Verifying the response status code after logging in."
    );
  // If error message shows up after loggin in report it
  cy.verifyIfErrorShowsUpAfterLoggingIn();
  loginLocators
    .userFirstAndLastNames()
    .should("exist")
    .should("be.visible")
    .should(
      "have.text",
      userObject.userFirstName + " " + userObject.userLastName
    );
});
// *****************************************************************************
/**
 * Method to log into the 'Showpass' portal in mobile view
 * @argument userObject
 */
Cypress.Commands.add("logIntoPortalInMobileView", (userObject) => {
  cy.log("Going to logIntoPortalInMobileView()");
  if (!userObject) throw new Error("You need to provide user credentials!");
  cy.wait(500);
  // Get the main menu modal window in mobile view
  cy.get('div[id="chakra-modal--body-1"] > div').then(($modal) => {
    if (
      $modal.find(
        'button[class^="chakra-button"][paint="primary"]' // Then find the 'Log In' button
      ).length
    ) {
      // Click 'Log In'
      cy.get(
        'div[id="chakra-modal--body-1"] > div > button[class^="chakra-button"][paint="primary"]'
      )
        .contains("Log In")
        .click({ force: true });
      cy.wait(500);
      const log = Cypress.log({
        name: "Login",
        displayName: "LOGIN",
        message: [`🔐 Authenticating | User email: ${userObject.userEmail}`],
        autoEnd: false,
        color: "green",
      });
      loginLocators
        .emailAddressInputField()
        .should("exist")
        .should("be.visible")
        .wait(150)
        .clear({ force: true })
        .type(userObject.userEmail)
        .wait(150);
      loginLocators
        .passwordInputField()
        .should("exist")
        .should("be.visible")
        .clear({ force: true })
        .type(userObject.userPassword)
        .wait(150);
      loginLocators
        .emailAddressInputField()
        .should("have.value", userObject.userEmail)
        .wait(150);
      loginLocators
        .passwordInputField()
        .should("have.value", userObject.userPassword)
        .wait(150);
      const apiRequestProfile = "/api/auth/profile/";
      cy.intercept(apiRequestProfile).as("profileLoaded");
      loginLocators
        .loginButtonOnLoginModalWindow()
        .should("exist")
        .should("be.visible")
        .wait(150)
        .click({ force: true });
      cy.wait(700);
      cy.wait("@profileLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 204], "Verifying response status code.");
      // If error message shows up after loggin in report it
      cy.verifyIfErrorShowsUpAfterLoggingIn();
      // Button arrow in the top right corner pointing down
      cy.get('button[aria-label="Main menu"] > span > svg')
        .should("exist")
        .should("be.visible");
      // Click the top right arrow button which is the main menu button
      cy.get('button[aria-label="Main menu"] > span > svg').click({
        force: true,
      });
      // Verify user name on a modal window after logging in
      cy.log("Going to verify user name on a modal window after logging in");
      cy.get('div[id="chakra-modal--body-1"] > div > div > p')
        .should("exist")
        .should("be.visible")
        .should(
          "have.text",
          userObject.userFirstName + " " + userObject.userLastName
        );
    } else {
      cy.log(`Button "Log In" is not available. Can't click it.`);
    }
  });
});
// *****************************************************************************
/**
 * Method to log in only
 * @argument userObject
 */
Cypress.Commands.add("loginOnlyIntoPortal", (userObject) => {
  if (!userObject) throw new Error("You need to provide user credentials!");
  const log = Cypress.log({
    name: "Login",
    displayName: "LOGIN",
    message: [`🔐 Authenticating | User email: ${userObject.userEmail}`],
    autoEnd: false,
    color: "green",
  });
  cy.wait(500);
  loginLocators
    .emailAddressInputField()
    .should("exist")
    .should("be.visible")
    .type(userObject.userEmail)
    .wait(150);
  loginLocators
    .passwordInputField()
    .should("exist")
    .should("be.visible")
    .type(userObject.userPassword)
    .wait(150);
  loginLocators
    .emailAddressInputField()
    .should("have.value", userObject.userEmail)
    .wait(150);
  loginLocators
    .passwordInputField()
    .should("have.value", userObject.userPassword)
    .wait(150);
  loginLocators
    .loginButtonOnLoginModalWindow()
    .should("exist")
    .should("be.visible")
    .click({ force: true });
  cy.wait(700);
  // If error message shows up after loggin in report it
  cy.verifyIfErrorShowsUpAfterLoggingIn();
});
// *****************************************************************************
/**
 * Method to populate Email Address field on the Login modal window
 * @argument emailAddress
 */
Cypress.Commands.add("populateEmailAddressField", (emailAddress) => {
  cy.log("Going to populateEmailAddressField(emailAddress)");
  loginLocators
    .emailAddressInputField()
    .should("exist")
    .should("be.visible")
    .clear({ force: true })
    .type(emailAddress)
    .wait(150);
});
// *****************************************************************************
/**
 * Method to populate Password field on the Login modal window
 * @argument password
 */
Cypress.Commands.add("populatePasswordField", (password) => {
  cy.log("Going to populatePasswordField(password)");
  loginLocators
    .passwordInputField()
    .should("exist")
    .should("be.visible")
    .clear({ force: true })
    .type(password)
    .wait(150);
});
// *****************************************************************************
/**
 * Method to verify errors under the Email Address field on the Login modal window
 * @argument expectedErrorMsg
 */
Cypress.Commands.add(
  "verifyErrorUnderEmailAddressField",
  (expectedErrorMsg) => {
    cy.log("Going to verifyErrorUnderEmailAddressField(expectedErrorMsg)");
    cy.get('div[class^="chakra-form__error-message"]')
      .first()
      .should("exist")
      .should("be.visible")
      .should("have.text", expectedErrorMsg);
  }
);
// *****************************************************************************
/**
 * Method to verify errors under the Password field on the Login modal window
 * @argument expectedErrorMsg
 */
Cypress.Commands.add("verifyErrorUnderPasswordField", (expectedErrorMsg) => {
  cy.log("Going to verifyErrorUnderPasswordField(expectedErrorMsg)");
  cy.get('div[class^="chakra-form__error-message"]')
    .last()
    .should("exist")
    .should("be.visible")
    .should("have.text", expectedErrorMsg);
});
// *****************************************************************************
/**
 * Method to sign out on the Home page
 */
Cypress.Commands.add("signOutIfLoggedIn", () => {
  cy.log("Going to check if signing out is possible");
  // If 'Main Menu' shows up that means you are logged in, sign out then
  cy.get("body").then(($body) => {
    if (
      $body.find(
        cy.get('button[class^="chakra-button"][aria-label="Main menu"]')
      ).length
    ) {
      cy.log("Currently logged in. Going to sign out.");
      // Open main menu and sign out
      cy.getChakraButtonByAttribute("aria-label", "Main menu")
        .click({
          force: true,
        })
        .wait(300);
      // Click the 'Log out' button
      cy.get(
        'div[class^="chakra-modal__body"] > div > button[class^="chakra-button"]'
      )
        .eq(9)
        .contains("Log Out")
        .should("exist")
        .scrollIntoView({ force: true })
        .should("be.visible")
        .click({ force: true });
      cy.wait(700);
      // Ensure the Log In button shows up now
      cy.get('button[class^="chakra-button"] > span')
        .contains("Log In")
        .should("exist")
        .scrollIntoView({ force: true })
        .should("be.visible");
    }
  });
});
// *****************************************************************************
