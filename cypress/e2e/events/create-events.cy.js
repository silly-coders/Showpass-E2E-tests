describe("Create a new event by", () => {
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
    "using Angular front-end-TA-14",
    { tags: ["e2e", "events", "smoke"] },
    function () {
      let uniqueEventName = "automation-event-" + Math.floor(Date.now() / 1000);
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userForSingleBarcodeTesting);
      cy.navigateToDashboard(this.testdata.userForSingleBarcodeTesting);
      cy.clickHamburgerMenu();
      cy.clickCreateEventButton();
      // Ensure the page title shows up
      cy.get('span[class="title"]').contains("Basic Info").should("be.visible");
      cy.createNewEventAngular(uniqueEventName, this.testdata.testEvent1);
    }
  );
  // ***************************************************************************
});
