export class UserSettingLocators {
  /**
   * 'Payment Methods' header on the 'Payment' page
   */
  getPaymentMethodsHeader() {
    return cy
      .getH1HeaderByText("Create Account")
      .should("exist")
      .should("be.visible");
  }
  /**
   * 'Password Strength' progress bar
   */
  getPasswordStrengthProgressBar() {
    return cy.get('div[role="progressbar"]').should("exist");
  }
}