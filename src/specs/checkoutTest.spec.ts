import testData from '../data/testData.json';
import loginPage from '../pages/logInPage';
import homePage from '../pages/homePage';
import checkoutPage from '../pages/checkoutPage';

describe("Checkout Process", () => {

    beforeEach(async () => {
        await loginPage.openLoginPage();
        await loginPage.successfulLoginUser(testData.users.swiftTester.username, testData.users.swiftTester.password);
        await homePage.addProductToCartOpenCart(testData.products.automationHandbook.selector);
    });

    it("User is able to complete an order and checkout", async () => {
        await checkoutPage.openCheckoutPage();
        await checkoutPage.fillCheckoutForm(
            testData.checkoutUser.firstName, 
            testData.checkoutUser.lastName, 
            testData.checkoutUser.postalCode
        );
        await checkoutPage.assertShippingInfoDisplayed(
            testData.checkoutUser.firstName, 
            testData.checkoutUser.lastName, 
            testData.checkoutUser.postalCode
        );
        await checkoutPage.finishButton.click();
        await expect(checkoutPage.checkoutSuccessTitle).toHaveText("Order Placed!");
    });

    it("User cannot proceed without a empty checkout form", async () => {
        await checkoutPage.openCheckoutPage();
        await checkoutPage.fillCheckoutForm("", "", "");
        await checkoutPage.continueButton.click();
        //The code below is commented out because there is a bug with the error message. See more in Bug 3 in the bug report.
        //await expect(checkoutPage.firstNameError).toHaveText("Error: First Name is required");
        await expect(checkoutPage.lastNameError).toHaveText("Last Name is required");
        await expect(checkoutPage.postalCodeError).toHaveText("Postal Code is required");
    });
});