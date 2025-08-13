'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CoverLetterData } from '@/lib/mock-data';

interface CoverLetterDisplayProps {
  coverLetterHtml: string;
  data: CoverLetterData;
}

export default function CoverLetterDisplay({ coverLetterHtml, data }: CoverLetterDisplayProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        doc.open();
        doc.write(coverLetterHtml);
        doc.close();
      }
    }
  }, [coverLetterHtml]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Cover Letter - {data.personalInfo.name}</span>
          <div className="text-sm text-muted-foreground">
            To: {data.recipient.name} at {data.recipient.company}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <iframe
            ref={iframeRef}
            title="Cover Letter Preview"
            className="w-full h-[600px] border-0"
            sandbox="allow-same-origin"
          />
        </div>
      </CardContent>
    </Card>
  );
}
