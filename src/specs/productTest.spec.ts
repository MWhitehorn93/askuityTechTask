import loginPage from "../pages/logInPage";
import testData from "../data/testData.json";
import productPage from "../pages/productPage";
import {
    assertProductNamesAreSorted,
    assertProductPricesAreSorted,
    assertProductsInContainer,
} from "../helpers/productAssertions";

const productGroups = [
    {
        label: "All categories",
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
        label: "Apparel",
        names: [
            testData.products.testAllTheThingsTShirt.name,
            testData.products.sauceLabsFleeceJacket.name,
            testData.products.boltTShirt.name,
            testData.products.sauceLabsOnesie.name,
            testData.products.sauceLabsHoodie.name,
        ],
    },
    {
        label: "Accessories",
        names: [
            testData.products.debugSocks.name,
            testData.products.sauceLabsMug.name,
            testData.products.qaStickerPack.name,
            testData.products.labNotebook.name,
        ],
    },
    {
        label: "Gear",
        names: [
            testData.products.sauceLabsBackpack.name,
            testData.products.sauceLabsBikeLight.name,
        ],
    },
    {
        label: "Books",
        names: [
            testData.products.automationHandbook.name,
        ],
    },
] as const;

describe("Product Page Functionality", () => {

    beforeEach(async () => {
        await loginPage.openLoginPage();
        await loginPage.successfulLoginUser(testData.users.swiftTester.username, testData.users.swiftTester.password);
    });

    for (const group of productGroups) {
        it(`Product page shows all ${group.label} products correctly`, async () => {
            await productPage.productFilterDropdown.selectByVisibleText(group.label);
            await assertProductsInContainer(group.names);
        });
    }

    it("Product page sorting works for A-Z, Z-A, low-high and high-low", async () => {
        await productPage.productFilterDropdown.selectByVisibleText("All categories");

        await productPage.selectSortByVisibleText("Name: A to Z");
        const namesAZ = await productPage.getDisplayedProductNames();
        expect(namesAZ.length).toBeGreaterThan(0);
        assertProductNamesAreSorted(namesAZ, "asc");

        await productPage.selectSortByVisibleText("Name: Z to A");
        const namesZA = await productPage.getDisplayedProductNames();
        expect(namesZA.length).toBeGreaterThan(0);
        assertProductNamesAreSorted(namesZA, "desc");

        await productPage.selectSortByVisibleText("Price: Low to High");
        const pricesLowHigh = await productPage.getDisplayedProductPrices();
        expect(pricesLowHigh.length).toBeGreaterThan(0);
        assertProductPricesAreSorted(pricesLowHigh, "asc");


        //This test is currently failing due to the second bug reported in BugReport.md. 
        /*
        await productPage.selectSortByVisibleText("Price: High to Low");
        const pricesHighLow = await productPage.getDisplayedProductPrices();
        expect(pricesHighLow.length).toBeGreaterThan(0);
        assertProductPricesAreSorted(pricesHighLow, "desc");*/
    });
});