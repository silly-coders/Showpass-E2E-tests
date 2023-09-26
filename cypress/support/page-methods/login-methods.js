import { HomeLocators } from "../element-locators/home-locators";
import { LoginLocators } from "../element-locators/login-locators";
const homeLocators = new HomeLocators();
const loginLocators = new LoginLocators();
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
  const apiRequest = "**/envelope/*";
  cy.intercept(apiRequest).as("pageLoaded");
  cy.clickLoginOnHomePage();
  cy.wait("@pageLoaded")
    .its("response.statusCode")
    .should("be.oneOf", [200, 204]);
  loginLocators
    .emailAddressInputField()
    .should("exist")
    .should("be.visible")
    .type(userObject.userEmail);
  loginLocators
    .passwordInputField()
    .should("exist")
    .should("be.visible")
    .type(userObject.userPassword);
  loginLocators
    .emailAddressInputField()
    .should("have.value", userObject.userEmail);
  loginLocators
    .passwordInputField()
    .should("have.value", userObject.userPassword);
  loginLocators
    .loginButtonOnLoginModalWindow()
    .should("exist")
    .should("be.visible")
    .click();
  loginLocators
    .userFirstAndLastNames()
    .should("exist")
    .should("be.visible")
    .should(
      "have.text",
      userObject.userFirstName + " " + userObject.userLastName
    );
  cy.request({
    method: "GET",
    url: "/api/auth/profile/",
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});
/**
 * Method to log into the 'Showpass' portal in mobile view
 * @argument userObject
 */
Cypress.Commands.add("logIntoPortalInMobileView", (userObject) => {
  if (!userObject) throw new Error("You need to provide user credentials!");
  const log = Cypress.log({
    name: "Login",
    displayName: "LOGIN",
    message: [`🔐 Authenticating | User email: ${userObject.userEmail}`],
    autoEnd: false,
    color: "green",
  });
  const apiRequest = "**/envelope/*";
  cy.intercept(apiRequest).as("pageLoaded");
  cy.get(
    'div[id="chakra-modal--body-1"] > div > button[class^="chakra-button"]'
  )
    .contains("Log In")
    .should("exist")
    .should("be.visible")
    .click({ force: true });
  cy.wait("@pageLoaded")
    .its("response.statusCode")
    .should("be.oneOf", [200, 204]);
  loginLocators
    .emailAddressInputField()
    .should("exist")
    .should("be.visible")
    .type(userObject.userEmail);
  loginLocators
    .passwordInputField()
    .should("exist")
    .should("be.visible")
    .type(userObject.userPassword);
  loginLocators
    .emailAddressInputField()
    .should("have.value", userObject.userEmail);
  loginLocators
    .passwordInputField()
    .should("have.value", userObject.userPassword);
  loginLocators
    .loginButtonOnLoginModalWindow()
    .should("exist")
    .should("be.visible")
    .click();
  cy.getChakraButtonByAttribute("aria-label", "Main menu").click({
    force: true,
  });
  cy.get('div[id="chakra-modal--body-1"] > div > div > p')
    .should("exist")
    .should("be.visible")
    .should(
      "have.text",
      userObject.userFirstName + " " + userObject.userLastName
    );
  cy.request({
    method: "GET",
    url: "/api/auth/profile/",
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});
