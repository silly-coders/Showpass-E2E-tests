describe("Create a new event by", () => {
  before(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (dataFile) {
      this.dataFile = dataFile;
    });
  });

  beforeEach("navigate to Home page", function () {
    cy.navigateToHomePage();
    cy.logIntoPortal(this.dataFile.userDetails);
    cy.navigateToDashboard(this.dataFile.userDetails);
    cy.clickHamburgerMenu();
    cy.clickCreateEventButton();
  });

  it("populating forms with valid input", function () {});
});
