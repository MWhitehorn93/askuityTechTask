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

    it("User ia able to order a product and ", async () => {
        await checkoutPage.openCheckoutPage();
    });

});