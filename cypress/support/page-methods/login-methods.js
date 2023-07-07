import { HomeLocators } from "../element-locators/home-locators";
import { LoginLocators } from "../element-locators/login-locators";
const homeLocators = new HomeLocators();
const loginLocators = new LoginLocators();

/**
 * Method to verify 'Login' modal window overall appearance
 */
Cypress.Commands.add("verifyLoginModalWindowAppearance", () => {
  cy.log("***** Begin running verifyLoginModalWindowAppearance() *****");
  cy.clickLoginOnHomePage();
  homeLocators.showpassLogo().should("exist").should("be.visible");
  loginLocators.welcomeBackHeader().should("exist").should("be.visible");
  loginLocators.dontHaveAnAccountText().should("exist").should("be.visible");
  loginLocators.signUpLink().should("exist").should("be.visible");
  loginLocators.emailAddressLabel().should("exist").should("be.visible");
  loginLocators.emailAddressInputField().should("exist").should("be.visible");
  loginLocators.passwordLabel().should("exist").should("be.visible");
  loginLocators.passwordInputField().should("exist").should("be.visible");
  loginLocators.forgotYourPasswordLink().should("exist").should("be.visible");
  loginLocators.loginButtonOnLoginModalWindow().should("exist").should("be.visible");
  loginLocators.theOrWordBelowLoginButton().should("exist").should("be.visible");
  loginLocators.signInUsingFacebookButtion().should("exist").should("be.visible");
  cy.log("***** Finished verifyLoginModalWindowAppearance() *****");
});