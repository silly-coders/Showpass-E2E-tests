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
  cy.verifyChakraSkeletonItemText(1, eventDetails.eventName);
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
/**
 * Method to verify event-1 PAGE details
 */
Cypress.Commands.add("verifyEvent1PageDetails", (eventDetails) => {
  cy.log("Going to verifyEventPageDetails()");
  cy.getImageByAlt("Event image"); // Event image is present
  cy.getChakraHeaderH2("Cart"); // Section header 'Cart'
  cy.chakraParagraphButtonByText("Tickets"); // Button 'Tickets'
  cy.chakraParagraphButtonByText("More Info"); // Button 'More Info'
  eventsAndFiltersLocators.checkoutButtonDisabled(); // Disabled 'Checkout' button by default
  eventsAndFiltersLocators.addItemButtonActive(0); // 'Add item' (+) button active by default
  eventsAndFiltersLocators.removeItemButtonDisabled(); // 'Remove item' (-) button disabled by default
  // Event details
  cy.getChakraSkeletonH1HeaderByText(eventDetails.eventName); // Event name
  cy.getH3HrefHeaderByText(eventDetails.organization); // Organization
  cy.getChakraTextLabelByIndex(1).should("contain", eventDetails.startDay); // Start day label
  cy.getChakraTextLabelByIndex(2).should("contain", eventDetails.endDay); // End day label
  cy.getChakraTextLabelByIndex(3).should("contain", eventDetails.startTime); // Start time label
  cy.getChakraTextLabelByIndex(4).should("contain", eventDetails.endTime); // End time label
  cy.getChakraTextLabelByIndex(6).should("contain", eventDetails.eventType); // Even type (Online Event)
  // Tickets
  cy.getChakraHeaderH2(eventDetails.ticketName1); // 'Main event' ticket type label
  cy.getChakraHeaderH2(eventDetails.ticketName2); // 'General Admission' ticket type label
  eventsAndFiltersLocators
    .ticketPriceLabelByIndex(0)
    .should("contain", eventDetails.ticketPrice1); // First ticket type price
  eventsAndFiltersLocators
    .ticketPriceLabelByIndex(1)
    .should("contain", eventDetails.ticketPrice2); // Second ticket type price
  // Ticket counter
  cy.get('div[class^="css"]').contains("0");
  cy.get('div[class^="css"]').contains("0");
});
/**
 * Method to verify event-2 PAGE details
 */
Cypress.Commands.add("verifyEvent2PageDetails", (eventDetails) => {
  cy.log("Going to verifyEventPageDetails()");
  cy.getImageByAlt("Event image"); // Event image is present
  cy.getChakraHeaderH2("Cart"); // Section header 'Cart'
  cy.chakraParagraphButtonByText("Tickets"); // Button 'Tickets'
  cy.chakraParagraphButtonByText("More Info"); // Button 'More Info'
  eventsAndFiltersLocators.checkoutButtonDisabled(); // Disabled 'Checkout' button by default
  eventsAndFiltersLocators.addItemButtonActive(0); // 'Add item' (+) button active by default
  eventsAndFiltersLocators.removeItemButtonDisabled(); // 'Remove item' (-) button disabled by default
  // Event details
  cy.getChakraSkeletonH1HeaderByText(eventDetails.eventName); // Event name
  cy.getH3HrefHeaderByText(eventDetails.organization); // Organization
  cy.getChakraTextLabelByIndex(1).should("contain", eventDetails.startDay); // Start day label
  cy.getChakraTextLabelByIndex(2).should("contain", eventDetails.endDay); // End day label
  cy.getChakraTextLabelByIndex(3).should("contain", eventDetails.startTime); // Start time label
  cy.getChakraTextLabelByIndex(4).should("contain", eventDetails.endTime); // End time label
  // Tickets
  cy.getChakraHeaderH2(eventDetails.ticketName1); // 'Main event' ticket type label
  cy.getChakraHeaderH2(eventDetails.ticketName2); // 'General Admission' ticket type label
  eventsAndFiltersLocators
    .ticketPriceLabelByIndex(0)
    .should("contain", eventDetails.ticketPrice1); // First ticket type price
  eventsAndFiltersLocators
    .ticketPriceLabelByIndex(1)
    .should("contain", eventDetails.ticketPrice2); // Second ticket type price
  // Ticket counter
  cy.get('div[class^="css"]').contains("0");
  cy.get('div[class^="css"]').contains("0");
});