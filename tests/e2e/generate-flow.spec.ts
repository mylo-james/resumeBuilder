import { test, expect } from '@playwright/test';

test.describe('Generate Flow with Static Data', () => {
  test('should load initial data from API on page load', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to load and initial data to be fetched
    await expect(page.getByRole('heading', { name: 'AI Resume Builder' })).toBeVisible();
    
    // Wait for loading to complete
    await expect(page.locator('text=Loading documents...')).not.toBeVisible({ timeout: 10000 });

    // Verify that resume and cover letter are displayed
    await expect(page.getByText('Resume - John Doe')).toBeVisible();
    await expect(page.getByText('john.doe@email.com | (555) 123-4567')).toBeVisible();
    await expect(page.getByText('Cover Letter - John Doe')).toBeVisible();
  });

  test('should generate documents when form is submitted', async ({ page }) => {
    await page.goto('/');

    // Wait for initial load to complete
    await expect(page.locator('text=Loading documents...')).not.toBeVisible({ timeout: 10000 });

    // Fill in the job description
    await page.fill('[data-testid="job-description"]', 'Senior Software Engineer at TechCorp');
    
    // Fill in the job URL
    await page.fill('[data-testid="job-url"]', 'https://techcorp.com/careers/senior-engineer');

    // Submit the form
    await page.click('[data-testid="generate-button"]');

    // Wait for the generate process to complete
    await expect(page.locator('text=Generating...')).not.toBeVisible({ timeout: 10000 });

    // Verify that documents are still displayed (static data)
    await expect(page.getByText('Resume - John Doe')).toBeVisible();
    await expect(page.getByText('Software Engineer')).toBeVisible();
    await expect(page.getByText('To: Jane Smith at Innovation Tech Solutions')).toBeVisible();
  });

  test('should show loading state during generation', async ({ page }) => {
    await page.goto('/');

    // Wait for initial load to complete
    await expect(page.locator('text=Loading documents...')).not.toBeVisible({ timeout: 10000 });

    // Fill in the job description
    await page.fill('[data-testid="job-description"]', 'Software Engineer position');

    // Submit the form
    await page.click('[data-testid="generate-button"]');

    // Verify loading state is shown
    await expect(page.locator('text=Generating...')).toBeVisible();

    // Wait for generation to complete
    await expect(page.locator('text=Generating...')).not.toBeVisible({ timeout: 10000 });
  });

  test('should handle form validation', async ({ page }) => {
    await page.goto('/');

    // Wait for initial load to complete
    await expect(page.locator('text=Loading documents...')).not.toBeVisible({ timeout: 10000 });

    // Try to submit without job description
    const generateButton = page.locator('[data-testid="generate-button"]');
    await expect(generateButton).toBeDisabled();

    // Fill in job description
    await page.fill('[data-testid="job-description"]', 'Software Engineer');

    // Button should now be enabled
    await expect(generateButton).toBeEnabled();
  });

  test('should display error message on API failure', async ({ page }) => {
    // Mock the API to return an error
    await page.route('/api/generate', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      });
    });

    await page.goto('/');

    // Wait for error to be displayed
    await expect(page.locator('text=Failed to load initial data')).toBeVisible();
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Mock the API to fail
    await page.route('/api/generate', async route => {
      await route.abort();
    });

    await page.goto('/');

    // Wait for error to be displayed
    await expect(page.locator('text=Failed to load initial data')).toBeVisible();
  });
});
