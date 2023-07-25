describe("Test various events by ", function () {
  before("clean-up", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach(function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
    });
  });

  it("verifying event 1 payload-TA-37", function () {
    cy.fixture("event-1.json").then(function (event1) {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.visit("/ta-event-1/");
      cy.verifyEvent1ApiPayload(event1);
    });
  });

  it("verifying event 2 payload-TA-38", function () {
    cy.fixture("event-2.json").then(function (event2) {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.visit("/event-2-do-not-modify/");
      cy.verifyEvent2ApiPayload(event2);
    });
  });
});
