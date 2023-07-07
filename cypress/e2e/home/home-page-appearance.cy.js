import { HomePageLocators } from "../../support/page-methods/home-methods";

describe("Testing Home page by ", () => {
  before("clean-up", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", () => {
    cy.navigateToHomePage();
  });

  it("verifying top bar element appearance", () => {
    cy.topBarElementAppearance();
  });

  it("verifying Search and Date area element appearance", () => {
    cy.searchDateAreaAppearance();
  });

  it("verifying the 'Help & Support' column element appearance", () => {
    cy.helpAndSupportColumnAppearance();
  });

  it("verifying the 'Connect With Us' column element appearance", () => {
    cy.connectWithUsColumnAppearance();
  });

  it("verifying the 'About Showpass' column element appearance", () => {
    cy.aboutShowpassColumnAppearance();
  });
  
  it("verifying the 'Subscribe to Showpass to receive the latest news' section element appearance", () => {
    cy.subscribeToShowpassSectionAppearance();
  });
});
