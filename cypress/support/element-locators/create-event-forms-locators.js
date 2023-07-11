export class CreateEventFormsLocators {

/**
* Forms section title based on the its text
*/
sectionTitle(titleText) {
    return cy.get('span[class="title"]').contains('titleText');
  }
/**
* 'Create Event' header and the button
*/
createEventHeaderAndButton() {
    return cy.get('h3 > a[href="/dashboard/events/"]')
  }
/**
* Left arrow button
*/
leftArrowButton() {
    return cy.get('a[href="/dashboard/events/"] > i[class="icon-arrow-left"]')
  }
/**
* 'Show Advanced Settings' button on the left hand side
*/
showAndHideAdvancedSettingsButton() {
    return cy.get(`a[ng-click="advancedForm = !advancedForm"]`).eq(1);
  }  
/**
* 'Save Draft' button on the left hand side
*/
saveDraftButton() {
    return cy.get('button[class^="btn"]').contains("Save Draft");
  }  

//--------------------------------------------- Basic Info section -------------------------------------
/**
 * 'Event Name' label above the corresponding input field
 */
eventNameLabel() {
    return cy.get('div[class="input"] > label').contains('Event Name:');
}
/**
 * 'Sub-title' label above the corresponding input field
 */
subTitleLabel() {
    return cy.get('div > label').contains('Sub-title :');
}
/**
 * 'Sub-title' input field
 */
subTitleInputField() {
    return cy.get('input[id="id_subtitle"]');
}

/**
 * 'Event Name' input field
 */
eventNameInputField() {
    return cy.get('input[id="id_name"]');
}
/**
 * 'Banner Image' label above the 'Drag image here...' area
 */
bannerImageLabel() {
    return cy.get('div[class="input"] > label').contains('Banner Image:');
}
/**
 * 'Choose File' button
 */
chooseFileButton() {
    return cy.get('input[name="image_banner"]');
}
/**
 * 'Description' label above the text area
 */
descriptionLabel() {
    return cy.get('div[class="input"] > label').contains('Description: ');
}
/**
 * iFrame for the 'Description' text area
 */
iframeForDescriptionTextArea() {
    return cy.get('iframe[id="ui-tinymce-1_ifr"]');
}
/**
 * 'Description' text area
 */
descriptionTextArea() {
    return cy.get('body[id="tinymce"]').eq(0);
}
/**
 * 'Categories' label above the 'Add a category' input field
 */
categoriesLabel() {
    return cy.get('div > label').contains('Categories');
}
/**
 * 'Add a category' search field
 */
addCategoryField() {
    return cy.get('input[placeholder="Add a category"]')
}
/**
 * Select a category from a drop-down list of categories
 * @param categoryText
 */
selectCategory(category) {
    return cy.get('span[class="ui-select-choices-row-inner"] > span').contains('category');
}
/**
 * 'Tags' label above the 'Add a tag' input field
 */
categoriesLabel() {
    return cy.get('div > label').contains('Tags');
}
/**
 * 'Add a tag' input field
 */
addTagInputField() {
    return cy.get('input[placeholder="Add a tag"]')
}
/**
 * 'Visibility' label above the select visibility field
 */
visibilitiesLabel() {
    return cy.get('div > label').contains('Visibilities');
}
/**
 * Select visibility field
 */
selectVisibilityField() {
    return cy.get('select[class^="form-control"]').eq(0);
}
/**
 * 'Display on Calendar Widget' check box
 */
displayOnCalendarWidgetCheckBox() {
    return cy.get('div.clearfix.prettycheckbox').eq(0);
}
/**
 * 'Display on Calendar Widget' label
 */
displayOnCalendarWidgetLabel() {
    return cy.get('div.clearfix.prettycheckbox').eq(0);
}

//--------------------------------------------- Location & Info section --------------------------------



//--------------------------------------------- Event Date & Time section ------------------------------



//--------------------------------------------- Ticket Types section -----------------------------------
}