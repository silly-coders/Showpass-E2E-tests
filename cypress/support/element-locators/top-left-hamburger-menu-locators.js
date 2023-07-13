export class LeftHamburgerMenuLocators {
  /**
   * 'Manage' section title within the left side menu
   */
  manageSectionTitleLeftMenu() {
    return cy
      .getByDataTestId('div[class="description ng-scope"]')
      .contains("Manage", { matchCase: false });
  }
}
