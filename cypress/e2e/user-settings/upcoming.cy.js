describe("Test existing event details by ", () => {
  before(function () {
    cy.clearAllSessionStorage();
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
  it(
    "verifying the 'Upcomig' page event-1-search-TA-41",
    { tags: ["e2e", "events"] },
    function () {
      cy.logIntoPortal(this.testdata.userForUpcoming);
      cy.clickUsernameOnTopBar();
      cy.openUpcomingPage();
      cy.enterEventNameIntoSearchLocationOrEventField(
        this.testdata.events.event1.eventName
      );
      cy.log("Click search button");
      cy.getChakraButtonByAttribute("aria-label", "search")
        .eq(0)
        .click({ force: true });
      cy.verifyEventCardDetails(this.testdata.events.event1);
    }
  );
  // ***************************************************************************
  it(
    "verifying the 'Upcomig' page event-2-search-TA-41",
    { tags: ["e2e", "events"] },
    function () {
      cy.logIntoPortal(this.testdata.userForUpcoming);
      cy.clickUsernameOnTopBar();
      cy.openUpcomingPage();
      cy.enterEventNameIntoSearchLocationOrEventField(
        this.testdata.events.event2.eventName
      );
      // Click search button
      cy.getChakraButtonByAttribute("aria-label", "search")
        .eq(0)
        .click({ force: true });
      cy.verifyEventCardDetails(this.testdata.events.event2);
    }
  );
  // ***************************************************************************
  it(
    "verifying purchased event-1 items API-TA-45",
    { tags: ["e2e", "events"] },
    function () {
      cy.logIntoPortal(this.testdata.userDetails);
      cy.clickUsernameOnTopBar();
      cy.openUpcomingPage();
      // Verify event 1 api
      cy.fixture("event-1.json").then((event1JSON) => {
        cy.verifyPurchasedItemDetailsApi_event_1(
          event1JSON.event.id,
          event1JSON
        );
        // Verify the 'Event 1' upcoming event card
        cy.verifyUpcomingPurchasedEventCard(this.testdata.events.event1);
        cy.clickEventNameToSeePurchasedTickets(this.testdata.events.event1);
        cy.verifyPurchasedItemDetailsApi_event_1("ta-event-1", event1JSON);
        cy.clickChakraButtonByText("Back");
      });
    }
  );
  // ***************************************************************************
  it(
    "verifying the purchased event-2 items API-TA-45",
    { tags: ["e2e", "events"] },
    function () {
      cy.logIntoPortal(this.testdata.userDetails);
      cy.clickUsernameOnTopBar();
      cy.openUpcomingPage();
      // Verify event 2 api
      cy.fixture("event-2.json").then((event2JSON) => {
        cy.verifyPurchasedItemDetailsApi_event_2(
          event2JSON.event.id,
          event2JSON
        );
        // ******* Verify event 2 upcoming event card
        cy.verifyUpcomingPurchasedEventCard(this.testdata.events.event2);
        cy.clickEventNameToSeePurchasedTickets(this.testdata.events.event2);
        cy.verifyPurchasedItemDetailsApi_event_2(
          "event-2-do-not-modify",
          event2JSON
        );
      });
    }
  );
  // ***************************************************************************
  it(
    "verifying frontend event-1 tickets-TA-48",
    { tags: ["e2e", "events"] },
    function () {
      cy.logIntoPortal(this.testdata.userDetails);
      cy.clickUsernameOnTopBar();
      cy.openUpcomingPage();
      // Search for and verify the 'Event 1' upcoming event card
      cy.verifyUpcomingPurchasedEventCard(this.testdata.events.event1);
      cy.clickEventNameToSeePurchasedTickets(this.testdata.events.event1);
      cy.wait(1000);
      // ***** First Ticket *****
      // Verify the first ticket details
      cy.fixture("event-1.json").then((event1JSON) => {
        let cityProvince = event1JSON.event.venue.city + ", Alberta";
        let ticketValues1 = {
          eventName: event1JSON.event.name,
          streetName: event1JSON.event.venue.street_name,
          cityProvince: cityProvince,
          startDate: "Fri Jul 21, 2023",
          startTime: "7:00 AM MDT",
          endDate: "Sun Jul 21, 2030",
          endTime: "12:00 AM MDT",
          nameOnTicket: "User ForTesting",
          eventType: "Main event",
        };
        cy.verifyTicketEventDetails(0, ticketValues1);
        cy.getQrCodeByIndex(0);
        cy.getTransferButtonByIndex(0);
        // ***** Second ticket *****
        // Verify the second ticket details
        let ticketValues2 = {
          eventName: event1JSON.event.name,
          streetName: event1JSON.event.venue.street_name,
          cityProvince: cityProvince,
          startDate: "Fri Jul 21, 2023",
          startTime: "7:00 AM MDT",
          endDate: "Sun Jul 21, 2030",
          endTime: "12:00 AM MDT",
          nameOnTicket: "User ForTesting",
          eventType: "General Admission",
        };
        cy.verifyTicketEventDetails(1, ticketValues2);
        cy.getQrCodeByIndex(4);
        cy.getTransferButtonByIndex(1);
        // There are 2 purchased tickets - then there should be 2 buttons/links
        for (let j = 0; j < 2; j++) {
          // Clickable icons
          cy.getChakraLinkButtonByAttr("href", "/o/qa-team-organization/").eq(
            j
          );
          // Google wallet buttons
          cy.getChakraLinkButtonByAttr("id", "google-wallet-link").eq(j);
        }
      });
    }
  );
  // ***************************************************************************
  it(
    "verifying frontend event-2 tickets-TA-48",
    { tags: ["e2e", "events"] },
    function () {
      cy.logIntoPortal(this.testdata.userDetails);
      cy.clickUsernameOnTopBar();
      cy.openUpcomingPage();
      // Search for and verify the 'Event 2' upcoming event card
      cy.verifyUpcomingPurchasedEventCard(this.testdata.events.event2);
      cy.clickEventNameToSeePurchasedTickets(this.testdata.events.event2);
      // Verify event 2
      // ***** Event 2 - ticket 1
      cy.fixture("event-2.json").then((eventJSON) => {
        let ticketValues1 = {
          eventName: eventJSON.event.name,
          streetName: "155 25 de Mayo",
          cityProvince: "Buenos Aires, Buenos Aires",
          startDate: "Mon Jul 24, 2023",
          startTime: "9:00 PM MDT",
          endDate: "Thu Aug 1, 2030",
          endTime: "12:00 AM MDT",
          nameOnTicket: "User ForTesting",
          eventType: "Base event2",
        };
        cy.verifyTicketEventDetails(0, ticketValues1);
        cy.getQrCodeByIndex(0);
        cy.getTransferButtonByIndex(0);
        // ***** Event 2 - ticket 2
        let ticketValues2 = {
          eventName: eventJSON.event.name,
          streetName: "155 25 de Mayo",
          cityProvince: "Buenos Aires, Buenos Aires",
          startDate: "Mon Jul 24, 2023",
          startTime: "9:00 PM MDT",
          endDate: "Thu Aug 1, 2030",
          endTime: "12:00 AM MDT",
          nameOnTicket: "User ForTesting",
          eventType: "Advanced event2",
        };
        cy.verifyTicketEventDetails(1, ticketValues2);
        cy.getQrCodeByIndex(4);
        cy.getTransferButtonByIndex(1);
        // ***** Event 2 - ticket 3
        let ticketValues3 = {
          eventName: eventJSON.event.name,
          streetName: "155 25 de Mayo",
          cityProvince: "Buenos Aires, Buenos Aires",
          startDate: "Mon Jul 24, 2023",
          startTime: "9:00 PM MDT",
          endDate: "Thu Aug 1, 2030",
          endTime: "12:00 AM MDT",
          nameOnTicket: "User ForTesting",
          eventType: "VIP event2",
        };
        cy.verifyTicketEventDetails(2, ticketValues3);
        cy.getQrCodeByIndex(4);
        cy.getTransferButtonByIndex(1);
        cy.getQrCodeByIndex(8);
        cy.getTransferButtonByIndex(2);
        // There are 3 purchased tickets - then there should be 3 buttons/links
        for (let j = 0; j < 3; j++) {
          // Clickable icons
          cy.getChakraLinkButtonByAttr("href", "/o/qa-team-organization/").eq(
            j
          );
          // Google wallet buttons
          cy.getChakraLinkButtonByAttr("id", "google-wallet-link").eq(j);
        }
      });
    }
  );
  // ***************************************************************************
});
