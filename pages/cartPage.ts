import { Page, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    
    async assertDistinctItemsInCart(expectedCount: number) {
        const cartIncrementButtons = this.page.getByRole('button', { name: '+' });
        const numberOfItems = await cartIncrementButtons.count();
        expect(numberOfItems).toBe(expectedCount);
    }

    async increaseProductQuantity(productName: string, times: number) {
        const cartItem = this.page.getByRole('img', { name: productName }).locator('..');
        const incrementButton = cartItem.getByRole('button', { name: '+' });

            for (let i = 0; i < times; i++) {
                await incrementButton.click();
        }
    }

    async reduceProductQuantity(productName: string, times: number) {
        const cartItem = this.page.getByRole('img', { name: productName }).locator('..');
        const incrementButton = cartItem.getByRole('button', { name: '-' });

            for (let i = 0; i < times; i++) {
                await incrementButton.click();
        }
    }

    async assertReducedQuantityButtonDisabled(productName: string) {
        const cartItem = this.page.getByRole('img', { name: productName }).locator('..');
        const reduceButton = cartItem.getByRole('button', { name: '-' });
        await expect(reduceButton).toBeDisabled();
    }   

    async getCartSubtotal(): Promise<number> {
        const subtotalContainer = this.page.locator('p', { hasText: 'SUBTOTAL' }).locator('..');
        const subtotalText = await subtotalContainer.locator('p', { hasText: '$' }).first().textContent();

        if (!subtotalText) throw new Error('Subtotal amount not found in cart');
        const value = parseFloat(subtotalText.replace('$', '').trim());
        return value;
    }

async removeProductFromCart(productName: string) {
        const cartItem = this.page.getByRole('img', { name: productName }).locator('..');
        const removeButton = cartItem.getByRole('button', { name: 'remove product from cart' });
        await removeButton.click();
        await expect(cartItem).toHaveCount(0);
    }
}