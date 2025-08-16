'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import pdfGenerator from '@/lib/services/pdf-generator';

interface PDFDownloadButtonProps {
  resume: any;
  coverLetter: any;
  userInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
  disabled?: boolean;
}

export default function PDFDownloadButton({ 
  resume, 
  coverLetter, 
  userInfo, 
  disabled = false 
}: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!resume || !coverLetter) {
      console.error('Resume or cover letter data is missing');
      return;
    }

    setIsGenerating(true);

    try {
      // Generate filename based on user name and date
      const userName = userInfo?.name || 'resume';
      const date = new Date().toISOString().split('T')[0];
      const filename = `${userName.replace(/\s+/g, '-').toLowerCase()}-${date}.pdf`;

      // Generate and download PDF
      pdfGenerator.downloadPDF(
        {
          resume,
          coverLetter,
          userInfo,
        },
        filename
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
      // You could add a toast notification here
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={disabled || isGenerating || !resume || !coverLetter}
      className="w-full"
      variant="outline"
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </>
      )}
    </Button>
  );
}