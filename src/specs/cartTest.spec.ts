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

    it("Cart Pricing is correct when cart item is increased", async () => {
        await homePage.addProductToCartOpenCart(testData.products.automationHandbook.selector);
        await expect(cartPage.cartItem(testData.products.automationHandbook.name)).toBeDisplayed();
        
        await cartPage.increaseItemQuantityButton(testData.products.automationHandbook.ID, 1);
        await expect(cartPage.cartItemQuauntity(testData.products.automationHandbook.ID)).toHaveText("2");
        const expectedTotalPrice = await cartPage.calculateCartItemPrice(testData.products.automationHandbook.ID, 
            testData.products.automationHandbook.price, 
            testData.taxRate);
        await expect(cartPage.totalPrice).toHaveText(`$${expectedTotalPrice.toFixed(2)}`);

        
    });

    it("Cart Pricing is correct when cart items are decreased", async () => {
        await homePage.addProductToCartOpenCart(testData.products.automationHandbook.selector);
        await expect(cartPage.cartItem(testData.products.automationHandbook.name)).toBeDisplayed();

        await cartPage.increaseItemQuantityButton(testData.products.automationHandbook.ID, 1);

        await cartPage.decreaseItemQuantityButton(testData.products.automationHandbook.ID, 1);
        await expect(cartPage.cartItemQuauntity(testData.products.automationHandbook.ID)).toHaveText("1");
        const expectedTotalPriceAfterDecrease = await cartPage.calculateCartItemPrice(testData.products.automationHandbook.ID, 
            testData.products.automationHandbook.price, 
            testData.taxRate);
        await expect(cartPage.totalPrice).toHaveText(`$${expectedTotalPriceAfterDecrease.toFixed(2)}`);
    });

    it('Cart Pricing is correct when multiple items are added', async () => {
        await homePage.addProductToCartButton(testData.products.automationHandbook.selector).click();
        await homePage.addProductToCartOpenCart(testData.products.debugSocks.selector);
        await homePage.shoppingCartIcon.click();

        await expect(cartPage.cartItem(testData.products.automationHandbook.name)).toBeDisplayed();
        await expect(cartPage.cartItem(testData.products.debugSocks.name)).toBeDisplayed();

        const subTotal =
            testData.products.automationHandbook.price +
            testData.products.debugSocks.price;
        const expectedTotalPrice = subTotal *  (1 + testData.taxRate);

        await expect(cartPage.totalPrice).toHaveText(`$${expectedTotalPrice.toFixed(2)}`);

    });
});
