// Generate a unique name
let uniqueMembershipName = "Test-group-" + Math.floor(Date.now() / 1000);
describe("Verify 'Membership Levels' by ", function () {
  beforeEach(function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
    });
  });

  // ***************************************************************************
  it(
    "confirming checkout process-TA-85",
    { tags: ["e2e", "membership-group"] },
    function () {
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userDetails);
      cy.deleteOldAndCreateNewMembershipGroup(
        uniqueMembershipName,
        this.testdata.testGroup2
      );
      // Click the 'Edit group' button
      cy.get('div[class^="chakra-button"]')
        .last()
        .find(
          'button[aria-label="Edit membership level"][href^="/manage/memberships/"]'
        )
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
        this.testdata.membershipLevel2
      );
      // Wait for the modal window to disappear
      cy.get('header[id^="chakra-modal--header"]').should("not.exist");
      cy.getChakraButtonByText("Cancel").click({ force: true });
      // *** Open the membership group on the portal front-end ***
      // Click the group name to view its front-end page and be able to purchased membership
      cy.get(
        `p[class^="chakra-text"] > a[target="_parent"][href='/m/${uniqueMembershipName.toLowerCase()}/']`
      )
        .contains(uniqueMembershipName)
        .should("be.visible")
        .click({ force: true });
      // Verify that URL contains the group name
      cy.url().should("include", uniqueMembershipName.toLowerCase());
      // Verify group name in the header
      cy.getChakraSkeletonH1HeaderByText(uniqueMembershipName);
      // Verify group description
      cy.getEventOrGroupDescriptionByText(
        this.testdata.testGroup2.membershipDescription
      );
      // Click 'BUY PASSES'
      cy.chakraParagraphButtonByText("BUY MEMBERSHIPS").click({ force: true });
      // Ensure a modal window shows up
      cy.getChakraModalWindow();
      // Add tickets to cart base on "purchaseLimit" (1 ticket type available)
      cy.addMembershipLevelsToCart(
        1,
        this.testdata.membershipLevel2.purchaseLimit
      );
      // Click 'Checkout' button
      cy.clickChakraButtonByText("CHECKOUT");
      // Wait for the next page
      cy.get('span[ng-if="cart.timer.info.totalSeconds"]').should("be.visible");
      // Continue checkout
      cy.goThroughCheckoutBeforePayment(this.testdata.userDetails);
      // Verify that 'Guest Info' page for membership tickets shows up
      cy.get('h3[class^="md-title"]')
        .should("exist")
        .should("contain.text", "Membership");
      // Navigate back to the 'REVIEW' page
      cy.get('md-tab-item[role="tab"] > span')
        .eq(3)
        .contains("Review")
        .should("exist")
        .click({ force: true })
        .wait(300)
        .click({ force: true });
      // Delete items from cart
      let totalCount = this.testdata.membershipLevel2.purchaseLimit;
      cy.log("Delete buttons in total :" + totalCount);
      for (let i = 0; i < totalCount; i++) {
        cy.log("Going to delete items from cart now.");
        cy.get(
          'td[class="text-center"] > button[aria-label="Remove tickets"] > md-icon'
        )
          .eq(0)
          .scrollIntoView({ force: true })
          .click({ force: true });
        cy.wait(900);
      }
      // Ensure the cart is empty
      cy.get('h3[class^="md-display"]')
        .should("exist")
        .should("be.visible")
        .should("contain.text", "We cannot find anything in your cart!");
    }
  );
  // ***************************************************************************
});
