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
Cypress.Commands.add("populateMembershipGroupInfoForm", (groupDetails) => {
  cy.log("Going to populateMembershipGroupInfoForm()");
  // Populate 'Membership Name'
  var uniqueMembershipName = "Test-group-" + Math.floor(Date.now() / 1000);
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
});
