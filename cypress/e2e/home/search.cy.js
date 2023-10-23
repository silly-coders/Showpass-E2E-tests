let tomorrowDate;
let todaysDate;

describe("Verify 'Home' page search by ", () => {
  beforeEach(function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      const apiRequest = "**/envelope/*";
      cy.intercept(apiRequest).as("pageLoaded");
      this.testdata = testdata;
      cy.navigateToHomePage();
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
    });
  });
  // ***************************************************************************
  it(
    "selecting tomorrow's events-TA-76",
    { tags: ["e2e", "smoke", "search-filters"] },
    () => {
      // Click into the 'Date' field
      cy.get('p[class^="chakra-text"][data-testid="Text"]')
        .contains("Date")
        .click({ force: true });
      // Wait for the search date modal window
      cy.get('div[id="search-event-date-desktop-modal"]')
        .should("exist")
        .should("be.visible");
      // Click 'Tomorrow' button
      cy.getChakraButtonByAttribute("aria-label", "Tomorrow")
        .contains("Tomorrow")
        .click({ force: true });
      // Read and store the date value
      cy.get('p[class^="chakra-text"][data-testid="Text"]')
        .eq(0)
        .invoke("text")
        .then((selectedTomorrowDate) => {
          cy.log(`Tomorrow date is: ${selectedTomorrowDate}`);
          tomorrowDate = selectedTomorrowDate;
        });
      // Click 'Search' button
      cy.getChakraButtonByAttribute("aria-label", "Search")
        .should("be.visible")
        .click({ force: true });
      // Ensure the 'Filters' page shows up
      cy.getH1HeaderByText("Filters");
      // Get the date from the 'Date Range' field
      cy.get('button[id="event-search-select-date-range"]')
        .invoke("text")
        .then((filterDateValue) => {
          cy.log(`Search date was: ${filterDateValue}`);
          expect(tomorrowDate).to.contain(filterDateValue);
        });
    }
  );
  // ***************************************************************************
  it(
    "selecting today's events-TA-77",
    { tags: ["e2e", "smoke", "search-filters"] },
    () => {
      // Click into the 'Date' field
      cy.get('p[class^="chakra-text"][data-testid="Text"]')
        .contains("Date")
        .click({ force: true });
      // Wait for the search date modal window
      cy.get('div[id="search-event-date-desktop-modal"]')
        .should("exist")
        .should("be.visible");
      // Click 'Today' button
      cy.getChakraButtonByAttribute("aria-label", "Today")
        .contains("Today")
        .click({ force: true });
      // Read and store the date value
      cy.get('p[class^="chakra-text"][data-testid="Text"]')
        .eq(0)
        .invoke("text")
        .then((selectedTodayDate) => {
          cy.log(`Today's date is: ${selectedTodayDate}`);
          todaysDate = selectedTodayDate;
        });
      // Click 'Search' button
      cy.getChakraButtonByAttribute("aria-label", "Search")
        .should("be.visible")
        .click({ force: true });
      // Ensure the 'Filters' page shows up
      cy.getH1HeaderByText("Filters");
      // Get the date from the 'Date Range' field
      cy.get('button[id="event-search-select-date-range"]')
        .invoke("text")
        .then((filterDateValue) => {
          cy.log(`Search date was: ${filterDateValue}`);
          expect(todaysDate).to.contain(filterDateValue);
        });
    }
  );
  // ***************************************************************************
});
