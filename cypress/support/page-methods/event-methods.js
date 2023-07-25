import { DashboardLocators } from "../element-locators/dashboard-locators";
import { EventsAndFiltersLocators } from "../element-locators/events-and-filters-locators";
const dashboardLocators = new DashboardLocators();
const eventsAndFiltersLocators = new EventsAndFiltersLocators();

/**
 * Method to verify event active filter text
 */
Cypress.Commands.add("verifyEventActiveFilterText", (eventName) => {
  cy.log(`Going to verifyEventActiveFilterText(${eventName})`);
  eventsAndFiltersLocators.activeFilterText(eventName);
});

/**
 * Method to click event card by index
 */
Cypress.Commands.add("clickEventCardByIndex", (eventIndex) => {
  cy.log(`Going to clickEventCardByIndex(${eventIndex})`);
  eventsAndFiltersLocators.getEventCard(eventIndex).click({ force: true });
});

/**
 * Method to verify the event card
 */
Cypress.Commands.add("verifyEventCardDetails", (eventDetails) => {
  cy.log("Going to verifyEventCardDetails()");
  cy.searchForAnEventByName(eventDetails.eventName);
      cy.verifyEventActiveFilterText(eventDetails.activeFilterLabel);
      // Verify event card details
      // Event dates
      cy.verifyChakraSkeletonItemText(0, eventDetails.eventDate);
      // Event name
      cy.verifyChakraSkeletonItemText(
        1,
        eventDetails.eventName
      );
      cy.get('div > p[class^="css"]')
        .eq(2)
        // Event city
        .should("have.text", eventDetails.eventCity);
      // Event price range
      cy.get('div[class^="chakra-skeleton"] > span')
        .eq(0)
        .contains(eventDetails.eventPriceRange);
      cy.get('div[class^="chakra-skeleton"] > span')
        .eq(1)
        .contains(eventDetails.eventTime);
});
