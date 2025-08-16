import { render, screen } from '@testing-library/react';
import CoverLetterDisplay from '@/components/CoverLetterDisplay';

// Mock data for testing
const mockCoverLetter = {
  id: '1',
  title: 'Cover Letter',
  date: 'December 19, 2024',
  recipient: {
    id: 'recip1',
    name: 'Jane Smith',
    title: 'Hiring Manager',
    company: 'TechCorp Inc.',
    address: '123 Business St\nSan Francisco, CA 94105',
  },
  salutation: 'Dear Jane Smith,',
  body: [
    'I am writing to express my interest in the Software Engineer position at TechCorp Inc.',
    'With my background in full-stack development and passion for creating innovative solutions, I believe I would be a valuable addition to your team.',
  ],
  closing: 'Thank you for considering my application.',
  signature: 'Sincerely,\nJohn Doe\njohn.doe@email.com\n(555) 123-4567',
};

describe('CoverLetterDisplay', () => {
  it('renders cover letter title', () => {
    render(<CoverLetterDisplay coverLetter={mockCoverLetter} />);
    
    expect(screen.getByText('Cover Letter')).toBeInTheDocument();
  });

  it('renders date', () => {
    render(<CoverLetterDisplay coverLetter={mockCoverLetter} />);
    
    expect(screen.getByText('December 19, 2024')).toBeInTheDocument();
  });

  it('renders recipient information', () => {
    render(<CoverLetterDisplay coverLetter={mockCoverLetter} />);
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Hiring Manager')).toBeInTheDocument();
    expect(screen.getByText('TechCorp Inc.')).toBeInTheDocument();
  });

  it('renders salutation', () => {
    render(<CoverLetterDisplay coverLetter={mockCoverLetter} />);
    
    expect(screen.getByText('Dear Jane Smith,')).toBeInTheDocument();
  });

  it('renders body paragraphs', () => {
    render(<CoverLetterDisplay coverLetter={mockCoverLetter} />);
    
    expect(screen.getByText(/I am writing to express my interest/)).toBeInTheDocument();
    expect(screen.getByText(/With my background in full-stack development/)).toBeInTheDocument();
  });

  it('renders closing and signature', () => {
    render(<CoverLetterDisplay coverLetter={mockCoverLetter} />);
    
    expect(screen.getByText('Thank you for considering my application.')).toBeInTheDocument();
    expect(screen.getByText(/Sincerely,/)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  });

  it('handles missing recipient gracefully', () => {
    const coverLetterWithoutRecipient = {
      ...mockCoverLetter,
      recipient: undefined,
    };
    
    render(<CoverLetterDisplay coverLetter={coverLetterWithoutRecipient} />);
    
    expect(screen.getByText('Cover Letter')).toBeInTheDocument();
    expect(screen.getByText('Dear Jane Smith,')).toBeInTheDocument();
  });

  it('handles empty body gracefully', () => {
    const coverLetterWithEmptyBody = {
      ...mockCoverLetter,
      body: [],
    };
    
    render(<CoverLetterDisplay coverLetter={coverLetterWithEmptyBody} />);
    
    expect(screen.getByText('Cover Letter')).toBeInTheDocument();
    expect(screen.getByText('Dear Jane Smith,')).toBeInTheDocument();
  });
});
