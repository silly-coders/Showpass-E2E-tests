describe("Test existing event details by ", () => {
  before(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userForUpcoming);
      cy.clickUsernameAfterLoggingIn();
      // Navigate to the 'Upcoming' page
      cy.getDropDownItem("Upcoming").click({ force: true });
    });
  });

  it("verifying the 'Upcomig' page event-1-search-TA-41", function () {
    cy.enterEventNameIntoSearchLocationOrEventField(
      this.testdata.events.event1.eventName
    );
    // Click search button
    cy.getChakraButtonByAttribute("aria-label", "search")
      .eq(0)
      .click({ force: true });
    cy.verifyEventCardDetails(this.testdata.events.event1);
  });

  it("verifying the 'Upcomig' page event-2-search-TA-41", function () {
    cy.enterEventNameIntoSearchLocationOrEventField(
      this.testdata.events.event2.eventName
    );
    // Click search button
    cy.getChakraButtonByAttribute("aria-label", "search")
      .eq(0)
      .click({ force: true });
    cy.verifyEventCardDetails(this.testdata.events.event2);
  });
});
