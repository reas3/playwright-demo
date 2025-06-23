import { test, expect } from '@playwright/test';

test('Fill form and submit', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');

  await page.fill('#userName', 'Rea Sivan');
  await page.fill('#userEmail', 'rea@example.com');
  await page.fill('#currentAddress', '123 Main St');
  await page.fill('#permanentAddress', '456 Secondary St');

  await page.click('#submit');

  await expect(page.locator('#output')).toContainText('Rea Sivan');
});