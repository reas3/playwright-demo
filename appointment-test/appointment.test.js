const { test, expect } = require('@playwright/test');

test('Book a healthcare appointment end-to-end', async ({ page }) => {
  // 1. Go to homepage
  await page.goto('https://katalon-demo-cura.herokuapp.com/');

  // 2. Click "Make Appointment"
  await page.getByRole('link', { name: 'Make Appointment' }).click();

// 3. Log in
await page.fill('#txt-username', 'John Doe');
await page.fill('#txt-password', 'ThisIsNotAPassword');
await page.getByRole('button', { name: 'Login' }).click();
await expect(page.locator('h2')).toHaveText('Make Appointment');

  // 4. Fill out the form
  await page.selectOption('#combo_facility', 'Seoul CURA Healthcare Center');

  await page.check('#chk_hospotal_readmission'); // checkbox

  await page.check('input[name="programs"][value="Medicaid"]'); // radio button

  // Fill date 
await page.click('#txt_visit_date');
await page.fill('#txt_visit_date', '06/25/2025');
await page.keyboard.press('Enter');

await page.fill('#txt_comment', 'Automated test');
 
// 5. Book the appointment
await page.getByRole('button', { name: 'Book Appointment' }).click();



  // 6. Verify confirmation page
  await expect(page.locator('h2')).toHaveText('Appointment Confirmation');
  await expect(page.locator('#facility')).toHaveText('Seoul CURA Healthcare Center');
  await expect(page.locator('#comment')).toHaveText('Automated test');
});
