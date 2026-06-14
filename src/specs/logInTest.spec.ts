import loginPage from "../pages/logInPage";
import testData from "../data/testData.json";

describe("Login functionality", () => {

    beforeEach(async () => {
        await loginPage.openLoginPage();
    });

    const successfulLoginData = [
        { username: testData.users.swiftTester.username, password: testData.users.swiftTester.password },
        { username: testData.users.buggyAgent.username, password: testData.users.buggyAgent.password },
        { username: testData.users.mirageUser.username, password: testData.users.mirageUser.password }
    ];

    for (const { username, password } of successfulLoginData) {
        it(`User ${username} can login`, async () => {
            await loginPage.successfulLoginUser(username, password);
        });
    }

    it("User with invalid credentials cannot login", async () => {
        await loginPage.invalidLoginUser(testData.users.vaultLocked.username, testData.users.vaultLocked.password);
    });
});     