'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResumeData } from '@/lib/mock-data';

interface ResumeDisplayProps {
  resumeHtml: string;
  data: ResumeData;
}

export default function ResumeDisplay({ resumeHtml, data }: ResumeDisplayProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        doc.open();
        doc.write(resumeHtml);
        doc.close();
      }
    }
  }, [resumeHtml]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Resume - {data.personalInfo.name}</span>
          <div className="text-sm text-muted-foreground">
            {data.personalInfo.email} | {data.personalInfo.phone}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <iframe
            ref={iframeRef}
            title="Resume Preview"
            className="w-full h-[800px] border-0"
            sandbox="allow-same-origin"
          />
        </div>
      </CardContent>
    </Card>
  );
}
