import { DashboardLocators } from "../element-locators/dashboard-locators";
import { EventsAndFiltersLocators } from "../element-locators/events-and-filters-locators";
const dashboardLocators = new DashboardLocators();
const eventsAndFiltersLocators = new EventsAndFiltersLocators();
// **************************************************************************
/**
 * Method to verify event active filter text
 * @param eventName
 */
Cypress.Commands.add("verifyEventActiveFilterText", (eventName) => {
  cy.log(`Going to verifyEventActiveFilterText(${eventName})`);
  eventsAndFiltersLocators.activeFilterText(eventName);
});
// **************************************************************************
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
// **************************************************************************
/**
 * Method to click event card by index
 * @param eventIndex
 */
Cypress.Commands.add("clickEventCardByIndex", (eventIndex) => {
  cy.log(`Going to clickEventCardByIndex(${eventIndex})`);
  eventsAndFiltersLocators.getEventCard(eventIndex).click({ force: true });
});
// **************************************************************************
/**
 * Method to verify the event card
 * @param eventDetails
 */
Cypress.Commands.add("verifyEventCardDetails", (eventDetails) => {
  cy.log("Going to verifyEventCardDetails()");
  cy.verifyEventActiveFilterText(eventDetails.activeFilterLabel);
  // Verify event card details
  // Event dates
  cy.verifyChakraSkeletonItemText(0, eventDetails.eventDate);
  // Event name
  cy.verifyChakraSkeletonItemText(1, eventDetails.eventName);
  // Event city
  cy.get('div > p[class^="css"]')
    .eq(2)
    .should("have.text", eventDetails.eventCity);
  // Event price range
  cy.get('div[class^="chakra-skeleton"] > span')
    .eq(0)
    .contains(eventDetails.eventPriceRange);
  cy.get('div[class^="chakra-skeleton"] > span')
    .eq(1)
    .contains(eventDetails.eventTime);
});
// **************************************************************************
/**
 * Method to verify event-1 PAGE details
 * @param eventDetails
 */
Cypress.Commands.add("verifyEvent1PageDetails", (eventDetails) => {
  cy.log("Going to verifyEventPageDetails()");
  // Event details
  cy.getChakraSkeletonH1HeaderByText(eventDetails.eventName); // Event name
  cy.getH3HrefHeaderByText(eventDetails.organization); // Organization
  let textLabels = {
    0: eventDetails.startDay,
    1: eventDetails.endDay,
    2: eventDetails.startTime,
    3: eventDetails.endTime,
    5: eventDetails.eventType,
  };
  // Key in the object above is also the element index in the DOM HTML
  for (let i = 0; i < Object.keys(textLabels).length; i++) {
    cy.log(
      "Key: " +
        Object.keys(textLabels).at(i) +
        ", Value: " +
        Object.values(textLabels).at(i)
    );
    cy.get('div[class^="chakra-skeleton"]')
      .eq(2)
      .find('div[class^="css"] > p[class^="chakra-text"]')
      .eq(Object.keys(textLabels).at(i)) // Find the element with the index = Object.keys(textLabels).at(i))
      .should("exist")
      .scrollIntoView({ force: true })
      .should("be.visible")
      .should("contain.text", Object.values(textLabels).at(i));
  }
});
// **************************************************************************
/**
 * Method to verify event-2 PAGE details
 * @param eventDetails
 */
Cypress.Commands.add("verifyEvent2PageDetails", (eventDetails) => {
  cy.log("Going to verifyEventPageDetails()");
  // Event details
  cy.getChakraSkeletonH1HeaderByText(eventDetails.eventName); // Event name
  cy.getH3HrefHeaderByText(eventDetails.organization); // Organization
  // Verify Start Day
  cy.get('div[data-testid="date"] > div > p')
    .eq(0)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .should("contain.text", eventDetails.startDay);
  // Verify End Day
  cy.get('div[data-testid="date"] > div > p')
    .eq(1)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .should("contain.text", eventDetails.endDay);
  // Verify Start Time
  cy.get('div[data-testid="time"] > div > p')
    .eq(0)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .should("contain.text", eventDetails.startTime);
  // Verify End Time
  cy.get('div[data-testid="time"] > div > p')
    .eq(1)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .should("contain.text", eventDetails.endTime);
  // Verify short address
  cy.get('div[data-testid="location"] > div > p')
    .eq(0)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .should("contain.text", eventDetails.eventShortAddress);
  // Verify full address
  cy.get('div[data-testid="location"] > div > p')
    .eq(1)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .should("contain.text", eventDetails.eventFullAddress);
  // Verify the price label
  cy.get('div[data-testid="price-range"] > p')
    .eq(0)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("contain.text", "Price");
  // Verify the price range value
  cy.get('div[data-testid="price-range"] > p')
    .eq(1)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("contain.text", eventDetails.eventPriceRange);
  // Verify the Important info label
  cy.get('div[data-testid="important-info-container"] > div > p')
    .eq(0)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .should("contain.text", "Important Info");
  // Verify the important info value
  cy.get('div[data-testid="important-info-container"] > div > div > div > span')
    .eq(0)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .should("contain.text", "All Ages");
  // Verify the Refund policy label
  cy.get('div[data-testid="refund-policy-container"] > p')
    .eq(0)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .should("contain.text", "Refund Policy");
  // Verify the refund policy value
  cy.get('div[data-testid="refund-policy-container"] > p')
    .eq(1)
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .should("contain.text", "Absolutely no refund.");
});
// **************************************************************************
/**
 * Method to add tickets to the cart
 * @param totalTicketTypes (total number of ticket types)
 * @param numberOfTicketsForEach (how many tickets to add from each type)
 */
Cypress.Commands.add(
  "addTicketsToCart",
  (totalTicketTypes, numberOfTicketsForEach) => {
    cy.log("Going to addTicketsToCart()");
    //const apiRequest1 = "/api/user/tickets/baskets/";
    //cy.intercept(apiRequest1).as("apiRequest1");
    for (let j = 1; j <= numberOfTicketsForEach; j++) {
      for (let i = 0; i < totalTicketTypes * 2; i += 2) {
        cy.wait(500);
        cy.getChakraSpinnerLoadingIndicator().should("not.exist");
        eventsAndFiltersLocators.addItemButtonActive(i).click();
        eventsAndFiltersLocators.removeItemButtonActive(i);
        eventsAndFiltersLocators.addItemButtonActive(i);
        cy.wait(500);
        // cy.wait("@pageLoaded")
        //.its("response.statusCode")
        //.should("be.oneOf", [200, 201, 204]);
      }
    }
    cy.getChakraSpinnerLoadingIndicator().should("not.exist");
    cy.wait(800);
    cy.getChakraSpinnerLoadingIndicator().should("not.exist");
  }
);
// **************************************************************************
/**
 * Method to add tickets to the cart without API request validation
 * @param totalTicketTypes (total number of ticket types)
 * @param numberOfTicketsForEach (how many tickets to add from each type)
 */
Cypress.Commands.add(
  "addTicketsToCartNoApiValidation",
  (totalTicketTypes, numberOfTicketsForEach) => {
    cy.log("Going to addTicketsToCartNoApiValidation()");
    for (let j = 1; j <= numberOfTicketsForEach; j++) {
      for (let i = 0; i < totalTicketTypes * 2; i += 2) {
        cy.wait(500);
        cy.getChakraSpinnerLoadingIndicator().should("not.exist");
        eventsAndFiltersLocators.addItemButtonActive(i).click({ force: true });
        eventsAndFiltersLocators.removeItemButtonActive(i);
        eventsAndFiltersLocators.addItemButtonActive(i);
      }
    }
    cy.getChakraSpinnerLoadingIndicator().should("not.exist");
    cy.wait(800);
    cy.getChakraSpinnerLoadingIndicator().should("not.exist");
  }
);
// **************************************************************************
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
// **************************************************************************
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
// **************************************************************************
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
// **************************************************************************
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
// **************************************************************************
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
// **************************************************************************
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
// **************************************************************************
/**
 * Method to clear 'Date Range' selection
 */
Cypress.Commands.add("clearDateRangeSelection", () => {
  cy.log("Going to clearDateRangeSelection()");
  eventsAndFiltersLocators.getClearSelectionButtonForDateRange().click();
});
// **************************************************************************
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
// **************************************************************************
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
// **************************************************************************
/**
 * Method to verify the purchased 'Upcoming' event card details
 * @param eventJSON
 */
Cypress.Commands.add("verifyUpcomingPurchasedEventCard", (eventJSON) => {
  cy.log("Going to verifyUpcomingPurchasedEventCard");
  // Filter results by event name
  // Enter event name into the search field
  const apiRequest = "/api/user/tickets/events/*";
  cy.intercept(apiRequest).as("pageLoaded");
  cy.visit(`/account/upcoming/?s=+${eventJSON.searchUrl}`);
  cy.wait("@pageLoaded")
    .its("response.statusCode")
    .should("be.oneOf", [200, 204]);
  eventsAndFiltersLocators
    .getUpcomingPurchasedEventName(eventJSON.eventName)
    .should("be.visible");
});
// **************************************************************************
/**
 * Method to open purchased event tickets
 * @param eventJSON
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
// **************************************************************************
/**
 * Method to navigate to the 'Upcoming' page
 */
Cypress.Commands.add("openUpcomingPage", () => {
  cy.log("Going to openUpcomingPage");
  const apiRequest = "/api/user/tickets/events/*";
  cy.intercept(apiRequest).as("pageLoaded");
  cy.log("Navigate to the 'Upcoming' page");
  cy.getDropDownItem("Upcoming").click({ force: true });
  cy.wait("@pageLoaded")
    .its("response.statusCode")
    .should("be.oneOf", [200, 204]);
  cy.url().should("contain", "/account/upcoming/");
});
// **************************************************************************
/**
 * Method to create a new unique event using Angular front-end
 * @param uniqueEventName
 * @param eventDetails
 */
Cypress.Commands.add(
  "createNewEventAngular",
  (uniqueEventName, eventDetails) => {
    cy.log("Going to createNewEventAngular");
    // Intercept API request
    const eventsApiRequest = "**/events/*";
    const inventoryApiRequest = "**/stats/recurring-event-inventory/";
    cy.intercept(eventsApiRequest).as("eventsApiLoaded");
    cy.intercept(inventoryApiRequest).as("inventoryApiLoaded");
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
    // Wait for the API response for **/events/*
    cy.wait("@eventsApiLoaded")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201, 204]);
    // Wait for the API response for **/stats/recurring-event-inventory/
    cy.wait("@inventoryApiLoaded")
      .its("response.statusCode")
      .should(
        "be.oneOf",
        [200, 201, 204],
        "Was not able to confirm that an event got created by verifying the following API request '**/stats/recurring-event-inventory/'"
      );
    // Ensure the Event Overview page title shows up
    cy.get("div > h3")
      .should("be.visible")
      .should("contain.text", "Event Overview");
  }
);
// **************************************************************************
/**
 * Method to verify purchased ticket event details
 * @param ticketIndex
 * @param ticketValues
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
// **************************************************************************
/**
 * Method to navigate to Dashboard and create a new event
 * @param userDetails
 * @param uniqueEventName
 * @param eventDetails
 */
Cypress.Commands.add(
  "navigateToDashboardAndCreateNewEvent",
  (userDetails, uniqueEventName, eventDetails) => {
    cy.log("Going to navigateToDashboardAndCreateNewEvent");
    cy.navigateToDashboard(userDetails);
    // Intercept API
    const customFeesApiRequest = "**/financials/custom-fees/";
    cy.intercept(customFeesApiRequest).as("customFeesApiLoaded");
    cy.clickHamburgerMenu();
    cy.clickCreateEventButton();
    cy.wait(700);
    cy.wait("@customFeesApiLoaded")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201, 204]);
    // Ensure the page title shows up
    cy.get('span[class="title"]').contains("Basic Info").should("be.visible");
    cy.createNewEventAngular(uniqueEventName, eventDetails);
    // Click 'Showpass' logo to navigate to the 'Home' page
    cy.get('a[class="navbar-brand"] > img[class="logo-nav"]')
      .should("be.visible")
      .click({ force: true });
  }
);
// **************************************************************************
/**
 * Method to create a free admission event
 */
Cypress.Commands.add(
  "createFreeAdmissionEventAngular",
  (uniqueEventName, eventDetails) => {
    cy.log("Going to createFreeAdmissionEventAngular");
    // Intercept API request
    const eventsApiRequest = "**/events/*";
    const inventoryApiRequest = "**/stats/recurring-event-inventory/";
    cy.intercept(eventsApiRequest).as("eventsApiLoaded");
    cy.intercept(inventoryApiRequest).as("inventoryApiLoaded");
    eventDetails.eventName = uniqueEventName;
    // Open 'Advanced Settings' and select the free admission event option
    // Click 'Show Advanced Settings'
    cy.get('a[ng-click="advancedForm = !advancedForm"]')
      .contains("Show Advanced Settings")
      .should("exist")
      .scrollIntoView({ force: true })
      .click({ force: true });
    // Ensure the Hide Advanced Settings menu appears
    cy.get('a[ng-click="advancedForm = !advancedForm"]')
      .contains("Hide Advanced Settings")
      .should("exist")
      .scrollIntoView({ force: true });
    // Scroll the Ticket Types header into view
    cy.get('div[class^="simple-header"] > span[class="title"]')
      .contains("Ticket Types")
      .should("exist")
      .scrollIntoView({ force: true });
    // Select 'Free Event - Tickets Not Required'
    // Click and open the 'Ticket Requirements' drop-down list
    cy.get('select[ng-model="event.no_ticket_types"]')
      // Select 'Free Event - Tickets Not Required' drop down item
      .select("Free Event - Tickets Not Required", { force: true })
      .wait(500);
    // Verify that the 'Free Event - Tickets Not Required' drop-down value got selected
    cy.get(
      'option[label="Free Event - Tickets Not Required"][value="boolean:true"]'
    ).should("exist");

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
    // Publish event
    cy.get('button[class^="btn btn-lg"] > i')
      .eq(1)
      .should("be.visible")
      .click({ force: true });
    cy.wait(1500);
    // Wait for the API response for **/events/*
    cy.wait("@eventsApiLoaded")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201, 204]);
    // Wait for the API response for **/stats/recurring-event-inventory/
    cy.wait("@inventoryApiLoaded")
      .its("response.statusCode")
      .should(
        "be.oneOf",
        [200, 201, 204],
        "Was not able to confirm that an event got created by verifying the following API request '**/stats/recurring-event-inventory/'"
      );
    // Ensure the Event Overview page title shows up
    cy.get("div > h3")
      .should("be.visible")
      .should("contain.text", "Event Overview");
  }
);
// **************************************************************************
/**
 * Method to add tickets to the cart in MOBILE view
 * @param totalTicketTypes (total number of ticket types)
 * @param numberOfTicketsForEach (how many tickets to add from each type)
 */
Cypress.Commands.add(
  "addTicketsToCartInMobileView",
  (totalTicketTypes, numberOfTicketsForEach) => {
    cy.log("Going to addTicketsToCartInMobileView()");
    for (let j = 1; j <= numberOfTicketsForEach; j++) {
      for (let i = 1; i < totalTicketTypes * 2; i += 2) {
        cy.wait(500);
        cy.getChakraSpinnerLoadingIndicator().should("not.exist");
        eventsAndFiltersLocators.addItemButtonActive(i).click();
        eventsAndFiltersLocators.removeItemButtonActive(i);
        eventsAndFiltersLocators.addItemButtonActive(i);
        cy.wait(500);
      }
    }
    cy.getChakraSpinnerLoadingIndicator().should("not.exist");
    cy.wait(800);
    cy.getChakraSpinnerLoadingIndicator().should("not.exist");
  }
);
// **************************************************************************
/**
 * Method to replenishing event ticket stock
 * @param userDetails
 * @param eventName
 */
Cypress.Commands.add("replenishEventTicketStock", (userDetails, eventName) => {
  cy.log(`Going to replenishEventTicketStock() for event: ${eventName}`);
  cy.navigateToHomePage();
  cy.logIntoPortal(userDetails);
  // Do not change event or event name as the tickets get added to this event for further testing
  cy.visit(`/dashboard/events/${eventName}/manage/#/edit`);
  cy.wait(3000);
  // Add more tickets to the first ticket type
  cy.get('input[name="ticketTypeInventory0"]')
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .clear({ force: true })
    .type(1500000);
  // Add more tickets to the first ticket type
  cy.get('input[name="ticketTypeInventory1"]')
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .clear({ force: true })
    .type(150000);
  // Click Save
  cy.get('button[ng-click="saveEvent()"]').as("saveButton");
  cy.get("@saveButton").should("exist").click({ force: true });
  cy.wait(1000);
});
// **************************************************************************
