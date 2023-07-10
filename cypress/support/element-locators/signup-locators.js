export class SignupLocators {
  /**
   * 'Create Account' header on the 'Sign-Up' modal window
   */
  createAccountHeader() {
    return cy.get('h1[class^="css"]').contains("Create Account");
  }
  /**
   * 'Already have an account?' text on the 'Sign-up' modal window
   */
  alreadyHaveAccountText() {
    return cy.get("div > div").contains("Already have an account?");
  }
  /**
   * 'First Name' label on the 'Sign-up' modal window
   */
  firstNameLabel() {
    return cy.get('label[for="firstName"]');
  }
  /**
   * 'First Name' input field on the 'Sign-up' modal window
   */
  firstNameInputField() {
    return cy.get('input[id="firstName"]');
  }
  /**
   * 'Last Name' label on the 'Sign-up' modal window
   */
  lastNameLabel() {
    return cy.get('label[for="lastName"]');
  }
  /**
   * 'Last Name' input field on the 'Sign-up' modal window
   */
  lastNameInputField() {
    return cy.get('input[id="lastName"]');
  }
  /**
   * 'Email Address' label on the 'Sign-up' modal window
   */
  emailAddressLabel() {
    return cy.get('label[for="email"]');
  }
  /**
   * 'Email Address' input field on the 'Sign-up' modal window
   */
  emailAddressInputField() {
    return cy.get('input[id="email"]');
  }
  /**
   * 'Password' label on the 'Sign-up' modal window
   */
  passwordLabel() {
    return cy.get('label[for="password"]');
  }
  /**
   * 'Password' input field on the 'Sign-up' modal window
   */
  passwordInputField() {
    return cy.get('input[id="password"]');
  }
  /**
   * 'Confirm Password' label on the 'Sign-up' modal window
   */
  confirmPasswordLabel() {
    return cy.get('label[for="confirmPassword"]');
  }
  /**
   * 'Confirm Password' input field on the 'Sign-up' modal window
   */
  confirmPasswordInputField() {
    return cy.get('input[id="confirmPassword"]');
  }
  /**
   * 'Create Account' button on the 'Sign-up' modal window
   */
  createAccountButton() {
    return cy.get('button[type="submit"]').contains("Create Account");
  }
  /**
   * 'Sign up using Facebook' button on the 'Sign-Up' modal window
   */
  signUpUsingFacebookButtion() {
    return cy.get('button[aria-label="Sign up using Facebook"]');
  }
  /**
   * 'By creating an account you agree to ... ' text at the bottom of the 'Sign-Up' popup
   */
  byCreatingAccountAnAccountText() {
    return cy
      .get('div[class^="css"]')
      .contains("By creating an account you agree to our");
  }
  /**
   * 'Privacy policy' link on the 'Sign-up' modal window
   */
  privacyPolicyLink() {
    return cy.get('a[href="/sell/privacy-policy"]');
  }
  /**
   * 'Terms of service' link on the 'Sign-up' modal window
   */
  termsOfServiceLink() {
    return cy.get('a[href="/sell/terms-of-service"]');
  }
  /**
   * 'Create Account' button on the 'Sign-up' (Create Account) page
   */
  createAccountButtonOnSignupPage() {
    return cy.get('button[type="submit"]').contains("Create Account");
  }
}
