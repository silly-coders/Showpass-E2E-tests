export class HomeLocators {
  //--------------------------------------------------------- TOP BAR ELEMENTS ----------------------------------------------
  /**
   * Button 'Log in' on the 'Home' page.
   */
  loginButton() {
    return cy.get('button[class^="chakra-button"]').contains("Log In");
  }
  /**
   * Button 'Dashboard' on the top bar
   */
  dashboardButtonOnTopBar() {
    return cy.get('button[class^="chakra-button"]').contains("Dashboard");
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
   * 'Search events' input field
   */
  searchEventsInputField() {
    return cy
      .get('input[id="EventSearchInput-input"]')
      .should("exist")
      .scrollIntoView()
      .should("be.visible")
      .should("not.be.disabled");
  }
  /**
   * 'Search results' modal window
   */
  searchResultModalWindow() {
    return cy.get('div[id="search-event-desktop-modal"]');
  }
  /**
   * 'Search result' item by name
   * @param itemName
   */
  searchResultItemByName(itemName) {
    return cy
      .get('h6[class^="chakra-text"]')
      .contains(itemName)
      .should("exist")
      .scrollIntoView()
      .should("be.visible");
  }
  /**
   * Logo 'Showpass' on the top bar
   */
  showpassLogo() {
    return cy.get('a[aria-label="showpass logo"]');
  }
  /**
   * 'Best Sellers' modal window below the 'Search' field
   */
  bestSellersModalWindow() {
    return cy.get('div[id="search-event-desktop-modal"]');
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
    return cy
      .get('div[class^="css"] > button[aria-label="Search"]')
      .should("exist")
      .scrollIntoView({ force: true })
      .should("exist");
  }
  /**
   * 'Calgary' button to select a location
   */
  calgaryButton() {
    return cy.get('p[data-testid="Text"]').contains("Calgary");
  }

  //--------------------------------------------------------- ELEMENTS AT THE BOTTOM OF THE PAGE --------------------------------
  /**
   * 'Official Showpass Partners' sub header (label) at the bottom of the 'Home' page
   */
  officialShowpassPartnersLabel() {
    return cy
      .get('div[class^="css"] > p[class^="css"]')
      .contains("Official Showpass Partners");
  }
  /**
   * 'Facebook' icon with link at the bottom of the page
   */
  facebookIconWithLink() {
    return cy.get(
      'a[class^="chakra-link"][href="https://www.facebook.com/showpass"]'
    );
  }
  /**
   * 'Instagram' icon with link at the bottom of the page
   */
  instagramIconWithLink() {
    return cy.get(
      'a[class^="chakra-link"][href="http://instagram.com/ShowpassEvents"]'
    );
  }
  /**
   * 'Linkedin' icon with link at the bottom of the page
   */
  linkedinIconWithLink() {
    return cy.get(
      'a[class^="chakra-link"][href="https://ca.linkedin.com/company/showpass"]'
    );
  }
  /**
   * 'Tweeter' icon with link at the bottom of the page
   */
  tweeterIconWithLink() {
    return cy.get(
      'a[class^="chakra-link"][href="https://twitter.com/ShowpassEvents"]'
    );
  }
  //--------- 'Help & Support' column ---------
  /**
   * 'Help & Support' column header
   */
  helpAndSupportLabel() {
    //second element is visible, not the first (which is index=0)
    return cy.get('p[class^="css"]').contains("Help & Support").eq(0);
  }
  /**
   * 'Privacy Policy' link
   */
  privacyPolicyLink() {
    //second element is visible, not the first (which is index=0)
    return cy
      .get('a[href="https://showpass.com/privacy-policy"]')
      .eq(1)
      .contains("Privacy Policy");
  }
  /**
   * 'Customer Support' link
   */
  customerSupportLink() {
    //second element is visible, not the first (which is index=0)
    return cy
      .get(
        'a[href="https://help.showpass.com/hc/en-us/categories/360001836433-For-Ticket-Buyers"]'
      )
      .eq(1)
      .contains("Customer Support");
  }
  /**
   * 'Organizer Support' link
   */
  organizerSupportLink() {
    //second element is visible, not the first (which is index=0)
    return cy
      .get(
        'a[href="https://help.showpass.com/hc/en-us/categories/360001821154-Event-Organizers"]'
      )
      .eq(1)
      .contains("Organizer Support");
  }
  /**
   * 'Terms & Conditions' link
   */
  termsAndConditionsLink() {
    //second element is visible, not the first (which is index=0)
    return cy
      .get('a[href="https://showpass.com/terms"]')
      .eq(1)
      .contains("Terms & Conditions");
  }
  //--------- 'Connect With Us' column ---------
  /**
   * 'Connect With Us' column header
   */
  connectWithUsHeader() {
    return cy.get('p[class^="css"]').contains("Connect With Us");
  }
  /**
   * 'Angel List' link within the 'Connect With Us' column
   */
  angelListLink() {
    return cy
      .get('a[href="https://angel.co/showpass"]')
      .eq(1)
      .contains("Angel List");
  }
  /**
   * 'Careers' link within the 'Connect With Us' column
   */
  careersLink() {
    return cy
      .get(
        'a[class^="chakra-link"][href="https://www.showpass.com/sell/about-opportunities"]'
      )
      .eq(3)
      .contains("Careers");
  }
  /**
   * 'Blog' link within the 'Connect With Us' column
   */
  blogLink() {
    return cy
      .get(
        'a[class^="chakra-link"][href="https://showpass.com/sell/ticketing-blog"]'
      )
      .eq(1)
      .contains("Blog");
  }
  //--------- 'About Showpass' column ---------
  /**
   * 'About Showpass' column header
   */
  aboutShowpassHeader() {
    return cy.get('p[class^="css"]').contains("About Showpass");
  }
  /**
   * 'Register Organization' link within the 'About Showpass' column
   */
  registerOrganizationLink() {
    return cy
      .get('a[href$="/organizations/register"]')
      .eq(1)
      .contains("Register Organization");
  }
  /**
   * 'About Us' link within the 'About Showpass' column
   */
  aboutUsLink() {
    return cy
      .get('a[href$="/sell/about-opportunities"]')
      .eq(2)
      .contains("About Us");
  }
  /**
   * 'Our Features' link within the 'About Showpass' column
   */
  ourFeaturesLink() {
    return cy
      .get('a[href="https://showpass.com/features"]')
      .eq(1)
      .contains("Our Features");
  }
  /**
   * 'Pricing' link within the 'About Showpass' column
   */
  pricingLink() {
    return cy
      .get('a[href="https://showpass.com/pricing"]')
      .eq(1)
      .contains("Pricing");
  }
  //--------- 'Subscribe to Showpass to receive the latest news' section ---------
  /**
   * 'Subscribe to Showpass to receive the latest news' text at the bottom of the 'Home' page
   */
  subscribeToShowpassText() {
    return cy
      .get('p[class^="css"]')
      .contains("Subscribe to Showpass to receive the latest news");
  }
  /**
   * 'Enter your email' input field at the bottom of the 'Home' page
   */
  enterYourEmailInputField() {
    return cy.get('input[name="Email Address"]');
  }
  /**
   * 'Subscribe' button next to the 'Enter your email' field on the 'Home' page
   */
  subscribeButton() {
    return cy.get('button[value="Subscribe"]');
  }
  //--------- 'Download the App' section ---------
  /**
   * 'Download the App' section header at the bottom of the 'Home' page
   */
  downloadTheAppHeader() {
    return cy.get('p[class^="css"]').contains("Download the App");
  }
  /**
   * 'Google Play' button-link at the bottom of the 'Home' page
   */
  googlePlayButtonLink() {
    return cy.get(
      'a[href="https://play.google.com/store/apps/details?id=com.showpass.android"]'
    );
  }
  /**
   * 'App Store' button-link at the bottom of the 'Home' page
   */
  appStoreButtonLink() {
    return cy.get('a[href^="https://apps.apple.com/ca/app/showpass"]');
  }
  /**
   * 'Account created!' a little toast message on the top right hand side
   */
  accountCreatedMessage() {
    return cy
      .get('div[status="success"] > div > div > p')
      .contains("Account created!");
  }
  /**
   * 'User First and Last name' button
   */
  usernameButton() {
    return cy
      .get('button[class^="chakra-button chakra-menu__menu-button"]')
      .eq(1);
  }
  //--------- Drop-down menu items under the username when logged in ---------
}
