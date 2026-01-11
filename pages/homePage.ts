import { Page, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly url = 'https://automation-interview.vercel.app/';
    readonly addToCartButton;
    readonly productCountText;  


    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('button:has-text("Add to cart")');
        this.productCountText = page.locator('main >> text=Product(s) found');
    }

    async visit() {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    } 

    async filterBySize(size: 'XS' | 'S' | 'M' | 'ML' | 'L' | 'XL' | 'XXL') {
        await this.page.locator(`label:has-text("${size}")`).click();
    }

    async getNumberOfProductsDisplayed(): Promise<number> {
        return await this.addToCartButton.count();
    }

    async assertProductCount(expectedCount: number) {
        await expect(this.productCountText).toHaveText(`${expectedCount} Product(s) found`);
    }

    async addProductsToCart(productName: string) {
        const productCard = this.page.locator('main div', { has: this.page.locator(`p:text-is("${productName}")`) });
        const addToCartButton = productCard.locator(':scope > button:has-text("Add to cart")');
        await addToCartButton.click();
    }
}

