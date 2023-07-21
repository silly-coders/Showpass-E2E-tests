describe("Testing API Login", function () {
  before("clean-up", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
    });
  });

  it("verifying user can log in via API-TA-35", function () {
    cy.loginViaApi(this.testdata.userDetails);
    cy.visit("/account/profile/personal-info/");
  });
});
