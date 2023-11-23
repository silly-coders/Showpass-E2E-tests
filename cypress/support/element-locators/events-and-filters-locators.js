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
      .scrollIntoView({ force: true })
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
      .scrollIntoView({ force: true })
      .should("not.be.disabled");
  }
  /**
   * Active 'Checkout' button (enabled)
   */
  checkoutButtonActive() {
    return cy
      .chakraParagraphButtonByText("Checkout")
      .should("exist")
      .scrollIntoView({ force: true })
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
  /**
   * Transparent heart icon representing an unsaved event
   */
  transparentHeartIconButton() {
    return cy.get(
      `div[data-testid='card-image-heart-container-box'] > div > svg`
    );
  }
  /**
   * Get a saved card name
   * @param index
   */
  getSavedCardName(index) {
    return cy
      .get('div[class^="chakra-skeleton"] > p')
      .eq(index)
      .should("exist");
  }
  /**
   * Button (x) by aria-label to remove a selected filter
   * @param ariaLabel
   */
  getButtonxToRemoveSelecetedFilter(ariaLabel) {
    return cy
      .get(`button[aria-label="${ariaLabel}"]`)
      .should("exist")
      .should("be.visible");
  }
  /**
   * Get the 'Select a date' date-picker
   */
  getDatePicker() {
    return cy
      .get(`button[id="event-search-select-date-range"]`)
      .should("exist")
      .scrollIntoView()
      .should("be.visible");
  }
  /**
   * Get a preset date range button by label
   * @param label
   * @example label="Today","Tomorrow","This Weekend","Next Week" etc
   */
  getDateRangeButtonByLabel(label) {
    return cy
      .getChakraButtonByAttribute("aria-label", label)
      .should("exist")
      .scrollIntoView()
      .should("be.visible");
  }
  /**
   * Clear 'Date Range' selection button (X)
   */
  getClearSelectionButtonForDateRange() {
    return cy
      .get(
        'button[id="event-search-select-date-range"] > div[aria-label="clear selection"]'
      )
      .should("exist")
      .scrollIntoView()
      .should("be.visible");
  }
  /**
   * Get Upcoming purchased event name
   */
  getUpcomingPurchasedEventName(eventName) {
    return cy
      .get('div[id="upcoming-event-info-container"] > div > p')
      .eq(0) // event name has index zero in the DOM
      .contains(eventName)
      .should("exist");
  }
  /**
   * Get Upcoming purchased event name
   */
  getUpcomingPurchasedEventStartDate(eventStartDate) {
    return cy
      .get('div[id="upcoming-event-info-container"] > div > p')
      .eq(1) // event start date has index 1 in the DOM
      .contains(eventStartDate)
      .should("exist");
  }
}
