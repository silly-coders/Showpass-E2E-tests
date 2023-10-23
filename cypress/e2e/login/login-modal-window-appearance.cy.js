describe("Testing Login modal window by ", () => {
  before("clean-up", () => {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", () => {
    cy.navigateToHomePage();
  });
  // ***************************************************************************
  it(
    "verifying element appearance-TA-1",
    { tags: ["e2e", "appearance"] },
    () => {
      cy.verifyLoginModalWindowAppearance();
    }
  );
});
