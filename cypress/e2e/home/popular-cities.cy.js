describe("Test popular cities options by ", () => {
  beforeEach("navigate to Home page", function () {
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

  it("selecting a popular city and verifying page content-TA-55", () => {
    // TEST THE FOLLOWING CITIES
    let popularCities = ["Calgary", "Vancouver", "Toronto"];
    for (let city = 0; city < popularCities.length; city++) {
      let cityLowerCase = popularCities.at(city).toLowerCase();
      cy.getSwiperSlideByAttr("href", `/discover/${cityLowerCase}/`).click({
        force: true,
      });
      cy.url().should("include", `/discover/${cityLowerCase}/`);
      cy.getChakraBreadcrumbListItem(0).should("have.text", "Home");
      cy.getChakraBreadcrumbListItem(1).should(
        "have.text",
        `${popularCities.at(city)}`
      );
      cy.getChakraTextLabelByText("Explore");
      cy.getChakraTextLabelByText(`${popularCities.at(city)}`);
      cy.getChakraButtonByText(`${popularCities.at(city)}`);
      cy.getH2ChakraTextByText(`Popular in ${popularCities.at(city)}`);
      if (popularCities.at(city) == "Calgary") {
        cy.getH2ChakraTextByText(`This weekend in ${popularCities.at(city)}`);
        cy.clickButtonIfNotDisabled(
          `button[class^="chakra-button"][aria-label="This weekend in ${popularCities.at(
            city
          )}"]`,
          1
        );
        cy.clickButtonIfNotDisabled(
          `button[class^="chakra-button"][aria-label="This weekend in ${popularCities.at(
            city
          )}"]`,
          0
        );
      }
      cy.getChakraButtonByAttribute(
        "aria-label",
        `Popular in ${popularCities.at(city)}`
      ).eq(1);
      // Click right arrow carusel buttons
      let arialabels = [
        `Popular in ${popularCities.at(city)}`,
        "In the area",
        "change category selection page",
      ];
      for (let i = 0; i < arialabels.length; i++) {
        cy.clickButtonIfNotDisabled(
          `button[class^="chakra-button"][aria-label="${arialabels.at(i)}"]`,
          1
        );
      }
      // Click left arrow carusel buttons
      for (let j = 0; j < arialabels.length; j++) {
        cy.clickButtonIfNotDisabled(
          `button[class^="chakra-button"][aria-label="${arialabels.at(j)}"]`,
          0
        );
      }
      cy.get('a[class^="chakra-link"][aria-label="showpass logo"]')
        .should("exist")
        .should("be.visible")
        .click({ force: true });
    }
  });
});
