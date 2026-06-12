class checkoutPage {

    get checkoutButton() {
        return $('[data-test="checkout-button"]');
    }

    async openCheckoutPage() {
        this.checkoutButton.click();
        await expect(browser).toHaveUrl('https://qa-task--oyettijon.replit.app/checkout');
    }

}

export default new checkoutPage();