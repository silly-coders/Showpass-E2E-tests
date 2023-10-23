describe("Testing Home page by ", () => {
  beforeEach("navigate to Home page", function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
    });
  });
  // ***************************************************************************
  it(
    "verifying top bar element appearance-TA-7",
    { tags: ["e2e", "appearance"] },
    () => {
      cy.topBarElementAppearance();
    }
  );
  // ***************************************************************************
  it(
    "verifying Search and Date area element appearance-TA-7",
    { tags: ["e2e", "appearance"] },
    () => {
      cy.searchDateAreaAppearance();
    }
  );
  // ***************************************************************************
  it(
    "verifying the 'Help & Support' column element appearance-TA-8",
    { tags: ["e2e"] },
    () => {
      cy.helpAndSupportColumnAppearance();
    }
  );
  // ***************************************************************************
  it(
    "verifying the 'Connect With Us' column element appearance-TA-8",
    { tags: ["e2e", "appearance"] },
    () => {
      cy.connectWithUsColumnAppearance();
    }
  );
  // ***************************************************************************
  it(
    "verifying the 'About Showpass' column element appearance-TA-8",
    { tags: ["e2e", "appearance"] },
    () => {
      cy.aboutShowpassColumnAppearance();
    }
  );
  // ***************************************************************************
  it(
    "verifying the 'Subscribe to Showpass to receive the latest news' section element appearance-TA-8",
    { tags: ["e2e", "appearance"] },
    () => {
      cy.subscribeToShowpassSectionAppearance();
    }
  );
  // ***************************************************************************
  it(
    "verifying drop-down items under username after logging in-TA-11",
    { tags: ["e2e", "appearance"] },
    function () {
      cy.logIntoPortal(this.testdata.userDetails);
      cy.clickUsernameOnTopBar();
      cy.verifyDropDownItemExists(this.testdata.topRightHandDropDownList);
    }
  );
  // ***************************************************************************
  it(
    "verifying the 'Password Reset' modal windows appearance-TA-6",
    { tags: ["e2e", "appearance"] },
    () => {
      cy.clickLoginOnHomePage();
      cy.verifyPasswordResetWindowAppearance();
    }
  );
  // ***************************************************************************
  it(
    "verifying `Host An Event` drop-down list appearance-TA-9",
    { tags: ["e2e", "appearance"] },
    () => {
      cy.getChakraButtonByText("Host An Event").click({ force: true });
      let dropDownListItems = [
        "Create An Event",
        "Why Showpass",
        "Pricing",
        "Support",
      ];
      for (let i = 0; i < dropDownListItems.length; i++) {
        cy.log(
          `Verifying the following drop-down item: ${dropDownListItems.at(i)}`
        );
        cy.getDropDownItem(dropDownListItems.at(i));
      }
    }
  );
  // ***************************************************************************
  it(
    "verifying the 'Request a Demo' form fields and appearance-TA-74",
    { tags: ["e2e", "appearance"] },
    () => {
      cy.visit("sell/request-demo");
      cy.verifyRequestDemoForm();
    }
  );
  // ***************************************************************************
});
