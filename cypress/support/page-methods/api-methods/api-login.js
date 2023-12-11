
// cy.intercept('GET', '**/events/*').as('getEvents')
/**
 * Method to log in via API
 * @param user
 * @todo The method still needs some tweaking and the final touches
 */
Cypress.Commands.add("loginViaApi", (user) => {
  cy.request({
    method: "POST",
    url: "/api/auth/login/",
    body: {
      email: user.userEmail,
      password: user.userPassword,
    },
  }).then((response) => {
    //Asserting the status code
    expect(response.status).to.eq(200);
    expect(response.body.user.username).to.eq(user.username);
    expect(response.body.user.email).to.eq(user.userEmail);
  });
});

/**
 * Method to verify successful Login API response
 * @param user
 */
Cypress.Commands.add("verifySuccessfulLoginApiResponse", (user) => {
  cy.request({
    method: "GET",
    url: "/api/auth/profile/",
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.first_name).to.eq(user.userFirstName);
    expect(response.body.last_name).to.eq(user.userLastName);
    expect(response.body.username).to.eq(user.username);
    expect(response.body.id).to.eq(user.userId);
  });
});
