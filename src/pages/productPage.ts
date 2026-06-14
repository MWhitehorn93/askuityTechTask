class productPage {

    get productContainer() {
        return $('[data-test="inventory-container"]');
    }

    get productFilterDropdown() {
        return $('[data-test="filter-category"]');
    }

}

export default new productPage();