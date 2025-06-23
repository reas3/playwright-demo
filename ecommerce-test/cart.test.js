const { test, expect } = require('@playwright/test');

test('E-commerce shopping cart flow', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Add first two products to cart
  const firstProduct = page.locator('.inventory_item').nth(0);
  const secondProduct = page.locator('.inventory_item').nth(1);

  await firstProduct.locator('button').click();
  await secondProduct.locator('button').click();

  // Verify cart badge number is 2
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  // Open cart page
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

  // Verify two products in cart
  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(2);

  // Remove first product
  await cartItems.nth(0).locator('button').click();

  // Verify cart badge number is 1
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Proceed to checkout
  await page.click('#checkout');
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

  // Fill in checkout info
  await page.fill('#first-name', 'Rea');
  await page.fill('#last-name', 'Sivan');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');

  // Verify overview page
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

  // Finish order
  await page.click('#finish');

  // Verify order complete message
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
