describe("Verify 'Memberships' page features by ", function () {
  beforeEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
    });
  });
  // ***************************************************************************
  it("creating a new valid group and deleting it-TA-61", function () {
    // Generate a unique name
    var uniqueMembershipName = "Test-group-" + Math.floor(Date.now() / 1000);
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
    // Delete just created group
    cy.deleteAllMembershipsGroupsIfTheyExist();
    // Navigate to the 'Draft' section
    cy.getChakraTabButton("Draft").click();
    // Remove group drafts if any
    cy.deleteAllMembershipsGroupsIfTheyExist();
  });
  // ***************************************************************************
  it("verifying a newly created group on the front end-TA-62", function () {
    // Generate a unique name
    var uniqueMembershipName = "Test-group-" + Math.floor(Date.now() / 1000);
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
    cy.populateMembershipGroupInfoForm(uniqueMembershipName, this.testdata.testGroup1);
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
    .should('exist').should('be.visible')
    .should('have.text', this.testdata.testGroup1.membershipDescription);
    // Click 'BUY PASSES'
    cy.clickChakraButtonByText('BUY PASSES');
    // Ensure a modal window shows up
    cy.getChakraModalWindow();
    // Ensure the message 'No membership levels found' shows up
    cy.getH2ChakraTextByText('No membership levels found.');
  });
  // ***************************************************************************
});
