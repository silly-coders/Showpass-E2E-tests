// Test Automation event 2
/**
 * Method to verify Event-2 API payload
 * @param event
 */
Cypress.Commands.add("verifyEvent2ApiPayload", (event) => {
  cy.request({
    method: "GET",
    url: "/api/user/tickets/favorites/39437/check-event/",
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.wait(700);
    // Event
    expect(response.body.event.id).to.eq(event.event.id);
    expect(response.body.event.slug).to.eq(event.event.slug);
    expect(response.body.event.name).to.eq(event.event.name);
    expect(response.body.event.venue.id).to.eq(event.event.venue.id);
    expect(response.body.event.venue.slug).to.eq(event.event.venue.slug);
    expect(response.body.event.venue.name).to.eq(event.event.venue.name);
    expect(response.body.event.venue.phone_number).to.eq(
      event.event.venue.phone_number
    );
    expect(response.body.event.venue.street_name).to.eq(
      event.event.venue.street_name
    );
    expect(response.body.event.venue.city).to.eq(event.event.venue.city);
    expect(response.body.event.venue.currency).to.eq(
      event.event.venue.currency
    );
    expect(response.body.event.venue.default_refund_policy).to.eq(
      event.event.venue.default_refund_policy
    );
    expect(response.body.event.venue.allow_messages_from_customers).to.eq(
      event.event.venue.allow_messages_from_customers
    );
    // Location
    expect(response.body.event.location.id).to.eq(event.event.location.id);
    expect(response.body.event.location.street_name).to.eq(
      event.event.location.street_name
    );
    expect(response.body.event.location.city).to.eq(event.event.location.city);
    expect(response.body.event.location.province).to.eq(
      event.event.location.province
    );
    expect(response.body.event.location.postal_code).to.eq(
      event.event.location.postal_code
    );

    expect(response.body.event.location.venue).to.eq(
      event.event.location.venue
    );
    expect(response.body.event.location.name).to.eq(event.event.location.name);
    expect(response.body.event.location.country).to.eq(
      event.event.location.country
    );
    // Additional details
    expect(response.body.event.starts_on).to.eq(event.event.starts_on);
    expect(response.body.event.ends_on).to.eq(event.event.ends_on);
    expect(response.body.event.description).to.eq(event.event.description);
    expect(response.body.event.frontend_details_url).to.contain(
      event.event.frontend_details_url
    );
    expect(response.body.event.timezone).to.eq(event.event.timezone);
    // Ticket type 1
    expect(response.body.event.ticket_types[0].id).to.eq(
      event.event.ticket_types[0].id
    );
    expect(response.body.event.ticket_types[0].event).to.eq(
      event.event.ticket_types[0].event
    );
    expect(response.body.event.ticket_types[0].name).to.eq(
      event.event.ticket_types[0].name
    );
    expect(response.body.event.ticket_types[0].price).to.eq(
      event.event.ticket_types[0].price
    );
    // Ticket type 2
    expect(response.body.event.ticket_types[1].id).to.eq(
      event.event.ticket_types[1].id
    );
    expect(response.body.event.ticket_types[1].event).to.eq(
      event.event.ticket_types[1].event
    );
    expect(response.body.event.ticket_types[1].name).to.eq(
      event.event.ticket_types[1].name
    );
    expect(response.body.event.ticket_types[1].price).to.eq(
      event.event.ticket_types[1].price
    );
    // Ticket type 3
    expect(response.body.event.ticket_types[2].id).to.eq(
        event.event.ticket_types[2].id
      );
      expect(response.body.event.ticket_types[2].event).to.eq(
        event.event.ticket_types[2].event
      );
      expect(response.body.event.ticket_types[2].name).to.eq(
        event.event.ticket_types[2].name
      );
      expect(response.body.event.ticket_types[2].price).to.eq(
        event.event.ticket_types[2].price
      );
  });
});
