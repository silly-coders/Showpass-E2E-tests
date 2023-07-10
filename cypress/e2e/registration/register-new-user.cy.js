describe("Test user registration by", () => {

    before("clean-up", () => {
      cy.clearLocalStorage();
      cy.clearCookies();
    });
  
    beforeEach("navigate to Home page", () => {
      cy.navigateToHomePage();
    });

    it.skip("providing valid input values", () => {
        cy.readFile("cypress/fixtures/testdata.json").then((userObject) => {
        cy.registerNewUser(userObject.userDetails);
      });
    });
      
    });