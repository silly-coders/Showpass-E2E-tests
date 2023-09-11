describe("Create a new event by", () => {
  beforeEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userForSingleBarcodeTesting);
      cy.navigateToDashboard(this.testdata.userForSingleBarcodeTesting);
      cy.clickHamburgerMenu();
      cy.clickCreateEventButton();
      // Ensure the page title shows up
      cy.get('span[class="title"]').contains("Basic Info").should("be.visible");
    });
  });

  it("using Angular front-end-TA-14", function () {
    let uniqueEventName = "automation-event-" + Math.floor(Date.now() / 1000);
    cy.createNewEventAngular(uniqueEventName, this.testdata.testEvent1);
  });
});
