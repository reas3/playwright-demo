const { test, expect } = require('@playwright/test');

test('Ynet homepage and article navigation test with dynamic title check', async ({ page }) => {
  // 1. Go to Ynet homepage
  await page.goto('https://www.ynet.co.il', );

  // 2. Wait for main headline (try h1 or h3 tags)
  const mainHeadline = page.locator('h1, h3').first();
  await expect(mainHeadline).toBeVisible();

  // 3. Wait for the first article link to appear
  await page.waitForSelector('h1.slotTitle', { timeout: 10000 });

  // 4. Click the first article link
  const firstArticleLink = page.locator('h1.slotTitle').first();
  await firstArticleLink.click();

  // 5. Wait for article page to load and article title to appear
  const articleTitle = page.locator('h1.mainTitle');
  await expect(articleTitle).toBeVisible();

  // 6. Verify the article title text is not empty (dynamic content)
  const titleText = await articleTitle.textContent();
  expect(titleText.trim().length).toBeGreaterThan(0);
});
