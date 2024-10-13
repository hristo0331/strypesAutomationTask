import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import HomePage from '../pages/HomePage.js';
import ContactPage from '../pages/ContactPage.js';
import 'chromedriver';

describe('Home Page Tests', function () {
    let driver;
    let homePage;
    let contactPage;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        homePage = new HomePage(driver);
        contactPage = new ContactPage(driver);
        await homePage.open();
    });

    after(async function () {
        await driver.quit();
    });

    it('should have the correct title', async function () {
        const title = await homePage.getTitle();
        expect(title).to.equal('ICT Strypes | End-to-end software solutions');
    });

    it('should display navigation links', async function () {
        const links = ['Home', 'Services'];
        for (const link of links) {
            const isPresent = await homePage.isNavLinkPresent(link);
            expect(isPresent).to.be.true;
        }
    });

    it('should display the main image', async function () {
        const isImageDisplayed = await homePage.isImageDisplayed('img[class="attachment-large size-large wp-image-3313"]');
        expect(isImageDisplayed).to.be.true;
    });

    it('should display 404 error for incorrect URL', async function () {
        await homePage.goToInvalidURL();
        const errorMessage = await driver.findElement(By.tagName('h1')).getText();
        expect(errorMessage).to.include('Page not found');  
    });    
});
