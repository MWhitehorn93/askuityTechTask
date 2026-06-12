import homePage from "../pages/homePage";
import cartPage from "../pages/cartPage";
import loginPage from "../pages/logInPage";
import testData from "../data/testData.json";

describe("Cart Functionality", () => {

    beforeEach(async () => {
        await loginPage.openLoginPage();
        await loginPage.successfulLoginUser(testData.users.swiftTester.username, testData.users.swiftTester.password);
    });

    it("Initial cart should be empty and user should be redirected to home page on clicking Continue Shopping", async () => {
        await homePage.shoppingCartIcon.click();
        await expect(cartPage.cartHeader).toHaveText("Your cart is empty");
        await expect(cartPage.continueShoppingButton).toHaveText("Continue Shopping");
        await cartPage.continueShoppingButton.click();
        await expect(browser).toHaveUrl('https://qa-task--oyettijon.replit.app/');
    });
});
