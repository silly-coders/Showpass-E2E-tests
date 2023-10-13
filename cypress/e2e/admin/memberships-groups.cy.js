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
    });
  });

  // ***************************************************************************
  it(
    "creating a new valid group and deleting it-TA-61",
    { tags: ["e2e", "membership-group", "smoke"] },
    function () {
      // Retrieve the uniqueMembershipName value from the Cypress.env() object
      let uniqueMembershipName = Cypress.env("uniqueMembershipName");
       // Populate the 'Membership Group Info' form
       cy.populateMembershipGroupInfoForm(
        uniqueMembershipName,
        this.testdata.testGroup1
      );
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
      // Click 'Cancel'
      cy.getChakraButtonByText("Cancel").click({ force: true });
      // Delete just created group
      cy.deleteAllMembershipsGroupsIfTheyExist();
      // Navigate to the 'Draft' section
      cy.getChakraTabButtonByText("Draft").click();
      // Remove group drafts if any
      cy.deleteAllMembershipsGroupsIfTheyExist();
    }
  );
  // ***************************************************************************
  it(
    "confirming that a newly created group shows up on the front end-TA-62",
    { tags: ["e2e", "membership-group"] },
    function () {
      // Retrieve the uniqueMembershipName value from the Cypress.env() object
      let uniqueMembershipName = Cypress.env("uniqueMembershipName");
      // Populate the 'Membership Group Info' form
      cy.populateMembershipGroupInfoForm(
        uniqueMembershipName,
        this.testdata.testGroup1
      );
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
      cy.chakraParagraphButtonByText("BUY PASSES").click({ force: true });
      // Ensure a modal window shows up
      cy.log("Going to wait for a modal window to show up.");
      cy.getChakraModalWindow();
      // Ensure the message 'No membership levels found' shows up
      cy.getH2ChakraTextByText("No membership levels found.");
    }
  );
  // ***************************************************************************
  it(
    "ensuring that a membership level can be added to a newly created group-TA-64",
    { tags: ["e2e", "membership-group", "smoke"] },
    function () {
      // Retrieve the uniqueMembershipName value from the Cypress.env() object
      let uniqueMembershipName = Cypress.env("uniqueMembershipName");
      // Populate the 'Membership Group Info' form
      cy.populateMembershipGroupInfoForm(
        uniqueMembershipName,
        this.testdata.testGroup1
      );
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
      // *** Open and verify just created membership level ***
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
    }
  );
  // ***************************************************************************
  it(
    "checking that a membership benefit can be added to a newly created group-TA-65",
    { tags: ["e2e", "membership-group", "smoke"] },
    function () {
      // Retrieve the uniqueMembershipName value from the Cypress.env() object
      let uniqueMembershipName = Cypress.env("uniqueMembershipName");
      // Populate the 'Membership Group Info' form
      cy.populateMembershipGroupInfoForm(
        uniqueMembershipName,
        this.testdata.testGroup1
      );
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
    }
  );
  // ***************************************************************************
  it(
    "confirming that users can't buy more than a limited number of membership levels-TA-66",
    { tags: ["e2e", "membership-group", "smoke"] },
    function () {
      // Retrieve the uniqueMembershipName value from the Cypress.env() object
      let uniqueMembershipName = Cypress.env("uniqueMembershipName");
      // Populate the 'Membership Group Info' form
      cy.populateMembershipGroupInfoForm(
        uniqueMembershipName,
        this.testdata.testGroup1
      );
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
      // Wait for the modal window to disappear
      cy.get('header[id^="chakra-modal--header"]').should("not.exist");
      cy.getChakraButtonByText("Cancel").click({ force: true });
      // *** Open the membership group on the portal front-end ***
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
      cy.chakraParagraphButtonByText("BUY PASSES").click({ force: true });
      // Ensure a modal window shows up
      cy.getChakraModalWindow();
      // Add tickets to cart base on "purchaseLimit" (1 ticket type available)
      cy.addMembershipLevelsToCart(
        1,
        this.testdata.membershipLevel1.purchaseLimit
      );
      // Remove just added tickets from the cart
      cy.removeMembershipLevelsFromCart(
        1,
        this.testdata.membershipLevel1.purchaseLimit
      );
      // Close a chakra-modal window
      cy.closeModalWindowByClickingX();
    }
  );
  // ***************************************************************************
  it(
    "checking the 'Group Stats' page initial values-TA-67",
    { tags: ["e2e", "membership-group"] },
    function () {
      // Retrieve the uniqueMembershipName value from the Cypress.env() object
      let uniqueMembershipName = Cypress.env("uniqueMembershipName");
      // Populate the 'Membership Group Info' form
      cy.populateMembershipGroupInfoForm(
        uniqueMembershipName,
        this.testdata.testGroup1
      );
      // *** Open and verify just created group ***
      // Click the 'Edit group' button
      cy.get('button[class^="chakra-button"][href*="/group-stats/"]').click({
        force: true,
      });
      // Verify URL
      cy.url().should("include", "/group-stats/");
      // Ensure 'Group Stats' tab shows up
      cy.getChakraTabButtonByText("Group Stats");
      // Verify that there are 4 main green cards on the page (Gross Sales|Net Sales|Active Members|Upcoming Renewals)
      cy.get('div[class^="chakra-skeleton"]').should("have.length", 4);
      // Verify each green card header
      let cardHeader = [
        "Gross Sales",
        "Net Sales",
        "Active Members",
        "Upcoming Renewals this Month",
      ];
      for (let i = 0; i < cardHeader.length; i++) {
        cy.log(
          `Verifying the following green card header: ${cardHeader.at(i)}`
        );
        cy.get('div[class^="chakra-skeleton"] > div > p:nth-child(1)')
          .eq(i)
          .should("have.text", cardHeader.at(i));
      }
      // Verify each green card time range label
      let cardTimeRange = [
        "All time",
        "All time",
        "Not affected by date range",
        "Not affected by date range",
      ];
      for (let i = 0; i < cardTimeRange.length; i++) {
        cy.log(
          `Verifying the following green card time range: ${cardTimeRange.at(
            i
          )}`
        );
        cy.get('div[class^="chakra-skeleton"] > div > p:nth-child(3)')
          .eq(i)
          .should("have.text", cardTimeRange.at(i));
      }
      // Verify each green card amount (amount=0 initially)
      cy.get('div[class^="chakra-skeleton"] > div > p:nth-child(2)')
        .eq(0)
        .should("have.text", "$0.00 CAD");
      cy.get('div[class^="chakra-skeleton"] > div > p:nth-child(2)')
        .eq(1)
        .should("have.text", "$0.00 CAD");
      cy.get('div[class^="chakra-skeleton"] > div > p:nth-child(2)')
        .eq(2)
        .should("have.text", "0");
      cy.get('div[class^="chakra-skeleton"] > div > p:nth-child(2)')
        .eq(3)
        .should("have.text", "0");
      // Verify the 'Membership Group Stats' section and the corresponding amount ($)
      let revenueType = [
        "Gross Sales",
        "Net Sales",
        "Gross Revenue",
        "Net Revenue",
        "Settlement Amount",
      ];
      let j = 0;
      for (let i = 0; i < revenueType.length; i++) {
        cy.log(`Verifying the following revenue type: ${revenueType.at(i)}`);
        cy.get('button[class^="chakra-accordion__button"] > div > div > p')
          .eq(j)
          .should("have.text", revenueType.at(i));
        cy.get('button[class^="chakra-accordion__button"] > div > div > p')
          .eq(j + 1)
          .should("have.text", "$0.00 CAD");
        j = j + 2;
      }
    }
  );
  // ***************************************************************************
  it(
    "confirming that a correct 'Buy passes' button show up-TA-88",
    { tags: ["e2e", "membership-group"] },
    function () {
      // Retrieve the uniqueMembershipName value from the Cypress.env() object
      let uniqueMembershipName = Cypress.env("uniqueMembershipName");
      // Populate the 'Membership Group Info' form
      cy.populateMembershipGroupInfoForm(
        uniqueMembershipName,
        this.testdata.testGroup1
      );
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
      // Verify the 'BUY PASSES' button appearance
      cy.chakraParagraphButtonByText("BUY PASSES");
    }
  );
  // ***************************************************************************
  it(
    "confirming that a correct 'Buy memberships' button shows up-TA-88",
    { tags: ["e2e", "membership-group"] },
    function () {
      // Retrieve the uniqueMembershipName value from the Cypress.env() object
      let uniqueMembershipName = Cypress.env("uniqueMembershipName");
      // Populate the 'Membership Group Info' form
      cy.populateMembershipGroupInfoForm(
        uniqueMembershipName,
        this.testdata.testGroup2
      );
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
        .should("have.text", this.testdata.testGroup2.membershipDescription);
      // Verify the 'BUY MEMBERSHIPS' button appearance
      cy.chakraParagraphButtonByText("BUY MEMBERSHIPS");
    }
  );
  // ***************************************************************************
});
