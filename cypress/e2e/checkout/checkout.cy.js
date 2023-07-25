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

  it("verifying no payment checkout-TA-40", function () {
    cy.logIntoPortal(this.testdata.userDetails);
    cy.enterEventNameIntoSearchField(this.testdata.events.event1.eventName);
    cy.getSearchResultModalWindow();
    cy.selectSearchItemByItemName(this.testdata.events.event1.eventName);
    
  });
});
