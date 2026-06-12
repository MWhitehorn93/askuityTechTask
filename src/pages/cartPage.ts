class cartPage {
    get cartHeader() {
        return $('[data-test="cart-empty-title"]');
    }

    get continueShoppingButton() {
        return $('[data-test="continue-shopping"]');
    }
}
export default new cartPage();