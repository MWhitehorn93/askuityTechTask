class productPage {

    get productContainer() {
        return $('[data-test="inventory-container"]');
    }
}

export default new productPage();