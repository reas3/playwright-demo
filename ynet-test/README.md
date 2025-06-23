# Ynet Article Navigation Test (Playwright)

This Playwright test automates the flow of navigating from the Ynet homepage to an article page and verifying the presence of dynamic content.

## ✅ What It Tests

- Loads the [Ynet](https://www.ynet.co.il) homepage
- Confirms the main headline is visible
- Clicks on the first article link (`h1.slotTitle`)
- Waits for the article page to load
- Verifies that the article's main title (`h1.mainTitle`) is:
  - Present
  - Visible
  - Not empty (dynamic content check)

## 🧪 How to Run the Test

In the project root, run:

```bash
npx playwright test ynet-test/ynet.test.js --headed
