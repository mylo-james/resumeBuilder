import { TemplateService } from '@/lib/services/template-service';
import { mockResumeData, mockCoverLetterData } from '@/lib/mock-data';
import fs from 'fs';
import path from 'path';

// Mock fs and path modules
jest.mock('fs');
jest.mock('path');

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

describe('TemplateService', () => {
  let templateService: TemplateService;

  beforeEach(() => {
    jest.clearAllMocks();
    templateService = TemplateService.getInstance();
    
    // Reset singleton instance
    (TemplateService as any).instance = null;
    templateService = TemplateService.getInstance();
  });

  describe('getInstance', () => {
    it('returns the same instance when called multiple times', () => {
      const instance1 = TemplateService.getInstance();
      const instance2 = TemplateService.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('renderResume', () => {
    const mockResumeTemplate = `
      <html>
        <body>
          <h1>{{personalInfo.name}}</h1>
          <p>{{summary}}</p>
        </body>
      </html>
    `;

    beforeEach(() => {
      mockPath.join.mockReturnValue('/mock/path/resume.hbs');
      mockFs.readFileSync.mockReturnValue(mockResumeTemplate);
    });

    it('renders resume template with provided data', async () => {
      const result = await templateService.renderResume(mockResumeData);
      
      expect(result).toContain('John Doe');
      expect(result).toContain(mockResumeData.summary);
      expect(mockFs.readFileSync).toHaveBeenCalledWith('/mock/path/resume.hbs', 'utf-8');
    });

    it('throws error when template file cannot be read', async () => {
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });

      await expect(templateService.renderResume(mockResumeData)).rejects.toThrow('Failed to render resume');
    });

    it('caches template after first load', async () => {
      await templateService.renderResume(mockResumeData);
      await templateService.renderResume(mockResumeData);
      
      // Should only read file once due to caching
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(1);
    });
  });

  describe('renderCoverLetter', () => {
    const mockCoverLetterTemplate = `
      <html>
        <body>
          <h1>{{personalInfo.name}}</h1>
          <p>{{salutation}}</p>
          {{#each body}}
          <p>{{this}}</p>
          {{/each}}
        </body>
      </html>
    `;

    beforeEach(() => {
      mockPath.join.mockReturnValue('/mock/path/cover-letter.hbs');
      mockFs.readFileSync.mockReturnValue(mockCoverLetterTemplate);
    });

    it('renders cover letter template with provided data', async () => {
      const result = await templateService.renderCoverLetter(mockCoverLetterData);
      
      expect(result).toContain('John Doe');
      expect(result).toContain('Dear Ms. Smith,');
      expect(result).toContain(mockCoverLetterData.body[0]);
      expect(mockFs.readFileSync).toHaveBeenCalledWith('/mock/path/cover-letter.hbs', 'utf-8');
    });

    it('throws error when template file cannot be read', async () => {
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });

      await expect(templateService.renderCoverLetter(mockCoverLetterData)).rejects.toThrow('Failed to render cover letter');
    });

    it('caches template after first load', async () => {
      await templateService.renderCoverLetter(mockCoverLetterData);
      await templateService.renderCoverLetter(mockCoverLetterData);
      
      // Should only read file once due to caching
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(1);
    });
  });
});
