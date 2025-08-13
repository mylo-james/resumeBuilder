import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { ResumeData, CoverLetterData } from '../mock-data';

// Register custom Handlebars helpers
Handlebars.registerHelper('join', function(array: string[], separator: string) {
  return array.join(separator);
});

export class TemplateService {
  private static instance: TemplateService;
  private resumeTemplate: HandlebarsTemplateDelegate<ResumeData> | null = null;
  private coverLetterTemplate: HandlebarsTemplateDelegate<CoverLetterData> | null = null;

  private constructor() {}

  public static getInstance(): TemplateService {
    if (!TemplateService.instance) {
      TemplateService.instance = new TemplateService();
    }
    return TemplateService.instance;
  }

  private async loadTemplate(templatePath: string): Promise<string> {
    try {
      const fullPath = path.join(process.cwd(), templatePath);
      return fs.readFileSync(fullPath, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to load template from ${templatePath}: ${error}`);
    }
  }

  private async getResumeTemplate(): Promise<HandlebarsTemplateDelegate<ResumeData>> {
    if (!this.resumeTemplate) {
      const templateContent = await this.loadTemplate('src/lib/templates/resume.hbs');
      this.resumeTemplate = Handlebars.compile(templateContent);
    }
    return this.resumeTemplate;
  }

  private async getCoverLetterTemplate(): Promise<HandlebarsTemplateDelegate<CoverLetterData>> {
    if (!this.coverLetterTemplate) {
      const templateContent = await this.loadTemplate('src/lib/templates/cover-letter.hbs');
      this.coverLetterTemplate = Handlebars.compile(templateContent);
    }
    return this.coverLetterTemplate;
  }

  public async renderResume(data: ResumeData): Promise<string> {
    try {
      const template = await this.getResumeTemplate();
      return template(data);
    } catch (error) {
      throw new Error(`Failed to render resume: ${error}`);
    }
  }

  public async renderCoverLetter(data: CoverLetterData): Promise<string> {
    try {
      const template = await this.getCoverLetterTemplate();
      return template(data);
    } catch (error) {
      throw new Error(`Failed to render cover letter: ${error}`);
    }
  }
}

export const templateService = TemplateService.getInstance();
