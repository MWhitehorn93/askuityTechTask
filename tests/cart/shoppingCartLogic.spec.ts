import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { CartPage } from '../../pages/cartPage';
import testData from '../../data/testData.json' assert { type: 'json' };

const { name: blueTShirtName, price: blueTShirtValue } = testData.products.blueTShirt;
const { name: blackWhiteStripesTShirtName, price: blackWhiteStripesTShirtValue } = testData.products.blackWhiteStripesTShirt;

const filterSizeXS = 'XS';
const filterSizeML = 'ML';
const expectedNumberOfProductsAfterFilter = 3;

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Filter by size and products to cart and assert cart logic', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    // Apply size filters
    await homePage.filterBySize(filterSizeXS);
    await homePage.filterBySize(filterSizeML);

    // Assert number of products displayed after filtering
    await homePage.assertProductCount(expectedNumberOfProductsAfterFilter);
    const numberOfProducts = await homePage.getNumberOfProductsDisplayed();
    expect(numberOfProducts).toBe(expectedNumberOfProductsAfterFilter);

    // Remove filters
    await homePage.filterBySize(filterSizeXS);
    await homePage.filterBySize(filterSizeML);

    // Add products to cart
    await homePage.addProductsToCart(blueTShirtName);
    await homePage.addProductsToCart(blackWhiteStripesTShirtName);

    // Assert two distinct items in cart
    await cartPage.assertDistinctItemsInCart(2);

    // Increase quantity of Blue T-Shirt by 2
    await cartPage.increaseProductQuantity(blueTShirtName, 2);

    // Assert cart subtotal
    let subTotal = await cartPage.getCartSubtotal();
    expect(subTotal).toBe(blueTShirtValue * 3 + blackWhiteStripesTShirtValue);

    // Remove both products from cart one by one and assert cart is empty
    await cartPage.removeProductFromCart(blackWhiteStripesTShirtName);
    await cartPage.assertDistinctItemsInCart(1);
    await cartPage.removeProductFromCart(blueTShirtName);
    await cartPage.assertDistinctItemsInCart(0);
    subTotal = await cartPage.getCartSubtotal();
    expect(subTotal).toBe(0);
});