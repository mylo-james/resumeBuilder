import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  
  // Check that the page loads
  await expect(page).toHaveTitle(/Create Next App/);
  
  // Check for the main content
  await expect(page.locator('main')).toBeVisible();
  
  // Check for the Next.js logo
  await expect(page.locator('img[alt="Next.js logo"]')).toBeVisible();
  
  // Check for the "Get started by editing" text
  await expect(page.getByText('Get started by editing')).toBeVisible();
});

test('page has correct structure', async ({ page }) => {
  await page.goto('/');
  
  // Check for the main heading structure
  const main = page.locator('main');
  await expect(main).toBeVisible();
  
  // Check for the footer
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
  
  // Check for navigation links
  const links = page.locator('a');
  await expect(links).toHaveCount(5); // Should have 5 links on the default page
});
