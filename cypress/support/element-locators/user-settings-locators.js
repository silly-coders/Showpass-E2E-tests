export class UserSettingLocators {
  //------------------------------------------------------- PROFILE ----------------------------------------------------------
  //--------------------------- Payment -------------------
  /**
   * 'Payment Methods' header on the 'Payment' page
   */
  paymentMethodsHeader() {
    return cy.getH1HeaderByText("Create Account");
  }
}
