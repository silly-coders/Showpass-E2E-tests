describe("Test existing event details by ", () => {
  before(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
    });
  });

  it("verifying 'event 1' CARD content ", function () {
    cy.verifyEventCardDetails(this.testdata.events.event1);
  });

  it("verifying 'event 2' CARD content ", function () {
    cy.verifyEventCardDetails(this.testdata.events.event2);
  });
});
