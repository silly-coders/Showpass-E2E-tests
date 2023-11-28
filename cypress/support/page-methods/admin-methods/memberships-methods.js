/**
 * Delete all existing groups on the 'Memberships' page
 */
Cypress.Commands.add("deleteAllMembershipsGroupsIfTheyExist", () => {
  cy.log("Going to deleteAllMembershipsGroupsIfTheyExist()");
  cy.wait(500);
  cy.get("body").then(($body) => {
    if (
      $body.find(
        'button[class^="chakra-button"][aria-label="Delete membership level"]'
      ).length
    ) {
      // Count all 'Delete group' buttons
      cy.get('div[class^="chakra-button__group"]')
        .find(
          'button[class^="chakra-button"][aria-label="Delete membership level"]'
        )
        .then((value) => {
          let totalCount = Cypress.$(value).length;
          cy.log(`Found in total ${totalCount} "Delete group" buttons.`);
          for (let i = 0; i < totalCount; i++) {
            cy.log('Going to delete group #: ' + i+1);
            cy.get(
              'button[class^="chakra-button"][aria-label="Delete membership level"]'
            )
              .last()
              .scrollIntoView({ force: true })
              .click({ force: true });
            cy.wait(500);
            // Confirm deletion on the 'Delete Membership Group' confirmation
            cy.log('Confirm deletion on the "Delete Membership Group" confirmation dialog box');
            cy.getChakraModalWindow();
            // Verify modal header text: "Delete Membership Group"
            cy.get('header[id^="chakra-modal--header"]').should(
              "contain.text",
              "Delete Membership Group"
            );
            cy.getChakraButtonByText("Delete").click({ force: true });
            cy.wait(900);
          }
        });
    }
  });
});
// *****************************************************************************
/**
 * Populate the 'Membership Group Info' form
 */
Cypress.Commands.add(
  "populateMembershipGroupInfoForm",
  (uniqueMembershipName, groupDetails) => {
    cy.log("Going to populateMembershipGroupInfoForm()");
    // Intercept API request
    const membershipGroupsApiRequest = "**/memberships/membership-groups/";
    cy.intercept(membershipGroupsApiRequest).as("membershipGroupLoaded");
    // Populate 'Membership Name'
    cy.getChakraInputFieldByAttr("id", "name").type(uniqueMembershipName);
    // Populate 'Renewal Frequency'
    cy.getButtonByAttribute("id", "renewal-freq-toggle-button").click({
      force: true,
    });
    cy.selectOptionByText(groupDetails.renewalFrequency);
    // Populate 'Visibility'
    cy.getButtonByAttribute("id", "visibility-toggle-button").click({
      force: true,
    });
    cy.selectOptionByText(groupDetails.visibility);
    // Populate 'Membership Label'
    cy.getButtonByAttribute("id", "verbiage-toggle-button").click({
      force: true,
    });
    cy.selectOptionByText(groupDetails.membershipLabel);
    // If Expire Date is provided select it
    if (groupDetails.expiryDate) {
      // Populate 'Expiry Datw & Time' September 18, 2030
      cy.get('input[id="single_date_picker"]').type(groupDetails.expiryDate, {
        force: true,
      });
    }
    // Populate 'Membership Description'
    cy.getPreContainerEditor().type(groupDetails.membershipDescription);
    cy.clickChakraButtonByText("Create Group");
    cy.verifyTopRightSuccessMessage("Draft saved successfully");
    cy.clickButtonXtoCloseMessage();
    // Navigate to drafts
    cy.visit("/manage/memberships/?status=sp_membership_group_draft");
    cy.get('g[id="Edit"]').eq(0).click({ force: true });
    cy.get('button[type="submit"]').eq(1).contains("Save").click();
    cy.wait(900);
    // Wait for the API response for /memberships/membership-groups/
    cy.wait("@membershipGroupLoaded")
      .its("response.statusCode")
      .should("be.oneOf", [201, 204]);
    cy.wait(700);
    // Verify success message
    cy.verifyTopRightSuccessMessage("Saved");
    cy.clickButtonXtoCloseMessage();
    // Navigate to public groups
    // Click 'Membership and select 'Membership Groups'
    cy.getChakraButtonLabelByText("Membership").click({ force: true });
    cy.getButtonByAttribute("href", "/manage/memberships/").click({
      force: true,
    });
    // Make sure just created group shows up
    cy.get(`a[class^="chakra-link"][href^="/m/test-group"]`)
      .last()
      .contains(uniqueMembershipName)
      .should("exist")
      .should("be.visible");
  }
);
// *****************************************************************************
/**
 * Populate the 'Add new Membership Level' form
 */
Cypress.Commands.add(
  "populateNewMembershipLevelForm",
  (uniqueMembershipName, membershipLevel) => {
    cy.log("Going to populateNewMembershipLevelForm()");
    // Wait for the modal window
    cy.get('header[id^="chakra-modal--header"]')
      .contains("Add new Membership Level")
      .should("be.visible");
    // Populate 'Name'
    cy.getChakraInputFieldByAttr("id", "name").type(
      `${uniqueMembershipName}-level`
    );
    // Populate 'Description'
    cy.getPreContainerEditor().type(membershipLevel.description);
    // Populate 'Price (CAD)'
    cy.getChakraInputFieldByAttr("id", "price").type(membershipLevel.price);
    // Populate 'Inventory'
    cy.getChakraInputFieldByAttr("id", "inventory").type(
      membershipLevel.inventory
    );
    // Select 'Visibilty'
    cy.getButtonByAttribute("id", "visibility-toggle-button").click({
      force: true,
    });
    cy.selectOptionByText(membershipLevel.visibility);
    // Populate 'Purchase Limit'
    cy.getChakraInputFieldByAttr("id", "purchase-limit").type(
      membershipLevel.purchaseLimit
    );
    // Click 'Save'
    cy.getChakraButtonByAttribute("form", "membership-level-form")
      .should("be.visible")
      .click({ force: true });
    cy.wait(1500);
  }
);
// *****************************************************************************
/**
 * Populate the 'Create Benefit - Event Scan Access' form
 */
Cypress.Commands.add(
  "populateBenefitEventScanAccessForm",
  (membershipBenefitDetails) => {
    cy.log("Going to populateBenefitEventScanAccessForm()");
    cy.wait(500);
    // Click 'Benefit Type' and select the value
    cy.get('button[id="benefit-type-toggle-button"]')
      .should("be.visible")
      .click({ force: true });
    cy.selectOptionByText(membershipBenefitDetails.benefitType);
    // Input event name
    cy.getChakraInputFieldByAttr("placeholder", "Select an event").type(
      `${membershipBenefitDetails.event}{enter}`
    );
    cy.get('div[class^="css"] > p[class^="chakra-text"]')
      .contains(membershipBenefitDetails.event)
      .click({ force: true });
    // Ensure the 'Ticket Type' drop-down is not disabled
    cy.get('button[id="ticket-type-toggle-button"]').as("ticketTypeDropDown");
    cy.wait(800);
    cy.get("@ticketTypeDropDown")
      .should("not.be.disabled")
      .click({ force: true });
    cy.selectOptionByText(membershipBenefitDetails.ticketType);
    // Input 'Scan Limit'
    cy.get('input[id="scan-limit"]')
      .should("be.visible")
      .type(membershipBenefitDetails.scanLimit);
    // Click 'Save'
    cy.get('button[form="membership-benefit-form"]')
      .contains("Save")
      .click({ force: true });
    // Verify and close the 'Success' message
    cy.verifyTopRightSuccessMessage("Success");
    cy.clickButtonXtoCloseMessage();
    cy.wait(500);
    // Ensure the modal window disappeared
    cy.get('button[id="benefit-type-toggle-button"]').should("not.exist");
  }
);
/**
 * Verify the 'Event Scan Access' benefit type values show up in the table grid
 */
Cypress.Commands.add(
  "verifyEventScanAccessValuesShowUpInGrid",
  (membershipBenefitDetails) => {
    cy.wait(500);
    const gridcellValues = [
      membershipBenefitDetails.benefitType,
      membershipBenefitDetails.scanLimit,
      membershipBenefitDetails.event,
      membershipBenefitDetails.ticketType,
    ];
    for (let i = 0; i < gridcellValues.length; i++) {
      cy.log("Verifying the following label text: " + gridcellValues.at(i));
      cy.getBenefitsGridcellLabelByText(i, gridcellValues.at(i));
    }
  }
);
// *****************************************************************************
/**
 * Populate the 'Create Benefit - Daily Scan Access' form
 */
Cypress.Commands.add(
  "populateBenefitDailyScanAccessForm",
  (membershipBenefitDetails) => {
    cy.log("Going to populateBenefitDailyScanAccessForm()");
    cy.wait(500);
    // Click 'Benefit Type' and select the value
    cy.get('button[id="benefit-type-toggle-button"]')
      .should("be.visible")
      .click({ force: true });
    cy.selectOptionByText(membershipBenefitDetails.benefitType);
    // Input 'Scan Limit Per Day'
    cy.get('input[name="scans_allowed"]')
      .should("be.visible")
      .type(membershipBenefitDetails.scanLimitPerDay);
    // Click 'Save'
    cy.get('button[form="membership-benefit-form"]')
      .contains("Save")
      .click({ force: true });
    cy.wait(900);
    // Verify and close the 'Success' message
    cy.verifyTopRightSuccessMessage("Success");
    cy.clickButtonXtoCloseMessage();
    cy.wait(500);
    // Ensure the modal window disappeared
    cy.get('button[id="benefit-type-toggle-button"]').should("not.exist");
  }
);
// *****************************************************************************
/**
 * Populate the 'Create Benefit - Event Scan Access' form
 */
Cypress.Commands.add(
  "populateBenefitDiscountForm",
  (membershipBenefitDetails) => {
    cy.log("Going to populateBenefitDiscountForm()");
    cy.wait(500);
    // Click 'Benefit Type' and select the value
    cy.get('button[id="benefit-type-toggle-button"]')
      .should("be.visible")
      .click({ force: true });
    cy.selectOptionByText(membershipBenefitDetails.benefitType);
    let discountCode =
      `${membershipBenefitDetails.discountCode}` +
      Math.floor(Date.now() / 1000);
    cy.getChakraInputFieldByAttr("placeholder", "Discount Code").type(
      discountCode
    );
    // Click the '%' radio button to select 'Discount Unit'
    cy.get('#discount-unit > :nth-child(1) > div[class^="css"]').click({
      force: true,
    });
    // Input 'Discount Percent'
    cy.getChakraInputFieldByAttr("id", "discount-amount").type(
      membershipBenefitDetails.discountPercent
    );
    // Input 'Total Limit'
    cy.getChakraInputFieldByAttr("id", "discount-limit").type(
      membershipBenefitDetails.totalLimit
    );
    // Input 'Per Member Limit'
    cy.getChakraInputFieldByAttr("id", "discount-uses-allowed").type(
      membershipBenefitDetails.perMemberLimit
    );
    // Click the 'Single Event' radio button
    cy.get('#discount-event-type > :nth-child(1) > div[class^="css"]').click({
      force: true,
    });
    // Search Event
    cy.getChakraInputFieldByAttr("placeholder", "Select an event").type(
      `${membershipBenefitDetails.event}{enter}`
    );
    cy.get('div[class^="css"] > p[class^="chakra-text"]')
      .contains(membershipBenefitDetails.event)
      .click({ force: true });
    // Click 'Save'
    cy.get('button[form="membership-benefit-form"]')
      .contains("Save")
      .click({ force: true });
    // Verify and close the 'Success' message
    cy.verifyTopRightSuccessMessage("Success");
    cy.clickButtonXtoCloseMessage();
    cy.wait(500);
    // Ensure the modal window disappeared
    cy.get('button[id="benefit-type-toggle-button"]').should("not.exist");
  }
);
// *****************************************************************************
/**
 * Get a Membership Benefit gridcell-text
 * @param itemText
 * @param gridcellIndex
 */
Cypress.Commands.add(
  "getBenefitsGridcellLabelByText",
  (gridcellIndex, itemText) => {
    cy.log(
      `Going to getBenefitsGridcellLabelByText().eq(${gridcellIndex}).contains(${itemText})`
    );
    return cy
      .get('td[role="gridcell"]')
      .eq(gridcellIndex)
      .contains(itemText)
      .should("exist")
      .should("be.visible");
  }
);
// *****************************************************************************
/**
 * Method to add membership levels to the cart
 * @param totalTicketTypes (total number of ticket types)
 * @param numberOfTicketsForEach (how many tickets to add from each type)
 */
Cypress.Commands.add(
  "addMembershipLevelsToCart",
  (totalTicketTypes, numberOfTicketsForEach) => {
    cy.log("Going to addMembershipLevelsToCart()");
    for (let j = 1; j <= numberOfTicketsForEach; j++) {
      for (let i = 0; i < totalTicketTypes*2; i+=2) {
        cy.wait(500);
        cy.getChakraSpinnerLoadingIndicator().should("not.exist");
        cy.get('button[class^="chakra-button"][aria-label="Add item"]')
          .eq(i)
          .as("btn")
          .get("@btn")
          .should("exist")
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });
        cy.get('button[class^="chakra-button"][aria-label="Remove item"]')
          .eq(i)
          .should("exist")
          .scrollIntoView()
          .should("be.visible");
        cy.wait(500);
      }
      cy.get("@btn").should("exist").scrollIntoView();
    }
    cy.wait(900);
  }
);
// *****************************************************************************
/**
 * Method to remove membership levels from the cart
 * @param totalTicketTypes (total number of ticket types)
 * @param numberOfTicketsForEach (how many tickets to add from each type)
 */
Cypress.Commands.add(
  "removeMembershipLevelsFromCart",
  (totalTicketTypes, numberOfTicketsForEach) => {
    cy.log("Going to removeMembershipLevelsFromCart()");
    for (let j = 1; j <= numberOfTicketsForEach; j++) {
      for (let i = 0; i < totalTicketTypes; i++) {
        cy.wait(500);
        cy.getChakraSpinnerLoadingIndicator().should("not.exist");
        cy.get('button[class^="chakra-button"][aria-label="Remove item"]')
          .eq(i)
          .as("btn")
          .get("@btn")
          .should("exist")
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });
        // Button 'Add item' should be visible and active
        cy.get('button[class^="chakra-button"][aria-label="Add item"]')
          .eq(i)
          .should("exist")
          .scrollIntoView()
          .should("be.visible");
        cy.wait(500);
      }
      // Button 'Remove item' should be disabled at the end of test
      cy.get("@btn").should("exist").scrollIntoView().should("be.disabled");
    }
  }
);
// *****************************************************************************
/**
 * Method to delete existing and create a new membership group
 * @param uniqueMembershipName
 * @param testGroupDetails
 */
Cypress.Commands.add(
  "deleteOldAndCreateNewMembershipGroup",
  (uniqueMembershipName, testGroupDetails) => {
  cy.log("Going to deleteOldAndCreateNewMembershipGroup()");  
  // Navigate to the React version of the 'Memberships' page
  cy.visit("/manage/memberships");
  // Delete all existing published public groups
  cy.deleteAllMembershipsGroupsIfTheyExist();
  // Delete all membership drafts as well
  cy.visit("/manage/memberships/?status=sp_membership_group_draft");
  cy.deleteAllMembershipsGroupsIfTheyExist();
  // Click the 'Membership' menu item on the left hand menu
  cy.getChakraButtonLabelByText("Membership").click({ force: true });
  // Select 'Create Group'
  cy.getButtonByAttribute("href", "/manage/memberships/create/").click({
    force: true,
  });
  cy.url().should("include", `/manage/memberships/create/`);
  // Populate the 'Membership Group Info' form
  cy.populateMembershipGroupInfoForm(
    uniqueMembershipName,
    testGroupDetails
  );
  });  
  // *****************************************************************************