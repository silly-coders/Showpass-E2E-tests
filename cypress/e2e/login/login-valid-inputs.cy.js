describe("Testing login inputs by ", () => {
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

  it("providing valid credentials-TA-4", function () {
    cy.logIntoPortal(this.testdata.userDetails);
    cy.verifySuccessfulLoginApiResponse(this.testdata.userDetails);
  });
});
