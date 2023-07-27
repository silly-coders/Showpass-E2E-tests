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

  it("verifying 'event 1' CARD content-TA-38", function () {
    cy.logIntoPortal(this.testdata.userDetails);
    cy.searchForAnEventByName(this.testdata.events.event1.eventName);
    cy.verifyEventCardDetails(this.testdata.events.event1);
  });

  it("verifying 'event 2' CARD content-TA-38", function () {
    cy.logIntoPortal(this.testdata.userDetails);
    cy.searchForAnEventByName(this.testdata.events.event2.eventName);
    cy.verifyEventCardDetails(this.testdata.events.event2);
  });

  it("verifying the event-1 page details-TA-39", function () {
    cy.enterEventNameIntoSearchField(this.testdata.events.event1.eventName);
    cy.getSearchResultModalWindow();
    cy.selectSearchItemByItemName(this.testdata.events.event1.eventName);
    cy.verifyEvent1PageDetails(this.testdata.events.event1);
  });

  it("verifying the event-2 page details-TA-39", function () {
    cy.enterEventNameIntoSearchField(this.testdata.events.event2.eventName);
    cy.getSearchResultModalWindow();
    cy.selectSearchItemByItemName(this.testdata.events.event2.eventName);
    cy.verifyEvent2PageDetails(this.testdata.events.event2);
  });
});
