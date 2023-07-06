export class HomeLocators {
  //--------------------------------------------------------- TOP BAR ELEMENTS ----------------------------------------------
  /**
   * Button 'Log in' on the 'Home' page.
   */
  loginButton() {
    return cy.get("button.chakra-button").contains("Log In");
  }
  /**
   * Button 'Create Account' on the 'Home' page.
   */
  createAccountButton() {
    return cy.get("button.chakra-button").contains("Create Account");
  }
  /**
   * Drop-down list 'Host An Event' on the 'Home' page
   */
  hostAnEventDropDown() {
    return cy.get("button.chakra-button > span").contains("Host An Event");
  }
  /**
   * Menu item 'Create An Event' within the 'Host An Event' drop-down on the 'Home' page
   */
  createAnEventMenuItem() {
    return cy.get("button.chakra-menu__menuitem").contains("Create An Event");
  }
  /**
   * Menu item 'Why Showpass' within the 'Host An Event' drop-down on the 'Home' page
   */
  whyShowpassMenuItem() {
    return cy.get("button.chakra-menu__menuitem").contains("Why Showpass");
  }
  /**
   * Menu item 'Pricing' within the 'Host An Event' drop-down on the 'Home' page
   */
  pricingMenuItem() {
    return cy.get("button.chakra-menu__menuitem").contains("Pricing");
  }
  /**
   * Menu item 'Support' within the 'Host An Event' drop-down on the 'Home' page
   */
  supportMenuItem() {
    return cy.get("button.chakra-menu__menuitem").contains("Support");
  }
  /**
   * Toggle 'EN/FR' on the top bar
   */
  toggleEnFr() {
    return cy.get("button.chakra-button > span > div").contains("EN");
  }
  /**
   * Logo 'Showpass' on the top bar
   */
  showpassLogo() {
    return cy.get('img[alt="showpass"]');
  }

  //--------------------------------------------------------- MIDDLE PAGE ELEMENTS ----------------------------------------------
  /**
   * 'Chase That Feeling' jumbotron header above the 'Search' and 'Date' area
   */
  headerAboveSearchAndDateArea() {
    return cy.getByDataTestId("jumbotron-header");
  }
  /**
   * 'Search' label within the 'Search' and 'Date' area
   */
  searchLabel() {
    return cy.get('label[id="search-places-and-events-label"]');
  }
  /**
   * 'Search location or event' input field within the 'Search' and 'Date' area
   */
  searchLocationOrEventInputField() {
    return cy.get('input[id="search-places-and-events-input"]');
  }
  /**
   * 'Date' label within the 'Search' and 'Date' area
   */
  dateLabel() {
    return cy.get("label").contains("Date");
  }
  /**
   * 'Select dates' text in the 'Select dates' date-picker
   */
  selectDatesTextPlaceholder() {
    return cy.get("p.chakra-text").contains("Select dates");
  }
  /**
   * 'Date' date-picker within the 'Search' and 'Date' area
   */
  selectDateDatepicker() {
    return cy
      .getByDataTestId("dateButton")
      .should("have.attr", "aria-label", "Select dates");
  }
  /**
   * 'Search' button within the 'Search' and 'Date' area
   */
  searchButton() {
    return cy.get('button[aria-label="search"]').first();
  }

  //--------------------------------------------------------- ELEMENTS AT THE BOTTOM OF THE PAGE --------------------------------
 /**
  * 'Official Showpass Partners' sub header (label) at the bottom of the 'Home' page
  */
  officialShowpassPartnersLabel() {
    return cy.get('p[class^="css"]').contains('Official Showpass Partners');
  }



  
}
