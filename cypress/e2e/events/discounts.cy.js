describe("Verify discounts by ", () => {
  beforeEach(function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.navigateToHomePage();
    });
  });

  // ***************************************************************************
  it(
    "ensuring that GIVEMEDISCOUNT-301120231600 is getting applied at checkout-TA-",
    { tags: ["e2e", "checkout"] },
    function () {
      let discountCode = "GIVEMEDISCOUNT-301120231600";
      cy.navigateToHomePage();
      cy.logIntoPortal(this.testdata.userForSingleBarcodeTesting);
      // Open the event
      cy.visit(`/event-2-do-not-modify/`);
      cy.url().should("contain", "/event-2-do-not-modify/");
      // Click 'BUY TICKETS'
      cy.chakraParagraphButtonByText("BUY TICKETS")
        .eq(0)
        .click({ force: true });
      // Add 1 ticket from each ticket type out of 3 tickets types in total
      cy.addTicketsToCart(3, 1);
      // Click 'Checkout' button
      cy.clickChakraButtonByText("CHECKOUT");
      // Verify if tickets were properly added to cart
      cy.throwErrorIfNoTicketsInCart();
      // Wait for the cart timer to show up
      cy.get('span[ng-if="cart.timer.info.totalSeconds"]')
        .should("exist")
        .should("be.visible");
      // Click 'Next'
      cy.clickNextButtonDuringCheckoutAngular();
      // Click 'REVIEW' tab
      cy.get('md-tab-item[role="tab"] > span')
        .eq(3)
        .contains("Review")
        .should("exist")
        .click({ force: true })
        .wait(700)
        .click({ force: true });
      cy.navigateToReviewPageIfStillNotThere();
      // Apply the 'GIVEMEDISCOUNT-301120231600' discount
      cy.typeInAndApplyDiscountCode(discountCode);
      // Verify that the green section with an applied discount appears
      cy.verifyGreenDiscountAppliedSectionAppearance();
      // Verify the applied discount text
      cy.get(
        'div[ng-if="cart.basket.discount && !cart.basket.discounts_applied.length"]'
      )
        .find('div[class="flex ng-binding"]')
        .should("contain.text", discountCode);
      // Verify the discount amount on the review page
      cy.get(
        `td[class="text-right"] > span[ng-bind="cart.basket.discount_amount | currencySymbol:paymentVenue.currency:'en'"]`
      )
        .should("exist")
        .should("contain.text", "$-12.85");
      // Verify that the discount confirmation text shows up under each ticket entry on the 'Review' page
      // There are 3 tickets in total
      for (let i = 0; i < 3; i++) {
        cy.log(
          "Going to verify the inline success message under each ticket entry on the Review page"
        );
        cy.get('small[class="small text-success ng-binding"]')
          .eq(i)
          .should("exist")
          .should("contain.text", "GIVEMEDISCOUNT-301120231600");
      }
    }
  );
  // ***************************************************************************
});
