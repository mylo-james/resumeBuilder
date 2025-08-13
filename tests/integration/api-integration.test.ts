import { test, expect } from '@playwright/test';

test.describe('API Integration Tests', () => {
  test('should return valid response from /api/generate', async ({ request }) => {
    const response = await request.post('/api/generate', {
      data: {
        jobDescription: 'Software Engineer position',
        jobUrl: 'https://example.com/job',
      },
    });

    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('resume');
    expect(data).toHaveProperty('coverLetter');
    
    // Verify resume data structure
    expect(data.resume).toHaveProperty('personalInfo');
    expect(data.resume).toHaveProperty('summary');
    expect(data.resume).toHaveProperty('experience');
    expect(data.resume).toHaveProperty('education');
    expect(data.resume).toHaveProperty('skills');
    
    // Verify cover letter data structure
    expect(data.coverLetter).toHaveProperty('personalInfo');
    expect(data.coverLetter).toHaveProperty('date');
    expect(data.coverLetter).toHaveProperty('recipient');
    expect(data.coverLetter).toHaveProperty('body');
  });

  test('should handle requests with empty job description', async ({ request }) => {
    const response = await request.post('/api/generate', {
      data: {
        jobDescription: '',
        jobUrl: '',
      },
    });

    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('resume');
    expect(data).toHaveProperty('coverLetter');
  });

  test('should handle requests with missing jobUrl', async ({ request }) => {
    const response = await request.post('/api/generate', {
      data: {
        jobDescription: 'Software Engineer position',
      },
    });

    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('resume');
    expect(data).toHaveProperty('coverLetter');
  });

  test('should return proper JSON content type', async ({ request }) => {
    const response = await request.post('/api/generate', {
      data: {
        jobDescription: 'Software Engineer position',
        jobUrl: 'https://example.com/job',
      },
    });

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('should handle malformed JSON gracefully', async ({ request }) => {
    const response = await request.post('/api/generate', {
      data: 'invalid json',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response.status()).toBe(500);
    
    const data = await response.json();
    expect(data).toHaveProperty('error');
    expect(data.error).toBe('Failed to generate documents');
  });
});
