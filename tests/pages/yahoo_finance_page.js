const { Selector, t } = require('testcafe') ;


class YahooFinancePage {
    constructor() {
        this.marketDataButton = Selector('[title="Market Data"]');
        this.cryptoButton = Selector('[title="Crypto"]');
        this.marketDataCalendarButton = Selector('a[title="Calendar"]');
    }
}

export default new YahooFinancePage();
