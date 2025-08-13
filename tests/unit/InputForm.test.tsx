import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import InputForm from '@/components/InputForm';

describe('InputForm', () => {
  const mockOnGenerate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form with all required elements', () => {
    render(<InputForm onGenerate={mockOnGenerate} />);
    
    expect(screen.getByText('Job Information')).toBeInTheDocument();
    expect(screen.getByLabelText('Job Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Job URL (Optional)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate Resume & Cover Letter' })).toBeInTheDocument();
  });

  it('disables generate button when job description is empty', () => {
    render(<InputForm onGenerate={mockOnGenerate} />);
    
    const generateButton = screen.getByRole('button', { name: 'Generate Resume & Cover Letter' });
    expect(generateButton).toBeDisabled();
  });

  it('enables generate button when job description is provided', async () => {
    const user = userEvent.setup();
    render(<InputForm onGenerate={mockOnGenerate} />);
    
    const jobDescriptionTextarea = screen.getByLabelText('Job Description');
    await user.type(jobDescriptionTextarea, 'Software Engineer position');
    
    const generateButton = screen.getByRole('button', { name: 'Generate Resume & Cover Letter' });
    expect(generateButton).toBeEnabled();
  });

  it('calls onGenerate with correct data when form is submitted', async () => {
    const user = userEvent.setup();
    render(<InputForm onGenerate={mockOnGenerate} />);
    
    const jobDescriptionTextarea = screen.getByLabelText('Job Description');
    const jobUrlInput = screen.getByLabelText('Job URL (Optional)');
    const generateButton = screen.getByRole('button', { name: 'Generate Resume & Cover Letter' });
    
    await user.type(jobDescriptionTextarea, 'Software Engineer position');
    await user.type(jobUrlInput, 'https://example.com/job');
    await user.click(generateButton);
    
    expect(mockOnGenerate).toHaveBeenCalledWith('Software Engineer position', 'https://example.com/job');
  });

  it('shows loading state when isLoading is true', () => {
    render(<InputForm onGenerate={mockOnGenerate} isLoading={true} />);
    
    const generateButton = screen.getByRole('button', { name: 'Generating...' });
    expect(generateButton).toBeDisabled();
  });

  it('handles form submission with only job description', async () => {
    const user = userEvent.setup();
    render(<InputForm onGenerate={mockOnGenerate} />);
    
    const jobDescriptionTextarea = screen.getByLabelText('Job Description');
    const generateButton = screen.getByRole('button', { name: 'Generate Resume & Cover Letter' });
    
    await user.type(jobDescriptionTextarea, 'Software Engineer position');
    await user.click(generateButton);
    
    expect(mockOnGenerate).toHaveBeenCalledWith('Software Engineer position', '');
  });

  it('prevents form submission when job description is empty', async () => {
    const user = userEvent.setup();
    render(<InputForm onGenerate={mockOnGenerate} />);
    
    const generateButton = screen.getByRole('button', { name: 'Generate Resume & Cover Letter' });
    await user.click(generateButton);
    
    expect(mockOnGenerate).not.toHaveBeenCalled();
  });
});
