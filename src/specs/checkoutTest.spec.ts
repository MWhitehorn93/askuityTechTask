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

});