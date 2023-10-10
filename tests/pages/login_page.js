import { Selector, t } from 'testcafe';

class LoginPage{
    constructor() {
        this.login_page = Selector('#login-body')
        this.login_input = Selector('#login-username')
        this.login_button = Selector('#login-signin')
        this.password_input = Selector('#login-passwd')
    }

    async input_username(username){
        await t
            .typeText(this.login_input, username)
            .click(this.login_button)
            
    }

    async input_password(password){
        await t
            .typeText(this.password_input, pasword)
            .click(this.login_button)
    }

    async click_recaptcha(){
        if (await Selector('#recaptcha-challenge').exists){
            await t
                .switchToIframe(Selector('#recaptcha-iframe'))
                .switchToIframe(Selector('[title="reCAPTCHA"]'))
                .click(Selector('div.recaptcha-checkbox-border'));
            }
        }
}

export default new LoginPage();