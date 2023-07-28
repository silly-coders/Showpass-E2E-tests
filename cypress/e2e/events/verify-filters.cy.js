describe("Verify filters by ", () => {
  before(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach(function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.visit("/s/events/all/");
    });
  });

  it("searching for a valid event by name-TA-43-case-1", function () {
    cy.getChakraInputFieldByAttr("id", "search-places-and-events-input").as(
      "searchField"
    );
    cy.get("@searchField")
      .type(this.testdata.events.event1.eventName)
      .type("{enter}");
    cy.verifyEventActiveFilterText(
      this.testdata.events.event1.activeFilterLabel
    );
    // Verify Event Name on the card
    cy.getChakraSkeletonItem()
      .eq(1)
      .should("contain", this.testdata.events.event1.eventName);
    // Verify there is NO a second card on the page
    cy.getChakraSkeletonItem().eq(3).should("not.exist");
    cy.clickButtonxToRemoveFilterByArialabel(
      "Button to remove Event Name filter"
    );
  });

  it("searching for an invalid event-TA-43-case-2", function () {
    cy.getChakraInputFieldByAttr("id", "search-places-and-events-input").as(
      "searchField"
    );
    cy.get("@searchField").type("Not a valid event").type("{enter}");
    cy.verifyEventActiveFilterText("Not a valid event");
    cy.verifyNoEventsAvailableMsg();
    cy.verifyActiveFilterByAriaLabel(
      "Button for Event Name: Not a valid event filter"
    );
    cy.clickButtonxToRemoveFilterByArialabel(
      "Button to remove Event Name filter"
    );
  });

  it("searching for a valid event with date range-TA-43-case-3", function () {
    cy.getChakraInputFieldByAttr("id", "search-places-and-events-input").as(
      "searchField"
    );
    // Type event name to search for and press 'Enter'
    cy.get("@searchField")
      .type(this.testdata.events.event1.eventName)
      .type("{enter}");
    // Verify active filter for event name
    cy.verifyEventActiveFilterText(
      this.testdata.events.event1.activeFilterLabel
    );
    // Verify Event Name on the card
    cy.getChakraSkeletonItem()
      .eq(1)
      .should("contain", this.testdata.events.event1.eventName);
    // Select a pre-set date range by label
    cy.selectDateRangeByLabel("Next Week");
    cy.clearDateRangeSelection();
    cy.clickButtonxToRemoveFilterByArialabel(
      "Button to remove Event Name filter"
    );
  });

  it("applying a category-TA-43-case-4", function () {
    cy.selectCategoryByText("Arts & Theatres");
    cy.verifyActiveFilterByAriaLabel("Button for Category: Arts filter");
    cy.clickButtonxToRemoveFilterByArialabel(
      "Button to remove Arts & Theatres filter"
    );
  });

  it("selecting a valid tag-TA-43-case-5", function () {
    cy.selectTagByText("Festivals");
    cy.verifyActiveFilterByAriaLabel("Button for Tag: Festivals filter");
    cy.clickButtonxToRemoveFilterByArialabel(
      "Button to remove Festivals filter"
    );
  });

  it("providing an invalid tag-TA-43-case-6", function () {
    cy.inputCustomValueIntoCombobox(2, "unrealTag");
    cy.verifyActiveFilterByAriaLabel("Button for Tag: unrealTag filter");
    cy.clickButtonxToRemoveFilterByArialabel(
      "Button to remove unrealTag filter"
    );
  });

  it("verifying the Clear-All-Filters button-TA-43-case-7", function () {
    // ***** Provide event name *****
    cy.getChakraInputFieldByAttr("id", "search-places-and-events-input").as(
      "searchField"
    );
    // Type event name to search for and press 'Enter'
    cy.get("@searchField")
      .type(this.testdata.events.event1.eventName)
      .type("{enter}");
    // Verify active filter for event name
    cy.verifyEventActiveFilterText(
      this.testdata.events.event1.activeFilterLabel
    );
    // ***** Provide date range *****
    cy.selectDateRangeByLabel("Next Week");
    //***** Select a category *****
    cy.selectCategoryByText("Arts & Theatres");
    cy.verifyActiveFilterByAriaLabel("Button for Category: Arts filter");
    //***** Select a tag *****
    cy.selectTagByText("Festivals");
    // ***** Clear all filters *****
    cy.getChakraButtonByText("Clear all filters").as("clearAllButton");
    cy.get("@clearAllButton").scrollIntoView().click({ force: true });
    cy.get('button[class^="chakra-button"]')
      .contains("Clear all filters")
      .should("not.exist");
  });
});
