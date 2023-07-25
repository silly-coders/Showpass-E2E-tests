export class EventsAndFiltersLocators {
  /**
   * Active filter displaying event name
   */
  activeFilterText(filterText) {
    return cy.get("div[class^='active-filters'] > button > span")
    .should("exist")
    .scrollIntoView()
    .should("be.visible")
    .should("contain", `Event Name: ${filterText}`)
  }
  /**
   * Event card on the 'Events and Filters' page by 'tabindex'
   */
  getEventCard(tabindex) {
    return cy.get(`div[role="button"][tabindex="${tabindex}"]`)
    .should("exist")
    .scrollIntoView()
    .should("be.visible");
  }
}
