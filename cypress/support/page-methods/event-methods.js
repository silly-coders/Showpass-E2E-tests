import { DashboardLocators } from "../element-locators/dashboard-locators";
import { EventsAndFiltersLocators } from "../element-locators/events-and-filters-locators";
const dashboardLocators = new DashboardLocators();
const eventsAndFiltersLocators = new EventsAndFiltersLocators();

/**
 * Method to verify event active filter text
 * @param eventName
 */
Cypress.Commands.add("verifyEventActiveFilterText", (eventName) => {
  cy.log(`Going to verifyEventActiveFilterText(${eventName})`);
  eventsAndFiltersLocators.activeFilterText(eventName);
});

/**
 * Method to verify active filter by aria-label
 * @param ariaLabel
 */
Cypress.Commands.add("verifyActiveFilterByAriaLabel", (ariaLabel) => {
  cy.log(`Going to verifyEventActiveFilterText(${ariaLabel})`);
  cy.get(`div[class^="active-filters"] > button[aria-label="${ariaLabel}"]`)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible");
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
    const apiRequest = "/api/user/tickets/baskets/*";
    cy.intercept(apiRequest).as("pageLoaded");
    for (let j = 1; j <= numberOfTicketsForEach; j++) {
      for (let i = 0; i < totalTicketTypes; i++) {
        cy.wait(500);
        cy.getChakraSpinnerLoadingIndicator().should("not.exist");
        eventsAndFiltersLocators.addItemButtonActive(i).click();
        eventsAndFiltersLocators.removeItemButtonActive(i);
        eventsAndFiltersLocators.addItemButtonActive(i);
        cy.wait(500);
        cy.wait("@pageLoaded")
          .its("response.statusCode")
          .should("be.oneOf", [200, 204]);
      }
    }
    cy.getChakraSpinnerLoadingIndicator().should("not.exist");
    cy.wait(800);
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
    const apiRequest = "/api/user/tickets/favorites/";
    cy.intercept(apiRequest).as("pageLoaded");
    cy.wait(500);
    for (let i = 0; i < totalNumberOfEventsToAdd; i++) {
      eventsAndFiltersLocators
        .transparentHeartIconButton()
        .eq(i)
        .should("exist")
        .scrollIntoView()
        .click({ force: true });
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
      cy.wait(500);
      // Make sure the heart button was clicked and selected
      cy.get(
        'div[data-testid="card-image-heart-container-box"] > div > svg > svg > path[fill-rule="evenodd"]'
      )
        .eq(i)
        .should("exist")
        .should("be.visible");
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
  cy.log(`Going to verifySavedEventCard('${index}, ${eventName}')`);
  // Event name (index=1 is representing the event name)
  eventsAndFiltersLocators.getSavedCardName(index).should("contain", eventName);
});
/**
 * Method to click (X) button to remove a particular filter
 * @param ariaLabel
 */
Cypress.Commands.add("clickButtonxToRemoveFilterByArialabel", (ariaLabel) => {
  cy.log("Going to clickButtonxToRemoveFilterByArialabel(ariaLabel)");
  eventsAndFiltersLocators
    .getButtonxToRemoveSelecetedFilter(ariaLabel)
    .should("exist")
    .scrollIntoView({ force: true });
  eventsAndFiltersLocators
    .getButtonxToRemoveSelecetedFilter(ariaLabel)
    .click({ force: true });
});
/**
 * Method to verify the 'No events available ...' message
 */
Cypress.Commands.add("verifyNoEventsAvailableMsg", () => {
  cy.log("Going to verifyNoEventsAvailableMsg()");
  cy.get('div[class^="css"] > span[class^="css"]')
    .contains("No events available with your search criteria.")
    .should("exist")
    .should("be.visible");
});
/**
 * Method to select a preset date range
 * @param label
 */
Cypress.Commands.add("selectDateRangeByLabel", (label) => {
  cy.log("Going to selectDateRangeByLabel()");
  eventsAndFiltersLocators.getDatePicker().click({ force: true });
  eventsAndFiltersLocators
    .getDateRangeButtonByLabel(label)
    .click({ force: true });
});
/**
 * Method to clear 'Date Range' selection
 */
Cypress.Commands.add("clearDateRangeSelection", () => {
  cy.log("Going to clearDateRangeSelection()");
  eventsAndFiltersLocators.getClearSelectionButtonForDateRange().click();
});
/**
 * Method to select a category
 */
Cypress.Commands.add("selectCategoryByText", (text) => {
  cy.log("Going to selectCategoryByText(text)");
  // Click the 'Select categories' field
  cy.getChakraInputFieldByAttr("placeholder", "Select categories").as(
    "category"
  );
  cy.get("@category").scrollIntoView({ force: true });
  cy.get("@category").click({ force: true });
  cy.getChakraTextLabelByText(text)
    .scrollIntoView({ force: true })
    .click({ force: true });
});
/**
 * Method to select a tag
 */
Cypress.Commands.add("selectTagByText", (text) => {
  cy.log("Going to selectTagByText(text)");
  // Click the 'Select tags' field
  cy.getChakraInputFieldByAttr("placeholder", "Select tags").as("tags");
  cy.get("@tags").click();
  cy.getChakraTextLabelByText(text).click();
});
/**
 * Method to verify the purchased 'Upcoming' event card details
 */
Cypress.Commands.add("verifyUpcomingPurchasedEventCard", (eventJSON) => {
  cy.log("Going to verifyUpcomingPurchasedEventCard");
  // Filter results by event name
  // Enter event name into the search field
  const apiRequest = "/api/user/tickets/events/*";
  cy.intercept(apiRequest).as("pageLoaded");
  cy.getChakraInputGroupFieldByAttr("aria-label", "Search").as("serachField");
  cy.get("@serachField").should("not.have.attr", "disabled");
  cy.wait(1000);
  cy.get('input[aria-label="Search"]')
    .type(eventJSON.eventName, { force: true })
    .type("{enter}");
  cy.wait("@pageLoaded")
    .its("response.statusCode")
    .should("be.oneOf", [200, 204]);
  eventsAndFiltersLocators
    .getUpcomingPurchasedEventName(eventJSON.eventName)
    .should("be.visible");
});
/**
 * Method to open purchased event tickets
 */
Cypress.Commands.add("clickEventNameToSeePurchasedTickets", (eventJSON) => {
  cy.log("Going to openPurchasedTickets");
  const apiRequest = "/api/user/tickets/events/*";
  cy.intercept(apiRequest).as("pageLoaded");
  eventsAndFiltersLocators
    .getUpcomingPurchasedEventName(eventJSON.eventName)
    .should("be.visible")
    .click();
  cy.wait("@pageLoaded")
    .its("response.statusCode")
    .should("be.oneOf", [200, 204]);
  cy.getChakraButtonByText("Back");
});
/**
 * Method to navigate to the 'Upcoming' page
 */
Cypress.Commands.add("openUpcomingPage", () => {
  cy.log("Going to openUpcomingPage");
  const apiRequest = "/api/user/tickets/events/*";
  cy.intercept(apiRequest).as("pageLoaded");
  // Navigate to the 'Upcoming' page
  cy.getDropDownItem("Upcoming").click({ force: true });
  cy.wait("@pageLoaded")
    .its("response.statusCode")
    .should("be.oneOf", [200, 204]);
  cy.getChakraInputGroupFieldByAttr("placeholder", "Search")
    .should("exist")
    .should("not.have.attr", "disabled");
});
/**
 * Method to create a new unique event using Angular front-end
 */
Cypress.Commands.add(
  "createNewEventAngular",
  (uniqueEventName, eventDetails) => {
    cy.log("Going to createNewEventAngular");
    eventDetails.eventName = uniqueEventName;
    // Enter 'Event Name'
    cy.get('input[id="id_name"]')
      .should("be.visible")
      .type(eventDetails.eventName);
    // Enter 'Desired event link/slug'
    cy.get('input[id="id_slug"]')
      .should("be.visible")
      .type(eventDetails.eventName);
    // TODO: Commented out the 'type description' action below cause it's flaky
    // Enter event description
    const getIframeBody = () => {
      return cy
        .get('iframe[id="ui-tinymce-1_ifr"]')
        .eq(0)
        .its("0.contentDocument.body")
        .should("not.be.empty")
        .then(cy.wrap);
    };
    getIframeBody().find("p").eq(0);
    //.type(`New ${eventDetails.eventName} description.`);
    // *****
    // Add Categories
    cy.get('div[name="categories"] > div > input[type="search"]')
      .should("be.visible")
      .click({ force: true });
    cy.get('span[class="ui-select-choices-row-inner"] > span')
      .eq(1)
      .click({ force: true });
    cy.get('div[name="categories"] > div > input[type="search"]')
      .should("be.visible")
      .click({ force: true });
    cy.get('span[class="ui-select-choices-row-inner"] > span')
      .eq(2)
      .click({ force: true });
    // Add Tags
    cy.get('div[name="tags"] > div > input[type="search"]')
      .should("be.visible")
      .click({ force: true })
      .type(`${eventDetails.eventName}{enter}`);
    cy.get('div[name="tags"] > div > input[type="search"]')
      .should("be.visible")
      .click({ force: true })
      .type("automation{enter}");
    // Click Add Location
    cy.get('div[class="input-group-btn location-buttons"] > a')
      .eq(0)
      .contains("Add location")
      .click({ force: true });
    // Ensure a dialog box shows up
    cy.get('h4[class="modal-title"]').contains("Add Location");
    // Enter address
    cy.get('input[placeholder="Search for a venue or address."]')
      .should("be.visible")
      .type(eventDetails.eventLocation);
    cy.wait(3000);
    cy.get('a[ng-bind-html^="match.label"]').as("dropDownOption");
    cy.get("@dropDownOption").eq(0).should("be.visible").click({ force: true });
    cy.wait(1500);
    // Click Save
    cy.get('button[type="submit"]').as("saveButton");
    cy.get("@saveButton").should("be.visible").click({ force: true });
    cy.wait(1500);
    // Ensure the dialog box disappeared
    cy.get('h4[class="modal-title"]').should("not.exist");
    // Add the first Ticket Type
    cy.get('input[name="ticketTypeName0"]')
      .should("be.visible")
      .type(eventDetails.ticketType1);
    cy.get('input[name="ticketTypeInventory0"]')
      .should("be.visible")
      .type(150000);
    cy.get('input[name="ticketTypePrice0"]')
      .should("be.visible")
      .type(eventDetails.ticketPrice1);
    // Click Add New Ticket Type and populate the fields
    cy.get('a[ng-click="addTicketType()"]')
      .should("be.visible")
      .click({ force: true });
    // Add another Ticket Type
    cy.get('input[name="ticketTypeName1"]')
      .should("be.visible")
      .type(eventDetails.ticketType2);
    cy.get('input[name="ticketTypeInventory1"]')
      .should("be.visible")
      .type(50000);
    cy.get('input[name="ticketTypePrice1"]')
      .should("be.visible")
      .type(eventDetails.ticketPrice2);
    // Publish event
    cy.get('button[class^="btn btn-lg"] > i')
      .eq(1)
      .should("be.visible")
      .click({ force: true });
    cy.wait(1500);
    // Ensure the Event Overview page title shows up
    cy.get("div > h3")
      .should("be.visible")
      .should("contain.text", "Event Overview");
  }
);
/**
 * Method to verify purchased ticket event details
 */
Cypress.Commands.add(
  "verifyTicketEventDetails",
  (ticketIndex, ticketValues) => {
    cy.log("Going to verifyTicketEventDetails");
    // Event name
    cy.getTicketInvoiceHeader()
      .eq(0)
      .scrollIntoView()
      .should("have.text", ticketValues.eventName);
    // Event street
    cy.get('div[data-testid^="upcoming-event-ticket-type-set-"]')
      .eq(ticketIndex)
      .find('p[data-testid="event-location-street-name"]')
      .scrollIntoView()
      .should("contain.text", ticketValues.streetName);
    // Event City and Province
    cy.get('div[data-testid^="upcoming-event-ticket-type-set-"]')
      .eq(ticketIndex)
      .find('p[data-testid="event-location-city-province"]')
      .scrollIntoView()
      .should("contain.text", ticketValues.cityProvince);
    // Event Start Date
    cy.get('div[data-testid^="upcoming-event-ticket-type-set-"]')
      .eq(ticketIndex)
      .find('p[data-testid="start-date"]')
      .scrollIntoView()
      .should("contain.text", ticketValues.startDate);
    // Event Start Time
    cy.get('div[data-testid^="upcoming-event-ticket-type-set-"]')
      .eq(ticketIndex)
      .find('p[data-testid="start-time"]')
      .scrollIntoView()
      .should("contain.text", ticketValues.startTime);
    // Event End Date
    cy.get('div[data-testid^="upcoming-event-ticket-type-set-"]')
      .eq(ticketIndex)
      .find('p[data-testid="end-date"]')
      .scrollIntoView()
      .should("contain.text", ticketValues.endDate);
    // Event End Time
    cy.get('div[data-testid^="upcoming-event-ticket-type-set-"]')
      .eq(ticketIndex)
      .find('p[data-testid="end-time"]')
      .scrollIntoView()
      .should("contain.text", ticketValues.endTime);
    // Name on ticket
    cy.get('div[data-testid^="upcoming-event-ticket-type-set-"]')
      .eq(ticketIndex)
      .find('p[data-testid="name-on-ticket"]')
      .scrollIntoView()
      .should("contain.text", ticketValues.nameOnTicket);
    // Ticket category
    cy.get('div[data-testid^="upcoming-event-ticket-type-set-"]')
      .eq(ticketIndex)
      .find('p[data-testid="ticket-type-name"]')
      .scrollIntoView()
      .should("contain.text", ticketValues.eventType);
  }
);
