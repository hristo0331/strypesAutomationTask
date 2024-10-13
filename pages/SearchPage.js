import { By, Key } from 'selenium-webdriver';
import HomePage from './HomePage.js';

class SearchPage extends HomePage {
    constructor(driver) {
        super(driver);
    }

    async open() {
        await this.driver.get(this.url);
        await this.acceptCookies();
    }

    async performSearch(query) {
        await this.driver.findElement(By.xpath('//*[@id="header_pop"]/div/div/div/section[1]/div/div[2]/div/div/div/search/form/div[1]/i')).click();
        
        const searchField = await this.driver.findElement(By.id(`elementor-search-form-5295a54a`));
        await searchField.sendKeys(query);
        await searchField.sendKeys(Key.ENTER);
    }
}

export default SearchPage;
