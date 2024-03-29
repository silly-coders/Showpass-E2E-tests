describe("Test popular cities options by ", () => {
  beforeEach("navigate to Home page", function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
    });
  });
  // ***************************************************************************
  it(
    "selecting a popular city and verifying page content-TA-55",
    { tags: ["e2e", "smoke"] },
    () => {
      cy.navigateToHomePage();
      // TEST THE FOLLOWING CITIES
      let popularCities = ["Calgary", "Vancouver", "Toronto", "Edmonton"];
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
    }
  );
  // ***************************************************************************
  it(
    "verifying event cards city names-TA-56",
    { tags: ["e2e", "smoke"] },
    () => {
      cy.navigateToHomePage();
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
        // Count total number of carousels across the page and verify all first event cards
        cy.get("div[class='swiper-wrapper']")
          .find('div[class="swiper-slide swiper-slide-active"]')
          .then(($value) => {
            length = $value.length;
            cy.log("Total number of carousels is: " + length);
            for (let i = 0; i < length; i++) {
              cy.log(
                "Verifying city: " +
                  popularCities.at(city) +
                  " and event card #" +
                  i +
                  1
              );
              cy.get(`div[data-swiper-slide-index="${i}"]`)
                .find('div[class^="chakra-skeleton"]:nth-child(3)')
                .should("contain.text", popularCities.at(city));
            }
          });
        // Verify city names on the 'Popular in ${City}' carousel's event cards
        // Find a total number of cards in the 'Popular Cities' section (in the carousel)
        cy.get(
          'div[data-testid="top-events"] > div > div:nth-child(2) > div:nth-child(2) > div > div'
        ).then(($value) => {
          length = $value.length;
          cy.log(
            `Total number of "Popular in ${popularCities.at(
              city
            )}" cards is: ` + length
          );
          for (let i = 0; i < length; i++) {
            cy.log(
              "Verifying city: " +
                popularCities.at(city) +
                " and event card #" +
                i +
                1
            );
            // Within the 'Popular in ${City}' carousel make sure the right city name shows up at the bottom of each card (ignore case)
            cy.get('div[data-testid="top-events"]')
              // Index '0' is the event name and index '1' is the city name on the card, hence .eq(1).
              .find(
                `div[data-swiper-slide-index="${i}"] > div > div > div > div > div[class^='chakra-skeleton'] > p`
              )
              .eq(1)
              .contains(popularCities.at(city), { matchCase: false });
            // Expose the next group of 5 event cards to verify city name
            if (i % 5 == 0) {
              // Click right arrow button
              cy.clickButtonIfNotDisabled(
                `button[class^="chakra-button"][aria-label="Popular in ${popularCities.at(
                  city
                )}"]`,
                1
              );
            }
          }
        });
        // Click 'Showpass' logo to reset the 'Home' page
        cy.get('a[class^="chakra-link"][aria-label="showpass logo"]')
          .should("exist")
          .should("be.visible")
          .click({ force: true });
      }
    }
  );
  // ***************************************************************************
  it(
    "verifying that a popular city can be changed via drop-down list box-TA-57",
    { tags: ["e2e", "smoke"] },
    () => {
      cy.navigateToHomePage();
      let popularCities = ["Calgary", "Vancouver", "Toronto"];
      let lastCityLowerCase =
        popularCities[popularCities.length - 1].toLowerCase();
      // Select the last city in the array and ensure the page is loaded
      cy.getSwiperSlideByAttr("href", `/discover/${lastCityLowerCase}/`).click({
        force: true,
      });
      cy.url().should("include", `/discover/${lastCityLowerCase}/`);
      // Click a ${City} name drop-down list
      cy.get('button[class^="chakra-button"] > div > p')
        .contains(popularCities[popularCities.length - 1])
        .should("be.visible")
        .click({ force: true });
      // Ensure a modal window with other cities on it shows up
      cy.getChakraModalWindow();
      // Select each city from the 'popularCities' array and verify the page is loaded
      for (let city = 0; city < popularCities.length; city++) {
        let nextCityLowerCase = popularCities.at(city).toLowerCase();
        // Begin changing cities one by one based on the 'popularCities' array
        cy.getChakraLinkButtonByAttr(
          "href",
          `/discover/${nextCityLowerCase}/`
        ).click({
          force: true,
        });
        cy.url().should("include", `/discover/${nextCityLowerCase}/`);
        cy.getChakraBreadcrumbListItem(0).should("have.text", "Home");
        cy.getChakraBreadcrumbListItem(1).should(
          "have.text",
          `${popularCities.at(city)}`
        );
        cy.getChakraTextLabelByText("Explore");
        cy.getChakraTextLabelByText(`${popularCities.at(city)}`);
        cy.getChakraButtonByText(`${popularCities.at(city)}`);
        // Click ${City} drop-down list
        cy.get('button[class^="chakra-button"] > div > p')
          .contains(popularCities.at(city))
          .should("be.visible")
          .click({ force: true });
        // Ensure a modal window shows up
        cy.getChakraModalWindow();
        // Ensure the 'search Location' input field shows up
        cy.getH4ChakraTextByText("Search Location")
          .should("exist")
          .should("be.visible");
      }
    }
  );
  // ***************************************************************************
});
