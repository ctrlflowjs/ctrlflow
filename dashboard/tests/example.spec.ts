import { test, expect } from '@playwright/test';

test('homepage has new workflow button that opens the workflow page', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // create a locator
  const newWorkflowBtn = page.locator('text=New +');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(newWorkflowBtn).toHaveClass(/btn/);

  // Click the get started link.
  await newWorkflowBtn.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*workflow/);
});
