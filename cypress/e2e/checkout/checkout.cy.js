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
// ***************************************************************************
  it(
    "verifying that tickets can be selected and added-TA-40",
    { tags: ["e2e"] },
    function () {
      cy.logIntoPortal(this.testdata.userDetails);
      cy.enterEventNameIntoSearchField(this.testdata.events.event3.eventName);
      cy.getSearchResultModalWindow();
      cy.selectSearchItemByItemName(this.testdata.events.event3.eventName);
      // Click 'BUY PASSES'
      cy.chakraParagraphButtonByText("BUY TICKETS")
      .eq(0)
      .click({force: true});
      // Add 3 tickets from each ticket type (2 ticket types in total)
      cy.addTicketsToCart(2, 3);
    }
  );
});
