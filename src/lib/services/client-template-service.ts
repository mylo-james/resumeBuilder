import Handlebars from 'handlebars';
import { ResumeData, CoverLetterData } from '../mock-data';

// Register custom Handlebars helpers
Handlebars.registerHelper('join', function(array: string[], separator: string) {
  return array.join(separator);
});

// Embedded templates for client-side use
const RESUME_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{personalInfo.name}} - Resume</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .name {
            font-size: 2.5em;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
        }
        .contact-info {
            font-size: 1.1em;
            color: #555;
        }
        .contact-info a {
            color: #3498db;
            text-decoration: none;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 1.5em;
            font-weight: bold;
            color: #2c3e50;
            border-bottom: 1px solid #bdc3c7;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .summary {
            font-size: 1.1em;
            line-height: 1.8;
            color: #555;
        }
        .experience-item, .education-item {
            margin-bottom: 20px;
        }
        .job-title {
            font-size: 1.2em;
            font-weight: bold;
            color: #2c3e50;
        }
        .company {
            font-size: 1.1em;
            color: #3498db;
            font-weight: 500;
        }
        .date-location {
            font-size: 0.9em;
            color: #7f8c8d;
            font-style: italic;
        }
        .description {
            margin-top: 10px;
        }
        .description ul {
            margin: 5px 0;
            padding-left: 20px;
        }
        .description li {
            margin-bottom: 5px;
        }
        .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .skill-category {
            margin-bottom: 15px;
        }
        .skill-category h4 {
            font-size: 1.1em;
            color: #2c3e50;
            margin-bottom: 8px;
        }
        .skill-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .skill-tag {
            background-color: #ecf0f1;
            color: #2c3e50;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.9em;
            font-weight: 500;
        }
        .projects-grid {
            display: grid;
            gap: 15px;
        }
        .project-item {
            border-left: 3px solid #3498db;
            padding-left: 15px;
        }
        .project-name {
            font-size: 1.1em;
            font-weight: bold;
            color: #2c3e50;
        }
        .project-description {
            color: #555;
            margin: 5px 0;
        }
        .project-tech {
            font-size: 0.9em;
            color: #7f8c8d;
        }
        .project-link {
            color: #3498db;
            text-decoration: none;
            font-size: 0.9em;
        }
        @media print {
            body {
                padding: 0;
                font-size: 12px;
            }
            .name {
                font-size: 2em;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">{{personalInfo.name}}</div>
        <div class="contact-info">
            {{personalInfo.email}} | {{personalInfo.phone}} | {{personalInfo.location}}
            {{#if personalInfo.linkedin}}<br><a href="https://{{personalInfo.linkedin}}" target="_blank">{{personalInfo.linkedin}}</a>{{/if}}
            {{#if personalInfo.github}}<br><a href="https://{{personalInfo.github}}" target="_blank">{{personalInfo.github}}</a>{{/if}}
        </div>
    </div>

    <div class="section">
        <div class="section-title">Professional Summary</div>
        <div class="summary">{{summary}}</div>
    </div>

    <div class="section">
        <div class="section-title">Professional Experience</div>
        {{#each experience}}
        <div class="experience-item">
            <div class="job-title">{{title}}</div>
            {{#each companies}}
            <div class="company">{{this}} {{../startYear}} - {{../endYear}}</div>
            {{/each}}
            <div class="description">
                <ul>
                    {{#each bullets}}
                    <li>{{this}}</li>
                    {{/each}}
                </ul>
            </div>
        </div>
        {{/each}}
    </div>

    <div class="section">
        <div class="section-title">Education</div>
        {{#each education}}
        <div class="education-item">
            <div class="job-title">{{degree}}</div>
            <div class="company">{{institution}}</div>
            <div class="date-location">{{graduationDate}} | {{location}}{{#if gpa}} | GPA: {{gpa}}{{/if}}</div>
        </div>
        {{/each}}
    </div>

    <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills-grid">
            <div class="skill-category">
                <h4>Technical Skills</h4>
                <div class="skill-list">
                    {{#each skills.technical}}
                    <span class="skill-tag">{{this}}</span>
                    {{/each}}
                </div>
            </div>
            <div class="skill-category">
                <h4>Soft Skills</h4>
                <div class="skill-list">
                    {{#each skills.soft}}
                    <span class="skill-tag">{{this}}</span>
                    {{/each}}
                </div>
            </div>
        </div>
    </div>

    {{#if projects}}
    <div class="section">
        <div class="section-title">Projects</div>
        <div class="projects-grid">
            {{#each projects}}
            <div class="project-item">
                <div class="project-name">{{name}}</div>
                <div class="project-description">{{description}}</div>
                <div class="project-tech">Technologies: {{join technologies ", "}}</div>
                {{#if link}}<div><a href="https://{{link}}" target="_blank" class="project-link">{{link}}</a></div>{{/if}}
            </div>
            {{/each}}
        </div>
    </div>
    {{/if}}
</body>
</html>
`;

const COVER_LETTER_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{personalInfo.name}} - Cover Letter</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            background-color: #fff;
        }
        .header {
            margin-bottom: 30px;
        }
        .sender-info {
            margin-bottom: 20px;
        }
        .sender-name {
            font-weight: bold;
            font-size: 1.1em;
        }
        .sender-details {
            font-size: 0.9em;
            color: #555;
        }
        .date {
            margin-bottom: 20px;
            font-size: 0.9em;
        }
        .recipient-info {
            margin-bottom: 30px;
        }
        .recipient-name {
            font-weight: bold;
        }
        .recipient-title {
            font-style: italic;
        }
        .recipient-company {
            font-weight: bold;
        }
        .recipient-address {
            font-size: 0.9em;
            color: #555;
        }
        .salutation {
            margin-bottom: 20px;
            font-weight: bold;
        }
        .body {
            margin-bottom: 30px;
        }
        .body p {
            margin-bottom: 15px;
            text-align: justify;
        }
        .closing {
            margin-bottom: 40px;
        }
        .signature {
            font-weight: bold;
            font-size: 1.1em;
        }
        @media print {
            body {
                padding: 20px;
                font-size: 12px;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="sender-info">
            <div class="sender-name">{{personalInfo.name}}</div>
            <div class="sender-details">
                {{personalInfo.email}}<br>
                {{personalInfo.phone}}<br>
                {{personalInfo.address}}
            </div>
        </div>
        
        <div class="date">{{date}}</div>
        
        <div class="recipient-info">
            <div class="recipient-name">{{recipient.name}}</div>
            <div class="recipient-title">{{recipient.title}}</div>
            <div class="recipient-company">{{recipient.company}}</div>
            <div class="recipient-address">{{recipient.address}}</div>
        </div>
    </div>

    <div class="salutation">{{salutation}}</div>

    <div class="body">
        {{#each body}}
        <p>{{this}}</p>
        {{/each}}
    </div>

    <div class="closing">
        <div>{{closing}}</div>
        <div class="signature">{{signature}}</div>
    </div>
</body>
</html>
`;

export class ClientTemplateService {
  private static instance: ClientTemplateService;
  private resumeTemplate: HandlebarsTemplateDelegate<ResumeData> | null = null;
  private coverLetterTemplate: HandlebarsTemplateDelegate<CoverLetterData> | null = null;

  private constructor() {}

  public static getInstance(): ClientTemplateService {
    if (!ClientTemplateService.instance) {
      ClientTemplateService.instance = new ClientTemplateService();
    }
    return ClientTemplateService.instance;
  }

  private getResumeTemplate(): HandlebarsTemplateDelegate<ResumeData> {
    if (!this.resumeTemplate) {
      this.resumeTemplate = Handlebars.compile(RESUME_TEMPLATE);
    }
    return this.resumeTemplate;
  }

  private getCoverLetterTemplate(): HandlebarsTemplateDelegate<CoverLetterData> {
    if (!this.coverLetterTemplate) {
      this.coverLetterTemplate = Handlebars.compile(COVER_LETTER_TEMPLATE);
    }
    return this.coverLetterTemplate;
  }

  public renderResume(data: ResumeData): string {
    try {
      const template = this.getResumeTemplate();
      return template(data);
    } catch (error) {
      throw new Error(`Failed to render resume: ${error}`);
    }
  }

  public renderCoverLetter(data: CoverLetterData): string {
    try {
      const template = this.getCoverLetterTemplate();
      return template(data);
    } catch (error) {
      throw new Error(`Failed to render cover letter: ${error}`);
    }
  }
}

export const clientTemplateService = ClientTemplateService.getInstance();
