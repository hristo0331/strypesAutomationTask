import { By } from 'selenium-webdriver';
import HomePage from './HomePage.js';

class ContactPage extends HomePage {
    constructor(driver) {
        super(driver); 
    }

    async open() {
        await this.driver.get('https://ict-strypes.eu/contact/');
        await this.acceptCookies();
    }

    async closeChatWidget() {
        try {
            const closeButton = await this.driver.findElement(By.css('[data-test-id="initial-message-close-button"]'));
            await closeButton.click();
            console.log("Chat widget closed successfully.");
        } catch (error) {
            console.log("Chat widget not found or already closed.");
        }
    }

    async fillField(id, value) {
        await this.driver.findElement(By.id(id)).sendKeys(value);
    }

    async submitContactForm(firstName, lastName, email, companyName, message) {
        await this.fillField('firstname-9246f6ce-b893-4249-8362-96d17c0861f5', firstName);
        await this.fillField('lastname-9246f6ce-b893-4249-8362-96d17c0861f5', lastName);
        await this.fillField('email-9246f6ce-b893-4249-8362-96d17c0861f5', email);
        await this.fillField('company-9246f6ce-b893-4249-8362-96d17c0861f5', companyName);
        await this.fillField('message-9246f6ce-b893-4249-8362-96d17c0861f5', message);
        
        // check-box
        await this.driver.findElement(By.id("LEGAL_CONSENT.subscription_type_4681882-9246f6ce-b893-4249-8362-96d17c0861f5")).click();

        // send button
        await this.driver.findElement(By.css("input[type='submit'][value='SEND']")).click();
    }

}

export default ContactPage;


