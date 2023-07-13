import { HomeLocators } from "../element-locators/home-locators";
import { LoginLocators } from "../element-locators/login-locators";
import { DashboardLocators } from "../element-locators/dashboard-locators";
const homeLocators = new HomeLocators();
const loginLocators = new LoginLocators();
const dashboardLocators = new DashboardLocators();

/**
 * Click top left hamburger menu on the 'Dashboard' page
 */
Cypress.Commands.add("clickHamburgerMenu", () => {
  cy.log("Going to clickHamburgerMenu()");
  dashboardLocators
    .topLeftHamburgerMenu()
    .should("exist")
    .should("be.visible")
    .click();
});
/**
 * Click the 'Create event' button within the left hand menu on the 'Dashboard' page
 */
Cypress.Commands.add("clickCreateEventButton", () => {
  cy.log("Going to clickCreateEventButton()");
  cy.getLeftSideMenuItemByText("Create Event").click();
});
