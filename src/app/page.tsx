'use client';

import { useState, useEffect } from 'react';
import { ResumeData, CoverLetterData } from '@/lib/mock-data';
import { clientTemplateService } from '@/lib/services/client-template-service';
import ResumeDisplay from '@/components/ResumeDisplay';
import CoverLetterDisplay from '@/components/CoverLetterDisplay';
import InputForm from '@/components/InputForm';

export default function Home() {
  const [resumeHtml, setResumeHtml] = useState<string>('');
  const [coverLetterHtml, setCoverLetterHtml] = useState<string>('');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load initial data from API
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jobDescription: '',
            jobUrl: '',
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResumeData(data.resume);
        setCoverLetterData(data.coverLetter);

        const [resume, coverLetter] = await Promise.all([
          clientTemplateService.renderResume(data.resume),
          clientTemplateService.renderCoverLetter(data.coverLetter)
        ]);
        setResumeHtml(resume);
        setCoverLetterHtml(coverLetter);
      } catch (error) {
        console.error('Failed to load initial data:', error);
        setError('Failed to load initial data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleGenerate = async (jobDescription: string, jobUrl: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription,
          jobUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResumeData(data.resume);
      setCoverLetterData(data.coverLetter);

      const [resume, coverLetter] = await Promise.all([
        clientTemplateService.renderResume(data.resume),
        clientTemplateService.renderCoverLetter(data.coverLetter)
      ]);
      setResumeHtml(resume);
      setCoverLetterHtml(coverLetter);
    } catch (error) {
      console.error('Failed to generate documents:', error);
      setError('Failed to generate documents. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-800">{error}</div>
              </div>
            )}
            
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-lg text-gray-600">Loading documents...</div>
              </div>
            ) : resumeData && coverLetterData ? (
              <>
                <ResumeDisplay resumeHtml={resumeHtml} data={resumeData} />
                <CoverLetterDisplay coverLetterHtml={coverLetterHtml} data={coverLetterData} />
              </>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>This is a demo using static data from the backend API. AI integration coming soon!</p>
        </div>
      </div>
    </div>
  );
}
