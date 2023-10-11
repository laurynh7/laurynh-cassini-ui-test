import { Selector, t } from 'testcafe';

class LoginPage{
    constructor() {
        this.loginInput = Selector('#login-username')
        this.loginButton = Selector('#login-signin')
        this.passwordInput = Selector('#login-passwd')
        this.loginErrorMessage = Selector('#username-error')
        this.passwordErrorMessage = Selector('.error-msg')
        this.yahooLogo = Selector(".logo")
    }

    async inputUsername(username){
        await t
            .typeText(this.loginInput, username)
            .click(this.loginButton)
            
    }

    async inputPassword(password){
        await t
            .typeText(this.passwordInput, password)
            .click(this.loginButton)
    }

    async clickRecaptcha(){
        if (await Selector('#recaptcha-challenge').exists){
            await t
                .switchToIframe(Selector('#recaptcha-iframe'))
                .switchToIframe(Selector('[title="reCAPTCHA"]'))
                .click(Selector('div.recaptcha-checkbox-border'));
            }
        }
}

export default new LoginPage();