import { mockResumeData, mockCoverLetterData, ResumeData, CoverLetterData } from '@/lib/mock-data';

describe('Mock Data', () => {
  describe('mockResumeData', () => {
    it('has valid resume data structure', () => {
      expect(mockResumeData).toBeDefined();
      expect(mockResumeData.personalInfo).toBeDefined();
      expect(mockResumeData.summary).toBeDefined();
      expect(mockResumeData.experience).toBeDefined();
      expect(mockResumeData.education).toBeDefined();
      expect(mockResumeData.skills).toBeDefined();
    });

    it('has complete personal information', () => {
      expect(mockResumeData.personalInfo.name).toBe('John Doe');
      expect(mockResumeData.personalInfo.email).toBe('john.doe@email.com');
      expect(mockResumeData.personalInfo.phone).toBe('(555) 123-4567');
      expect(mockResumeData.personalInfo.location).toBe('San Francisco, CA');
      expect(mockResumeData.personalInfo.linkedin).toBe('linkedin.com/in/johndoe');
      expect(mockResumeData.personalInfo.github).toBe('github.com/johndoe');
    });

    it('has experience entries with required fields', () => {
      expect(mockResumeData.experience).toHaveLength(2);
      
      const firstExperience = mockResumeData.experience[0];
      expect(firstExperience.title).toBe('Senior Software Engineer');
      expect(firstExperience.companies).toEqual(['TechCorp Inc.', 'Innovation Labs']);
      expect(firstExperience.startYear).toBe('2022');
      expect(firstExperience.endYear).toBe('Present');
      expect(firstExperience.bullets).toBeInstanceOf(Array);
      expect(firstExperience.bullets.length).toBeGreaterThan(0);
    });

    it('has education entries with required fields', () => {
      expect(mockResumeData.education).toHaveLength(1);
      
      const education = mockResumeData.education[0];
      expect(education.degree).toBe('Bachelor of Science in Computer Science');
      expect(education.institution).toBe('University of California, Berkeley');
      expect(education.location).toBe('Berkeley, CA');
      expect(education.graduationDate).toBe('May 2020');
      expect(education.gpa).toBe('3.8/4.0');
    });

    it('has skills categorized as technical and soft', () => {
      expect(mockResumeData.skills.technical).toBeInstanceOf(Array);
      expect(mockResumeData.skills.soft).toBeInstanceOf(Array);
      expect(mockResumeData.skills.technical.length).toBeGreaterThan(0);
      expect(mockResumeData.skills.soft.length).toBeGreaterThan(0);
    });

    it('has projects with required fields', () => {
      expect(mockResumeData.projects).toBeDefined();
      expect(mockResumeData.projects!.length).toBeGreaterThan(0);
      
      const firstProject = mockResumeData.projects![0];
      expect(firstProject.name).toBe('E-commerce Platform');
      expect(firstProject.description).toBeDefined();
      expect(firstProject.technologies).toBeInstanceOf(Array);
      expect(firstProject.link).toBeDefined();
    });
  });

  describe('mockCoverLetterData', () => {
    it('has valid cover letter data structure', () => {
      expect(mockCoverLetterData).toBeDefined();
      expect(mockCoverLetterData.personalInfo).toBeDefined();
      expect(mockCoverLetterData.date).toBeDefined();
      expect(mockCoverLetterData.recipient).toBeDefined();
      expect(mockCoverLetterData.salutation).toBeDefined();
      expect(mockCoverLetterData.body).toBeDefined();
      expect(mockCoverLetterData.closing).toBeDefined();
      expect(mockCoverLetterData.signature).toBeDefined();
    });

    it('has complete personal information', () => {
      expect(mockCoverLetterData.personalInfo.name).toBe('John Doe');
      expect(mockCoverLetterData.personalInfo.email).toBe('john.doe@email.com');
      expect(mockCoverLetterData.personalInfo.phone).toBe('(555) 123-4567');
      expect(mockCoverLetterData.personalInfo.address).toBe('123 Main Street, San Francisco, CA 94102');
    });

    it('has recipient information', () => {
      expect(mockCoverLetterData.recipient.name).toBe('Jane Smith');
      expect(mockCoverLetterData.recipient.title).toBe('Hiring Manager');
      expect(mockCoverLetterData.recipient.company).toBe('Innovation Tech Solutions');
      expect(mockCoverLetterData.recipient.address).toBe('456 Business Ave, San Francisco, CA 94105');
    });

    it('has body content as array of paragraphs', () => {
      expect(mockCoverLetterData.body).toBeInstanceOf(Array);
      expect(mockCoverLetterData.body.length).toBeGreaterThan(0);
      mockCoverLetterData.body.forEach(paragraph => {
        expect(typeof paragraph).toBe('string');
        expect(paragraph.length).toBeGreaterThan(0);
      });
    });

    it('has proper salutation and closing', () => {
      expect(mockCoverLetterData.salutation).toBe('Dear Ms. Smith,');
      expect(mockCoverLetterData.closing).toBe('Sincerely,');
      expect(mockCoverLetterData.signature).toBe('John Doe');
    });
  });

  describe('TypeScript interfaces', () => {
    it('ResumeData interface matches mock data structure', () => {
      const resumeData: ResumeData = mockResumeData;
      expect(resumeData).toBeDefined();
    });

    it('CoverLetterData interface matches mock data structure', () => {
      const coverLetterData: CoverLetterData = mockCoverLetterData;
      expect(coverLetterData).toBeDefined();
    });
  });
});
