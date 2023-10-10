import HomePage from './pages/home_page';
import LoginPage from './pages/login_page';

import { Selector} from 'testcafe';
import xlsx from 'node-xlsx'



fixture `Login Page Tests`
    .page`https://uk.yahoo.com/`;



function getLoginCredentials(file_path){
    console.log('step 1')
    const workSheetsFromFile = xlsx.parse(`${file_path}`);
    const sheetOneData = workSheetsFromFile[0]['data']
    var credentials = []
    var user = {}
    for (let i = 1; i < sheetOneData.length; i++) {
        user = {
            username: sheetOneData[i][0],
            password: sheetOneData[i][1]
        }
        credentials.push(user)
    }
    
    return credentials
}



test('Test1', async t => {

    const credentials = getLoginCredentials('./tests/test_data/Credentials.xlsx')

    for (i = 0; i < credentials; i++) {
        await t.expect(HomePage.pageTitle.exists).ok;
    await HomePage.accept_cookies();
    await t.click(HomePage.login_button);

    await LoginPage.input_username(credentials[i][username]);
    await LoginPage.click_recaptcha();
    // await t
    //     .switchToIframe(Selector('#recaptcha-iframe'))
    //     .debug();
    await LoginPage.input_password(credentials[i]['password']);
    }
    
    

});



