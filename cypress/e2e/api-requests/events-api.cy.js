describe("Test various events by ", function () {
  beforeEach(function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
    });
  });
  // ***************************************************************************
  it(
    "verifying event 1 payload-TA-37",
    { tags: ["e2e", "events"] },
    function () {
      cy.fixture("event-1.json").then(function (eventPayload) {
        cy.navigateToHomePage();
        cy.logIntoPortal(this.testdata.userDetails);
        cy.visit(this.testdata.events.event1.eventUrl);
        cy.reload();
        // Ensure the event main page got loaded
        cy.get('img[alt="Event image"]', {timeout:9000})
        .should('exist')
        .should('be.visible');
        cy.verifyEvent1ApiPayload(eventPayload);
      });
    }
  );
  // ***************************************************************************
  it(
    "verifying event 2 payload-TA-38",
    { tags: ["e2e", "events"] },
    function () {
      cy.fixture("event-2.json").then(function (eventPayload) {
        cy.navigateToHomePage();
        cy.logIntoPortal(this.testdata.userDetails);
        cy.visit(this.testdata.events.event2.eventUrl);
        cy.reload();
        // Ensure the event main page got loaded
        cy.get('img[alt="Event image"]', {timeout:9000})
        .should('exist')
        .should('be.visible');
        cy.verifyEvent2ApiPayload(eventPayload);
      });
    }
  );
});
