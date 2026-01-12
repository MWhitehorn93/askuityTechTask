import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { CartPage } from '../../pages/cartPage';
import testData from '../../data/testData.json' assert { type: 'json' };

const { name, price } = testData.products.blueTShirt;

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Add a product to cart and then remove it, asserting the cart is empty', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    // Add Blue T-Shirt to cart
    await homePage.addProductsToCart(name);

    // Assert one distinct item in cart and value
    await cartPage.assertDistinctItemsInCart(1);
    let subTotal = await cartPage.getCartSubtotal();
    expect(subTotal).toBe(price);
    
    //Add two more items of the same product
    await cartPage.increaseProductQuantity(name, 2);

    // Assert three items in cart and value
    subTotal = await cartPage.getCartSubtotal();
    expect(subTotal).toBe(price * 3);
    // Reduce quantity back to one
    await cartPage.reduceProductQuantity(name, 2);

    // Assert one item in cart and value
    subTotal = await cartPage.getCartSubtotal();
    expect(subTotal).toBe(price);
    // Assert reduce button is disabled
    await cartPage.assertReducedQuantityButtonDisabled(name);

    // Remove product from cart and assert cart is empty
    await cartPage.removeProductFromCart(name);
    await cartPage.assertDistinctItemsInCart(0);
    subTotal = await cartPage.getCartSubtotal();
    expect(subTotal).toBe(0);
})

