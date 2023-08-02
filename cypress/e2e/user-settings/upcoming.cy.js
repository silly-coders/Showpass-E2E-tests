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
    cy.openUpcomingPage();
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
    cy.openUpcomingPage();
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
    cy.openUpcomingPage();
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
    cy.openUpcomingPage();
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
  // ***************************************************************************
  it("verifying frontend event-1 tickets-TA-48", function () {
    cy.logIntoPortal(this.testdata.userDetails);
    cy.clickUsernameAfterLoggingIn();
    cy.openUpcomingPage();
    // Search for and verify the 'Event 1' upcoming event card
    cy.verifyUpcomingPurchasedEventCard(this.testdata.events.event1);
    cy.clickEventNameToSeePurchasedTickets(this.testdata.events.event1);
    // Verify event 1
    cy.fixture("event-1.json").then((event1JSON) => {
      let cityProvince = event1JSON.event.venue.city + ", Alberta";
      let ticketLabels1 = [
        event1JSON.event.name,
        event1JSON.event.venue.street_name,
        cityProvince,
        "Event Starts",
        "Fri Jul 21, 2023",
        "7:00 AM MDT",
        "Event Ends",
        "Sun Jul 21, 2030",
        "12:00 AM MDT",
        "Name on Ticket",
        "User ForTesting",
        "Ticket Category",
        "Main event",
        "Barcode",
      ];
      cy.getQrCodeByIndex(0);
      cy.getTransferButtonByIndex(0);
      // Verify the first ticket type labels
      for (let i = 0; i < ticketLabels1.length; i++) {
        cy.log(
          "[***** Verifying the following label: " +
            ticketLabels1.at(i) +
            " *****]"
        );
        cy.getChakraTextLabelByIndex(i + 1).should(
          "contain",
          ticketLabels1.at(i)
        );
      }
      // Verify the second ticket type labels
      let ticketLabels2 = [
        event1JSON.event.name,
        event1JSON.event.venue.street_name,
        cityProvince,
        "Event Starts",
        "Fri Jul 21, 2023",
        "7:00 AM MDT",
        "Event Ends",
        "Sun Jul 21, 2030",
        "12:00 AM MDT",
        "Name on Ticket",
        "User ForTesting",
        "Ticket Category",
        "General Admission",
        "Barcode",
      ];
      for (let i = 0; i < ticketLabels2.length; i++) {
        cy.log(
          "[***** Verifying the following label: " +
            ticketLabels2.at(i) +
            " *****]"
        );
        cy.getChakraTextLabelByIndex(i + 16).scrollIntoView();
        cy.getChakraTextLabelByIndex(i + 16).should(
          "contain",
          ticketLabels2.at(i)
        );
        cy.getQrCodeByIndex(4)
        cy.getTransferButtonByIndex(1);
        for(let j=0; j<2; j++) {
        // Clickable icons
        cy.getChakraLinkButtonByAttr('href','/o/qa-team-organization/').eq(j);
        // Google wallet buttons
        cy.getChakraLinkButtonByAttr('id','google-wallet-link').eq(j);
      }
      }
    });
  });
  // ***************************************************************************
  it("verifying frontend event-2 tickets-TA-48", function () {
    cy.logIntoPortal(this.testdata.userDetails);
    cy.clickUsernameAfterLoggingIn();
    cy.openUpcomingPage();
    // Search for and verify the 'Event 2' upcoming event card
    cy.verifyUpcomingPurchasedEventCard(this.testdata.events.event2);
    cy.clickEventNameToSeePurchasedTickets(this.testdata.events.event2);
    // Verify event 2
    cy.fixture("event-2.json").then((eventJSON) => {
      let ticketLabels1 = [
        eventJSON.event.name,
        "155 25 de Mayo",
        "Buenos Aires, Buenos Aires",
        "Event Starts",
        "Mon Jul 24, 2023",
        "9:00 PM MDT",
        "Event Ends",
        "Thu Aug 1, 2030",
        "12:00 AM MDT",
        "Name on Ticket",
        "User ForTesting",
        "Ticket Category",
        "Base event2",
        "Barcode",
      ];
      // Verify the first ticket type labels
      for (let i = 0; i < ticketLabels1.length; i++) {
        cy.log(
          "[***** Verifying the 'Ticket Type 1' label: " +
            ticketLabels1.at(i) +
            " *****]"
        );
        cy.getChakraTextLabelByIndex(i + 1).should(
          "contain",
          ticketLabels1.at(i)
        );
      }
      cy.getQrCodeByIndex(0);
      cy.getTransferButtonByIndex(0);

      // ***** Verify the second ticket type labels
      let ticketLabels2 = [
        eventJSON.event.name,
        "155 25 de Mayo",
        "Buenos Aires, Buenos Aires",
        "Event Starts",
        "Mon Jul 24, 2023",
        "9:00 PM MDT",
        "Event Ends",
        "Thu Aug 1, 2030",
        "12:00 AM MDT",
        "Name on Ticket",
        "User ForTesting",
        "Ticket Category",
        "Advanced event2",
        "Barcode",
      ];
      for (let i = 0; i < ticketLabels2.length; i++) {
        cy.log(
          "[***** Verifying the 'Ticket Type 2' label: " +
            ticketLabels2.at(i) +
            " *****]"
        );
        cy.getChakraTextLabelByIndex(i + 16).scrollIntoView();
        cy.getChakraTextLabelByIndex(i + 16).should(
          "contain",
          ticketLabels2.at(i)
        );
      }
      cy.getQrCodeByIndex(4);
      cy.getTransferButtonByIndex(1);
      // ***** Verify the third ticket type labels
      let ticketLabels3 = [
        eventJSON.event.name,
        "155 25 de Mayo",
        "Buenos Aires, Buenos Aires",
        "Event Starts",
        "Mon Jul 24, 2023",
        "9:00 PM MDT",
        "Event Ends",
        "Thu Aug 1, 2030",
        "12:00 AM MDT",
        "Name on Ticket",
        "User ForTesting",
        "Ticket Category",
        "VIP event2",
        "Barcode",
      ];
      for (let i = 0; i < ticketLabels3.length; i++) {
        cy.log(
          "[***** Verifying the 'Ticket Type 3' label: " +
            ticketLabels3.at(i) +
            " *****]"
        );
        cy.getChakraTextLabelByIndex(i + 31).scrollIntoView();
        cy.getChakraTextLabelByIndex(i + 31).should(
          "contain",
          ticketLabels3.at(i)
        );
      }
      cy.getQrCodeByIndex(8);
      cy.getTransferButtonByIndex(2);
      for(let j=0; j<3; j++) {
        // Clickable icons
        cy.getChakraLinkButtonByAttr('href','/o/qa-team-organization/').eq(j);
        // Google wallet buttons
        cy.getChakraLinkButtonByAttr('id','google-wallet-link').eq(j);
      }
    });
  });
});
