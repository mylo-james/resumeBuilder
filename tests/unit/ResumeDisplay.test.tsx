import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResumeDisplay from '@/components/ResumeDisplay';
import { mockResumeData } from '@/lib/mock-data';

// Mock the template service
jest.mock('@/lib/services/template-service', () => ({
  templateService: {
    renderResume: jest.fn()
  }
}));

describe('ResumeDisplay', () => {
  const mockResumeHtml = '<html><body><h1>John Doe</h1></body></html>';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders resume display with correct title and contact info', () => {
    render(<ResumeDisplay resumeHtml={mockResumeHtml} data={mockResumeData} />);
    
    expect(screen.getByText('Resume - John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@email.com | (555) 123-4567')).toBeInTheDocument();
  });

  it('renders iframe with correct attributes', () => {
    render(<ResumeDisplay resumeHtml={mockResumeHtml} data={mockResumeData} />);
    
    const iframe = screen.getByTitle('Resume Preview');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('sandbox', 'allow-same-origin');
    expect(iframe).toHaveClass('w-full', 'h-[800px]', 'border-0');
  });

  it('displays iframe content when resumeHtml is provided', () => {
    render(<ResumeDisplay resumeHtml={mockResumeHtml} data={mockResumeData} />);
    
    const iframe = screen.getByTitle('Resume Preview');
    expect(iframe).toBeInTheDocument();
  });

  it('handles empty resumeHtml gracefully', () => {
    render(<ResumeDisplay resumeHtml="" data={mockResumeData} />);
    
    const iframe = screen.getByTitle('Resume Preview');
    expect(iframe).toBeInTheDocument();
  });
});
