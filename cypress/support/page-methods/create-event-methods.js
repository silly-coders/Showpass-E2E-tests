import { DashboardLocators } from "../element-locators/dashboard-locators";
const dashboardLocators = new DashboardLocators();

/**
 * Method to populate the 'Basic Info' section within the 'Create Event' form
 */
Cypress.Commands.add("populateBasicInfoSection", () => {
    cy.log("***** Going to populateBasicInfoSection() *****");



    cy.log("***** Finished populateBasicInfoSection() *****");
  });