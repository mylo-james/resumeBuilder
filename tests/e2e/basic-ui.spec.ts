import { test, expect } from '@playwright/test';

test.describe('Basic UI with Mock Data', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main page with correct title and layout', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/AI Resume Builder/);
    
    // Check main heading
    await expect(page.getByRole('heading', { name: 'AI Resume Builder' })).toBeVisible();
    
    // Check subtitle
    await expect(page.getByText('Generate personalized resumes and cover letters with AI')).toBeVisible();
  });

  test('should display input form with all required elements', async ({ page }) => {
    // Check form title
    await expect(page.getByText('Job Information')).toBeVisible();
    
    // Check job description textarea
    const jobDescriptionTextarea = page.getByLabel('Job Description');
    await expect(jobDescriptionTextarea).toBeVisible();
    await expect(jobDescriptionTextarea).toHaveAttribute('placeholder', 'Paste the job description here...');
    
    // Check job URL input
    const jobUrlInput = page.getByLabel('Job URL (Optional)');
    await expect(jobUrlInput).toBeVisible();
    await expect(jobUrlInput).toHaveAttribute('placeholder', 'https://example.com/job-posting');
    
    // Check generate button
    const generateButton = page.getByRole('button', { name: 'Generate Resume & Cover Letter' });
    await expect(generateButton).toBeVisible();
    await expect(generateButton).toBeDisabled(); // Should be disabled initially
  });

  test('should display resume preview with mock data', async ({ page }) => {
    // Wait for resume to load
    await expect(page.getByText('Resume - John Doe')).toBeVisible();
    
    // Check contact info in header
    await expect(page.getByText('john.doe@email.com | (555) 123-4567')).toBeVisible();
    
    // Check iframe is present
    const resumeIframe = page.frameLocator('iframe[title="Resume Preview"]');
    await expect(resumeIframe).toBeDefined();
    
    // Check iframe content contains resume data
    const iframeContent = resumeIframe.locator('body');
    await expect(iframeContent).toContainText('John Doe');
    await expect(iframeContent).toContainText('Senior Software Engineer');
    await expect(iframeContent).toContainText('TechCorp Inc. 2022 - Present');
    await expect(iframeContent).toContainText('Innovation Labs 2022 - Present');
  });

  test('should display cover letter preview with mock data', async ({ page }) => {
    // Wait for cover letter to load
    await expect(page.getByText('Cover Letter - John Doe')).toBeVisible();
    
    // Check recipient info in header
    await expect(page.getByText('To: Jane Smith at Innovation Tech Solutions')).toBeVisible();
    
    // Check iframe is present
    const coverLetterIframe = page.frameLocator('iframe[title="Cover Letter Preview"]');
    await expect(coverLetterIframe).toBeDefined();
    
    // Check iframe content contains cover letter data
    const iframeContent = coverLetterIframe.locator('body');
    await expect(iframeContent).toContainText('John Doe');
    await expect(iframeContent).toContainText('Dear Ms. Smith,');
    await expect(iframeContent).toContainText('Innovation Tech Solutions');
  });

  test('should enable generate button when job description is entered', async ({ page }) => {
    const jobDescriptionTextarea = page.getByLabel('Job Description');
    const generateButton = page.getByRole('button', { name: 'Generate Resume & Cover Letter' });
    
    // Initially disabled
    await expect(generateButton).toBeDisabled();
    
    // Type in job description
    await jobDescriptionTextarea.fill('Software Engineer position');
    
    // Should now be enabled
    await expect(generateButton).toBeEnabled();
  });

  test('should handle generate button click with mock functionality', async ({ page }) => {
    const jobDescriptionTextarea = page.getByLabel('Job Description');
    const generateButton = page.getByRole('button', { name: 'Generate Resume & Cover Letter' });
    
    // Fill in form
    await jobDescriptionTextarea.fill('Software Engineer position');
    await page.getByLabel('Job URL (Optional)').fill('https://example.com/job');
    
    // Click generate button
    await generateButton.click();
    
    // Should show alert (mock functionality)
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('Generate functionality will be implemented in future stories');
      dialog.accept();
    });
  });

  test('should maintain responsive layout on different screen sizes', async ({ page }) => {
    // Test desktop layout
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('.grid.grid-cols-1.lg\\:grid-cols-3')).toBeVisible();
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.grid.grid-cols-1')).toBeVisible();
    
    // Check that all elements are still visible
    await expect(page.getByText('Job Information')).toBeVisible();
    await expect(page.getByText('Resume - John Doe')).toBeVisible();
    await expect(page.getByText('Cover Letter - John Doe')).toBeVisible();
  });

  test('should display footer with demo message', async ({ page }) => {
    await expect(page.getByText('This is a demo using mock data. AI integration coming soon!')).toBeVisible();
  });
});
