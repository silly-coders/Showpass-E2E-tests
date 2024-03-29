describe("Test the 'Saved Events' page by ", () => {
  before(function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach("before each spec", function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
    });
  });
  // ***************************************************************************
  it(
    "verifying that new events can be added to 'Saved Events'-TA-42",
    { tags: ["e2e", "events"] },
    function () {
      const apiRequest = "/api/user/tickets/favorites/*";
      cy.intercept(apiRequest).as("pageLoaded");
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.clickUsernameOnTopBar();
      // Navigate to the 'Saved Events' page
      cy.getDropDownItem("Saved Events").click({ force: true });
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
      cy.wait(1500); // Without the implicit wait it counts non-existent cards and then fails
      // This FOR loop is needed in case some events didn't get removed from the first time
      for (let i = 1; i < 3; i++) {
        cy.removeAllSavedEvents();
      }
      let eventsToTest = [
        this.testdata.events.event1.eventUrl,
        this.testdata.events.event2.eventUrl,
      ];
      for (let i = 0; i < eventsToTest.length; i++) {
        cy.clickShowpassLogo();
        cy.visit(eventsToTest.at(i)).wait(700);
        cy.clickHeartIconToSaveEvents(1);
        cy.wait(500);
      }
      // Navigate to the 'Saved Events' page
      cy.visit("/account/saved-events/");
      let eventName = [
        this.testdata.events.event1.eventName,
        this.testdata.events.event2.eventName,
      ];
      let j = 1;
      for (let i = 0; i < eventName.length; i++) {
        cy.log("EVENT_TO_TEST: " + eventName.at(i));
        cy.log(
          "INDEX=1 is First Event Card Name, INDEX=4 is Second Event Card Name etc"
        );
        cy.verifySavedEventCardName(j, eventName.at(i));
        j = j + 3;
      }
    }
  );
  // ***************************************************************************ß
});
