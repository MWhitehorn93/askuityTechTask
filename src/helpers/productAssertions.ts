import productPage from "../pages/productPage";

export const assertProductsInContainer = async (productNames: readonly string[]): Promise<void> => {
    await expect(productPage.productContainer).toBeDisplayed();

    for (const productName of productNames) {
        await expect(productPage.productContainer).toHaveText(productName, { containing: true });
    }
};

export const assertProductNamesAreSorted = (values: readonly string[], direction: "asc" | "desc"): void => {
    const expected = [...values].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    if (direction === "desc") {
        expected.reverse();
    }

    expect(values).toEqual(expected);
};

export const assertProductPricesAreSorted = (values: readonly number[], direction: "asc" | "desc"): void => {
    const expected = [...values].sort((a, b) => a - b);
    if (direction === "desc") {
        expected.reverse();
    }

    expect(values).toEqual(expected);
};