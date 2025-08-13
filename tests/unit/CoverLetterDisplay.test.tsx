import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CoverLetterDisplay from '@/components/CoverLetterDisplay';
import { mockCoverLetterData } from '@/lib/mock-data';

// Mock the template service
jest.mock('@/lib/services/template-service', () => ({
  templateService: {
    renderCoverLetter: jest.fn()
  }
}));

describe('CoverLetterDisplay', () => {
  const mockCoverLetterHtml = '<html><body><h1>Cover Letter</h1></body></html>';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders cover letter display with correct title and recipient info', () => {
    render(<CoverLetterDisplay coverLetterHtml={mockCoverLetterHtml} data={mockCoverLetterData} />);
    
    expect(screen.getByText('Cover Letter - John Doe')).toBeInTheDocument();
    expect(screen.getByText('To: Jane Smith at Innovation Tech Solutions')).toBeInTheDocument();
  });

  it('renders iframe with correct attributes', () => {
    render(<CoverLetterDisplay coverLetterHtml={mockCoverLetterHtml} data={mockCoverLetterData} />);
    
    const iframe = screen.getByTitle('Cover Letter Preview');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('sandbox', 'allow-same-origin');
    expect(iframe).toHaveClass('w-full', 'h-[600px]', 'border-0');
  });

  it('displays iframe content when coverLetterHtml is provided', () => {
    render(<CoverLetterDisplay coverLetterHtml={mockCoverLetterHtml} data={mockCoverLetterData} />);
    
    const iframe = screen.getByTitle('Cover Letter Preview');
    expect(iframe).toBeInTheDocument();
  });

  it('handles empty coverLetterHtml gracefully', () => {
    render(<CoverLetterDisplay coverLetterHtml="" data={mockCoverLetterData} />);
    
    const iframe = screen.getByTitle('Cover Letter Preview');
    expect(iframe).toBeInTheDocument();
  });
});
