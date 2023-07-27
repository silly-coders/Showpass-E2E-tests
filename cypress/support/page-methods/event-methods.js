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
  // Event details
  cy.getChakraSkeletonH1HeaderByText(eventDetails.eventName); // Event name
  cy.getH3HrefHeaderByText(eventDetails.organization); // Organization
  cy.getChakraTextLabelByIndex(1).should("contain", eventDetails.startDay); // Start day label
  cy.getChakraTextLabelByIndex(2).should("contain", eventDetails.endDay); // End day label
  cy.getChakraTextLabelByIndex(3).should("contain", eventDetails.startTime); // Start time label
  cy.getChakraTextLabelByIndex(4).should("contain", eventDetails.endTime); // End time label
  cy.getChakraTextLabelByIndex(6).should("contain", eventDetails.eventType); // Even type (Online Event)
});
/**
 * Method to verify event-2 PAGE details
 */
Cypress.Commands.add("verifyEvent2PageDetails", (eventDetails) => {
  cy.log("Going to verifyEventPageDetails()");
  // Event details
  cy.getChakraSkeletonH1HeaderByText(eventDetails.eventName); // Event name
  cy.getH3HrefHeaderByText(eventDetails.organization); // Organization
  cy.getChakraTextLabelByIndex(1).should("contain", eventDetails.startDay); // Start day label
  cy.getChakraTextLabelByIndex(2).should("contain", eventDetails.endDay); // End day label
  cy.getChakraTextLabelByIndex(3).should("contain", eventDetails.startTime); // Start time label
  cy.getChakraTextLabelByIndex(4).should("contain", eventDetails.endTime); // End time label
});
/**
 * Method to add tickets to the cart
 * @param totalTicketTypes (total number of ticket types)
 * @param numberOfTicketsForEach (how many tickets to add from each type)
 */
Cypress.Commands.add(
  "addTicketsToCart",
  (totalTicketTypes, numberOfTicketsForEach) => {
    cy.log("Going to addTicketsToCart()");
    for (let j = 1; j <= numberOfTicketsForEach; j++) {
      for (let i = 0; i < totalTicketTypes; i++) {
        eventsAndFiltersLocators.addItemButtonActive(i).click();
        eventsAndFiltersLocators.removeItemButtonActive(i);
        cy.wait(1000);
      }
    }
  }
);
/**
 * Method to remove all events from the 'Saved Events' page
 */
Cypress.Commands.add("removeAllSavedEvents", () => {
  cy.log("Trying to find saved events");
  cy.get("body").then(($body) => {
    // If you see text "No saved events found" there is nothing to remove
    if ($body.text().includes("No saved events found")) {
      cy.log("No saved events found!");
    } else {
      // Remove all events that show up on the 'Saved Events' page
      cy.log("Found a few saved events. Going to remove them.");
      cy.get(
        `div[data-testid='card-image-heart-container-box'] > div > svg > svg > path`
      ).then(($totalCount) => {
        length = $totalCount.length;
        cy.log("FOUND IN TOTAL " + length + " EVENT CARDS");
        for (let i = length; i > 0; i--) {
          cy.log("DELETING card # " + i);
          cy.get(
            `div[data-testid='card-image-heart-container-box'] > div > svg > svg > path`
          )
            .eq(i - 1)
            .should("exist")
            .should("be.visible")
            .click({ force: true });
          cy.wait(1000);
        }
      });
    }
  });
});
/**
 * Method to add events to the 'Saved Events' list
 * @param totalNumberOfEventsToAdd
 */
Cypress.Commands.add(
  "clickHeartIconToSaveEvents",
  (totalNumberOfEventsToAdd) => {
    cy.log("Going to save " + totalNumberOfEventsToAdd + " events in total.");
    cy.wait(1500);
    for (let i = 0; i < totalNumberOfEventsToAdd; i++) {
      eventsAndFiltersLocators
        .transparentHeartIconButton()
        .eq(i)
        .should("exist")
        .scrollIntoView()
        .click({ force: true });
    }
  }
);
/**
 * Click 'Showpass' logo on the top bar's left side
 */
Cypress.Commands.add("clickShowpassLogo", () => {
  cy.log("Going to clickShowpassLogo()");
  cy.get('img[alt="showpass"]')
    .should("exist")
    .should("be.visible")
    .click({ force: true });
});
/**
 * Method to verify SAVED event cards
 * @param index
 * @param eventName
 */
Cypress.Commands.add("verifySavedEventCardName", (index, eventName) => {
  cy.log("Going to verifySavedEventCard()");
  // Event name (index=1 is representing the event name)
  eventsAndFiltersLocators.getSavedCardName(index).should("contain", eventName);
});
