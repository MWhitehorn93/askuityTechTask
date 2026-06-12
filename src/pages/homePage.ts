class homePage {
    get shoppingCartIcon() {
        return $('[data-test="nav-cart"]');
    }

    addProductToCartButton(product: string) {
        return $(`[data-test="add-to-cart-${product}"]`);
    }

    async addProductToCartOpenCart(product: string) {
        await this.addProductToCartButton(product).click();
        await this.shoppingCartIcon.click();
    }
}

export default new homePage();