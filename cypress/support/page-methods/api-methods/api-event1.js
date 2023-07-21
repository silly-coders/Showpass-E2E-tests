Cypress.Commands.add("verifyEvent1ApiPayload", (event1) => {
  cy.request({
    method: "GET",
    url: "/api/user/tickets/favorites/39434/check-event/",
  }).then((response) => {
    expect(response.status).to.eq(200);
    // Event
    expect(response.body.event.id).to.eq(event1.event.id);
    expect(response.body.event.slug).to.eq(event1.event.slug);
    expect(response.body.event.name).to.eq(event1.event.name);
    expect(response.body.event.venue.id).to.eq(event1.event.venue.id);
    expect(response.body.event.venue.slug).to.eq(event1.event.venue.slug);
    expect(response.body.event.venue.name).to.eq(event1.event.venue.name);
    expect(response.body.event.venue.phone_number).to.eq(
      event1.event.venue.phone_number
    );
    expect(response.body.event.venue.street_name).to.eq(
      event1.event.venue.street_name
    );
    expect(response.body.event.venue.city).to.eq(event1.event.venue.city);
    expect(response.body.event.venue.currency).to.eq(
      event1.event.venue.currency
    );
    expect(response.body.event.venue.default_refund_policy).to.eq(
      event1.event.venue.default_refund_policy
    );
    expect(response.body.event.venue.allow_messages_from_customers).to.eq(
      event1.event.venue.allow_messages_from_customers
    );
    // Location
    expect(response.body.event.location.id).to.eq(event1.event.location.id);
    expect(response.body.event.location.street_name).to.eq(
      event1.event.location.street_name
    );
    expect(response.body.event.location.city).to.eq(event1.event.location.city);
    expect(response.body.event.location.province).to.eq(
      event1.event.location.province
    );
    expect(response.body.event.location.postal_code).to.eq(
      event1.event.location.postal_code
    );

    expect(response.body.event.location.venue).to.eq(
      response.body.event.location.venue
    );
    expect(response.body.event.location.name).to.eq(
      response.body.event.location.name
    );
    expect(response.body.event.location.country).to.eq(
      event1.event.location.country
    );
    // Additional details
    expect(response.body.event.starts_on).to.eq(event1.event.starts_on);
    expect(response.body.event.ends_on).to.eq(event1.event.ends_on);
    expect(response.body.event.description).to.eq(event1.event.description);
    expect(response.body.event.frontend_details_url).to.eq(
      event1.event.frontend_details_url
    );
    expect(response.body.event.timezone).to.eq(event1.event.timezone);

    // Event 1 - ticket type 1

    expect(response.body.event.ticket_types[0].id).to.eq(
      event1.event.ticket_types[0].id
    );
    expect(response.body.event.ticket_types[0].event).to.eq(
      event1.event.ticket_types[0].event
    );
    expect(response.body.event.ticket_types[0].name).to.eq(
      event1.event.ticket_types[0].name
    );
    expect(response.body.event.ticket_types[0].price).to.eq(
      event1.event.ticket_types[0].price
    );

    // Event 1 - ticket type 2

    expect(response.body.event.ticket_types[1].id).to.eq(
      response.body.event.ticket_types[1].id
    );
    expect(response.body.event.ticket_types[1].event).to.eq(
      event1.event.ticket_types[1].event
    );
    expect(response.body.event.ticket_types[1].name).to.eq(
      event1.event.ticket_types[1].name
    );
    expect(response.body.event.ticket_types[1].price).to.eq(
      event1.event.ticket_types[1].price
    );
  });
});
