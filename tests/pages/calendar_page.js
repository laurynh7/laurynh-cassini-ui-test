const { Selector, t } = require('testcafe') ;


class CalendarPage {
    constructor() {
        this.dateDropDown = Selector('div[class*="datePickerBtn"]');
        this.dateTextEditor = Selector('input[placeholder="mm/dd/yyyy"]');
        this.applyButton = Selector('button[type="submit"]')
        this.fourthOctoberTitle = Selector('span').withExactText('4')
    }


async setDate(inputDate) {
    await t
        .selectText(this.dateTextEditor)
        .typeText(this.dateTextEditor, inputDate)
        .click(this.applyButton)
    
}

async findDateInCalendar(inputDate) {
    const day = parseInt(inputDate.slice(3,5)).toString()
    const dateTitle = Selector('span').withExactText(day).parent('li')
    return dateTitle
}

async getPillCount(pillName, inputDate){
    const day = parseInt(inputDate.slice(3,5)).toString()
    const dateTitle = Selector('span').withExactText(day).parent('li')
    await t
        .hover(dateTitle)
        .hover(dateTitle.child().withText('Earnings').parent())

    const pillSelector = await dateTitle.child().withText(pillName)

    try{
        await t.expect(pillSelector.exists).ok()
    }
    catch (err) {
        await t.takeScreenshot('./screenshots/')
        throw "Could not find pill: " + pillName
    }  
    
    const pillText = await pillSelector.innerText
    return pillText
}

}

export default new CalendarPage();
