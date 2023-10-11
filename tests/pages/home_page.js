const { Selector, t } = require('testcafe') ;


class HomePage {
    constructor() {
        this.pageTitle = Selector('[id="ybar-logo"]');
        this.scrollButton = Selector('#scroll-down-btn')
        this.cookiesConsentPage = Selector('[id="consent-page"]');
        this.cookiesAgreeButton = Selector('[name="agree"]');
        this.signInButton = Selector('#ybarAccountProfile');
        this.financeButton = Selector('#root_7').withText('Finance')
        this.accountMenuButton = Selector('#ybarAccountMenuOpener')
        this.accountMenu = Selector('#ybarAccountMenuBody').child()


    }

    async acceptCookies() {
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
