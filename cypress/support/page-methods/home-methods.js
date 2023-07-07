import { HomeLocators } from "../element-locators/home-locators";
const homeLocators = new HomeLocators();
/**
 * Method to navigate to the 'Home' page
 */
Cypress.Commands.add("navigateToHomePage", () => {
  const baseUrl = Cypress.config("baseUrl");
  cy.visit("/");
  cy.url().should("contain", baseUrl);
});

/**
 * Method to verify top bar element appearance on the 'Home' page
 */
Cypress.Commands.add("topBarElementAppearance", () => {
  cy.log("***** Begin running topBarElementAppearance() *****");
  homeLocators
    .loginButton()
    .should("exist")
    .should("be.visible")
    .should("have.text", "Log In");
  homeLocators.createAccountButton().should("exist").should("be.visible");
  homeLocators.hostAnEventDropDown().should("exist").should("be.visible");
  homeLocators.hostAnEventDropDown().click({ force: true });
  homeLocators.createAnEventMenuItem().should("exist").should("be.visible");
  homeLocators.whyShowpassMenuItem().should("exist").should("be.visible");
  homeLocators.pricingMenuItem().should("exist").should("be.visible");
  homeLocators.supportMenuItem().should("exist").should("be.visible");
  homeLocators.toggleEnFr().should("exist").should("be.visible");
  homeLocators.showpassLogo().should("exist").should("be.visible");
  cy.log("***** Finished topBarElementAppearance() *****");
});

/**
 * Method to verify 'Search' and 'Date' area appearance on the 'Home' page
 */
Cypress.Commands.add("searchDateAreaAppearance", () => {
  cy.log("***** Begin running searchDateAreaAppearance() *****");
  homeLocators.searchLabel().should("exist").should("be.visible");
  homeLocators
    .searchLocationOrEventInputField()
    .should("exist")
    .should("be.visible");
  homeLocators.dateLabel().should("exist").should("be.visible");
  homeLocators
    .selectDatesTextPlaceholder()
    .should("exist")
    .should("be.visible");
  homeLocators.searchButton().should("exist").should("be.visible");
  cy.log("***** Finished searchDateAreaAppearance() *****");
});

/**
 * Method to very the 'Home' page 'Help & Support' column elements appearance
 */
Cypress.Commands.add("helpAndSupportColumnAppearance", () => {
  cy.log("***** Begin running helpAndSupportColumnAppearance() *****");
  homeLocators
    .officialShowpassPartnersLabel()
    .should("exist")
    .should("be.visible");
  homeLocators.facebookIconWithLink().should("exist").should("be.visible");
  homeLocators.instagramIconWithLink().should("exist").should("be.visible");
  homeLocators.linkedinIconWithLink().should("exist").should("be.visible");
  homeLocators.tweeterIconWithLink().should("exist").should("be.visible");
  homeLocators.helpAndSupportLabel().should("exist");
  homeLocators.privacyPolicyLink().should("exist").should("be.visible");
  homeLocators.customerSupportLink().should("exist").should("be.visible");
  homeLocators.organizerSupportLink().should("exist").should("be.visible");
  homeLocators.termsAndConditionsLink().should("exist").should("be.visible");
  cy.log("***** Finished helpAndSupportColumnAppearance() *****");
});

/**
 * Method to very the 'Home' page 'Connect With Us' column elements appearance
 */
Cypress.Commands.add("connectWithUsColumnAppearance", () => {
  cy.log("***** Begin running connectWithUsColumnAppearance() *****");
  homeLocators.connectWithUsHeader().should("exist");
  homeLocators.angelListLink().should("exist").should("be.visible");
  homeLocators.careersLink().should("exist").should("be.visible");
  homeLocators.blogLink().should("exist").should("be.visible");
  cy.log("***** Finished connectWithUsColumnAppearance() *****");
});

/**
 * Method to very the 'Home' page 'About Showpass' column elements appearance
 */
Cypress.Commands.add("aboutShowpassColumnAppearance", () => {
  cy.log("***** Begin running aboutShowpassColumnAppearance() *****");
  homeLocators.aboutShowpassHeader().should("exist");
  homeLocators.registerOrganizationLink().should("exist").should("be.visible");
  homeLocators.aboutUsLink().should("exist").should("be.visible");
  homeLocators.pricingLink().should("exist").should("be.visible");
  cy.log("***** Finished aboutShowpassColumnAppearance() *****");
});

/**
 * Method to very the 'Subscribe to Showpass' section on the 'Home' page
 */
Cypress.Commands.add("subscribeToShowpassSectionAppearance", () => {
  cy.log("***** Begin running subscribeToShowpassSectionAppearance() *****");
  homeLocators.subscribeToShowpassText().should("exist").should("be.visible");
  homeLocators.enterYourEmailInputField().should("exist").should("be.visible");
  homeLocators.subscribeButton().should("exist").should("be.visible");
  cy.log("***** Finished subscribeToShowpassSectionAppearance() *****");
});
