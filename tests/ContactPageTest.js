import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import ContactPage from '../pages/ContactPage.js';
import 'chromedriver';
import { after, beforeEach } from 'mocha';

describe('Contact Page Tests', function () {
    let driver;
    let contactPage;
    
    this.timeout(20000); 

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        contactPage = new ContactPage(driver);
    });

    after(async function () {
        await driver.quit();
    });

    beforeEach(async function () {        
        await contactPage.open();
    });

    afterEach(async function () {
        await contactPage.deleteCookies();
    });

    it('should show error when email is missing', async function () {
        await contactPage.submitContactForm('Христо', 'Христов', '', 'Тест', 'Тест');
        
        const emailErrorMessage = await driver.wait(
            until.elementLocated(By.css('.hs-error-msg')),
            5000
        );
        const errorMessageText = await emailErrorMessage.getText();
        expect(errorMessageText).to.equal('Please complete this required field.');
    });

    it('should show error for invalid email', async function () {
        await contactPage.submitContactForm('Христо', 'Христов', 'invalid-email', 'Тест', 'Тест');  // Invalid mail
        
        const emailErrorMessage = await driver.wait(
            until.elementLocated(By.css('.hs-error-msg')),
            5000
        );
        const errorMessageText = await emailErrorMessage.getText();
        expect(errorMessageText).to.equal('Email must be formatted correctly.');
    });

    it('should submit the form when email is valid', async function () {
        await contactPage.submitContactForm('Христо', 'Христов', 'hristo3103@gmail.com', 'Тест', 'Тест');  // Valid mail

        const successMessageElement = await driver.wait(
            until.elementLocated(By.className('submitted-message')),
            10000
        );

        await driver.wait(until.elementIsVisible(successMessageElement), 10000);
        const successMessage = await successMessageElement.getText();
        expect(successMessage).to.include('Thank you for submitting the form.');
    });
});
