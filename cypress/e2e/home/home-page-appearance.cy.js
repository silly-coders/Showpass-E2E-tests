describe("Testing Home page by ", () => {
  before("clean-up", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", () => {
    cy.navigateToHomePage();
  });

  it("verifying top bar element appearance-TA-7", () => {
    cy.topBarElementAppearance();
  });

  it("verifying Search and Date area element appearance-TA-7", () => {
    cy.searchDateAreaAppearance();
  });

  it("verifying the 'Help & Support' column element appearance-TA-8", () => {
    cy.helpAndSupportColumnAppearance();
  });

  it("verifying the 'Connect With Us' column element appearance-TA-8", () => {
    cy.connectWithUsColumnAppearance();
  });

  it("verifying the 'About Showpass' column element appearance-TA-8", () => {
    cy.aboutShowpassColumnAppearance();
  });

  it("verifying the 'Subscribe to Showpass to receive the latest news' section element appearance-TA-8", () => {
    cy.subscribeToShowpassSectionAppearance();
  });

  it("verifying drop-down items under username after logging in-TA-11", () => {
    cy.readFile("cypress/fixtures/testdata.json").then((testData) => {
      cy.logIntoPortal(testData.userDetails);
      cy.clickUsernameAfterLoggingIn();
      cy.verifyDropDownItemExists(testData.topRightHandDropDownList);
    });
  });
});
