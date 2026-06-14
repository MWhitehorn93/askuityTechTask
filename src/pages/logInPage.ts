class loginPage {

    get usernameInput() {
        return $('#user-name');
    }

    get passwordInput() {
        return $('#password');
    }

    get loginButton() {
        return $('#login-button');
    }


    async openLoginPage() {
        await browser.url('/login');
    }

    async successfulLoginUser(username: string, password: string) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click(); 
        await expect(browser).toHaveUrl(/\/$/);
    }

    async invalidLoginUser(username: string, password: string) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click(); 
        await expect(browser).toHaveUrl(/\/login$/);
    }

}
export default new loginPage();