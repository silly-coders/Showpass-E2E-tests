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
    cy.clickAddPaymentMethodButton();
    cy.verifyCardInfoFormAppearance();
    cy.verifyCardInfoInlineErrors();
    cy.clickCancelButton();
  });

  it("checking the 'Billing Address' form appearance", function () {
    cy.clickPaymentButton();
    cy.clickAddPaymentMethodButton();
    cy.verifyBillingAddressFormAppearance();
    cy.verifyBillingAddressInlineErrors();
    cy.clickCancelButton();
  });

  it("verifying that a 'Billing Address' form can be populated", function () {
    cy.clickPaymentButton();
    cy.clickAddPaymentMethodButton();
    cy.populateBillingAddressForm(this.testdata.userAddress);
    cy.clickCancelButton();
  });

  it.skip("adding and deleting a new payment method", function () {
    // TODO: figure out how to populate the iFrame credit card info
    // cy.clickPaymentButton();
    // cy.populateBillingAddressForm(this.testdata.userAddress);
    // cy.populateCardInformationForm();
  });

  it("verifying that notifications can be turned on and off", function () {
    cy.clickNotificationsButton();
    // Total number of notification toggles on the page is 16
    for (var i=0; i<16; i++) {
    cy.verifyNotificationSelectors(i);
  }
  });
});
