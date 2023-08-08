Cypress.Commands.add("verifyOrder987Payload", (expectedPayload) => {
  cy.request({
    method: "GET",
    url: "/api/user/financials/invoices/1e-d67b-428a-9748-d638af16e987/transaction",
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body)
      .to.have.deep.property("item_groups")
      .to.have.length(3);
    expect(response.body)
      .to.have.deep.property("invoice_items")
      .to.have.length(3);
    cy.wrap(response.body).should("include.keys", [
      "id",
      "transaction_id",
      "created",
      "type",
      "items_total_amount",
      "tax",
      "service_charges",
      "venue",
      "item_groups",
      "invoice_items",
      "currency",
      "payment_type",
      "amount_earned",
      "billing_address",
      "customer_group_id",
    ]);
    expect(expectedPayload.id).to.eq(response.body.id);
    expect(expectedPayload.transaction_id).to.eq(response.body.transaction_id);
    expect(expectedPayload.created).to.eq(response.body.created);
    expect(expectedPayload.type).to.eq(response.body.type);
    expect(expectedPayload.items_total_amount).to.eq(
      response.body.items_total_amount
    );
    expect(expectedPayload.tax).to.eq(response.body.tax);
    expect(expectedPayload.service_charges).to.eq(
      response.body.service_charges
    );
    expect(expectedPayload.discounts).to.eq(response.body.discounts);
    expect(expectedPayload.final_amount).to.eq(response.body.final_amount);
    expect(expectedPayload.card_last4).to.eq(response.body.card_last4);
    // Venue json
    expect(expectedPayload.venue.id).to.eq(response.body.venue.id);
    expect(expectedPayload.venue.name).to.eq(response.body.venue.name);
    expect(expectedPayload.venue.slug).to.eq(response.body.venue.slug);
    expect(expectedPayload.venue.exchange_tickets_visibility_type).to.eq(
      response.body.venue.exchange_tickets_visibility_type
    );
    expect(expectedPayload.venue.exchange_tickets_fees_type).to.eq(
      response.body.venue.exchange_tickets_fees_type
    );
    expect(expectedPayload.venue.exchange_tickets_fees_type_box_office).to.eq(
      response.body.venue.exchange_tickets_fees_type_box_office
    );
    expect(expectedPayload.venue.exchange_tickets_purchase_date_limit).to.eq(
      response.body.venue.exchange_tickets_purchase_date_limit
    );
    expect(
      expectedPayload.venue.exchange_tickets_allow_overflow_exchanges
    ).to.eq(response.body.venue.exchange_tickets_allow_overflow_exchanges);
    expect(expectedPayload.venue.barcode_delivery).to.eq(
      response.body.venue.barcode_delivery
    );
    expect(expectedPayload.venue.enable_automated_returns).to.eq(
      response.body.venue.enable_automated_returns
    );
    expect(expectedPayload.venue.automated_return_medium).to.eq(
      response.body.venue.automated_return_medium
    );
    expect(expectedPayload.venue.street_name).to.eq(
      response.body.venue.street_name
    );
    expect(expectedPayload.venue.automated_return_window).to.eq(
      response.body.venue.automated_return_window
    );
    expect(expectedPayload.venue.avatar).to.eq(response.body.venue.avatar);
    expect(expectedPayload.venue.allow_edit_name_on_ticket).to.eq(
      response.body.venue.allow_edit_name_on_ticket
    );
    expect(expectedPayload.venue.modules_enabled[0]).to.eq(
      response.body.venue.modules_enabled[0]
    );
    expect(expectedPayload.venue.exchange_tickets_event_start_limit).to.eq(
      response.body.venue.exchange_tickets_event_start_limit
    );
    expect(expectedPayload.venue.exchange_tickets_event_start_limit).to.eq(
      response.body.venue.exchange_tickets_event_start_limit
    );
    // Item groups
    expect(response.body)
      .to.have.deep.property("item_groups")
      .to.have.length(3);
    for (let i = 0; i < 3; i++) {
      expect(expectedPayload.item_groups[i].quantity).to.eq(
        response.body.item_groups[i].quantity
      );
      expect(expectedPayload.item_groups[i].is_redeemable).to.eq(
        response.body.item_groups[i].is_redeemable
      );
      expect(expectedPayload.item_groups[i].quantity_included_in_total).to.eq(
        response.body.item_groups[i].quantity_included_in_total
      );
      expect(expectedPayload.item_groups[i].payment_pending).to.eq(
        response.body.item_groups[i].payment_pending
      );
      expect(expectedPayload.item_groups[i].shipping_type).to.eq(
        response.body.item_groups[i].shipping_type
      );
      expect(expectedPayload.item_groups[i].post_purchase_completed).to.eq(
        response.body.item_groups[i].post_purchase_completed
      );
      expect(
        expectedPayload.item_groups[i].exclude_in_confirmation_email
      ).to.eq(response.body.item_groups[i].exclude_in_confirmation_email);
      expect(expectedPayload.item_groups[i].quantity_multi_scans_used).to.eq(
        response.body.item_groups[i].quantity_multi_scans_used
      );
      expect(expectedPayload.item_groups[i].quantity_multi_scan_limit).to.eq(
        response.body.item_groups[i].quantity_multi_scan_limit
      );
    }
    // Billing address
    expect(expectedPayload.billing_address.street_address).to.eq(
      response.body.billing_address.street_address
    );
    expect(expectedPayload.billing_address.city).to.eq(
      response.body.billing_address.city
    );
    expect(expectedPayload.billing_address.province).to.eq(
      response.body.billing_address.province
    );
    expect(expectedPayload.billing_address.postal).to.eq(
      response.body.billing_address.postal
    );
    expect(expectedPayload.billing_address.country).to.eq(
      response.body.billing_address.country
    );
    expect(expectedPayload.billing_address.country_code).to.eq(
      response.body.billing_address.country_code
    );
    // Ticket items
    for (let j = 0; j < 3; j++) {
      cy.verifyTicketItemPayload(
        response.body.ticket_items[j],
        expectedPayload
      );
    }
    // Invoice items
    for (let k = 0; k < 3; k++) {
      cy.verifyInvoiceItemsPayload(
        response.body.invoice_items[k],
        expectedPayload
      );
    }
  });
});
// **************************************************************
/**
 * Method to verify purchased ticket items payload
 * @param responseBody
 * @param expectedPayload
 */
Cypress.Commands.add(
  "verifyTicketItemPayload",
  (responseBody, expectedPayload) => {
    cy.log("*** Right now checking this ticket ID: " + responseBody.id + " *** ");
    switch (responseBody.id) {
      case 61369:
        cy.assertTicketItemsValues(0, responseBody, expectedPayload);
        break;
      case 61370:
        cy.assertTicketItemsValues(1, responseBody, expectedPayload);
        break;
      case 61371:
        cy.assertTicketItemsValues(2, responseBody, expectedPayload);
        break;
    }
  }
);
// **************************************************************
/**
 * Method to assert ticket items values
 * @param index
 */
Cypress.Commands.add(
  "assertTicketItemsValues",
  (index, responseBody, expectedPayload) => {
    expect(expectedPayload.ticket_items[index].venue).to.eq(responseBody.venue);
    expect(expectedPayload.ticket_items[index].event).to.eq(responseBody.event);
    expect(expectedPayload.ticket_items[index].is_activated).to.eq(
      responseBody.is_activated
    );
    expect(expectedPayload.ticket_items[index].group).to.eq(responseBody.group);
    expect(expectedPayload.ticket_items[index].barcode_string).to.eq(
      responseBody.barcode_string
    );
    expect(expectedPayload.ticket_items[index].invoice_item_id).to.eq(
      responseBody.invoice_item_id
    );
    expect(expectedPayload.ticket_items[index].parent).to.eq(
      responseBody.parent
    );
  }
);
// **************************************************************
/**
 * Method to verify invoice items
 * @param responseBody
 * @param expectedPayload
 */
Cypress.Commands.add(
  "verifyInvoiceItemsPayload",
  (responseBody, expectedPayload) => {
    cy.log("*** Right now checking this invoice item ID: " + responseBody.id + " *** ");
    switch (responseBody.id) {
      case 60071:
        cy.assertInvoiceItemsValues(0, responseBody, expectedPayload);
        break;
      case 60073:
        cy.assertInvoiceItemsValues(1, responseBody, expectedPayload);
        break;
      case 60072:
        cy.assertInvoiceItemsValues(2, responseBody, expectedPayload);
        break;
    }
  }
);
// **************************************************************
/**
 * Method to assert invoice items values
 * @param index
 */
Cypress.Commands.add(
  "assertInvoiceItemsValues",
  (index, responseBody, expectedPayload) => {
    expect(expectedPayload.invoice_items[index].invoice).to.eq(
      responseBody.invoice
    );
    expect(expectedPayload.invoice_items[index].description).to.eq(
      responseBody.description
    );
    expect(expectedPayload.invoice_items[index].quantity).to.eq(
      responseBody.quantity
    );
    expect(expectedPayload.invoice_items[index].price).to.eq(
      responseBody.price
    );
    expect(expectedPayload.invoice_items[index].type).to.eq(responseBody.type);
    // invoice item event
    expect(expectedPayload.invoice_items[index].event.name).to.eq(
      responseBody.event.name
    );
    expect(expectedPayload.invoice_items[index].event.timezone).to.eq(
      responseBody.event.timezone
    );
    expect(expectedPayload.invoice_items[index].event.slug).to.eq(
      responseBody.event.slug
    );
    // invoice item event location
    expect(
      expectedPayload.invoice_items[index].event.location.street_name
    ).to.eq(responseBody.event.location.street_name);
    expect(expectedPayload.invoice_items[index].event.location.city).to.eq(
      responseBody.event.location.city
    );
    expect(expectedPayload.invoice_items[index].event.location.province).to.eq(
      responseBody.event.location.province
    );
    expect(
      expectedPayload.invoice_items[index].event.location.postal_code
    ).to.eq(responseBody.event.location.postal_code);
    expect(expectedPayload.invoice_items[index].event.location.name).to.eq(
      responseBody.event.location.name
    );
    // invoice item ticket types
    expect(expectedPayload.invoice_items[index].ticket_type.name).to.eq(
      responseBody.ticket_type.name
    );
  }
);
// **************************************************************
