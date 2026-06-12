class homePage {
    get shoppingCartIcon() {
        return $('[data-test="nav-cart"]');
    }
}

export default new homePage();