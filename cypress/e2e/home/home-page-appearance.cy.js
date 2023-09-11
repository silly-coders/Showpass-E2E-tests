describe("Testing Home page by ", () => {
  beforeEach("navigate to Home page", function () {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
    });
  });
  // ***************************************************************************
  it("verifying top bar element appearance-TA-7", { tags: ["smoke"] }, () => {
    cy.topBarElementAppearance();
  });
  // ***************************************************************************
  it(
    "verifying Search and Date area element appearance-TA-7",
    { tags: ["smoke"] },
    () => {
      cy.searchDateAreaAppearance();
    }
  );
  // ***************************************************************************
  it(
    "verifying the 'Help & Support' column element appearance-TA-8",
    { tags: ["smoke"] },
    () => {
      cy.helpAndSupportColumnAppearance();
    }
  );
  // ***************************************************************************
  it(
    "verifying the 'Connect With Us' column element appearance-TA-8",
    { tags: ["smoke"] },
    () => {
      cy.connectWithUsColumnAppearance();
    }
  );
  // ***************************************************************************
  it(
    "verifying the 'About Showpass' column element appearance-TA-8",
    { tags: ["smoke"] },
    () => {
      cy.aboutShowpassColumnAppearance();
    }
  );
  // ***************************************************************************
  it(
    "verifying the 'Subscribe to Showpass to receive the latest news' section element appearance-TA-8",
    { tags: ["smoke"] },
    () => {
      cy.subscribeToShowpassSectionAppearance();
    }
  );
  // ***************************************************************************
  it(
    "verifying drop-down items under username after logging in-TA-11",
    { tags: ["smoke"] },
    function () {
      cy.logIntoPortal(this.testdata.userDetails);
      cy.clickUsernameAfterLoggingIn();
      cy.verifyDropDownItemExists(this.testdata.topRightHandDropDownList);
    }
  );
  // ***************************************************************************
  it(
    "verifying the 'Password Reset' modal windows appearance-TA-6",
    { tags: ["smoke"] },
    () => {
      cy.clickLoginOnHomePage();
      cy.verifyPasswordResetWindowAppearance();
    }
  );
  // ***************************************************************************
});
