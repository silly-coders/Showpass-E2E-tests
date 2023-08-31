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
      cy.get(
        'button[class^="chakra-button"][aria-label="Delete membership level"]'
      )
        .scrollIntoView({ force: true })
        .click({ force: true });
      // Confirm deletion on the 'Delete Membership Group' confirmation
      cy.getChakraModalWindow();
      cy.get('header[id^="chakra-modal--header"]').should(
        "contain.text",
        "Delete Membership Group"
      );
      cy.getChakraButtonByText("Delete").click({ force: true });
    }
  });
  // Ensure the following text shows up: 'You have not created any membership groups'
  cy.get('div[class^="css"] > span[class^="css"]').should(
    "contain.text",
    "You have not created any membership groups"
  );
});
/**
 * Populate the 'Membership Group Info' form
 */
Cypress.Commands.add(
  "populateMembershipGroupInfoForm",
  (uniqueMembershipName, groupDetails) => {
    cy.log("Going to populateMembershipGroupInfoForm()");
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
    // Populate 'Expiry Datw & Time' September 18, 2030
    cy.get('input[id="single_date_picker"]').type(groupDetails.expiryDate, {
      force: true,
    });
    // Populate 'Membership Description'
    cy.getPreContainerEditor().type(groupDetails.membershipDescription);
    cy.clickChakraButtonByText("Create Group");
    cy.verifyTopRightSuccessMessage("Draft saved successfully");
    cy.clickButtonXtoCloseMessage();
    // Navigate to drafts
    cy.visit("/manage/memberships/?status=sp_membership_group_draft");
    cy.get('g[id="Edit"]').eq(0).click({ force: true });
    cy.get('button[type="submit"]').eq(1).contains("Save").click();
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
      .contains(uniqueMembershipName)
      .should("exist")
      .should("be.visible");
  }
);
/**
 * Populate the 'Add new Membership Level' form
 */
Cypress.Commands.add(
  "populateNewMembershipLevelForm",
  (uniqueMembershipName, membershipLevel) => {
    cy.log("Going to populateNewMembershipLevelForm()");
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
  }
);
/**
 * Populate the 'Create Benefit - Event Scan Access' form
 */
Cypress.Commands.add(
  "populateBenefitEventScanAccessForm",
  (membershipBenefitDetails) => {
    cy.log("Going to populateBenefitEventScanAccessForm()");
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
/**
 * Populate the 'Create Benefit - Daily Scan Access' form
 */
Cypress.Commands.add(
  "populateBenefitDailyScanAccessForm",
  (membershipBenefitDetails) => {
    cy.log("Going to populateBenefitDailyScanAccessForm()");
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
    // Verify and close the 'Success' message
    cy.verifyTopRightSuccessMessage("Success");
    cy.clickButtonXtoCloseMessage();
  }
);
/**
 * Populate the 'Create Benefit - Event Scan Access' form
 */
Cypress.Commands.add(
  "populateBenefitDiscountForm",
  (membershipBenefitDetails) => {
    cy.log("Going to populateBenefitDiscountForm()");
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
  }
);
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
