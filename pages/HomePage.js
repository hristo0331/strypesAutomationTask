import { By, until } from 'selenium-webdriver';

class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://ict-strypes.eu/';
    }

    async open() {
        await this.driver.get(this.url);
        await this.acceptCookies();
    }

    async getTitle() {
        return this.driver.getTitle();
    }

    async isNavLinkPresent(linkText) {
        const link = await this.driver.findElement(By.linkText(linkText));
        return link.isDisplayed();
    }

    async isImageDisplayed(imageSelector) {
        const image = await this.driver.findElement(By.css(imageSelector));
        return image.isDisplayed();
    }

    async goToInvalidURL() {
        await this.driver.get('https://ict-strypes.eu/homee');
    }

    async acceptCookies() {
        try {
            const acceptButton = await this.driver.wait(
                until.elementLocated(By.xpath("//button[contains(text(), 'Accept All')]")),
                5000
            );
            await this.driver.wait(until.elementIsVisible(acceptButton), 5000);

            await this.driver.executeScript("arguments[0].scrollIntoView(true);", acceptButton);

            await acceptButton.click();
            console.log("Cookies accepted successfully.");
        } catch (error) {
            console.error("Error accepting cookies: ", error);
        }
    }

    async deleteCookies() {
        await this.driver.manage().deleteAllCookies();
        console.log("Cookies deleted successfully.");
    }
}

export default HomePage;
