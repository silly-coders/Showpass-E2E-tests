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
  
  it("verifying elements appearance at the bottom of the page", () => {
    cy.bottomElementsAppearance();
  });

});