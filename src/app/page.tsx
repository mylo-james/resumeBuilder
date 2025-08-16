'use client';

import { useState, useEffect } from 'react';
import { jobRequestService, healthService, userService } from '@/lib/services/api-service';
import ResumeDisplay from '@/components/ResumeDisplay';
import CoverLetterDisplay from '@/components/CoverLetterDisplay';
import InputForm from '@/components/InputForm';
import UserRegistration from '@/components/UserRegistration';
import PDFDownloadButton from '@/components/PDFDownloadButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

interface JobRequest {
  id: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  jobDescription: string;
  jobUrl?: string;
  resume?: any;
  coverLetter?: any;
  errorMessage?: string;
}

interface User {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
}

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentJobRequest, setCurrentJobRequest] = useState<JobRequest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backendHealth, setBackendHealth] = useState<'loading' | 'healthy' | 'unhealthy'>('loading');

  useEffect(() => {
    // Check backend health on component mount
    checkBackendHealth();
  }, []);

  useEffect(() => {
    // Load user data when userId changes
    if (userId) {
      loadUserData();
    }
  }, [userId]);

  const checkBackendHealth = async () => {
    try {
      await healthService.checkHealth();
      setBackendHealth('healthy');
    } catch (error) {
      console.error('Backend health check failed:', error);
      setBackendHealth('unhealthy');
    }
  };

  const loadUserData = async () => {
    if (!userId) return;
    
    try {
      const userData = await userService.getUser(userId);
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const handleUserCreated = (newUserId: string) => {
    setUserId(newUserId);
  };

  const handleGenerate = async (jobDescription: string, jobUrl?: string) => {
    if (!userId) {
      setError('Please register first');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Create job request
      const jobRequest = await jobRequestService.createJobRequest({
        userId,
        jobDescription,
        jobUrl: jobUrl || '',
      });
      
      setCurrentJobRequest(jobRequest);
      
      // Start polling for updates
      await jobRequestService.pollJobRequest(jobRequest.id, (updatedRequest) => {
        setCurrentJobRequest(updatedRequest);
        
        if (updatedRequest.status === 'COMPLETED') {
          setIsLoading(false);
        } else if (updatedRequest.status === 'FAILED') {
          setIsLoading(false);
          setError(updatedRequest.errorMessage || 'Failed to generate documents');
        }
      });
      
    } catch (error) {
      console.error('Failed to generate documents:', error);
      setError('Failed to generate documents. Please try again.');
      setIsLoading(false);
    }
  };

  if (backendHealth === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Checking backend connection...</p>
        </div>
      </div>
    );
  }

  if (backendHealth === 'unhealthy') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              Backend Unavailable
            </CardTitle>
            <CardDescription>
              Unable to connect to the backend server. Please ensure the server is running.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Make sure to start the backend server with:
            </p>
            <code className="block bg-gray-100 p-2 rounded text-sm">
              npm run dev:server
            </code>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <UserRegistration onUserCreated={handleUserCreated} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
          <p className="text-gray-600">Generate professional resumes and cover letters with AI</p>
        </div>

        {error && (
          <Alert className="mb-6">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {currentJobRequest && currentJobRequest.status === 'PROCESSING' && (
          <Alert className="mb-6">
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertDescription>
              AI is generating your documents... This may take a few moments.
            </AlertDescription>
          </Alert>
        )}

        {currentJobRequest && currentJobRequest.status === 'COMPLETED' && (
          <Alert className="mb-6">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription>
              Documents generated successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Job Information</CardTitle>
                <CardDescription>
                  Provide the job description and URL to generate tailored documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
                
                {/* PDF Download Button */}
                {currentJobRequest?.status === 'COMPLETED' && currentJobRequest.resume && currentJobRequest.coverLetter && (
                  <div className="mt-6">
                    <PDFDownloadButton
                      resume={currentJobRequest.resume}
                      coverLetter={currentJobRequest.coverLetter}
                      userInfo={user || undefined}
                      disabled={isLoading}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Document Display */}
          <div className="lg:col-span-2 space-y-6">
            {currentJobRequest?.resume && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated Resume</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResumeDisplay resume={currentJobRequest.resume} />
                </CardContent>
              </Card>
            )}

            {currentJobRequest?.coverLetter && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated Cover Letter</CardTitle>
                </CardHeader>
                <CardContent>
                  <CoverLetterDisplay coverLetter={currentJobRequest.coverLetter} />
                </CardContent>
              </Card>
            )}

            {!currentJobRequest && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-gray-500">
                    <p>Enter job information to generate your documents</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
