describe("Test existing event details by ", () => {
  before(function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
    });
  });
  // ***************************************************************************
  it(
    "verifying 'event 1' CARD content-TA-38",
    { tags: ["e2e", "events"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.searchForAnEventByName(this.testdata.events.event1.eventName);
      cy.verifyEventCardDetails(this.testdata.events.event1);
    }
  );
  // ***************************************************************************
  it(
    "verifying 'event 2' CARD content-TA-38",
    { tags: ["e2e", "events"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.searchForAnEventByName(this.testdata.events.event2.eventName);
      cy.verifyEventCardDetails(this.testdata.events.event2);
    }
  );
  // ***************************************************************************
  it(
    "verifying the event-1 page details-TA-39",
    { tags: ["e2e", "events"] },
    function () {
      cy.navigateToHomePage();
      cy.enterEventNameIntoSearchField(this.testdata.events.event1.eventName);
      cy.getSearchResultModalWindow();
      cy.selectSearchItemByItemName(this.testdata.events.event1.eventName);
      cy.verifyEvent1PageDetails(this.testdata.events.event1);
    }
  );
  // ***************************************************************************
  it(
    "verifying the event-2 page details-TA-39",
    { tags: ["e2e", "events"] },
    function () {
      cy.navigateToHomePage();
      cy.enterEventNameIntoSearchField(this.testdata.events.event2.eventName);
      cy.getSearchResultModalWindow();
      cy.selectSearchItemByItemName(this.testdata.events.event2.eventName);
      cy.verifyEvent2PageDetails(this.testdata.events.event2);
    }
  );
  // ***************************************************************************
  it(
    "verifying event Help and Info modal appearance and content-TA-60",
    { tags: ["e2e", "events", "appearance"] },
    function () {
      cy.navigateToHomePage();
      // Enter event name into the search input field
      cy.enterEventNameIntoSearchField(this.testdata.events.event1.eventName);
      // Wait for the modal window with search results
      cy.getSearchResultModalWindow();
      // Select the event from the list of events
      cy.selectSearchItemByItemName(this.testdata.events.event1.eventName);
      // Click 'Help & Info'
      cy.getChakraButtonByText("Help & Info").click({ force: true });
      // Ensure modal windol with a header shows up
      cy.getChakraModalHeader("Help & Info");
      // Verify 'Help & Info' modal window href links
      let modalWindowLinks = [
        "How do I find my tickets?",
        "Do I have to print my tickets?",
        "What if the name on the ticket doesn't match the person who is going to use it?",
        "How do I get a refund?",
      ];
      for (let i = 0; i < modalWindowLinks.length; i++) {
        cy.log(
          `Going to verify the following link text: ${modalWindowLinks.at(i)}`
        );
        cy.get('div[class^="chakra-modal__body"]')
          .find('a[target="_blank"]')
          .contains(modalWindowLinks.at(i))
          .should("exist")
          .should("be.visible");
      }
      // Verify 'Help & Info' modal window labels and text
      let modalWindowLabels = [
        "Frequently Asked Questions",
        "Refund Policy",
        "Absolutely no refund.",
        "Showpass Terms & Privacy Policy",
      ];
      for (let i = 0; i < modalWindowLabels.length; i++) {
        cy.log(
          `Going to verify the following label text: ${modalWindowLabels.at(i)}`
        );
        cy.get('div[class^="chakra-modal__body"]')
          .find('p[class^="chakra-text"]')
          .contains(modalWindowLabels.at(i))
          .should("exist")
          .should("be.visible");
      }
      // Verify two modal window buttons
      cy.getChakraButtonByText("View Terms");
      cy.getChakraButtonByText("View Privacy Policy");
    }
  );
  // ***************************************************************************
  it.skip(
    "verifying that an assigned seat ticket can be added to cart-TA-75",
    { tags: ["e2e", "events"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userForOrganization3and4);
      cy.visit(this.testdata.eventAssignedSeating.eventUrl);
      cy.get('button[class^="chakra-button"] > p')
        .contains("BUY TICKETS")
        .click({ force: true });
      cy.wait(2500);
      cy.get('div[class="konvajs-content"] > canvas').eq(4).as("canvas");
      // Click in the center of the assigned seating area to make seats visible
      cy.get("@canvas").should("exist").click("center", { force: true });
      cy.wait(1500);
      // Click on a seat in the middle
      cy.get("@canvas").should("exist").click("center", { force: true });
      // Verify 'Success' message
      cy.verifyTopRightSuccessMessage("Ticket(s) added to cart!");
      cy.clickButtonXtoCloseMessage();
      // Ensure the 'Checkout' button becomes available
      cy.chakraParagraphButtonByText("CHECKOUT")
        .should("exist")
        .scrollIntoView()
        .should("be.visible")
        .should("not.be.disabled");
      // Click on the same seat to remove it
      cy.get("@canvas").should("exist").click("center", { force: true });
      // Verify 'Success' message on removing ticket from cart
      cy.verifyTopRightSuccessMessage("Success");
      cy.clickButtonXtoCloseMessage();
    }
  );
  // ***************************************************************************
  it(
    "verifying restriction items on the front end-TA-100",
    { tags: ["e2e", "events"] },
    function () {
      cy.navigateToHomePage();
      cy.visit("/automation-event-restrictions-101120231100/").wait(900);
      const restrictionItems = [
        "All Ages",
        "Ages 18+",
        "Ages 19+",
        "Ages 21+",
        "No Re-Entry",
        "No Outside Food or Drink",
        "Early Arrival Recommended",
        "Valid Government Issued ID Required",
      ];
      for (let i = 0; i < restrictionItems.length; i++) {
        cy.log(`Going to verify: [${restrictionItems.at(i)}]`);
        cy.get('div[data-testid="important-info-container"]')
          .find('span[status="info"]')
          .eq(i)
          .should("exist")
          .scrollIntoView({ force: true })
          .should("be.visible")
          .should("have.text", restrictionItems.at(i));
      }
    }
  );
  // ***************************************************************************
  it(
    "verifying 'Event Info' modal window and element appearance-TA-104",
    { tags: ["e2e", "events"] },
    function () {
      cy.navigateToHomePage();
      // Navigate to the event page
      cy.visit("/qa-assigned-seating-2/seating/").wait(900);
      // Click 'Event Info'
      cy.get('button[class^="chakra-button"][aria-label="Event Info"]')
        .should("exist")
        .scrollIntoView({ force: true })
        .should("have.text", "Event Info")
        .click({ force: true })
        .wait(300);
      // ***** Begin verifying Event Info
      let eventInfo = [
        "QA assigned seating 2",
        "Starts: Friday September 22nd, 2023",
        "Ends: Tuesday October 16th, 2035",
        "Starts: 9:00 PM MDT",
        "Ends: 12:00 AM MDT",
        "155 West Pender Street",
        "155 W Pender St, Vancouver",
        "Contact Information",
        "Organizer Profile",
        "Help & Info",
        "Contact Us",
        "Refund Policy",
        "This venue hasn't specified a refund policy.",
      ];
      for (let i = 0; i < eventInfo.length; i++) {
        cy.log(
          `Going to verify the following element text: ${eventInfo.at(i)}`
        );
        cy.get(
          'section[class^="chakra-modal__content"][aria-label="Event Info Account Modal"]'
        )
          .find('p[class^="chakra-text"]')
          .contains(eventInfo.at(i))
          .should("exist")
          .scrollIntoView({ force: true })
          .should("be.visible");
      }
      // Verify the (X) button appearance
      cy.get(
        'section[class^="chakra-modal__content"][aria-label="Event Info Account Modal"]'
      )
        .find('button[aria-label="Close"]')
        .should("exist")
        .scrollIntoView({ force: true })
        .should("be.visible");
    }
  );
  // ***************************************************************************
});
