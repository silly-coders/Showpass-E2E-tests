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
      cy.clickPaymentButton();
    });
  });

  it("checking the 'Card Information' form appearance", function () {
    cy.clickAddPaymentMethodButton();
    cy.verifyCardInfoFormAppearance();
    cy.verifyCardInfoInlineErrors();
    cy.clickCancelButton();
  });

  it("checking the 'Billing Address' form appearance", function () {
    cy.clickAddPaymentMethodButton();
    cy.verifyBillingAddressFormAppearance();
    cy.verifyBillingAddressInlineErrors();
    cy.clickCancelButton();
  });

  it("verifying that a 'Billing Address' form can be populated", function () {
    cy.clickAddPaymentMethodButton();
    cy.populateBillingAddressForm(this.testdata.userAddress);
    cy.clickCancelButton();
  });

  it.skip("adding and deleting a new payment method", function () {
    // TODO: figure out how to populate the iFrame credit card info 
    //cy.populateBillingAddressForm(this.testdata.userAddress);
    //cy.populateCardInformationForm();
  });
});
