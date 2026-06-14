class cartPage {
    get cartHeader() {
        return $('[data-test="cart-empty-title"]');
    }

    get continueShoppingButton() {
        return $('[data-test="continue-shopping"]');
    }

    get subtotalPrice() {
        return $('[data-test="cart-subtotal"]');
    }

    get taxPrice() {
        return $('[data-test="cart-tax"]');
    }

    get totalPrice() {
        return $('[data-test="cart-total"]');
    }

    cartItem(productName: string) {
        return $(
            `//*[@data-test="cart-item"][contains(normalize-space(.), "${productName}")]`
        );
    }

    async increaseItemQuantityButton(productID: string, clicks: number = 1) {
        const increaseButton = await $(`[data-test="increase-qty-item-${productID}"]`);
        for (let i = 0; i < clicks; i++) {
            await increaseButton.click();
        }
    }
    
    async decreaseItemQuantityButton(productID: string, clicks: number = 1) {
        const decreaseButton = await $(`[data-test="decrease-qty-item-${productID}"]`);
        for (let i = 0; i < clicks; i++) {
            await decreaseButton.click();
        }
    }
    
    cartItemQuantity(productID: string) {
        return $(`[data-test="quantity-item-${productID}"]`);
    }

    async calculateCartItemPrice(productID: string, productPrice: number, taxRate: number) {
        const quantityText = await this.cartItemQuantity(productID).getText();
        const quantity = parseInt(quantityText);
        
        const unitPrice = productPrice;
        const subtotal = quantity * unitPrice;
        const tax = subtotal * taxRate;
        return subtotal + tax;
    }

    async calculateCartTotalPrice(
        items: Array<{ productID: string; productPrice: number }>,
        taxRate: number
    ) {
        let subtotal = 0;

        for (const item of items) {
            const quantityText = await this.cartItemQuantity(item.productID).getText();
            const quantity = parseInt(quantityText, 10);
            subtotal += quantity * item.productPrice;
        }

        const tax = subtotal * taxRate;
        return subtotal + tax;
    }
}
export default new cartPage();