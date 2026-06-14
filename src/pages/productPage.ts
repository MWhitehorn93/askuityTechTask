class productPage {

    get productContainer() {
        return $('[data-test="inventory-container"]');
    }

    get productFilterDropdown() {
        return $('[data-test="filter-category"]');
    }

    get sortDropdown() {
        return $('[data-test="sort-select"]');
    }

    get productNameElements() {
        return $$('[data-test="inventory-item-name"], .inventory_item_name');
    }

    get productPriceElements() {
        return $$('[data-test="inventory-item-price"], .inventory_item_price');
    }

    async selectSortByVisibleText(optionLabel: string): Promise<void> {
        await this.sortDropdown.selectByVisibleText(optionLabel);
    }

    async getDisplayedProductNames(): Promise<string[]> {
        const names = await (await this.productNameElements).map((element) => element.getText());
        return names.map((name) => name.trim()).filter((name) => name.length > 0);
    }

    async getDisplayedProductPrices(): Promise<number[]> {
        const prices = await (await this.productPriceElements).map((element) => element.getText());
        return prices
            .map((priceText) => Number(priceText.replace(/[^\d.]/g, "")))
            .filter((price) => Number.isFinite(price));
    }
}

export default new productPage();