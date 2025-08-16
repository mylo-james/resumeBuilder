import axios from 'axios';

export interface ScrapedJobData {
  title?: string;
  company?: string;
  location?: string;
  description: string;
  requirements?: string[];
  benefits?: string[];
  url: string;
  scrapedAt: string;
}

export class WebScraperService {
  private static instance: WebScraperService;

  private constructor() {}

  public static getInstance(): WebScraperService {
    if (!WebScraperService.instance) {
      WebScraperService.instance = new WebScraperService();
    }
    return WebScraperService.instance;
  }

  public async scrapeJobDescription(url: string): Promise<ScrapedJobData> {
    try {
      // Validate URL
      if (!this.isValidUrl(url)) {
        throw new Error('Invalid URL provided');
      }

      // Fetch the webpage
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      });

      const html = response.data;
      
      // Extract job information using different strategies
      const jobData = await this.extractJobData(html, url);
      
      return {
        ...jobData,
        description: jobData.description || 'Job description could not be extracted from the provided URL.',
        url,
        scrapedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error scraping job description:', error);
      throw new Error(`Failed to scrape job description: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  private async extractJobData(html: string, url: string): Promise<Partial<ScrapedJobData>> {
    // Create a DOM parser (this is a simplified version - in production you'd use a proper HTML parser)
    const jobData: Partial<ScrapedJobData> = {
      description: '',
      requirements: [],
      benefits: [],
    };

    // Extract job title
    jobData.title = this.extractJobTitle(html);
    
    // Extract company name
    jobData.company = this.extractCompanyName(html, url);
    
    // Extract location
    jobData.location = this.extractLocation(html);
    
    // Extract job description
    jobData.description = this.extractJobDescription(html);
    
    // Extract requirements
    jobData.requirements = this.extractRequirements(html);
    
    // Extract benefits
    jobData.benefits = this.extractBenefits(html);

    return jobData;
  }

  private extractJobTitle(html: string): string | undefined {
    // Common patterns for job titles
    const titlePatterns = [
      /<h1[^>]*>([^<]+(?:Software Engineer|Developer|Manager|Analyst|Specialist|Coordinator)[^<]*)<\/h1>/i,
      /<title[^>]*>([^<]+(?:Software Engineer|Developer|Manager|Analyst|Specialist|Coordinator)[^<]*)<\/title>/i,
      /class="[^"]*job-title[^"]*"[^>]*>([^<]+)<\/[^>]*>/i,
      /class="[^"]*title[^"]*"[^>]*>([^<]+)<\/[^>]*>/i,
    ];

    for (const pattern of titlePatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        return this.cleanText(match[1]);
      }
    }

    return undefined;
  }

  private extractCompanyName(html: string, url: string): string | undefined {
    // Try to extract from URL first
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      if (hostname && !hostname.includes('localhost')) {
        return hostname.replace('www.', '').split('.')[0];
      }
    } catch (error) {
      // Ignore URL parsing errors
    }

    // Common patterns for company names
    const companyPatterns = [
      /class="[^"]*company[^"]*"[^>]*>([^<]+)<\/[^>]*>/i,
      /class="[^"]*employer[^"]*"[^>]*>([^<]+)<\/[^>]*>/i,
      /<meta[^>]*name="[^"]*company[^"]*"[^>]*content="([^"]+)"/i,
    ];

    for (const pattern of companyPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        return this.cleanText(match[1]);
      }
    }

    return undefined;
  }

  private extractLocation(html: string): string | undefined {
    // Common patterns for location
    const locationPatterns = [
      /class="[^"]*location[^"]*"[^>]*>([^<]+)<\/[^>]*>/i,
      /class="[^"]*address[^"]*"[^>]*>([^<]+)<\/[^>]*>/i,
      /<meta[^>]*name="[^"]*location[^"]*"[^>]*content="([^"]+)"/i,
    ];

    for (const pattern of locationPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        return this.cleanText(match[1]);
      }
    }

    return undefined;
  }

  private extractJobDescription(html: string): string {
    // Common patterns for job descriptions
    const descriptionPatterns = [
      /class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/[^>]*>/i,
      /class="[^"]*job-description[^"]*"[^>]*>([\s\S]*?)<\/[^>]*>/i,
      /class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/[^>]*>/i,
      /<main[^>]*>([\s\S]*?)<\/main>/i,
      /<article[^>]*>([\s\S]*?)<\/article>/i,
    ];

    for (const pattern of descriptionPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        const description = this.cleanText(match[1]);
        if (description.length > 100) { // Ensure we have substantial content
          return description;
        }
      }
    }

    // Fallback: extract text from body
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch && bodyMatch[1]) {
      return this.cleanText(bodyMatch[1]);
    }

    return 'Job description could not be extracted from the provided URL.';
  }

  private extractRequirements(html: string): string[] {
    const requirements: string[] = [];
    
    // Common patterns for requirements
    const requirementPatterns = [
      /class="[^"]*requirements[^"]*"[^>]*>([\s\S]*?)<\/[^>]*>/i,
      /class="[^"]*qualifications[^"]*"[^>]*>([\s\S]*?)<\/[^>]*>/i,
      /<h[23][^>]*>.*?(?:requirements|qualifications).*?<\/h[23]>[\s\S]*?<[^>]*>([\s\S]*?)<\/[^>]*>/i,
    ];

    for (const pattern of requirementPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        const text = this.cleanText(match[1]);
        const lines = text.split(/\n|\./).filter(line => line.trim().length > 10);
        requirements.push(...lines.slice(0, 10)); // Limit to 10 requirements
        break;
      }
    }

    return requirements;
  }

  private extractBenefits(html: string): string[] {
    const benefits: string[] = [];
    
    // Common patterns for benefits
    const benefitPatterns = [
      /class="[^"]*benefits[^"]*"[^>]*>([\s\S]*?)<\/[^>]*>/i,
      /class="[^"]*perks[^"]*"[^>]*>([\s\S]*?)<\/[^>]*>/i,
      /<h[23][^>]*>.*?(?:benefits|perks).*?<\/h[23]>[\s\S]*?<[^>]*>([\s\S]*?)<\/[^>]*>/i,
    ];

    for (const pattern of benefitPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        const text = this.cleanText(match[1]);
        const lines = text.split(/\n|\./).filter(line => line.trim().length > 10);
        benefits.push(...lines.slice(0, 10)); // Limit to 10 benefits
        break;
      }
    }

    return benefits;
  }

  private cleanText(text: string): string {
    return text
      .replace(/<[^>]*>/g, ' ') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace HTML entities
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  public async validateJobUrl(url: string): Promise<boolean> {
    try {
      if (!this.isValidUrl(url)) {
        return false;
      }

      const response = await axios.head(url, {
        timeout: 5000,
      });

      const contentType = response.headers['content-type'] || '';
      return contentType.includes('text/html');
    } catch (error) {
      return false;
    }
  }
}

export default WebScraperService.getInstance();