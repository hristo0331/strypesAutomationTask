import { Builder, By, until, Key } from 'selenium-webdriver';
import { expect } from 'chai';
import SearchPage from '../pages/SearchPage.js';
import 'chromedriver';

describe('Search Page Tests', function () {
    let driver;
    let searchPage;

    this.timeout(15000);

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        searchPage = new SearchPage(driver);
        await searchPage.open();

        await driver.wait(until.elementLocated(By.xpath('//*[@id="header_pop"]/div/div/div/section[1]/div/div[2]/div/div/div/search/form/div[1]/i')), 5000);
    });

    after(async function () {
        await searchPage.deleteCookies();
        await driver.quit();
    });

    it('should search for a query', async function () {
        const searchQuery = 'automation';
        await searchPage.performSearch(searchQuery);

        await driver.wait(until.titleContains(searchQuery), 10000); 

        const pageTitle = await driver.getTitle();
        expect(pageTitle.toLowerCase()).to.include(searchQuery);
    });
});
