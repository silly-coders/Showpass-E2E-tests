describe("Testing Sign-Up modal window by ", () => {
  before("clean-up", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", () => {
    cy.navigateToHomePage();
  });

  it("verifying element appearance-TA-2", () => {
    cy.verifySignupModalWindowAppearance();
  });
});
