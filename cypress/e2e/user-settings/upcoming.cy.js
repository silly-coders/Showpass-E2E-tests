describe("Test existing event details by ", () => {
  before(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
    });
  });
  // ***************************************************************************
  it("verifying the 'Upcomig' page event-1-search-TA-41", function () {
    cy.logIntoPortal(this.testdata.userForUpcoming);
    cy.clickUsernameAfterLoggingIn();
    // Navigate to the 'Upcoming' page
    cy.getDropDownItem("Upcoming").click({ force: true });
    cy.enterEventNameIntoSearchLocationOrEventField(
      this.testdata.events.event1.eventName
    );
    // Click search button
    cy.getChakraButtonByAttribute("aria-label", "search")
      .eq(0)
      .click({ force: true });
    cy.verifyEventCardDetails(this.testdata.events.event1);
  });
  // ***************************************************************************
  it("verifying the 'Upcomig' page event-2-search-TA-41", function () {
    cy.logIntoPortal(this.testdata.userForUpcoming);
    cy.clickUsernameAfterLoggingIn();
    // Navigate to the 'Upcoming' page
    cy.getDropDownItem("Upcoming").click({ force: true });
    cy.enterEventNameIntoSearchLocationOrEventField(
      this.testdata.events.event2.eventName
    );
    // Click search button
    cy.getChakraButtonByAttribute("aria-label", "search")
      .eq(0)
      .click({ force: true });
    cy.verifyEventCardDetails(this.testdata.events.event2);
  });
  // ***************************************************************************
  it("verifying purchased event-1 items API-TA-45", function () {
    cy.logIntoPortal(this.testdata.userDetails);
    cy.clickUsernameAfterLoggingIn();
    // Navigate to the 'Upcoming' page
    cy.getDropDownItem("Upcoming").click({ force: true });
    // Verify event 1 api
    cy.fixture("event-1.json").then((event1JSON) => {
      cy.verifyPurchasedItemDetailsApi_event_1(event1JSON.event.id, event1JSON);
      // Verify the 'Event 1' upcoming event card
      cy.verifyUpcomingPurchasedEventCard(this.testdata.events.event1);
      cy.clickEventNameToSeePurchasedTickets(this.testdata.events.event1);
      cy.verifyPurchasedItemDetailsApi_event_1("ta-event-1", event1JSON);
      cy.clickChakraButtonByText("Back");
    });
  });
  // ***************************************************************************
  it("verifying the purchased event-2 items API-TA-45", function () {
    cy.logIntoPortal(this.testdata.userDetails);
    cy.clickUsernameAfterLoggingIn();
    // Navigate to the 'Upcoming' page
    cy.getDropDownItem("Upcoming").click({ force: true });
    // Verify event 2 api
    cy.fixture("event-2.json").then((event2JSON) => {
      cy.verifyPurchasedItemDetailsApi_event_2(event2JSON.event.id, event2JSON);
      // ******* Verify event 2 upcoming event card
      cy.verifyUpcomingPurchasedEventCard(this.testdata.events.event2);
      cy.clickEventNameToSeePurchasedTickets(this.testdata.events.event2);
      cy.verifyPurchasedItemDetailsApi_event_2(
        "event-2-do-not-modify",
        event2JSON
      );
    });
  });
});
