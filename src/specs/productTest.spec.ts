import homePage from "../pages/homePage";
import cartPage from "../pages/cartPage";
import loginPage from "../pages/logInPage";
import testData from "../data/testData.json";

describe("Product Page Functionality", () => {

    beforeEach(async () => {
        await loginPage.openLoginPage();
        await loginPage.successfulLoginUser(testData.users.swiftTester.username, testData.users.swiftTester.password);
    });

    it("Product page shows all products correctly", async () => {
        
    });
});