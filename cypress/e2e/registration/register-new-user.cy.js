describe("Test user registration by", () => {
  before("clean-up", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", () => {
    cy.navigateToHomePage();
  });

  it("providing valid input values-TA-3", () => {
    cy.readFile("cypress/fixtures/testdata.json").then((testData) => {
      cy.registerNewUser(testData.userDetails);
    });
  });
});
