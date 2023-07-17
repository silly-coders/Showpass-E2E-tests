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
    // If the chakra-switch selector is disabled from the get go enable it first to run the test
    cy.verifyAndTurnOnChakraSwitchSelectorIfDisabled(0);
    // Total number of notification toggles on the page is 16
    for (var i = 0; i < 16; i++) {
      cy.verifyNotificationSelectors(i);
  }
    cy.clickSaveButton();
  });

  it("verifying that notifications can be turned on and off", function () {
    cy.clickNotificationsButton();
    for(let i=0; i<16; i++) {
    const allNotificationLabelsAtProfile = ["All Notifications","SMS Notifications","Guestlists",
    "New Purchases","Ticket Transfers","Campaigns","Push Notifications","Guestlists","New Purchases",
    "Transfers","Email Notifications","Guestlists","New Purchases","Events","Abandoned Carts","Subscribe to promotions from Showpass"];
    cy.verifyToggleLabelsOnNotificationsPage(i, allNotificationLabelsAtProfile.at(i));
};
  });

  it("verifying that notifications toggles disappear once 'All Notifications' selector is off", function () {
    cy.clickNotificationsButton();
    // If the chakra-switch selector is disabled from the get go enable it first to run the test
    cy.verifyAndTurnOnChakraSwitchSelectorIfDisabled(0);
    cy.toggleSwitchSelector(0);
    // Verify that 'All Notifications' toggle is off
    cy.verifyToggleLabelsOnNotificationsPage(0,'All Notifications');
    cy.verifyChakraSwitchSelectorIsDisabled(0);
    // Verify that the 'Subscribe to promotions from Showpass' toggle is still enabled
    cy.verifyChakraSwitchSelectorIsEnabled(1);
    cy.verifyToggleLabelsOnNotificationsPage(1,'Subscribe to promotions from Showpass');
    // Verify that all the other selectors are not present
    for(let i=2; i<16; i++) {
    cy.verifyElementDoesNotExist('input[class="chakra-switch__input"]',i);
    };
  }); 
  
  it("verifying that updated notifications can be saved", function () {
    cy.log("***** Part 1: verify the toggle is ENABLED from the get go *****");
    cy.clickNotificationsButton();
    cy.verifyToggleLabelsOnNotificationsPage(0,'All Notifications');
    // If the chakra-switch selector is disabled from the get go enable it first to run the test
    cy.verifyAndTurnOnChakraSwitchSelectorIfDisabled(0);
    // Turn off the 'All Notifications' selector
    cy.toggleSwitchSelector(0);
    // Save and verify changes
    cy.clickSaveButton();
    // Verify and close the 'Success' message
    cy.verifyTopRightSuccessMessage('Your notification preferences have been updated');
    cy.clickButtonXtoCloseMessage();
    cy.log("***** Part 2: verify the toggle is DISABLED *****");
    // Load the 'Notifications' page again
    cy.clickNotificationsButton();
    // Verify the 'All Notifications' selector is DISABLED
    cy.verifyChakraSwitchSelectorIsDisabled(0);
    // Turn ON the 'All Notifications' selector
    cy.toggleSwitchSelector(0);
    // Save changes
    cy.clickSaveButton();
    cy.log("***** Part 3: verify the toggle is ENABLED again *****");
    // Verify and close the 'Success' message
    cy.verifyTopRightSuccessMessage('Your notification preferences have been updated');
    cy.clickButtonXtoCloseMessage();
    // Verify the 'All Notifications' selector is ENABLED
    cy.verifyChakraSwitchSelectorIsEnabled(0);
  });  

});
