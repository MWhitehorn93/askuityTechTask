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
        await browser.url('https://qa-task--oyettijon.replit.app/login');
    }

    async successfulLoginUser(username: string, password: string) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click(); 
        await expect(browser).toHaveUrl('https://qa-task--oyettijon.replit.app/');
    }

    async invalidLoginUser(username: string, password: string) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click(); 
        await expect(browser).toHaveUrl('https://qa-task--oyettijon.replit.app/login');
    }

}
export default new loginPage();