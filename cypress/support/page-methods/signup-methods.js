import { HomeLocators } from "../element-locators/home-locators";
import { LoginLocators } from "../element-locators/login-locators";
import { SignupLocators } from "../element-locators/signup-locators";
const homeLocators = new HomeLocators();
const loginLocators = new LoginLocators();
const signupLocators = new SignupLocators();

/**
 * Method to verify 'Sign-Up' modal window overall appearance
 */
Cypress.Commands.add("verifySignupModalWindowAppearance", () => {
  cy.log("Going to verifySignupModalWindowAppearance()");
  cy.clickCreateAccountOnHomePage();
  loginLocators
    .showpassLogoOnModalWindow()
    .should("exist")
    .should("be.visible");
  signupLocators.createAccountHeader().should("exist").should("be.visible");
  signupLocators.alreadyHaveAccountText().should("exist").should("be.visible");
  signupLocators.firstNameLabel().should("exist").should("be.visible");
  signupLocators.firstNameInputField().should("exist").should("be.visible");
  signupLocators.lastNameLabel().should("exist").should("be.visible");
  signupLocators.lastNameInputField().should("exist").should("be.visible");
  signupLocators.emailAddressLabel().should("exist").should("be.visible");
  signupLocators.emailAddressInputField().should("exist").should("be.visible");
  signupLocators.passwordLabel().should("exist").should("be.visible");
  signupLocators.passwordInputField().should("exist").should("be.visible");
  signupLocators.confirmPasswordLabel().should("exist").should("be.visible");
  signupLocators
    .confirmPasswordInputField()
    .should("exist")
    .should("be.visible");
  signupLocators.createAccountButton().should("exist").should("be.visible");
  loginLocators
    .theOrWordBelowLoginButton()
    .should("exist")
    .should("be.visible");
  signupLocators
    .signUpUsingFacebookButtion()
    .should("exist")
    .should("be.visible");
  signupLocators
    .byCreatingAccountAnAccountText()
    .should("exist")
    .scrollIntoView()
    .should("be.visible");
  signupLocators.privacyPolicyLink().should("exist").should("be.visible");
  signupLocators.termsOfServiceLink().should("exist").should("be.visible");
});

/**
 * Method to click 'Create Account' on the 'Sign-Up' modal window
 */
Cypress.Commands.add("clickCreateAccountOnSignUpModalWindow", () => {
  cy.log("Going to clickCreateAccountOnSignUpModalWindow()");
  signupLocators
    .createAccountButtonOnSignupPage()
    .should("exist")
    .should("be.visible")
    .click();
});

/**
 * Method to register a new user
 */
Cypress.Commands.add("registerNewUser", (userDetails) => {
  cy.log("Going to registerNewUser()");
  const apiRequest = "/api/auth/registration/";
  cy.intercept(apiRequest).as("pageLoaded");
  // Create a unique user email
  var uniqueUserEmail =
    "test-user-" + Math.floor(Date.now() / 1000) + "@mailinator.com";
  if (!userDetails) throw new Error("You need to provide user details!");
  const log = Cypress.log({
    name: "Registration",
    displayName: "REGISTRATION",
    message: [`Signing up | User email: ${userDetails.userEmail}`],
    autoEnd: false,
  });
  cy.clickCreateAccountOnHomePage();
  signupLocators
    .firstNameInputField()
    .should("exist")
    .should("be.visible")
    .type(userDetails.userFirstName);
  signupLocators
    .lastNameInputField()
    .should("exist")
    .should("be.visible")
    .type(userDetails.userLastName);
  signupLocators
    .emailAddressInputField()
    .should("exist")
    .should("be.visible")
    .type(uniqueUserEmail);
  signupLocators
    .passwordInputField()
    .should("exist")
    .should("be.visible")
    .type(userDetails.userPassword);
  signupLocators
    .confirmPasswordInputField()
    .should("exist")
    .should("be.visible")
    .type(userDetails.userPassword);
  signupLocators.createAccountButton().should("exist").should("be.visible");
  cy.clickCreateAccountOnSignUpModalWindow();
  cy.wait("@pageLoaded")
    .its("response.statusCode")
    .should("be.oneOf", [201, 204]);
  homeLocators.accountCreatedMessage().should("exist").should("be.visible");
});
