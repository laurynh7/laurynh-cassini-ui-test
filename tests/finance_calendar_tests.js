import HomePage from './pages/home_page';
import YahooFinancePage from './pages/yahoo_finance_page'
import CalendarPage from './pages/calendar_page'

import { Selector} from 'testcafe';
import xlsx from 'node-xlsx'
import calendar_page from './pages/calendar_page';

const TESTDATE = '10/04/2023'

const TESTDATA = [
    {eventName: 'Earnings', eventCount: '27'},
    {eventName: 'Stock splits', eventCount: '20'},
    {eventName: 'IPO pricing', eventCount: '4'},
    {eventName: 'Economic events', eventCount: '33'}
    ]

fixture `Finance Calendar Tests`
    .page`https://uk.yahoo.com/`;



test('Check Finance Calendar Events', async t => {

    // GIVEN the yahoo home page
    await HomePage.acceptCookies()
    await t
        .expect(HomePage.pageTitle.exists).ok; 
    
    // WHEN a user checks the finance calander for <date>
    await t
        .click(HomePage.financeButton)
        .hover(YahooFinancePage.marketDataButton)
        .click(YahooFinancePage.marketDataButton);

    try {
        await t
        .click(YahooFinancePage.marketDataCalendarButton)
    }
    catch (err){
        await t.takeScreenshot('./screenshots/')
        throw new Error('Could not find calendar in dropdown')
    }
    
    await t
        .click(CalendarPage.dateDropDown)

    await CalendarPage.setDate(TESTDATE);

    
    // THEN the user can see there are <eventCount> <event> events 
    var actualEventText = ""
    var actualEventCount = ""
    for (var i = 0; i < TESTDATA.length; i++){
        var eventName = TESTDATA[i]['eventName']
        var eventCount = TESTDATA[i]['eventCount']

        actualEventText = await CalendarPage.getPillCount(eventName, TESTDATE);
        actualEventCount = actualEventText.replace(/\D/g, '');

        await t
        .expect(actualEventCount).eql(eventCount, `Expected ${eventCount} ${eventName} events, but instead the count is: ${actualEventCount}`)
    }


});



