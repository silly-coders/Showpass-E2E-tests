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
});
