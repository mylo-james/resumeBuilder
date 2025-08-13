import { NextRequest, NextResponse } from 'next/server';
import { mockResumeData, mockCoverLetterData } from '@/lib/mock-data';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      // If JSON parsing fails, use empty object as fallback
      body = {};
    }
    
    const { jobDescription, jobUrl } = body;

    // For now, we ignore the input and return static data
    // This will be enhanced in future stories with AI integration
    const response = {
      resume: mockResumeData,
      coverLetter: mockCoverLetterData,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    // Only log errors in development/production, not during tests
    if (process.env.NODE_ENV !== 'test') {
      console.error('Error in /api/generate:', error);
    }
    return NextResponse.json(
      { error: 'Failed to generate documents' },
      { status: 500 }
    );
  }
}
