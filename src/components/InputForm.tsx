'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Globe, FileText } from 'lucide-react';
import webScraper from '@/lib/services/web-scraper';

interface InputFormProps {
  onGenerate: (jobDescription: string, jobUrl?: string) => void;
  isLoading: boolean;
}

export default function InputForm({ onGenerate, isLoading }: InputFormProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapedData, setScrapedData] = useState<any>(null);
  const [urlError, setUrlError] = useState<string | null>(null);

  const handleScrapeUrl = async () => {
    if (!jobUrl.trim()) {
      setUrlError('Please enter a job URL');
      return;
    }

    setIsScraping(true);
    setUrlError(null);
    setScrapedData(null);

    try {
      // Validate URL first
      const isValid = await webScraper.validateJobUrl(jobUrl);
      if (!isValid) {
        setUrlError('Invalid URL or unable to access the page');
        return;
      }

      // Scrape the job description
      const scrapedJobData = await webScraper.scrapeJobDescription(jobUrl);
      setScrapedData(scrapedJobData);
      
      // Auto-fill the job description if it's empty
      if (!jobDescription.trim()) {
        setJobDescription(scrapedJobData.description);
      }
    } catch (error) {
      console.error('Error scraping URL:', error);
      setUrlError('Failed to scrape job description. Please enter it manually.');
    } finally {
      setIsScraping(false);
    }
  };

  const handleGenerate = () => {
    if (!jobDescription.trim()) {
      return;
    }
    onGenerate(jobDescription.trim(), jobUrl.trim() || undefined);
  };

  const handleUrlChange = (value: string) => {
    setJobUrl(value);
    setUrlError(null);
    if (scrapedData) {
      setScrapedData(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Job URL Input */}
      <div className="space-y-2">
        <Label htmlFor="jobUrl">Job URL (Optional)</Label>
        <div className="flex gap-2">
          <Input
            id="jobUrl"
            type="url"
            placeholder="https://example.com/job-posting"
            value={jobUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleScrapeUrl}
            disabled={isScraping || !jobUrl.trim()}
            className="px-3"
          >
            {isScraping ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Globe className="h-4 w-4" />
            )}
          </Button>
        </div>
        {urlError && (
          <p className="text-sm text-red-500">{urlError}</p>
        )}
      </div>

      {/* Scraped Data Display */}
      {scrapedData && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-4 w-4 text-blue-600" />
            <h4 className="font-medium text-blue-900">Scraped Job Information</h4>
          </div>
          
          {scrapedData.title && (
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-700">Title:</span>
              <span className="text-sm text-gray-600 ml-2">{scrapedData.title}</span>
            </div>
          )}
          
          {scrapedData.company && (
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-700">Company:</span>
              <span className="text-sm text-gray-600 ml-2">{scrapedData.company}</span>
            </div>
          )}
          
          {scrapedData.location && (
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-700">Location:</span>
              <span className="text-sm text-gray-600 ml-2">{scrapedData.location}</span>
            </div>
          )}
          
          <div className="text-xs text-gray-500 mt-2">
            Scraped at: {new Date(scrapedData.scrapedAt).toLocaleString()}
          </div>
        </div>
      )}

      {/* Job Description Input */}
      <div className="space-y-2">
        <Label htmlFor="jobDescription">
          Job Description {!jobDescription.trim() && <span className="text-red-500">*</span>}
        </Label>
        <div className="relative">
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description here or use the URL scraper above..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={8}
            className="resize-none"
          />
          <div className="absolute top-2 right-2">
            <FileText className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            {jobDescription.length} characters
          </span>
          <span>
            {jobDescription.length > 0 ? 'Ready to generate' : 'Enter job description'}
          </span>
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={isLoading || !jobDescription.trim()}
        className="w-full"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Documents...
          </>
        ) : (
          'Generate Resume & Cover Letter'
        )}
      </Button>

      {/* Tips */}
      <div className="text-xs text-gray-500 space-y-1">
        <p><strong>Tip:</strong> Use the URL scraper to automatically extract job information from job posting websites.</p>
        <p><strong>Tip:</strong> Include specific requirements, responsibilities, and company information for better results.</p>
      </div>
    </div>
  );
}
