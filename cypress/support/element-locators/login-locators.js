export class LoginLocators {
  /**
   * 'Welcome Back' header on the 'Login' modal window
   */
  welcomeBackHeader() {
    return cy.get('h1[class^="css"]').contains("Welcome Back");
  }
  /**
   * 'Don't have an account?' text on the 'Login' modal window
   */
  dontHaveAnAccountText() {
    return cy.get('div').contains("Don't have an account?");
  }
  /**
   * 'Sign Up' link on the 'Login' modal window
   */
  signUpLink() {
    return cy.get('button[class^="chakra-button"').contains("Sign Up");
  }
  /**
   * 'Email Address' label on the 'Login' modal window
   */
  emailAddressLabel() {
    return cy.get('label[for="email"]').contains("Email Address");
  }
  /**
   * 'Email Address' input field on the 'Login' modal window
   */
  emailAddressInputField() {
    return cy.get('input[id="email"]');
  }
  /**
   * 'Password' label on the 'Login' modal window
   */
  passwordLabel() {
    return cy.get('label[for="password"]').contains("Password");
  }
  /**
   * 'Password' input field on the 'Login' modal window
   */
  passwordInputField() {
    return cy.get('input[id="password"]');
  }
  /**
   * 'Forgot your password?' link on the 'Login' modal window
   */
  forgotYourPasswordLink() {
    return cy.get('button[class^="chakra-button"').contains("Forgot your password?");
  }
  /**
   * 'Log In' button on the 'Login' modal window
   */
  loginButtonOnLoginModalWindow() {
    return cy.get('button[type="submit"]').contains("Log In");
  }
  /**
   * 'or' word between the 'Log In' and 'Sign in using Facebook' button
   */
  theOrWordBelowLoginButton() {
    return cy.get('div[class^="chakra-stack"] > div').contains("or");
  }
  /**
   * 'Sign in using Facebook' button on the 'Login' modal window
   */
  signInUsingFacebookButtion() {
    return cy.get('button[aria-label="Sign in using Facebook"]');
  }
}