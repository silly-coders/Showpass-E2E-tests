// Purchased ongoing events on the 'Upcoming' page
/**
 * Verify a particular event name via API
 * @param eventId
 * @param expectedJSON
 */
Cypress.Commands.add(
  "verifyParticularEventNameViaApi",
  (eventId, expectedJSON) => {
    cy.request({
      method: "GET",
      url: `api/user/tickets/events/${eventId}/`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(expectedJSON.event.name);
    });
  }
);
// *****************************************************************************
/**
 * Method to verify Event-1 purchased item details through API
 * @param slug
 * @param expectedJSON
 */
Cypress.Commands.add(
  "verifyPurchasedItemDetailsApi_event_1",
  (slug, expectedJSON) => {
    cy.request({
      method: "GET",
      url: `api/user/tickets/events/${slug}/`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      // There are 2 purchased ticket types
      expect(response.body.tickettype_set).to.have.length(2);
      expect(response.body.id).to.eq(expectedJSON.event.id);
      expect(response.body.location.street_name).to.eq(
        expectedJSON.event.location.street_name
      );
      expect(response.body.location.city).to.eq(
        expectedJSON.event.location.city
      );
      expect(response.body.location.province).to.eq(
        expectedJSON.event.location.province
      );
      expect(response.body.location.name).to.eq(
        expectedJSON.event.location.name
      );
      expect(response.body.starts_on).to.eq(expectedJSON.event.starts_on);
      expect(response.body.ends_on).to.eq(expectedJSON.event.ends_on);
      expect(response.body.frontend_details_url).to.contain(
        expectedJSON.event.frontend_details_url
      );
      expect(response.body.venue.id).to.eq(expectedJSON.event.venue.id);
      expect(response.body.venue.name).to.eq(expectedJSON.event.venue.name);
      expect(response.body.venue.slug).to.eq(expectedJSON.event.venue.slug);
      expect(response.body.venue.street_name).to.eq(
        expectedJSON.event.venue.street_name
      );
      expect(response.body.venue.currency).to.eq(
        expectedJSON.event.venue.currency
      );
      // Purchased ticket details
      // Ticket type 1
      expect(response.body.tickettype_set[0].name).to.eq(
        expectedJSON.purchased_tickets.tickettype_set[0].name
      );
      // Name on ticket 1
      expect(
        response.body.tickettype_set[0].ticket_items[0].name_on_ticket
      ).to.eq(
        expectedJSON.purchased_tickets.tickettype_set[0].ticket_items[0]
          .name_on_ticket
      );
      // Total number of tickets 1
      expect(
        response.body.tickettype_set[0].ticket_items[0].invoice.item_groups[0]
          .quantity_included_in_total
      ).to.eq(
        expectedJSON.purchased_tickets.tickettype_set[0].ticket_items[0].invoice
          .item_groups[0].quantity_included_in_total
      );
      // Ticket type 2
      expect(response.body.tickettype_set[1].name).to.eq(
        expectedJSON.purchased_tickets.tickettype_set[1].name
      );
      // Name on ticket 2
      expect(
        response.body.tickettype_set[0].ticket_items[1].name_on_ticket
      ).to.eq(
        expectedJSON.purchased_tickets.tickettype_set[0].ticket_items[1]
          .name_on_ticket
      );
      // Total number of tickets 2
      expect(
        response.body.tickettype_set[1].ticket_items[0].invoice.item_groups[0]
          .quantity_included_in_total
      ).to.eq(
        expectedJSON.purchased_tickets.tickettype_set[1].ticket_items[0].invoice
          .item_groups[0].quantity_included_in_total
      );
    });
  }
);
// *****************************************************************************
/**
 * Method to verify Event-2 purchased item details through API
 * @param slug
 * @param expectedJSON
 */
Cypress.Commands.add(
  "verifyPurchasedItemDetailsApi_event_2",
  (slug, expectedJSON) => {
    cy.request({
      method: "GET",
      url: `api/user/tickets/events/${slug}/`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      // There are 3 purchased ticket types
      expect(response.body.tickettype_set).to.have.length(3);
      expect(response.body.id).to.eq(expectedJSON.event.id);
      expect(response.body.location.street_name).to.eq(
        expectedJSON.event.location.street_name
      );
      expect(response.body.location.city).to.eq(
        expectedJSON.event.location.city
      );
      expect(response.body.location.province).to.eq(
        expectedJSON.event.location.province
      );
      expect(response.body.location.name).to.eq(
        expectedJSON.event.location.name
      );
      expect(response.body.starts_on).to.eq(expectedJSON.event.starts_on);
      expect(response.body.ends_on).to.eq(expectedJSON.event.ends_on);
      expect(response.body.frontend_details_url).to.contain(
        expectedJSON.event.frontend_details_url
      );
      expect(response.body.venue.id).to.eq(expectedJSON.event.venue.id);
      expect(response.body.venue.name).to.eq(expectedJSON.event.venue.name);
      expect(response.body.venue.slug).to.eq(expectedJSON.event.venue.slug);
      expect(response.body.venue.street_name).to.eq(
        expectedJSON.event.venue.street_name
      );
      expect(response.body.venue.currency).to.eq(
        expectedJSON.event.venue.currency
      );
      // Purchased ticket details
      // Ticket type 1
      expect(response.body.tickettype_set[0].name).to.eq(
        expectedJSON.purchased_tickets.tickettype_set[0].name
      );
      // Name on ticket 1
      expect(
        response.body.tickettype_set[0].ticket_items[0].name_on_ticket
      ).to.eq(
        expectedJSON.purchased_tickets.tickettype_set[0].ticket_items[0]
          .name_on_ticket
      );
      // Ticket type 2
      expect(response.body.tickettype_set[1].name).to.eq(
        expectedJSON.purchased_tickets.tickettype_set[1].name
      );
      // Name on ticket 2
      expect(
        response.body.tickettype_set[0].ticket_items[1].name_on_ticket
      ).to.eq(
        expectedJSON.purchased_tickets.tickettype_set[0].ticket_items[1]
          .name_on_ticket
      );
      // Ticket type 3
      expect(response.body.tickettype_set[1].name).to.eq(
        expectedJSON.purchased_tickets.tickettype_set[1].name
      );
      // Name on ticket 3
      expect(
        response.body.tickettype_set[0].ticket_items[2].name_on_ticket
      ).to.eq(
        expectedJSON.purchased_tickets.tickettype_set[0].ticket_items[2]
          .name_on_ticket
      );
    });
  }
);
// *****************************************************************************
