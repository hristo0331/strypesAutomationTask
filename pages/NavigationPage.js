import { By } from 'selenium-webdriver';
import HomePage from './HomePage.js';

class NavigationPage extends HomePage {
    constructor(driver) {
        super(driver);
    }

    async open() {
        await this.driver.get(this.url);
        await this.acceptCookies();
    }

    async goToCustomersPage() {
        const customersLink = await this.driver.findElement(By.linkText('Customers'));
        await customersLink.click();
    }

    async goToNearsurancePage() {
        const nearsuranceLink = await this.driver.findElement(By.linkText('Nearsurance'));
        await nearsuranceLink.click();
    }

    async getCurrentUrl() {
        return this.driver.getCurrentUrl();
    }
}

export default NavigationPage;
