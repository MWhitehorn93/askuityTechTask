import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { CartPage } from '../../pages/cartPage';

const blueTShirtName = 'Blue T-Shirt';
const blueTShirtValue = 9.00;

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Add a product to cart and then remove it, asserting the cart is empty', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    // Add Blue T-Shirt to cart
    await homePage.addProductsToCart(blueTShirtName);

    // Assert one distinct item in cart and value
    await cartPage.assertDistinctItemsInCart(1);
    let subTotal = await cartPage.getCartSubtotal();
    expect(subTotal).toBe(blueTShirtValue);
    
    //Add two more items of the same product
    await cartPage.increaseProductQuantity(blueTShirtName, 2);

    // Assert three items in cart and value
    subTotal = await cartPage.getCartSubtotal();
    expect(subTotal).toBe(blueTShirtValue * 3);

    // Reduce quantity back to one
    await cartPage.reduceProductQuantity(blueTShirtName, 2);

    // Assert one item in cart and value
    subTotal = await cartPage.getCartSubtotal();
    expect(subTotal).toBe(blueTShirtValue);

    // Assert reduce button is disabled
    await cartPage.assertReducedQuantityButtonDisabled(blueTShirtName);

    // Remove product from cart and assert cart is empty
    await cartPage.removeProductFromCart(blueTShirtName);
    await cartPage.assertDistinctItemsInCart(0);
    subTotal = await cartPage.getCartSubtotal();
    expect(subTotal).toBe(0);
})

