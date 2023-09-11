import { HomeLocators } from "../element-locators/home-locators";
import { LoginLocators } from "../element-locators/login-locators";
import { DashboardLocators } from "../element-locators/dashboard-locators";
const homeLocators = new HomeLocators();
const loginLocators = new LoginLocators();
const dashboardLocators = new DashboardLocators();

/**
 * Method to navigate to the 'Home' page
 */
Cypress.Commands.add("navigateToHomePage", () => {
  cy.log("Going to navigateToHomePage()");
  const baseUrl = Cypress.config("baseUrl");
  cy.visit("/");
  cy.url().should("contain", baseUrl);
});
/**
 * Method to click 'Log In' button on the 'Home' page
 */
Cypress.Commands.add("clickLoginOnHomePage", () => {
  cy.log("Going to clickLoginOnHomePage()");
  homeLocators.loginButton().should("exist").should("be.visible").click();
  loginLocators.emailAddressInputField().should("exist").should("be.visible");
});
/**
 * Method to click 'Create Account' button on the 'Home' page
 */
Cypress.Commands.add("clickCreateAccountOnHomePage", () => {
  cy.log("Going to clickCreateAccountOnHomePage()");
  homeLocators
    .createAccountButton()
    .should("exist")
    .should("be.visible")
    .click();
});
/**
 * Method to select 'Profile' within the drop-down list on the 'Home' page
 */
Cypress.Commands.add("selectOrdersDropDownItem", () => {
  cy.log("Going to selectOrdersDropDownItem()");
  cy.getDropDownItem("Orders").should("be.visible").click();
});
/**
 * Method to select 'Orders' within the drop-down list on the 'Home' page
 */
Cypress.Commands.add("selectProfileDropDownItem", () => {
  cy.log("Going to selectProfileDropDownItem()");
  cy.getDropDownItem("Profile").should("be.visible").click();
});
/**
 * Method to verify top bar element appearance on the 'Home' page
 */
Cypress.Commands.add("topBarElementAppearance", () => {
  cy.log("Going to topBarElementAppearance()");
  homeLocators
    .loginButton()
    .should("exist")
    .should("be.visible")
    .should("have.text", "Log In");
  homeLocators.showpassLogo().should("exist").should("be.visible");
  homeLocators.createAccountButton().should("exist").should("be.visible");
  homeLocators.hostAnEventDropDown().should("exist").should("be.visible");
  homeLocators.hostAnEventDropDown().click({ force: true });
  homeLocators.createAnEventMenuItem().should("exist").should("be.visible");
  homeLocators.whyShowpassMenuItem().should("exist").should("be.visible");
  homeLocators.pricingMenuItem().should("exist").should("be.visible");
  homeLocators.supportMenuItem().should("exist").should("be.visible");
  homeLocators.toggleEnFr().should("exist").should("be.visible");
  homeLocators.showpassLogo().should("exist").should("be.visible");
});

/**
 * Method to verify 'Search' and 'Date' area appearance on the 'Home' page
 */
Cypress.Commands.add("searchDateAreaAppearance", () => {
  cy.log("Going to searchDateAreaAppearance()");
  homeLocators
    .calgaryButton()
    .should("exist")
    .scrollIntoView()
    .should("be.visible")
    .click();
  homeLocators.searchLabel().should("exist").should("be.visible");
  homeLocators
    .searchLocationOrEventInputField()
    .should("exist")
    .should("be.visible");
  homeLocators.dateLabel().should("exist").should("be.visible");
  homeLocators
    .selectDatesTextPlaceholder()
    .should("exist")
    .should("be.visible");
  homeLocators.searchButton();
});

/**
 * Method to very the 'Home' page 'Help & Support' column elements appearance
 */
Cypress.Commands.add("helpAndSupportColumnAppearance", () => {
  cy.log("Going to helpAndSupportColumnAppearance()");
  homeLocators
    .officialShowpassPartnersLabel()
    .should("exist")
    .should("be.visible");
  homeLocators
    .facebookIconWithLink()
    .scrollIntoView({ force: true })
    .should("exist")
    .should("be.visible");
  homeLocators
    .instagramIconWithLink()
    .scrollIntoView({ force: true })
    .should("exist")
    .should("be.visible");
  homeLocators
    .linkedinIconWithLink()
    .scrollIntoView({ force: true })
    .should("exist")
    .should("be.visible");
  homeLocators.tweeterIconWithLink().should("exist").should("be.visible");
  homeLocators.helpAndSupportLabel().should("exist");
  homeLocators.privacyPolicyLink().should("exist").should("be.visible");
  homeLocators.customerSupportLink().should("exist").should("be.visible");
  homeLocators.organizerSupportLink().should("exist").should("be.visible");
  homeLocators.termsAndConditionsLink().should("exist").should("be.visible");
});

/**
 * Method to very the 'Home' page 'Connect With Us' column elements appearance
 */
Cypress.Commands.add("connectWithUsColumnAppearance", () => {
  cy.log("Going to connectWithUsColumnAppearance()");
  homeLocators.connectWithUsHeader().should("exist");
  homeLocators.angelListLink().should("exist").scrollIntoView({force: true}).should("be.visible");
  homeLocators.careersLink().should("exist").scrollIntoView({force: true}).should("be.visible");
  homeLocators.blogLink().should("exist").scrollIntoView({force: true}).should("be.visible");
});

/**
 * Method to very the 'Home' page 'About Showpass' column elements appearance
 */
Cypress.Commands.add("aboutShowpassColumnAppearance", () => {
  cy.log("Going to aboutShowpassColumnAppearance()");
  homeLocators.aboutShowpassHeader().should("exist");
  homeLocators.registerOrganizationLink().should("exist").should("be.visible");
  homeLocators.aboutUsLink().should("exist").should("be.visible");
  homeLocators.pricingLink().should("exist").should("be.visible");
});

/**
 * Method to very the 'Subscribe to Showpass' section on the 'Home' page
 */
Cypress.Commands.add("subscribeToShowpassSectionAppearance", () => {
  cy.log("Going to subscribeToShowpassSectionAppearance()");
  homeLocators.subscribeToShowpassText().should("exist").should("be.visible");
  homeLocators.enterYourEmailInputField().should("exist").should("be.visible");
  homeLocators.subscribeButton().should("exist").should("be.visible");
});

/**
 * Click username after logging in
 */
Cypress.Commands.add("clickUsernameAfterLoggingIn", () => {
  cy.log("Going to clickUsernameAfterLoggingIn()");
  loginLocators
    .userFirstAndLastNames()
    .should("exist")
    .should("be.visible")
    .click({ force: true });
});

/**
 * Verify that drop-down menu items under user's First and Last names exist
 * @param topRightHandDropDownList
 */
Cypress.Commands.add("verifyDropDownItemExists", (topRightHandDropDownList) => {
  cy.log("Going to verifyDropDownItemExists()");
  // Loop through all items within the dataObject.topRightHandDropDownList JSON to verify menu items
  for (const key in topRightHandDropDownList) {
    Object.entries(topRightHandDropDownList).forEach((entry) => {
      const [key, value] = entry;
      cy.getDropDownItem(value).should("exist").should("be.visible");
    });
  }
});

/**
 * Navigate to 'Dashboard' from 'Home' page
 * @param userDetails
 */
Cypress.Commands.add("navigateToDashboard", (userDetails) => {
  cy.log("Going to navigateToDashboard()");
  homeLocators
    .dashboardButtonOnTopBar()
    .should("exist")
    .should("be.visible")
    .click();
  dashboardLocators
    .dashboardHeader()
    .should("exist")
    .should("be.visible")
    .contains(
      "Welcome " + userDetails.userFirstName + " " + userDetails.userLastName
    );
});

/**
 * Method to very the 'Password Reset' modal window appearance
 */
Cypress.Commands.add("verifyPasswordResetWindowAppearance", () => {
  cy.log("Going to verifyPasswordResetWindowAppearance()");
  cy.getChakraButtonByText("Forgot your password?").click({ force: true });
  cy.verifyShowpassLogoAppearance();
  cy.getH1HeaderByText("Password Reset");
  cy.get('div[class^="css"]')
    .contains(
      "Forgot your password? No worries! We'll send you a link to reset it, just enter your email below."
    )
    .should("exist")
    .should("be.visible");
  cy.getChakraFormLabelByIndexAndText(0, "Email Address");
  cy.getChakraInputFieldByAttr("name", "email");
  cy.getChakraButtonByText("Send Reset Link");
});
/**
 * Method to enter event name into the search field
 * @param eventName
 */
Cypress.Commands.add("enterEventNameIntoSearchField", (eventName) => {
  cy.log("Going to enterEventNameIntoSearchField()");
  homeLocators.searchEventsInputField().should("not.be.disabled");
  const apiRequest = "/api/public/events/search-upcoming-events/*";
  cy.intercept(apiRequest).as("pageLoaded");
  // The for loop is absolutely needed
  // Not always the search criteria gets entered properly from the first time
  for (let i = 1; i < 3; i++) {
    homeLocators
      .searchEventsInputField()
      .clear({ force: true })
      .type(eventName, { force: true });
  }
  cy.wait("@pageLoaded")
    .its("response.statusCode")
    .should("be.oneOf", [200, 204]);
});
/**
 * Method to search for an event by event name
 * @param eventName
 */
Cypress.Commands.add("searchForAnEventByName", (eventName) => {
  cy.log("Going to searchForAnEventByName()");
  cy.enterEventNameIntoSearchField(eventName);
  homeLocators.searchButton().click({ force: true });
});
/**
 * Method to select a search item by item name
 * @param itemName
 */
Cypress.Commands.add("selectSearchItemByItemName", (itemName) => {
  cy.log("Going to searchForAnEventByName()");
  homeLocators
    .searchResultItemByName(itemName)
    .scrollIntoView()
    .click({ force: true });
});
/**
 * Get 'Search results' modal window
 */
Cypress.Commands.add("getSearchResultModalWindow", () => {
  cy.log("Going to getSearchResultModalWindow()");
  homeLocators
    .searchResultModalWindow()
    .should("exist")
    .should("be.visible")
    .should("not.be.disabled");
});
