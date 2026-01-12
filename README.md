# Automation Test: Add and Remove Product from Cart

## Test Name
**Add a product to cart and then remove it, asserting the cart is empty**

## Test Objective
Verify the core shopping cart functionality:
1. Adding a product to the cart.
2. Increasing and decreasing its quantity.
3. Ensuring the subtotal updates correctly.
4. Ensuring reduce quantity button is disabled when product quantity is 1
4. Removing the product and confirming the cart is empty.

## Test Steps
1. **Add Product to Cart**
   - Adds the product **Blue T-Shirt** to the cart using `HomePage.addProductsToCart()`.
   
2. **Assert Cart Contains One Item**
   - Asserts that there is **1 distinct item** in the cart using `CartPage.assertDistinctItemsInCart(1)`.
   - Verifies the subtotal equals the price of one Blue T-Shirt using `CartPage.getCartSubtotal()`.

3. **Increase Product Quantity**
   - Clicks the **(+)** button twice to increase quantity to 3 using `CartPage.increaseProductQuantity()`.
   - Asserts that subtotal equals `price * 3`.

4. **Reduce Product Quantity**
   - Clicks the **(-)** button twice to reduce quantity back to 1 using `CartPage.reduceProductQuantity()`.
   - Asserts that subtotal equals the price of one Blue T-Shirt.

5. **Check Reduce Button Disabled**
   - Ensures the reduce **(-)** button is disabled when quantity is 1 using `CartPage.assertReducedQuantityButtonDisabled()`.

6. **Remove Product from Cart**
   - Removes the product using `CartPage.removeProductFromCart()`.
   - Asserts that the cart is empty (`0` distinct items) and the subtotal is `$0.00`.

## Expected Results
- The cart correctly updates quantities and subtotal.
- The reduce button is disabled when quantity is 1.
- Removing the product clears the cart and resets the subtotal to `$0.00`.

## Page Objects Used
- `HomePage`
- `CartPage`
