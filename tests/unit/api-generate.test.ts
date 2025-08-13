import { POST } from '@/app/api/generate/route';
import { mockResumeData, mockCoverLetterData } from '@/lib/mock-data';

// Mock the mock-data module
jest.mock('@/lib/mock-data', () => ({
  mockResumeData: {
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
    },
    summary: 'Test summary',
    experience: [],
    education: [],
    skills: { technical: [], soft: [] },
  },
  mockCoverLetterData: {
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '(555) 123-4567',
      address: '123 Main Street, San Francisco, CA 94102',
    },
    date: 'December 15, 2024',
    recipient: {
      name: 'Jane Smith',
      title: 'Hiring Manager',
      company: 'Innovation Tech Solutions',
      address: '456 Business Ave, San Francisco, CA 94105',
    },
    salutation: 'Dear Ms. Smith,',
    body: ['Test body'],
    closing: 'Sincerely,',
    signature: 'John Doe',
  },
}));

// Mock NextRequest
const createMockRequest = (body: any) => ({
  json: jest.fn().mockResolvedValue(body),
});

describe('/api/generate', () => {
  it('should return 200 with resume and cover letter data for valid POST request', async () => {
    const requestBody = {
      jobDescription: 'Software Engineer position',
      jobUrl: 'https://example.com/job',
    };

    const mockRequest = createMockRequest(requestBody);
    const response = await POST(mockRequest as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('resume');
    expect(data).toHaveProperty('coverLetter');
    expect(data.resume).toEqual(mockResumeData);
    expect(data.coverLetter).toEqual(mockCoverLetterData);
  });

  it('should handle requests with empty job description', async () => {
    const requestBody = {
      jobDescription: '',
      jobUrl: '',
    };

    const mockRequest = createMockRequest(requestBody);
    const response = await POST(mockRequest as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('resume');
    expect(data).toHaveProperty('coverLetter');
  });

  it('should handle requests with missing jobUrl', async () => {
    const requestBody = {
      jobDescription: 'Software Engineer position',
    };

    const mockRequest = createMockRequest(requestBody);
    const response = await POST(mockRequest as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('resume');
    expect(data).toHaveProperty('coverLetter');
  });

  it('should handle invalid JSON gracefully and return static data', async () => {
    const mockRequest = {
      json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
    };

    const response = await POST(mockRequest as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('resume');
    expect(data).toHaveProperty('coverLetter');
    expect(data.resume).toEqual(mockResumeData);
    expect(data.coverLetter).toEqual(mockCoverLetterData);
  });
});
