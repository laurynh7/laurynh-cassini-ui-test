import HomePage from './pages/home_page';
import YahooFinancePage from './pages/yahoo_finance_page'
import CalendarPage from './pages/calendar_page'

import { Selector} from 'testcafe';
import xlsx from 'node-xlsx'
import calendar_page from './pages/calendar_page';



fixture `Login Page Tests`
    .page`https://uk.yahoo.com/`;



test('Test1', async t => {

    await HomePage.accept_cookies()
    await t
        .expect(HomePage.pageTitle.exists).ok; 
        
    await t
        .click(HomePage.financeButton)
        .hover(YahooFinancePage.cryptoButton)
        .hover(YahooFinancePage.marketDataButton)
        .expect(YahooFinancePage.marketDataCalendarButton).ok;

    await t
        .click(YahooFinancePage.marketDataCalendarButton)

    await CalendarPage.set_date('04/10/2023');


 
    

    // for (i = 0; i < credentials; i++) {
    //     await t.expect(HomePage.pageTitle.exists).ok;
    // await HomePage.accept_cookies();
    // await t.click(HomePage.login_button);

    // await LoginPage.input_username(credentials[i][username]);
    // await LoginPage.click_recaptcha();
    // // await t
    // //     .switchToIframe(Selector('#recaptcha-iframe'))
    // //     .debug();
    // await LoginPage.input_password(credentials[i]['password']);
    // }
    
    

});



