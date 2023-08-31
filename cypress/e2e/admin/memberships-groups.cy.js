describe("Verify 'Memberships' page features by ", function () {
  beforeEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
    // Generate a unique name
    let uniqueMembershipName = "Test-group-" + Math.floor(Date.now() / 1000);
    // Store the uniqueMembershipName value in the Cypress.env() object
    Cypress.env("uniqueMembershipName", uniqueMembershipName);
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      // Navigate to the React version of the 'Memberships' page
      cy.visit("/manage/memberships");
      // Delete all existing public groups
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
        this.testdata.testGroup1
      );
    });
  });

  // ***************************************************************************
  it("creating a new valid group and deleting it-TA-61", function () {
    // Retrieve the uniqueMembershipName value from the Cypress.env() object
    let uniqueMembershipName = Cypress.env("uniqueMembershipName");
    // *** Open and verify just created group ***
    // Click the 'Edit group' button
    cy.getChakraButtonByAttribute("aria-label", "Edit membership level")
      .eq(1)
      .click({ force: true });
    // Verify unique group name
    cy.get('input[id="name"]').should("have.value", uniqueMembershipName);
    // Verify 'Renewal Frequency'
    cy.get('button[id="renewal-freq-toggle-button"] > div')
      .should("be.visible")
      .should("have.text", this.testdata.testGroup1.renewalFrequency);
    // Verify 'Visibility'
    cy.get('button[id="visibility-toggle-button"] > div')
      .should("be.visible")
      .should("have.text", this.testdata.testGroup1.visibility);
    // Verify 'Membership Label'
    cy.get('button[id="verbiage-toggle-button"] > div')
      .should("be.visible")
      .should("have.text", this.testdata.testGroup1.membershipLabel);
    // Verify "Expiry Date & Time"
    cy.get('input[id="single_date_picker"]')
      .should("be.visible")
      .should("have.value", this.testdata.testGroup1.expiryDate);
    // Verify 'Membership Description'
    cy.get('div[class="ql-editor"] > p')
      .should("be.visible")
      .should("have.text", this.testdata.testGroup1.membershipDescription);
    // Click 'Save'
    cy.getChakraButtonByText("Cancel").click({ force: true });
    // Delete just created group
    cy.deleteAllMembershipsGroupsIfTheyExist();
    // Navigate to the 'Draft' section
    cy.getChakraTabButtonByText("Draft").click();
    // Remove group drafts if any
    cy.deleteAllMembershipsGroupsIfTheyExist();
  });
  // ***************************************************************************
  it("verifying a newly created group on the front end-TA-62", function () {
    // Retrieve the uniqueMembershipName value from the Cypress.env() object
    let uniqueMembershipName = Cypress.env("uniqueMembershipName");
    // Click the group name to view its front-end page and be able to purchased membership
    cy.getChakraLinkButtonByAttr("target", "_parent")
      .contains(uniqueMembershipName)
      .should("be.visible")
      .click();
    // Verify that URL contains the group name
    cy.url().should("include", uniqueMembershipName.toLowerCase());
    // Verify group name in the header
    cy.getChakraSkeletonH1HeaderByText(uniqueMembershipName);
    // Verify group description
    cy.get('div[data-testid="card"] > div > p')
      .should("exist")
      .should("be.visible")
      .should("have.text", this.testdata.testGroup1.membershipDescription);
    // Click 'BUY PASSES'
    cy.clickChakraButtonByText("BUY PASSES");
    // Ensure a modal window shows up
    cy.getChakraModalWindow();
    // Ensure the message 'No membership levels found' shows up
    cy.getH2ChakraTextByText("No membership levels found.");
  });
  // ***************************************************************************
  it("verifying that a membership level can be added to a newly created group-TA-64", function () {
    // Retrieve the uniqueMembershipName value from the Cypress.env() object
    let uniqueMembershipName = Cypress.env("uniqueMembershipName");
    // Click the 'Edit group' button
    cy.getChakraButtonByAttribute("aria-label", "Edit membership level")
      .eq(1)
      .click({ force: true });
    // Click the 'Membership Levels' tab
    cy.getChakraTabButtonByText("Membership Levels").click({ force: true });
    // Wait for the 'New Level' button appearance
    cy.getChakraButtonByText("New Level").as("newLevelButton");
    cy.get("@newLevelButton").click({ force: true });
    // Populate the 'Add new Membership Level' form
    cy.populateNewMembershipLevelForm(
      uniqueMembershipName,
      this.testdata.membershipLevel1
    );
    // *** Open and verify jsut created membership level ***
    cy.getChakraTabButtonByText("Membership Levels").click({ force: true });
    cy.wait(500);
    const gridcellValues = [
      `${uniqueMembershipName}-level`,
      "0",
      `$${this.testdata.membershipLevel1.price}`,
      this.testdata.membershipLevel1.inventory,
      this.testdata.membershipLevel1.visibility,
    ];
    for (let i = 0; i < gridcellValues.length; i++) {
      cy.log("Verifying the following label text: " + gridcellValues.at(i));
      cy.getGridcellLabelByText(i, gridcellValues.at(i));
    }
  });
  // ***************************************************************************
  it("verifying that a membership benefit can be added to a newly created group-TA-65", function () {
    // Retrieve the uniqueMembershipName value from the Cypress.env() object
    let uniqueMembershipName = Cypress.env("uniqueMembershipName");
    // Click the 'Edit group' button
    cy.getChakraButtonByAttribute("aria-label", "Edit membership level")
      .eq(1)
      .click({ force: true });
    // Click the 'Add Benefit' button
    cy.getChakraButtonByText("Add Benefit").click({ force: true });
    // Populate 'Event Scan Access' benefit type
    cy.populateBenefitEventScanAccessForm(
      this.testdata.membershipEventScanAccessBenefit
    );
    // Verify that values show up in the grid
    cy.verifyEventScanAccessValuesShowUpInGrid(
      this.testdata.membershipEventScanAccessBenefit
    );
    // Click the 'Add Benefit' button
    cy.getChakraButtonByText("Add Benefit").click({ force: true });
    // Populate 'Daily Scan Access' benefit type
    cy.populateBenefitDailyScanAccessForm(
      this.testdata.membershipDailyScanAccessBenefit
    );
    // Click the 'Add Benefit' button
    cy.getChakraButtonByText("Add Benefit").click({ force: true });
    // Populate 'Discount' benefit type
    cy.populateBenefitDiscountForm(this.testdata.membershipDiscountBenefit);
    // Click 'Save' to save just added benefits
    cy.get('button[type="submit"]').eq(1).contains("Save").click();
    // Verify and close the 'Success' message
    cy.verifyTopRightSuccessMessage("Success");
    cy.clickButtonXtoCloseMessage();
  });
});
