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
  removeItemButtonActive() {
    return cy
      .get('button[class^="chakra-button"][aria-label="Remove item"]')
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
   * Plus sign (+) to add item to cart (enabled)
   */
  addItemButtonActive(index) {
    return cy
      .get('button[class^="chakra-button"][aria-label="Add item"]')
      .eq(index)
      .should("exist")
      .should("be.visible")
      .should("not.be.disabled");
  }
  /**
   * Plus sign (+) to add item to cart (disabled)
   */
  addItemButtonActive(index) {
    return cy
      .get('button[class^="chakra-button"][aria-label="Add item"]')
      .eq(index)
      .should("exist")
      .scrollIntoView()
      .should("be.visible")
      .should("not.be.disabled");
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
}
