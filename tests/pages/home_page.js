const { Selector, t } = require('testcafe') ;


class HomePage {
    constructor() {
        this.pageTitle = Selector('[id="ybar-logo"]');
        this.scrollButton = Selector('#scroll-down-btn')
        this.cookiesConsentPage = Selector('[id="consent-page"]');
        this.cookiesAgreeButton = Selector('[name="agree"]');
        this.login_button = Selector('#ybarAccountProfile');
        this.financeButton = Selector('#root_7')

    }

    async navigate_to_page(page){
        await t.navigateTo(page)
    }


    async accept_cookies() {
        if (await this.cookiesConsentPage.exists) {
            if (await this.scrollButton.exists) {
                await t
                .click(this.scrollButton) 
            }
            await t
                .click(this.cookiesAgreeButton)
                .expect(this.cookiesConsentPage.exists).notOk;
        }
        
    }
}


export default new HomePage();
