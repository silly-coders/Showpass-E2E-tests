describe("Verify user's profile by ", () => {
  before(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.clickUsernameAfterLoggingIn();
      cy.selectProfileDropDownItem();
    });
  });

  it("checking the 'Card Information' form appearance", function () {
    cy.clickPaymentButton();
    cy.verifyCardInfoFormAppearance();
  });

  it("checking the 'Billing Address' form appearance", function () {
    cy.clickPaymentButton();
    cy.verifyBillingAddressFormAppearance();
  });
});
