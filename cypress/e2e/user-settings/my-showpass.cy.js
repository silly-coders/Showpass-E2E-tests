describe("Verify 'My Showpass' page by ", () => {
  before(function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach(function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
    });
  });
  // ***************************************************************************
  it(
    "checking the page element appearance-TA-36",
    { tags: ["e2e", "appearance"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.clickUsernameOnTopBar();
      cy.selectProfileDropDownItem();
      cy.getChakraButtonByText("My Showpass").click({ force: true });
      cy.verifyMyShowpassPageAppearance();
    }
  );
  // ***************************************************************************
});
