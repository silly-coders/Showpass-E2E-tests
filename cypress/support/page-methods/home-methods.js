import { HomeLocators } from "../element-locators/home-locators";
import { LoginLocators } from "../element-locators/login-locators";
import { DashboardLocators } from "../element-locators/dashboard-locators";
const homeLocators = new HomeLocators();
const loginLocators = new LoginLocators();
const dashboardLocators = new DashboardLocators();
// **************************************************************************
/**
 * Method to navigate to the 'Home' page
 */
Cypress.Commands.add("navigateToHomePage", () => {
  cy.log("Going to navigateToHomePage()");
  const baseUrl = Cypress.config("baseUrl");
  cy.visit("/");
  cy.url().should("contain", baseUrl);
  cy.wait(300);
});
// **************************************************************************
/**
 * Method to click 'Log In' button on the 'Home' page
 */
Cypress.Commands.add("clickLoginOnHomePage", () => {
  cy.log("Going to clickLoginOnHomePage()");
  homeLocators
    .loginButton()
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .click({ force: true });
  loginLocators
    .emailAddressInputField()
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible");
});
// **************************************************************************
/**
 * Method to click 'Create Account' button on the 'Home' page
 */
Cypress.Commands.add("clickCreateAccountOnHomePage", () => {
  cy.log("Going to clickCreateAccountOnHomePage()");
  homeLocators
    .createAccountButton()
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible")
    .click({ force: true })
    .wait(500);
});
// **************************************************************************
/**
 * Method to select 'Profile' within the drop-down list on the 'Home' page
 */
Cypress.Commands.add("selectOrdersDropDownItem", () => {
  cy.log("Going to selectOrdersDropDownItem()");
  cy.getDropDownItem("Orders")
    .should("exist")
    .should("be.visible")
    .click({ force: true });
});
// **************************************************************************
/**
 * Method to select 'Orders' within the drop-down list on the 'Home' page
 */
Cypress.Commands.add("selectProfileDropDownItem", () => {
  cy.log("Going to selectProfileDropDownItem()");
  cy.getDropDownItem("Profile").should("be.visible").click();
});
// **************************************************************************
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
// **************************************************************************
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
// **************************************************************************
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
// **************************************************************************
/**
 * Method to very the 'Home' page 'Connect With Us' column elements appearance
 */
Cypress.Commands.add("connectWithUsColumnAppearance", () => {
  cy.log("Going to connectWithUsColumnAppearance()");
  homeLocators.connectWithUsHeader().should("exist");
  homeLocators
    .angelListLink()
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible");
  homeLocators
    .careersLink()
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible");
  homeLocators
    .blogLink()
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible");
});
// **************************************************************************
/**
 * Method to very the 'Home' page 'About Showpass' column elements appearance
 */
Cypress.Commands.add("aboutShowpassColumnAppearance", () => {
  cy.log("Going to aboutShowpassColumnAppearance()");
  homeLocators.aboutShowpassHeader().should("exist");
  homeLocators
    .registerOrganizationLink()
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible");
  homeLocators
    .aboutUsLink()
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible");
  homeLocators
    .pricingLink()
    .should("exist")
    .scrollIntoView({ force: true })
    .should("be.visible");
});
// **************************************************************************
/**
 * Method to very the 'Subscribe to Showpass' section on the 'Home' page
 */
Cypress.Commands.add("subscribeToShowpassSectionAppearance", () => {
  cy.log("Going to subscribeToShowpassSectionAppearance()");
  homeLocators.subscribeToShowpassText().should("exist").should("be.visible");
  homeLocators.enterYourEmailInputField().should("exist").should("be.visible");
  homeLocators.subscribeButton().should("exist").should("be.visible");
});
// **************************************************************************
/**
 * Click username after logging in
 */
Cypress.Commands.add("clickUsernameOnTopBar", () => {
  cy.log("Going to clickUsernameOnTopBar()");
  loginLocators
    .userFirstAndLastNames()
    .should("exist")
    .should("be.visible")
    .click({ force: true });
});
// **************************************************************************
/**
 * Verify that drop-down menu items under user's First and Last names exist
 * @param topRightHandDropDownList
 */
Cypress.Commands.add("verifyDropDownItemExists", (topRightHandDropDownList) => {
  cy.log("Going to verifyDropDownItemExists()");

  // Verify that the menu item text matches the expected value in the 'topRightHandDropDownList' object
  for (let i = 0; i < Object.keys(topRightHandDropDownList).length; i++) {
    cy.log(
      "Key: " +
        Object.keys(topRightHandDropDownList).at(i) +
        ", Value: " +
        Object.values(topRightHandDropDownList).at(i)
    );
    cy.getDropDownItem(Object.values(topRightHandDropDownList).at(i));
  }
  /* 
// Less efficient way to loop through the object values is below
  // Loop through all items within the dataObject.topRightHandDropDownList JSON to verify menu items
  for (const key in topRightHandDropDownList) {
    Object.entries(topRightHandDropDownList).forEach((entry) => {
      const [key, value] = entry;
      cy.getDropDownItem(value).should("exist").should("be.visible");
    });
  }
  */
});
// **************************************************************************
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
// **************************************************************************
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
// **************************************************************************
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
    homeLocators.searchEventsInputField().click({ force: true }).wait(500);
    homeLocators
      .searchEventsInputField()
      .clear({ force: true })
      .type(eventName, { force: true });
  }
  cy.wait("@pageLoaded")
    .its("response.statusCode")
    .should("be.oneOf", [200, 204]);
});
// **************************************************************************
/**
 * Method to search for an event by event name
 * @param eventName
 */
Cypress.Commands.add("searchForAnEventByName", (eventName) => {
  cy.log("Going to searchForAnEventByName()");
  cy.enterEventNameIntoSearchField(eventName);
  homeLocators.searchButton().click({ force: true });
});
// **************************************************************************
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
// **************************************************************************
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
// **************************************************************************
/**
 * Verify the 'Request a demo' form
 */
Cypress.Commands.add("verifyRequestDemoForm", () => {
  cy.log("Going to verifyRequestDemoForm()");
  // Ensure the 'Request a Demo' header shows up
  cy.get('div[class^="request-demo-form-container"] > h1[class^="h2"]')
    .should("exist")
    .should("be.visible")
    .should("have.text", "Request a Demo");
  // Verify a statement under page header
  cy.get('div[class^="request-demo-form-container"] > div[class^="subtitle"]')
    .contains(
      "Our team is happy to answer your questions. Fill out the form and we’ll be in touch as soon as possible."
    )
    .should("exist")
    .should("be.visible");
  // Verify all input fields and labels above them
  let labels = [
    "First Name",
    "Last Name",
    "Email Address",
    "Phone Number",
    "Company",
  ];
  let inputFieldDataName = [
    "First Name",
    "Last Name",
    "Email Address",
    "Phone Number",
    "Company Name",
  ];
  for (let i = 0; i < labels.length; i++) {
    cy.log(`Verifying the following label: ${labels.at(i)}`);
    cy.log(`Verifying the following input field: ${inputFieldDataName.at(i)}`);
    // Verify labels
    cy.get(`label[class="form-text-title"]`)
      .eq(i)
      .should("exist")
      .should("be.visible")
      .should("have.text", labels.at(i));
    // Verify input fields
    cy.get(`input[placeholder="${inputFieldDataName.at(i)}"]`)
      .should("exist")
      .should("be.visible");
  }
  // Verify 'Submit' button
  cy.get('input[type="submit"][value="Submit"]')
    .should("exist")
    .should("be.visible");
});
// **************************************************************************
/**
 * Verify the 'Contact Details' modal window
 * @param organizationDetails
 */
Cypress.Commands.add(
  "verifyContactDetailsModalWindow",
  (organizationDetails) => {
    cy.log("Going to verifyContactDetailsModalWindow()");
    // Wait for the 'Contact Details' modal window
    cy.get('header[id="chakra-modal--header-3"] > div > div')
      .should("exist")
      .should("contain.text", "Contact Details");
    // Verify organization name
    cy.get(`a[class^="chakra-link"][href='/o/${organizationDetails.href}/']`)
      .should("exist")
      .should("contain.text", organizationDetails.venue);
    // Verify Refund Policy label
    cy.get('div[id^="chakra-modal--body"]')
      .find('div[class^="css"] > p')
      .eq(1)
      .should("contain.text", "Refund Policy");
    // Verify Refund Policy value
    cy.get('div[id^="chakra-modal--body"]')
      .find('div[class^="css"] > p')
      .eq(2)
      .should("contain.text", organizationDetails.refundPolicy);
    // Verify Message Us label
    cy.get('div[class^="chakra-stack"] > p')
      .should("exist")
      .should("contain.text", "Message Us");
    // Verify field labels
    let fieldLabelsForAttr = [
      "name",
      "email",
      "event_name",
      "message",
      "subject",
    ];
    let fieldName = [
      "Name",
      "Email",
      "Event Name",
      "Message",
      "Reason for Contact",
    ];
    for (let i = 0; i < fieldLabelsForAttr.length; i++) {
      cy.log(`Going to verify the following label: ${fieldName.at(i)}`);
      cy.get(`label[for="${fieldLabelsForAttr.at(i)}"]`)
        .should("exist")
        .should("contain.text", fieldName.at(i));
    }
    // Verify input fields
    let inputFields = ["name", "email", "event_name"];
    for (let i = 0; i < inputFields.length; i++) {
      cy.log(`Going to verify the following field name: ${inputFields.at(i)}`);
      cy.get(`input[name="${inputFields.at(i)}"]`)
        .should("exist")
        .scrollIntoView({ force: true })
        .should("be.visible");
    }
    // Verify the 'Message' text area
    cy.get(`textarea[name="message"]`)
      .should("exist")
      .scrollIntoView({ force: true })
      .should("be.visible");
    // Verify the 'Reason for Contact' drop-down
    cy.get(`button[id="subject-toggle-button"]`)
      .should("exist")
      .scrollIntoView({ force: true })
      .should("be.visible");
    // Verify the 'reCAPTCHA' section
    cy.get('iframe[title="reCAPTCHA"]')
      .should("exist")
      .scrollIntoView({ force: true })
      .should("be.visible");
    // Verify the disabled 'Send' button
    cy.get('button[type="submit"] > p')
      .should("exist")
      .should("have.text", "Send")
      .should("not.be.enabled");
  }
);
// **************************************************************************
