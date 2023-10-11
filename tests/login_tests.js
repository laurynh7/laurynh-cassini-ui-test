import HomePage from './pages/home_page';
import LoginPage from './pages/login_page';

import { Selector} from 'testcafe';
import xlsx from 'node-xlsx'



fixture `Login Page Tests`
    .page`https://uk.yahoo.com/`;

const INCORRECTUSERNAMEMESSAGE = "Sorry, we don't recognise this email address."
const INCORRECTPASSWORDMESSAGE = 'Invalid password.'



function getLoginCredentials(testType, file_path){
    const workSheetsFromFile = xlsx.parse(`${file_path}`);
    const sheetOneData = workSheetsFromFile[0]['data']
    var credentials = []
    var user = {}
    for (let i = 1; i < sheetOneData.length; i++) {
        if (sheetOneData[i][0] == testType) {
            user = {
                username: sheetOneData[i][1],
                password: sheetOneData[i][2]
            }
            credentials.push(user)
        } 
    }
    
    return credentials
}


test('Login - Happy Path', async t => {

    const credentials = getLoginCredentials('happyPath', './tests/test_data/Credentials.xlsx')

    for (var i = 0; i < credentials.length; i++) {

        await t.expect(HomePage.pageTitle.exists).ok;
        await HomePage.acceptCookies();
        await t.click(HomePage.signInButton);
        
        try {
            await LoginPage.inputUsername(credentials[i]['username']);
        }
        catch (err) {
            await t.takeScreenshot('./screenshots/')
            throw new Error('Failed to enter username.') 
        }
        

        await LoginPage.clickRecaptcha();

        await LoginPage.inputPassword(credentials[i]['password']);

        try {
            await t.expect(HomePage.accountMenuButton.innerText).notEql('Sign in')
            await t.expect(HomePage.accountMenu.withExactText(credentials[i]['username']).exists).ok   
        } 
        catch {
            await t.takeScreenshot('./screenshots/')
            throw new Error('Failed to log in.') 
        }
    }  

});

test('Login - Error Path', async t => {

    const credentials = getLoginCredentials('errorPath', './tests/test_data/Credentials.xlsx')

    await t.expect(HomePage.pageTitle.exists).ok;
    await HomePage.acceptCookies();
    await t.click(HomePage.signInButton);

    for (var i = 0; i < credentials.length; i++) {

        await LoginPage.inputUsername(credentials[i]['username']);

        try {
            await t.expect(LoginPage.loginErrorMessage.exists).ok
        }
        catch (err) {
            await t.takeScreenshot('./screenshots/')
            throw new Error('Cannot find error message.') 
        }
        
        const actualErrorMessage = await LoginPage.loginErrorMessage.innerText
        await t.expect(actualErrorMessage)
                .eql(INCORRECTUSERNAMEMESSAGE, 
                `Error message incorrect, expected: \n${INCORRECTUSERNAMEMESSAGE} \n
                But got: \n${actualErrorMessage}\n`)
        
        
    }

});

test('Login - Error Path - Incorrect Password', async t => {

    const credentials = getLoginCredentials('errorPath2', './tests/test_data/Credentials.xlsx')

    await t.expect(HomePage.pageTitle.exists).ok;
    await HomePage.acceptCookies();
    await t.click(HomePage.signInButton);

    for (var i = 0; i < credentials.length; i++) {

        try {
            await LoginPage.inputUsername(credentials[i]['username']);
        }
        catch (err) {
            await t.takeScreenshot('./screenshots/')
            throw new Error('Failed to enter username.') 
        } 

        await LoginPage.clickRecaptcha();

        await LoginPage.inputPassword(credentials[i]['password']);

        try {
            await t.expect(LoginPage.passwordErrorMessage.exists).ok
        }
        catch (err) {
            await t.takeScreenshot('./screenshots/')
            throw new Error('Cannot find incorrect password error message.') 
        }
        
        const actualErrorMessage = await LoginPage.passwordErrorMessage.innerText
        console.log(actualErrorMessage)
        await t.expect(actualErrorMessage)
                .contains(INCORRECTPASSWORDMESSAGE, 
                `Password error message incorrect, expected: ${INCORRECTPASSWORDMESSAGE} \n
                But got: ${actualErrorMessage}\n`)
    }  

});





