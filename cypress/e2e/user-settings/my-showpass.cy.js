describe("Verify 'My Showpass' page by ", () => {
  before(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach(function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.clickUsernameAfterLoggingIn();
      cy.selectProfileDropDownItem();
    });
  });
// ***************************************************************************
  it(
    "checking the page element appearance-TA-36",
    { tags: ["smoke"] },
    function () {
      cy.getChakraButtonByText("My Showpass").click({ force: true });
      cy.verifyMyShowpassPageAppearance();
    }
  );
// ***************************************************************************  
});
