describe("Test checkout process by ", () => {
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

  it("verifying that tickets can be selected and added-TA-40", function () {
    cy.logIntoPortal(this.testdata.userDetails);
    cy.enterEventNameIntoSearchField(this.testdata.events.event1.eventName);
    cy.getSearchResultModalWindow();
    cy.selectSearchItemByItemName(this.testdata.events.event1.eventName);
    // Make sure the 'Cart' h2 header shows up
    cy.getChakraHeaderH2("Cart");
    // Ticket counter - zero by default
    cy.get('div[class^="css"]').contains("0");
    // Add 3 tickets from each ticket type (2 ticket types in total)
    cy.addTicketsToCart(2, 3);
    // Verify the first ticket name and type on the event page based on its index=0
    cy.verifyAddedTicketNames(
      this.testdata.events.event1.ticketName2,
      this.testdata.events.event1.eventName,
      0
    );
    // Verify the first ticket name and type on the event page based on its index=1
    cy.verifyAddedTicketNames(
      this.testdata.events.event1.ticketName1,
      this.testdata.events.event1.eventName,
      1
    );
  });
});
