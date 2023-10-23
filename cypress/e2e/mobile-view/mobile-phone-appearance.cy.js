// Verify ticket purchase process for all the mobile screen resolutions mentioned below
const mobileScreenSizes = [390, 844];
describe("Test the mobile phone view by ", () => {
  before(function () {
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("testdata.json").then(function (testdata) {
      this.testdata = testdata;
      cy.viewport(mobileScreenSizes[0], mobileScreenSizes[1]);
      cy.navigateToHomePage();
    });
  });

  // ***************************************************************************
  it(
    "verifying labels on the 'Notifications' page in mobile-view-TA-80",
    { tags: ["e2e", "smoke", "mobile-view"] },
    function () {
      // Click and open main menu
      cy.getChakraButtonByAttribute("aria-label", "Main menu").click({
        force: true,
      });
      // Log into the portal as a regular user
      cy.logIntoPortalInMobileView(this.testdata.userDetails);
      // Navigate to the 'Notifications' page
      cy.visit("/account/profile/notifications/");
      // Verify 'Notifications' page sections headers
      const notificationsPageSectionsHeaders = [
        this.testdata.notificationLabelsAtProfile.label1,
        this.testdata.notificationLabelsAtProfile.label2,
        this.testdata.notificationLabelsAtProfile.label7,
        this.testdata.notificationLabelsAtProfile.label11,
        this.testdata.notificationLabelsAtProfile.label16,
      ];
      for (let j = 0; j < notificationsPageSectionsHeaders.length; j++) {
        cy.verifyNotificationsPageSectionsHeaders(
          j,
          notificationsPageSectionsHeaders.at(j)
        );
      }
      // Verify notifications labels
      const allNotificationLabelsAtProfile = [
        this.testdata.notificationLabelsAtProfile.label3,
        this.testdata.notificationLabelsAtProfile.label4,
        this.testdata.notificationLabelsAtProfile.label5,
        this.testdata.notificationLabelsAtProfile.label6,
        this.testdata.notificationLabelsAtProfile.label8,
        this.testdata.notificationLabelsAtProfile.label9,
        this.testdata.notificationLabelsAtProfile.label10,
        this.testdata.notificationLabelsAtProfile.label12,
        this.testdata.notificationLabelsAtProfile.label13,
        this.testdata.notificationLabelsAtProfile.label14,
        this.testdata.notificationLabelsAtProfile.label15,
      ];
      for (let i = 0; i < allNotificationLabelsAtProfile.length; i++) {
        cy.verifySelectorLabelsWithinSectionsOnNotificationsPage(
          i,
          allNotificationLabelsAtProfile.at(i)
        );
      }
    }
  );
  // ***************************************************************************
});
