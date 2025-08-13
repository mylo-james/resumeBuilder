import { test, expect } from '@playwright/test';

test.describe('Health Check Integration', () => {
  test('frontend should display health status from backend API', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Wait for the health status indicator to appear
    await expect(page.locator('text=Backend Status:')).toBeVisible();

    // Wait for the health check to complete (either success or error)
    await expect(page.locator('text=Checking...')).not.toBeVisible({ timeout: 10000 });

    // Verify that we get either a success or error status (not "Unknown")
    const statusText = await page.locator('text=Backend Status:').locator('..').textContent();
    expect(statusText).toMatch(/Backend Status:\s*(✓ ok|Error:|Checking\.\.\.)/);
  });

  test('health API endpoint should be accessible directly', async ({ request }) => {
    // Make a direct request to the health API
    const response = await request.get('/api/health');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('status', 'ok');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('service', 'resume-builder');
    expect(typeof data.timestamp).toBe('string');
  });

  test('health API should return proper JSON content type', async ({ request }) => {
    const response = await request.get('/api/health');
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
  });
});
