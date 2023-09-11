describe("Test the 'Saved Events' page by ", () => {
  before(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("before each spec", function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      const apiRequest = "/api/user/tickets/favorites/*";
      cy.intercept(apiRequest).as("pageLoaded");
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.clickUsernameAfterLoggingIn();
      // Navigate to the 'Saved Events' page
      cy.getDropDownItem("Saved Events").click({ force: true });
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
    });
  });
// ***************************************************************************
  it(
    "verifying that new events can be added to 'Saved Events'",
    { tags: ["smoke"] },
    function () {
      cy.wait(1500); // Without the implicit wait it counts non-existent cards and then fails
      // This FOR loop is needed in case some events didn't get removed from the first time
      for (let i = 1; i < 3; i++) {
        cy.removeAllSavedEvents();
      }
      let eventsToTest = [
        this.testdata.events.event1.eventName,
        this.testdata.events.event2.eventName,
      ];
      for (let i = 0; i < eventsToTest.length; i++) {
        cy.clickShowpassLogo();
        cy.searchForAnEventByName(eventsToTest.at(i));
        cy.clickHeartIconToSaveEvents(1);
        cy.wait(500);
      }
      // Navigate to the 'Saved Events' page
      cy.visit("/account/saved-events/");
      let j = 1;
      for (let i = 0; i < eventsToTest.length; i++) {
        cy.log("EVENT TO TEST " + eventsToTest.at(i));
        cy.verifySavedEventCardName(j, eventsToTest.at(i));
        j = j + 3;
      }
    }
  );
// ***************************************************************************ß  
});
