describe("Verify registration errors by", () => {
  before("Storage clean-up", () => {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("navigate to Home page", () => {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
    });
  });

  // ***************************************************************************
  it(
    "providing no input and clicking Create Account-TA-99",
    { tags: ["e2e", "smoke"] },
    () => {
      cy.navigateToHomePage();
      cy.clickCreateAccountOnHomePage();
      cy.clickCreateAccountOnSignUpModalWindow();
      // Verify inline validation and errors content under input fields
      let errorMessages = [
        "First name is required",
        "Last name is required",
        "Email is required",
        "Password is required",
        "Passwords must match",
      ];
      for (let i = 0; i < errorMessages.length; i++) {
        cy.log(
          `Going to verify the following error message: ${errorMessages.at(i)}`
        );
        cy.get(
          'div[class^="chakra-form-control"] > div[class^="chakra-form__error-message"]'
        )
          .eq(i)
          .should("exist")
          .scrollIntoView({ force: true })
          .should("be.visible")
          .should("have.text", errorMessages.at(i))
          .wait(300);
      }
    }
  );
  // ***************************************************************************
});
