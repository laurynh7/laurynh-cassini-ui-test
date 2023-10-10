const { Selector, t } = require('testcafe') ;


class CalendarPage {
    constructor() {
        this.dateDropDown = Selector('[data-test="dropdown"]');
        this.dateTextEditor = Selector('input[placeholder="mm/dd/yyyy"]');
        this.applyButton = Selector('button[type="submit"]')
    }


async set_date(inputDate) {
    console.log('input = ' + inputDate)
    await t
        .selectText(this.dateTextEditor)
        .typeText(inputDate)
        .click(this.applyButton)
}

}

export default new CalendarPage();
