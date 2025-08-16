import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputForm from '@/components/InputForm';

// Mock the web scraper
jest.mock('@/lib/services/web-scraper', () => ({
  __esModule: true,
  default: {
    validateJobUrl: jest.fn(),
    scrapeJobDescription: jest.fn(),
  },
}));

describe('InputForm', () => {
  const mockOnGenerate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form elements', () => {
    render(<InputForm onGenerate={mockOnGenerate} isLoading={false} />);
    
    expect(screen.getByLabelText(/job url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/job description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate resume/i })).toBeInTheDocument();
  });

  it('handles job description input', () => {
    render(<InputForm onGenerate={mockOnGenerate} isLoading={false} />);
    
    const textarea = screen.getByLabelText(/job description/i);
    fireEvent.change(textarea, { target: { value: 'Test job description' } });
    
    expect(textarea).toHaveValue('Test job description');
  });

  it('handles job URL input', () => {
    render(<InputForm onGenerate={mockOnGenerate} isLoading={false} />);
    
    const urlInput = screen.getByLabelText(/job url/i);
    fireEvent.change(urlInput, { target: { value: 'https://example.com/job' } });
    
    expect(urlInput).toHaveValue('https://example.com/job');
  });

  it('calls onGenerate when form is submitted with valid data', () => {
    render(<InputForm onGenerate={mockOnGenerate} isLoading={false} />);
    
    const textarea = screen.getByLabelText(/job description/i);
    const generateButton = screen.getByRole('button', { name: /generate resume/i });
    
    fireEvent.change(textarea, { target: { value: 'Test job description' } });
    fireEvent.click(generateButton);
    
    expect(mockOnGenerate).toHaveBeenCalledWith('Test job description', undefined);
  });

  it('disables generate button when job description is empty', () => {
    render(<InputForm onGenerate={mockOnGenerate} isLoading={false} />);
    
    const generateButton = screen.getByRole('button', { name: /generate resume/i });
    expect(generateButton).toBeDisabled();
  });

  it('disables generate button when loading', () => {
    render(<InputForm onGenerate={mockOnGenerate} isLoading={true} />);
    
    const textarea = screen.getByLabelText(/job description/i);
    fireEvent.change(textarea, { target: { value: 'Test job description' } });
    
    const generateButton = screen.getByRole('button', { name: /generating/i });
    expect(generateButton).toBeDisabled();
  });

  it('shows loading state when isLoading is true', () => {
    render(<InputForm onGenerate={mockOnGenerate} isLoading={true} />);
    
    expect(screen.getByText(/generating documents/i)).toBeInTheDocument();
  });
});
