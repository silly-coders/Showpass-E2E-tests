describe("Testing login inputs by", () => {
  before("clean-up", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", () => {
    cy.navigateToHomePage();
  });

  it("providing valid credentials-TA-4", () => {
    cy.readFile("cypress/fixtures/testdata.json").then((testData) => {
      cy.logIntoPortal(testData.userDetails);
    });
  });
});
