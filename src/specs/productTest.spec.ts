import loginPage from "../pages/logInPage";
import testData from "../data/testData.json";
import productPage from "../pages/productPage";

const productGroups = [
    {
        label: "all",
        names: [
            testData.products.automationHandbook.name,
            testData.products.sauceLabsBackpack.name,
            testData.products.sauceLabsBikeLight.name,
            testData.products.boltTShirt.name,
            testData.products.debugSocks.name,
            testData.products.sauceLabsFleeceJacket.name,
            testData.products.sauceLabsHoodie.name,
            testData.products.sauceLabsOnesie.name,
            testData.products.testAllTheThingsTShirt.name,
            testData.products.labNotebook.name,
            testData.products.qaStickerPack.name,
            testData.products.sauceLabsMug.name,
        ],
    },
    {
        label: "apparel",
        names: [
            testData.products.testAllTheThingsTShirt.name,
            testData.products.sauceLabsFleeceJacket.name,
            testData.products.boltTShirt.name,
            testData.products.sauceLabsOnesie.name,
            testData.products.sauceLabsHoodie.name,
        ],
    },
    {
        label: "accessory",
        names: [
            testData.products.automationHandbook.name,
            testData.products.debugSocks.name,
            testData.products.sauceLabsMug.name,
            testData.products.qaStickerPack.name,
        ],
    },
    {
        label: "gear",
        names: [
            testData.products.sauceLabsBackpack.name,
            testData.products.sauceLabsBikeLight.name,
        ],
    },
    {
        label: "book",
        names: [
            testData.products.labNotebook.name,
        ],
    },
] as const;

const assertProductsInContainer = async (productNames: readonly string[]): Promise<void> => {
    await expect(productPage.productContainer).toBeDisplayed();

    for (const productName of productNames) {
        await expect(productPage.productContainer).toHaveText(productName, { containing: true });
    }
};
    
describe("Product Page Functionality", () => {

    beforeEach(async () => {
        await loginPage.openLoginPage();
        await loginPage.successfulLoginUser(testData.users.swiftTester.username, testData.users.swiftTester.password);
    });

    for (const group of productGroups) {
        it(`Product page shows all ${group.label} products correctly`, async () => {
            await assertProductsInContainer(group.names);
        });
    }
});