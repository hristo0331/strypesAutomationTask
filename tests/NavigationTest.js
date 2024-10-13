import { Builder } from 'selenium-webdriver';
import { expect } from 'chai';
import NavigationPage from '../pages/NavigationPage.js';
import 'chromedriver';

describe('Navigation Tests', function () {
    this.timeout(15000);
    let driver;
    let navigationPage;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        navigationPage = new NavigationPage(driver);
        await navigationPage.open();
    });

    after(async function () {
        await navigationPage.deleteCookies();
        await driver.quit();
    });

    it('should navigate to the Customers page', async function () {
        await navigationPage.goToCustomersPage();
        const currentUrl = await navigationPage.getCurrentUrl(); 
        expect(currentUrl).to.equal('https://ict-strypes.eu/customers/'); 
    });

    it('should navigate to the Nearsurance page', async function () {
        await navigationPage.goToNearsurancePage();
        const currentUrl = await navigationPage.getCurrentUrl();
        expect(currentUrl).to.equal('https://ict-strypes.eu/nearsurance/'); 
    });
});
