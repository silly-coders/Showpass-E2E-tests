describe("Verify filters by ", () => {
  const apiRequest = "/api/public/events/*";
  //cy.intercept('GET', '**/comments/*').as('getComment')
  before(function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach(function () {
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.visit("/s/events/all/");
    });
  });
  // ***************************************************************************
  it(
    "searching for a valid event by name-TA-43-case-1",
    { tags: ["e2e", "events", "smoke", "search-filters"] },
    function () {
      cy.intercept(apiRequest).as("pageLoaded");
      cy.getChakraInputFieldByAttr("id", "search-places-and-events-input").as(
        "searchField"
      );
      cy.get("@searchField")
        .type(this.testdata.events.event1.eventName)
        .type("{enter}");
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
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
    }
  );
  // ***************************************************************************
  it(
    "searching for an invalid event-TA-43-case-2",
    { tags: ["e2e", "events", "smoke", "search-filters"] },
    function () {
      cy.intercept(apiRequest).as("pageLoaded");
      cy.getChakraInputFieldByAttr("id", "search-places-and-events-input").as(
        "searchField"
      );
      cy.get("@searchField").type("Not a valid event").type("{enter}");
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
      cy.verifyEventActiveFilterText("Not a valid event");
      cy.verifyNoEventsAvailableMsg();
      cy.verifyActiveFilterByAriaLabel(
        "Button for Event Name: Not a valid event filter"
      );
      cy.clickButtonxToRemoveFilterByArialabel(
        "Button to remove Event Name filter"
      );
    }
  );
  // ***************************************************************************
  it(
    "searching for a valid event with date range-TA-43-case-3",
    { tags: ["e2e", "events", "smoke", "search-filters"] },
    function () {
      cy.intercept(apiRequest).as("pageLoaded");
      cy.getChakraInputFieldByAttr("id", "search-places-and-events-input").as(
        "searchField"
      );
      // Type event name to search for and press 'Enter'
      cy.get("@searchField")
        .type(this.testdata.events.event1.eventName)
        .type("{enter}");
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
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
    }
  );
  // ***************************************************************************
  it(
    "applying the 'Arts & Theatres' category-TA-43-case-4",
    { tags: ["e2e", "smoke", "search-filters"] },
    function () {
      cy.intercept(apiRequest).as("pageLoaded");
      cy.selectCategoryByText("Arts & Theatres");
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
      cy.verifyActiveFilterByAriaLabel("Button for Category: Arts filter");
      cy.clickButtonxToRemoveFilterByArialabel(
        "Button to remove Arts & Theatres filter"
      );
    }
  );
  // ***************************************************************************
  it(
    "selecting a valid tag-TA-43-case-5",
    { tags: ["e2e", "smoke", "search-filters"] },
    function () {
      cy.intercept(apiRequest).as("pageLoaded");
      cy.selectTagByText("Festivals");
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
      cy.verifyActiveFilterByAriaLabel("Button for Tag: Festivals filter");
      cy.clickButtonxToRemoveFilterByArialabel(
        "Button to remove Festivals filter"
      );
    }
  );
  // ***************************************************************************
  it(
    "providing an invalid tag-TA-43-case-6",
    { tags: ["e2e", "smoke", "search-filters"] },
    function () {
      cy.intercept(apiRequest).as("pageLoaded");
      cy.inputCustomValueIntoCombobox(2, "unrealTag");
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
      cy.verifyActiveFilterByAriaLabel("Button for Tag: unrealTag filter");
      cy.clickButtonxToRemoveFilterByArialabel(
        "Button to remove unrealTag filter"
      );
    }
  );
  // ***************************************************************************
  it(
    "verifying the Clear-All-Filters button-TA-43-case-7",
    { tags: ["e2e", "smoke", "search-filters"] },
    function () {
      cy.intercept(apiRequest).as("pageLoaded");
      // ***** Provide event name *****
      cy.getChakraInputFieldByAttr("id", "search-places-and-events-input").as(
        "searchField"
      );
      // Type event name to search for and press 'Enter'
      cy.get("@searchField")
        .type(this.testdata.events.event1.eventName)
        .type("{enter}");
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
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
    }
  );
  // ***************************************************************************
  it(
    "applying various categories simultaneously-TA-83",
    { tags: ["e2e", "search-filters"] },
    function () {
      let categories = [
        [
          "Automotive, Boats, Air",
          "Button for Category: Automotive filter",
          "Button to remove Automotive, Boats, Air filter",
        ],
        [
          "Business & Professional",
          "Button for Category: Business filter",
          "Button to remove Business & Professional filter",
        ],
        [
          "Charity & Causes",
          "Button for Category: Charity filter",
          "Button to remove Charity & Causes filter",
        ],
      ];
      cy.intercept(apiRequest).as("pageLoaded");
      cy.selectCategoryByText(categories.at(0)[0]).wait(300);
      cy.selectCategoryByText(categories.at(1)[0]).wait(300);
      cy.selectCategoryByText(categories.at(2)[0]).wait(300);
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
      cy.verifyActiveFilterByAriaLabel(categories.at(0)[1]);
      cy.verifyActiveFilterByAriaLabel(categories.at(1)[1]);
      cy.verifyActiveFilterByAriaLabel(categories.at(2)[1]);
      cy.clickButtonxToRemoveFilterByArialabel(categories.at(0)[2]);
      cy.clickButtonxToRemoveFilterByArialabel(categories.at(1)[2]);
      cy.clickButtonxToRemoveFilterByArialabel(categories.at(2)[2]);
    }
  );
  // ***************************************************************************
  it(
    "applying multiple tags simultaneously-TA-84",
    { tags: ["e2e", "search-filters"] },
    function () {
      let tags = [
        [
          "Festivals",
          "Button for Tag: Festivals filter",
          "Button to remove Festivals filter",
        ],
        [
          "Community",
          "Button for Tag: Community filter",
          "Button to remove Community filter",
        ],
        [
          "Rock & Roll",
          "Button for Tag: Rock & Roll filter",
          "Button to remove Rock & Roll filter",
        ],
      ];
      cy.intercept(apiRequest).as("pageLoaded");
      // Apply 3 tags one by one
      cy.selectTagByText(tags.at(0)[0]).wait(300);
      cy.selectTagByText(tags.at(1)[0]).wait(300);
      cy.selectTagByText(tags.at(2)[0]).wait(300);
      cy.wait("@pageLoaded")
        .its("response.statusCode")
        .should("be.oneOf", [200, 204]);
      // Verify tag-buttons applied
      cy.verifyActiveFilterByAriaLabel(tags.at(0)[1]);
      cy.verifyActiveFilterByAriaLabel(tags.at(1)[1]);
      cy.verifyActiveFilterByAriaLabel(tags.at(2)[1]);
      cy.clickButtonxToRemoveFilterByArialabel(tags.at(0)[2]).wait(300);
      cy.clickButtonxToRemoveFilterByArialabel(tags.at(1)[2]).wait(300);
      cy.clickButtonxToRemoveFilterByArialabel(tags.at(2)[2]).wait(300);
    }
  );
  // ***************************************************************************
});
