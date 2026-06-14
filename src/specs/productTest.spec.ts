import loginPage from "../pages/logInPage";
import testData from "../data/testData.json";
import productPage from "../pages/productPage";

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

const assertProductsInContainer = async (productNames: readonly string[]): Promise<void> => {
    await expect(productPage.productContainer).toBeDisplayed();

    for (const productName of productNames) {
        await expect(productPage.productContainer).toHaveText(productName, { containing: true });
    }
};

const assertStringsAreSorted = (values: readonly string[], direction: "asc" | "desc"): void => {
    const expected = [...values].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    if (direction === "desc") {
        expected.reverse();
    }

    expect(values).toEqual(expected);
};

const assertNumbersAreSorted = (values: readonly number[], direction: "asc" | "desc"): void => {
    const expected = [...values].sort((a, b) => a - b);
    if (direction === "desc") {
        expected.reverse();
    }

    expect(values).toEqual(expected);
};
    
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
        assertStringsAreSorted(namesAZ, "asc");

        await productPage.selectSortByVisibleText("Name: Z to A");
        const namesZA = await productPage.getDisplayedProductNames();
        expect(namesZA.length).toBeGreaterThan(0);
        assertStringsAreSorted(namesZA, "desc");

        await productPage.selectSortByVisibleText("Price: Low to High");
        const pricesLowHigh = await productPage.getDisplayedProductPrices();
        expect(pricesLowHigh.length).toBeGreaterThan(0);
        assertNumbersAreSorted(pricesLowHigh, "asc");

        await productPage.selectSortByVisibleText("Price: High to Low");
        const pricesHighLow = await productPage.getDisplayedProductPrices();
        expect(pricesHighLow.length).toBeGreaterThan(0);
        assertNumbersAreSorted(pricesHighLow, "desc");
    });
});