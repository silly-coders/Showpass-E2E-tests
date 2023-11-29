
# ShowpassE2E
 Showpass E2E tests are being executed using Cypress test automation tool.
 https://docs.cypress.io/guides/overview/why-cypress

 Project setup:

1. Clone the repo
https://github.com/showpass/Showpass-E2E-tests
2. Navigate to the folder in which the repo lives
3. Open terminal in that folder
4. Install Cypress https://docs.cypress.io/guides/getting-started/installing-cypress
5. Once installed type npx cypress open
6. 'Welcome to Cypress' modal window should show up
7. Click the 'E2E Testing' button
8. Select a browser and click 'Start E2E Testing in ...'
9. A new browser instance should pop up displaying a list of E2E tests
10. Click the test you wanna run
11. Observe the test execution and prepare to debug if any failures

Command Line execution examples: (https://docs.cypress.io/guides/guides/command-line#cypress-run-headed)

npx cypress run —headed (all tests with the browser shown)
npx cypress run --spec "cypress/e2e/user-settings/profile.cy.js"
npx cypress run --spec "cypress/e2e/api-requests/transactions-api.cy.js"
npx cypress run --spec "cypress/e2e/events/barcodes.cy.js"
npx cypress run --env grepTags=e2e
npx cypress run --env grepTags=smoke
npx cypress run --env grepTags=events
npx cypress run --env grepTags=appearance
npx cypress run --env grepTags=barcodes
npx cypress run --env grepTags=search-filters
npx cypress run --env grepTags=membership-group
