import { HomeLocators } from "../element-locators/home-locators";
const homeLocators = new HomeLocators();
/**
 * Method to navigate to the 'Home' page
 */
Cypress.Commands.add("navigateToHomePage", () => {
  const baseUrl = Cypress.config('baseUrl');
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
  cy.log("***** Begin running searchDateAreaAppearance() *****");
});

/**
 * Method to very the 'Home' page bottom elements appearance
 */
Cypress.Commands.add("bottomElementsAppearance", () => {
    homeLocators.officialShowpassPartnersLabel().should("exist").should("be.visible");

});