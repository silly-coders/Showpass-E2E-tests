export class EventsAndFiltersLocators {
  /**
   * Active filter displaying event name
   */
  activeFilterText(filterText) {
    return cy
      .get("div[class^='active-filters'] > button > span")
      .should("exist")
      .scrollIntoView()
      .should("be.visible")
      .should("contain", `Event Name: ${filterText}`);
  }
  /**
   * Event card on the 'Events and Filters' page by 'tabindex'
   */
  getEventCard(tabindex) {
    return cy
      .get(`div[role="button"][tabindex="${tabindex}"]`)
      .should("exist")
      .scrollIntoView()
      .should("be.visible");
  }
  /**
   * Minus sign (-) to remove item from cart (enabled)
   */
  removeItemButtonActive(buttonIndex) {
    return cy
      .get('button[class^="chakra-button"][aria-label="Remove item"]')
      .eq(buttonIndex)
      .should("exist")
      .scrollIntoView()
      .should("be.visible")
      .should("not.be.disabled");
  }
  /**
   * Minus sign (-) to remove item from cart (disabled)
   */
  removeItemButtonDisabled() {
    return cy
      .get('button[class^="chakra-button"][aria-label="Remove item"]')
      .should("not.be.enabled");
  }
  /**
   * Plus sign (+) to add item to cart (disabled)
   */
  addItemButtonActive(index) {
    return cy
      .get('button[class^="chakra-button"][aria-label="Add item"]')
      .eq(index)
      .as("btn")
      .get("@btn")
      .should("exist")
      .scrollIntoView()
      .should("not.be.disabled")
      .should("be.visible");
  }
  /**
   * Active 'Checkout' button (enabled)
   */
  checkoutButtonActive() {
    return cy
      .chakraParagraphButtonByText("Checkout")
      .should("exist")
      .scrollIntoView()
      .should("be.visible")
      .should("not.be.disabled");
  }
  /**
   * Disabled 'Checkout' button (grayed out)
   */
  checkoutButtonDisabled() {
    return cy.chakraParagraphButtonByText("Checkout").should("not.be.enabled");
  }
  /**
   * Get a tciket price label by index
   * @param itemIndex
   */
  ticketPriceLabelByIndex(itemIndex) {
    cy.log("ticketPriceLabelByIndex: [" + itemIndex + "]");
    return cy
      .get(`h3[class^="chakra-heading"] > span`)
      .eq(itemIndex)
      .should("exist")
      .should("be.visible");
  }
  /**
   * Added ticket by index on the event page above 'Checkout' button
   * @param itemIndex
   */
  addedTicketNameByIndex(itemIndex) {
    cy.log("ticketPriceLabelByIndex: [" + itemIndex + "]");
    return cy
      .get(`[data-testid^='cart-item'] > div > div > div > p`)
      .eq(itemIndex)
      .should("exist");
  }
}
