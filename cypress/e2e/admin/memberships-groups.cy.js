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

  it("creating a new valid group and deleting it-TA-61", function () {
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
    cy.populateMembershipGroupInfoForm(this.testdata.testGroup1);
    // Delete just created group
    cy.deleteAllMembershipsGroupsIfTheyExist();
    // Navigate to the 'Draft' section
    cy.getChakraTabButton("Draft").click();
    // Remove group drafts if any
    cy.deleteAllMembershipsGroupsIfTheyExist();
  });
});
