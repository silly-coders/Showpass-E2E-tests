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
    cy.log("***** Begin running verifySignupModalWindowAppearance() *****");
    cy.clickCreateAccountOnHomePage();
    homeLocators.showpassLogo().should("exist").should("be.visible");
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
    signupLocators.confirmPasswordInputField().should("exist").should("be.visible");
    signupLocators.createAccountButton().should("exist").should("be.visible");
    loginLocators.theOrWordBelowLoginButton().should("exist").should("be.visible");
    signupLocators.signUpUsingFacebookButtion().should("exist").should("be.visible");
    signupLocators.byCreatingAccountAnAccountText().should("exist").scrollIntoView().should("be.visible");
    signupLocators.privacyPolicyLink().should("exist").should("be.visible");
    signupLocators.termsOfServiceLink().should("exist").should("be.visible");
    cy.log("***** Finished verifySignupModalWindowAppearance() *****");
});