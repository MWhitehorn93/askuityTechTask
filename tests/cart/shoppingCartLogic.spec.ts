import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { CartPage } from '../../pages/cartPage';

const filterSizeXS = 'XS';
const filterSizeML = 'ML';
const expectedNumberOfProductsAfterFilter = 3;
const blueTShirtName = 'Blue T-Shirt';
const blackWhiteStripesTShirtName = 'Black T-shirt with white stripes';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Filter by size and products to cart and assert cart logic', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.filterBySize(filterSizeXS);
    await homePage.filterBySize(filterSizeML);

    await homePage.assertProductCount(expectedNumberOfProductsAfterFilter);

    const numberOfProducts = await homePage.getNumberOfProductsDisplayed();
    expect(numberOfProducts).toBe(expectedNumberOfProductsAfterFilter);


    await homePage.filterBySize(filterSizeXS);
    await homePage.filterBySize(filterSizeML);


    await homePage.addProductsToCart(blueTShirtName);
    await homePage.addProductsToCart(blackWhiteStripesTShirtName);

    await cartPage.assertDistinctItemsInCart(2);

    await page.pause();

    await cartPage.increaseProductQuantity(blueTShirtName, 2);

    let subTotal = await cartPage.getCartSubtotal();
    expect(subTotal).toBe(41.90);

    await cartPage.removeProductFromCart(blackWhiteStripesTShirtName);
    await cartPage.assertDistinctItemsInCart(1);
    await cartPage.removeProductFromCart(blueTShirtName);
    await cartPage.assertDistinctItemsInCart(0);
    
    subTotal = await cartPage.getCartSubtotal();
    expect(subTotal).toBe(0);
});