export class DashboardLocators {
  /**
   * Dashboard Welcome header with user First and Last names
   */
  dashboardHeader() {
    return cy.get('h3[class="title"] > div').contains("Welcome");
  }

  /**
   * Top left hamburger menu on the 'Dashboard' page
   */
  topLeftHamburgerMenu() {
    return cy.get('button[ng-click="$showSideMenu()"]');
  }
}
