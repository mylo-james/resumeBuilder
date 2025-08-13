'use client';

import { useState, useEffect } from 'react';
import { mockResumeData, mockCoverLetterData } from '@/lib/mock-data';
import { clientTemplateService } from '@/lib/services/client-template-service';
import ResumeDisplay from '@/components/ResumeDisplay';
import CoverLetterDisplay from '@/components/CoverLetterDisplay';
import InputForm from '@/components/InputForm';

export default function Home() {
  const [resumeHtml, setResumeHtml] = useState<string>('');
  const [coverLetterHtml, setCoverLetterHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load initial mock data
    const loadMockData = async () => {
      try {
        setIsLoading(true);
        const [resume, coverLetter] = await Promise.all([
          clientTemplateService.renderResume(mockResumeData),
          clientTemplateService.renderCoverLetter(mockCoverLetterData)
        ]);
        setResumeHtml(resume);
        setCoverLetterHtml(coverLetter);
      } catch (error) {
        console.error('Failed to load mock data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMockData();
  }, []);

  const handleGenerate = async (jobDescription: string, jobUrl: string) => {
    // For now, this is non-functional as per AC: 4
    // In future stories, this will integrate with AI and backend services
    console.log('Generate button clicked with:', { jobDescription, jobUrl });
    alert('Generate functionality will be implemented in future stories. For now, displaying mock data.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Resume Builder
          </h1>
          <p className="text-lg text-gray-600">
            Generate personalized resumes and cover letters with AI
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>

          {/* Document Previews */}
          <div className="lg:col-span-2 space-y-8">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-lg text-gray-600">Loading documents...</div>
              </div>
            ) : (
              <>
                <ResumeDisplay resumeHtml={resumeHtml} data={mockResumeData} />
                <CoverLetterDisplay coverLetterHtml={coverLetterHtml} data={mockCoverLetterData} />
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>This is a demo using mock data. AI integration coming soon!</p>
        </div>
      </div>
    </div>
  );
}
