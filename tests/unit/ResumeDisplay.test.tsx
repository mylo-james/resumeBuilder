import { render, screen } from '@testing-library/react';
import ResumeDisplay from '@/components/ResumeDisplay';

// Mock data for testing
const mockResume = {
  id: '1',
  title: 'Professional Resume',
  summary: 'Experienced software engineer with expertise in full-stack development.',
  experience: [
    {
      id: 'exp1',
      title: 'Senior Software Engineer',
      companies: ['TechCorp Inc.'],
      startYear: '2022',
      endYear: 'Present',
      bullets: [
        'Led development of microservices architecture',
        'Mentored junior developers',
        'Implemented CI/CD pipelines',
      ],
    },
  ],
  education: [
    {
      id: 'edu1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      graduationDate: 'May 2020',
      gpa: '3.8',
    },
  ],
  skills: {
    id: 'skills1',
    technical: ['React', 'Node.js', 'TypeScript'],
    soft: ['Leadership', 'Communication'],
  },
  projects: [
    {
      id: 'proj1',
      name: 'Resume Builder App',
      description: 'Full-stack application for generating professional resumes',
      technologies: ['Next.js', 'Express.js', 'Prisma'],
      link: 'https://github.com/example/resume-builder',
    },
  ],
};

describe('ResumeDisplay', () => {
  it('renders resume title and summary', () => {
    render(<ResumeDisplay resume={mockResume} />);
    
    expect(screen.getByText('Professional Resume')).toBeInTheDocument();
    expect(screen.getByText(/Experienced software engineer/)).toBeInTheDocument();
  });

  it('renders experience section', () => {
    render(<ResumeDisplay resume={mockResume} />);
    
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('TechCorp Inc.')).toBeInTheDocument();
    expect(screen.getByText('2022 - Present')).toBeInTheDocument();
  });

  it('renders education section', () => {
    render(<ResumeDisplay resume={mockResume} />);
    
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Bachelor of Science in Computer Science')).toBeInTheDocument();
    expect(screen.getByText('University of California, Berkeley')).toBeInTheDocument();
  });

  it('renders skills section', () => {
    render(<ResumeDisplay resume={mockResume} />);
    
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    expect(screen.getByText('Soft Skills')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Leadership')).toBeInTheDocument();
  });

  it('renders projects section', () => {
    render(<ResumeDisplay resume={mockResume} />);
    
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Resume Builder App')).toBeInTheDocument();
    expect(screen.getByText(/Full-stack application/)).toBeInTheDocument();
  });

  it('handles missing optional sections gracefully', () => {
    const minimalResume = {
      id: '2',
      title: 'Minimal Resume',
      summary: 'Basic resume with minimal data.',
      experience: [],
      education: [],
      projects: [],
    };
    
    render(<ResumeDisplay resume={minimalResume} />);
    
    expect(screen.getByText('Minimal Resume')).toBeInTheDocument();
    expect(screen.getByText(/Basic resume/)).toBeInTheDocument();
  });
});
