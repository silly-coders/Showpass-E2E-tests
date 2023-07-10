describe("Testing login inputs", () => {
  before("clean-up", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", () => {
    cy.navigateToHomePage();
  });

  it("by providing valid credentials", () => {
    cy.readFile("cypress/fixtures/testdata.json").then((userObject) => {
      cy.logIntoPortal(userObject);
    });
  });
});
