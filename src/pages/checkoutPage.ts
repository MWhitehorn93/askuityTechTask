class checkoutPage {

    get checkoutButton() {
        return $('[data-test="checkout-button"]');
    }

    get firstNameInput() {
        return $('[data-test="checkout-first-name"]');
    }

    get lastNameInput() {
        return $('[data-test="checkout-last-name"]');
    }

    get postalCodeInput() {
        return $('[data-test="checkout-postal-code"]');
    }

    get continueButton() {
        return $('[data-test="continue-to-summary"]');
    }

    get shippingInfo() {
        return $('[data-test="shipping-info"]');
    }

    get finishButton() {
        return $('[data-test="finish-button"]');
    }

    get checkoutSuccessTitle() {
        return $('[data-test="checkout-success-title"]');
    }

    async openCheckoutPage() {
        await this.checkoutButton.click();
        await expect(browser).toHaveUrl('https://qa-task--oyettijon.replit.app/checkout');
    }

    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.postalCodeInput.setValue(postalCode);
        await this.continueButton.click();
    }

    async assertShippingInfoDisplayed(firstName: string, lastName: string, postalCode: string) {
        await expect(this.shippingInfo).toHaveText(firstName, { containing: true });
        await expect(this.shippingInfo).toHaveText(lastName, { containing: true });
        await expect(this.shippingInfo).toHaveText(postalCode, { containing: true });
    }
}

export default new checkoutPage();