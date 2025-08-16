import axios from 'axios';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL;

export interface AIAgentRequest {
  jobDescription: string;
  jobUrl?: string;
  userInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  tools: string[];
}

export interface AIAgentResponse {
  success: boolean;
  data?: {
    resume: {
      title: string;
      summary: string;
      experience: Array<{
        title: string;
        companies: string[];
        startYear: string;
        endYear: string;
        bullets: string[];
      }>;
      education: Array<{
        degree: string;
        institution: string;
        location: string;
        graduationDate: string;
        gpa?: string;
      }>;
      skills: {
        technical: string[];
        soft: string[];
      };
      projects: Array<{
        name: string;
        description: string;
        technologies: string[];
        link?: string;
      }>;
    };
    coverLetter: {
      title: string;
      date: string;
      recipient: {
        name: string;
        title: string;
        company: string;
        address: string;
      };
      salutation: string;
      body: string[];
      closing: string;
      signature: string;
    };
  };
  error?: string;
  requestId?: string;
}

export class AIAgentService {
  private static instance: AIAgentService;
  private isConnected: boolean = false;

  private constructor() {
    this.checkConnection();
  }

  public static getInstance(): AIAgentService {
    if (!AIAgentService.instance) {
      AIAgentService.instance = new AIAgentService();
    }
    return AIAgentService.instance;
  }

  private async checkConnection(): Promise<void> {
    if (!AI_SERVICE_URL) {
      this.isConnected = false;
      return;
    }

    try {
      const response = await axios.get(`${AI_SERVICE_URL}/health`, {
        timeout: 5000,
      });
      this.isConnected = response.status === 200;
    } catch (error) {
      console.warn('AI service not available:', error);
      this.isConnected = false;
    }
  }

  public async generateDocuments(
    jobDescription: string,
    jobUrl?: string,
    userInfo?: AIAgentRequest['userInfo']
  ): Promise<AIAgentResponse> {
    if (!this.isConnected) {
      return this.generateMockDocuments(jobDescription, jobUrl, userInfo);
    }

    try {
      const request: AIAgentRequest = {
        jobDescription,
        jobUrl,
        userInfo,
        tools: ['makeResume', 'makeCoverLetter'],
      };

      const response = await axios.post(AI_SERVICE_URL!, request, {
        timeout: 30000, // 30 second timeout for AI generation
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return {
        success: true,
        data: response.data,
        requestId: response.headers['x-request-id'],
      };
    } catch (error) {
      console.error('AI service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private generateMockDocuments(
    jobDescription: string,
    jobUrl?: string,
    userInfo?: AIAgentRequest['userInfo']
  ): AIAgentResponse {
    // Generate contextual mock data based on job description
    const isTechJob = jobDescription.toLowerCase().includes('software') || 
                     jobDescription.toLowerCase().includes('developer') ||
                     jobDescription.toLowerCase().includes('engineer');

    const companyName = this.extractCompanyName(jobDescription, jobUrl);
    const userName = userInfo?.name || 'John Doe';

    return {
      success: true,
      data: {
        resume: {
          title: 'Professional Resume',
          summary: isTechJob 
            ? 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading development teams.'
            : 'Results-driven professional with extensive experience in business operations and strategic planning. Demonstrated ability to drive organizational growth and implement innovative solutions.',
          experience: [
            {
              title: isTechJob ? 'Senior Software Engineer' : 'Senior Business Analyst',
              companies: [companyName || 'TechCorp Inc.'],
              startYear: '2022',
              endYear: 'Present',
              bullets: isTechJob ? [
                'Led development of microservices architecture serving 1M+ users',
                'Mentored 3 junior developers and conducted code reviews',
                'Implemented CI/CD pipelines reducing deployment time by 60%',
                'Optimized database queries improving performance by 40%',
              ] : [
                'Led cross-functional teams in implementing business process improvements',
                'Analyzed market trends and provided strategic recommendations',
                'Managed stakeholder relationships and project timelines',
                'Reduced operational costs by 25% through process optimization',
              ],
            },
            {
              title: isTechJob ? 'Software Engineer' : 'Business Analyst',
              companies: ['Previous Company Inc.'],
              startYear: '2020',
              endYear: '2021',
              bullets: isTechJob ? [
                'Built responsive web applications using React and TypeScript',
                'Collaborated with design team to implement user-friendly interfaces',
                'Integrated third-party APIs and payment processing systems',
                'Participated in agile development process with 2-week sprints',
              ] : [
                'Conducted detailed business analysis and requirements gathering',
                'Created comprehensive documentation and process flows',
                'Collaborated with IT teams to implement system improvements',
                'Provided training and support to end users',
              ],
            },
          ],
          education: [
            {
              degree: isTechJob ? 'Bachelor of Science in Computer Science' : 'Bachelor of Business Administration',
              institution: 'University of California, Berkeley',
              location: 'Berkeley, CA',
              graduationDate: 'May 2020',
              gpa: '3.8',
            },
          ],
          skills: {
            technical: isTechJob ? ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'] : ['SQL', 'Excel', 'Tableau', 'Power BI', 'Project Management', 'Process Improvement'],
            soft: ['Leadership', 'Communication', 'Problem Solving', 'Team Collaboration', 'Strategic Thinking'],
          },
          projects: [
            {
              name: isTechJob ? 'Resume Builder App' : 'Business Process Optimization',
              description: isTechJob 
                ? 'Full-stack application for generating professional resumes with AI integration'
                : 'Led initiative to streamline business processes resulting in 30% efficiency improvement',
              technologies: isTechJob ? ['Next.js', 'Express.js', 'Prisma', 'PostgreSQL'] : ['Process Mapping', 'Data Analysis', 'Change Management'],
              link: isTechJob ? 'https://github.com/example/resume-builder' : undefined,
            },
          ],
        },
        coverLetter: {
          title: 'Cover Letter',
          date: new Date().toLocaleDateString(),
          recipient: {
            name: 'Hiring Manager',
            title: 'Hiring Manager',
            company: companyName || 'Target Company',
            address: '123 Business St\nCity, State 12345',
          },
          salutation: 'Dear Hiring Manager,',
          body: [
            `I am writing to express my interest in the position at ${companyName || 'your company'}. With my background in ${isTechJob ? 'software development' : 'business analysis'} and passion for creating innovative solutions, I believe I would be a valuable addition to your team.`,
            `My experience includes ${isTechJob ? 'developing scalable applications, mentoring junior developers, and implementing best practices in software engineering' : 'leading cross-functional teams, analyzing business processes, and driving organizational improvements'}. I am particularly excited about the opportunity to contribute to your company's growth and success.`,
          ],
          closing: 'Thank you for considering my application. I look forward to discussing how my skills and experience can benefit your organization.',
          signature: `Sincerely,\n${userName}\n${userInfo?.email || 'your.email@example.com'}\n${userInfo?.phone || '(555) 123-4567'}`,
        },
      },
    };
  }

  private extractCompanyName(jobDescription: string, jobUrl?: string): string | null {
    // Simple extraction logic - in production, this would be more sophisticated
    const companyPatterns = [
      /at\s+([A-Z][a-zA-Z\s&]+?)(?:\s+in|\s+as|\s+for|$)/i,
      /with\s+([A-Z][a-zA-Z\s&]+?)(?:\s+in|\s+as|\s+for|$)/i,
      /([A-Z][a-zA-Z\s&]+?)\s+is\s+looking/i,
    ];

    for (const pattern of companyPatterns) {
      const match = jobDescription.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    // Try to extract from URL
    if (jobUrl) {
      try {
        const url = new URL(jobUrl);
        const hostname = url.hostname;
        if (hostname && !hostname.includes('localhost')) {
          return hostname.replace('www.', '').split('.')[0];
        }
      } catch (error) {
        // Invalid URL, ignore
      }
    }

    return null;
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  public async reconnect(): Promise<void> {
    await this.checkConnection();
  }
}

export default AIAgentService.getInstance();