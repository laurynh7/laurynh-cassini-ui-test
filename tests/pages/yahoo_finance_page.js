const { Selector, t } = require('testcafe') ;


class YahooFinancePage {
    constructor() {
        this.marketDataButton = Selector('div[title="Market Data"]');
        this.marketDataCalendarButton = Selector('a[title="Calendar"]', { visibilityCheck: true });
    }
}

export default new YahooFinancePage();
