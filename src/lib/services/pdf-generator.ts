import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface PDFResumeData {
  id: string;
  title: string;
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    companies: string[];
    startYear: string;
    endYear: string;
    bullets: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills?: {
    id: string;
    technical: string[];
    soft: string[];
  };
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
}

interface PDFCoverLetterData {
  id: string;
  title: string;
  date: string;
  recipient?: {
    id: string;
    name: string;
    title: string;
    company: string;
    address: string;
  };
  salutation: string;
  body: string[];
  closing: string;
  signature: string;
}

interface PDFDocumentData {
  resume: PDFResumeData;
  coverLetter: PDFCoverLetterData;
  userInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
}

export class PDFGenerator {
  private doc: jsPDF;
  private currentY: number = 20;
  private pageWidth: number;
  private margin: number = 20;

  constructor() {
    this.doc = new jsPDF();
    this.pageWidth = this.doc.internal.pageSize.getWidth();
  }

  public generateResumeAndCoverLetter(data: PDFDocumentData): jsPDF {
    this.doc = new jsPDF();
    this.currentY = 20;

    // Add cover letter first
    this.addCoverLetter(data.coverLetter, data.userInfo);
    
    // Add page break
    this.doc.addPage();
    this.currentY = 20;
    
    // Add resume
    this.addResume(data.resume, data.userInfo);

    return this.doc;
  }

  private addCoverLetter(coverLetter: PDFCoverLetterData, userInfo?: any): void {
    // Header
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(coverLetter.title, this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 20;

    // Date
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(coverLetter.date, this.margin, this.currentY);
    this.currentY += 15;

    // Recipient
    if (coverLetter.recipient) {
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(coverLetter.recipient.name, this.margin, this.currentY);
      this.currentY += 5;
      
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(coverLetter.recipient.title, this.margin, this.currentY);
      this.currentY += 5;
      this.doc.text(coverLetter.recipient.company, this.margin, this.currentY);
      this.currentY += 5;
      
      const addressLines = coverLetter.recipient.address.split('\n');
      for (const line of addressLines) {
        this.doc.text(line, this.margin, this.currentY);
        this.currentY += 5;
      }
      this.currentY += 10;
    }

    // Salutation
    this.doc.text(coverLetter.salutation, this.margin, this.currentY);
    this.currentY += 10;

    // Body paragraphs
    for (const paragraph of coverLetter.body) {
      const lines = this.doc.splitTextToSize(paragraph, this.pageWidth - 2 * this.margin);
      for (const line of lines) {
        if (this.currentY > this.doc.internal.pageSize.getHeight() - 40) {
          this.doc.addPage();
          this.currentY = 20;
        }
        this.doc.text(line, this.margin, this.currentY);
        this.currentY += 5;
      }
      this.currentY += 5;
    }

    // Closing
    this.doc.text(coverLetter.closing, this.margin, this.currentY);
    this.currentY += 15;

    // Signature
    const signatureLines = coverLetter.signature.split('\n');
    for (const line of signatureLines) {
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += 5;
    }
  }

  private addResume(resume: PDFResumeData, userInfo?: any): void {
    // Header
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(resume.title, this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 15;

    // Contact info (if available)
    if (userInfo) {
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');
      const contactInfo = [
        userInfo.name,
        userInfo.email,
        userInfo.phone,
        userInfo.location
      ].filter(Boolean).join(' | ');
      
      this.doc.text(contactInfo, this.pageWidth / 2, this.currentY, { align: 'center' });
      this.currentY += 15;
    }

    // Summary
    this.addSection('Professional Summary', resume.summary);
    this.currentY += 10;

    // Experience
    if (resume.experience && resume.experience.length > 0) {
      this.addSection('Professional Experience');
      for (const exp of resume.experience) {
        this.addExperienceItem(exp);
        this.currentY += 5;
      }
      this.currentY += 10;
    }

    // Education
    if (resume.education && resume.education.length > 0) {
      this.addSection('Education');
      for (const edu of resume.education) {
        this.addEducationItem(edu);
        this.currentY += 5;
      }
      this.currentY += 10;
    }

    // Skills
    if (resume.skills) {
      this.addSection('Skills');
      this.addSkills(resume.skills);
      this.currentY += 10;
    }

    // Projects
    if (resume.projects && resume.projects.length > 0) {
      this.addSection('Projects');
      for (const project of resume.projects) {
        this.addProjectItem(project);
        this.currentY += 5;
      }
    }
  }

  private addSection(title: string, content?: string): void {
    // Check if we need a new page
    if (this.currentY > this.doc.internal.pageSize.getHeight() - 60) {
      this.doc.addPage();
      this.currentY = 20;
    }

    // Section title
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 8;

    // Section content (if provided)
    if (content) {
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');
      const lines = this.doc.splitTextToSize(content, this.pageWidth - 2 * this.margin);
      for (const line of lines) {
        this.doc.text(line, this.margin, this.currentY);
        this.currentY += 5;
      }
    }

    // Add line under section
    this.doc.setDrawColor(100, 100, 100);
    this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 8;
  }

  private addExperienceItem(exp: any): void {
    // Check if we need a new page
    if (this.currentY > this.doc.internal.pageSize.getHeight() - 80) {
      this.doc.addPage();
      this.currentY = 20;
    }

    // Job title and company
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(exp.title, this.margin, this.currentY);
    
    const companyText = exp.companies.join(', ');
    const dateText = `${exp.startYear} - ${exp.endYear}`;
    const rightText = `${companyText} | ${dateText}`;
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(rightText, this.pageWidth - this.margin, this.currentY, { align: 'right' });
    this.currentY += 6;

    // Bullet points
    this.doc.setFontSize(10);
    for (const bullet of exp.bullets) {
      const lines = this.doc.splitTextToSize(`• ${bullet}`, this.pageWidth - 2 * this.margin - 10);
      for (const line of lines) {
        this.doc.text(line, this.margin + 10, this.currentY);
        this.currentY += 4;
      }
    }
  }

  private addEducationItem(edu: any): void {
    // Check if we need a new page
    if (this.currentY > this.doc.internal.pageSize.getHeight() - 60) {
      this.doc.addPage();
      this.currentY = 20;
    }

    // Degree and institution
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(edu.degree, this.margin, this.currentY);
    
    const rightText = `${edu.institution} | ${edu.graduationDate}`;
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(rightText, this.pageWidth - this.margin, this.currentY, { align: 'right' });
    this.currentY += 5;

    // Location and GPA
    this.doc.setFontSize(10);
    let details = edu.location;
    if (edu.gpa) {
      details += ` | GPA: ${edu.gpa}`;
    }
    this.doc.text(details, this.margin, this.currentY);
  }

  private addSkills(skills: any): void {
    // Check if we need a new page
    if (this.currentY > this.doc.internal.pageSize.getHeight() - 80) {
      this.doc.addPage();
      this.currentY = 20;
    }

    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');

    if (skills.technical && skills.technical.length > 0) {
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Technical Skills:', this.margin, this.currentY);
      this.currentY += 5;
      
      this.doc.setFont('helvetica', 'normal');
      const techSkills = skills.technical.join(', ');
      const techLines = this.doc.splitTextToSize(techSkills, this.pageWidth - 2 * this.margin);
      for (const line of techLines) {
        this.doc.text(line, this.margin, this.currentY);
        this.currentY += 4;
      }
      this.currentY += 3;
    }

    if (skills.soft && skills.soft.length > 0) {
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Soft Skills:', this.margin, this.currentY);
      this.currentY += 5;
      
      this.doc.setFont('helvetica', 'normal');
      const softSkills = skills.soft.join(', ');
      const softLines = this.doc.splitTextToSize(softSkills, this.pageWidth - 2 * this.margin);
      for (const line of softLines) {
        this.doc.text(line, this.margin, this.currentY);
        this.currentY += 4;
      }
    }
  }

  private addProjectItem(project: any): void {
    // Check if we need a new page
    if (this.currentY > this.doc.internal.pageSize.getHeight() - 80) {
      this.doc.addPage();
      this.currentY = 20;
    }

    // Project name
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(project.name, this.margin, this.currentY);
    this.currentY += 5;

    // Project description
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    const descLines = this.doc.splitTextToSize(project.description, this.pageWidth - 2 * this.margin);
    for (const line of descLines) {
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += 4;
    }

    // Technologies
    if (project.technologies && project.technologies.length > 0) {
      this.currentY += 2;
      const techText = `Technologies: ${project.technologies.join(', ')}`;
      this.doc.setFontSize(9);
      this.doc.text(techText, this.margin, this.currentY);
    }
  }

  public downloadPDF(data: PDFDocumentData, filename: string = 'resume-cover-letter.pdf'): void {
    this.generateResumeAndCoverLetter(data);
    this.doc.save(filename);
  }

  public getPDFAsBlob(data: PDFDocumentData): Blob {
    this.generateResumeAndCoverLetter(data);
    return this.doc.output('blob');
  }

  public getPDFAsDataURL(data: PDFDocumentData): string {
    this.generateResumeAndCoverLetter(data);
    return this.doc.output('dataurlstring');
  }
}

export default new PDFGenerator();