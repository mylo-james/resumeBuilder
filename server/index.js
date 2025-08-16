import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// User management endpoints
app.post('/api/users', async (req, res) => {
  try {
    const { email, name, phone, location, linkedin, github, portfolio } = req.body;
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone,
        location,
        linkedin,
        github,
        portfolio,
      },
    });
    
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        resumes: true,
        coverLetters: true,
        jobRequests: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Job request endpoints
app.post('/api/job-requests', async (req, res) => {
  try {
    const { userId, jobDescription, jobUrl } = req.body;
    
    // Create job request
    const jobRequest = await prisma.jobRequest.create({
      data: {
        userId,
        jobDescription,
        jobUrl,
        status: 'PENDING',
        aiRequestId: uuidv4(),
      },
    });
    
    // Start AI processing in background
    processJobRequest(jobRequest.id, userId, jobDescription, jobUrl);
    
    res.json(jobRequest);
  } catch (error) {
    console.error('Error creating job request:', error);
    res.status(500).json({ error: 'Failed to create job request' });
  }
});

app.get('/api/job-requests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const jobRequest = await prisma.jobRequest.findUnique({
      where: { id },
      include: {
        resume: {
          include: {
            experience: true,
            education: true,
            skills: true,
            projects: true,
          },
        },
        coverLetter: {
          include: {
            recipient: true,
          },
        },
      },
    });
    
    if (!jobRequest) {
      return res.status(404).json({ error: 'Job request not found' });
    }
    
    res.json(jobRequest);
  } catch (error) {
    console.error('Error fetching job request:', error);
    res.status(500).json({ error: 'Failed to fetch job request' });
  }
});

// AI Agent communication
async function processJobRequest(jobRequestId, userId, jobDescription, jobUrl) {
  try {
    // Update status to processing
    await prisma.jobRequest.update({
      where: { id: jobRequestId },
      data: { status: 'PROCESSING' },
    });
    
    // Call AI agent (this would be your external AI service)
    const aiResponse = await callAIAgent(jobDescription, jobUrl);
    
    // Create resume and cover letter from AI response
    const resume = await createResumeFromAI(userId, aiResponse.resume);
    const coverLetter = await createCoverLetterFromAI(userId, aiResponse.coverLetter);
    
    // Update job request with generated documents
    await prisma.jobRequest.update({
      where: { id: jobRequestId },
      data: {
        status: 'COMPLETED',
        resumeId: resume.id,
        coverLetterId: coverLetter.id,
        aiResponse: aiResponse,
      },
    });
    
    console.log(`Job request ${jobRequestId} completed successfully`);
  } catch (error) {
    console.error(`Error processing job request ${jobRequestId}:`, error);
    
    // Update status to failed
    await prisma.jobRequest.update({
      where: { id: jobRequestId },
      data: {
        status: 'FAILED',
        errorMessage: error.message,
      },
    });
  }
}

async function callAIAgent(jobDescription, jobUrl) {
  // This is where you would call your AI agent service
  // For now, we'll simulate the response with mock data
  // In production, this would be an HTTP call to your AI service
  
  const aiServiceUrl = process.env.AI_SERVICE_URL;
  
  if (aiServiceUrl) {
    try {
      const response = await axios.post(aiServiceUrl, {
        jobDescription,
        jobUrl,
        tools: ['makeResume', 'makeCoverLetter'],
      });
      
      return response.data;
    } catch (error) {
      console.error('Error calling AI service:', error);
      throw new Error('AI service unavailable');
    }
  } else {
    // Fallback to mock data for development
    return {
      resume: {
        title: 'Professional Resume',
        summary: 'Experienced software engineer with expertise in full-stack development.',
        experience: [
          {
            title: 'Senior Software Engineer',
            companies: ['TechCorp Inc.'],
            startYear: '2022',
            endYear: 'Present',
            bullets: [
              'Led development of microservices architecture',
              'Mentored junior developers',
              'Implemented CI/CD pipelines',
            ],
          },
        ],
        education: [
          {
            degree: 'Bachelor of Science in Computer Science',
            institution: 'University of California, Berkeley',
            location: 'Berkeley, CA',
            graduationDate: 'May 2020',
          },
        ],
        skills: {
          technical: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
          soft: ['Leadership', 'Communication', 'Problem Solving'],
        },
        projects: [
          {
            name: 'Resume Builder App',
            description: 'Full-stack application for generating professional resumes',
            technologies: ['Next.js', 'Express.js', 'Prisma', 'PostgreSQL'],
          },
        ],
      },
      coverLetter: {
        title: 'Cover Letter',
        date: new Date().toLocaleDateString(),
        recipient: {
          name: 'Hiring Manager',
          title: 'Hiring Manager',
          company: 'Target Company',
          address: '123 Business St, City, State 12345',
        },
        salutation: 'Dear Hiring Manager,',
        body: [
          'I am writing to express my interest in the position at your company.',
          'With my background in software development and passion for creating innovative solutions, I believe I would be a valuable addition to your team.',
        ],
        closing: 'Thank you for considering my application.',
        signature: 'Sincerely,\n[Your Name]',
      },
    };
  }
}

async function createResumeFromAI(userId, aiResumeData) {
  const resume = await prisma.resume.create({
    data: {
      userId,
      title: aiResumeData.title,
      summary: aiResumeData.summary,
    },
  });
  
  // Create experience entries
  for (const exp of aiResumeData.experience) {
    await prisma.experience.create({
      data: {
        resumeId: resume.id,
        title: exp.title,
        companies: exp.companies,
        startYear: exp.startYear,
        endYear: exp.endYear,
        bullets: exp.bullets,
      },
    });
  }
  
  // Create education entries
  for (const edu of aiResumeData.education) {
    await prisma.education.create({
      data: {
        resumeId: resume.id,
        degree: edu.degree,
        institution: edu.institution,
        location: edu.location,
        graduationDate: edu.graduationDate,
        gpa: edu.gpa,
      },
    });
  }
  
  // Create skills
  if (aiResumeData.skills) {
    await prisma.skills.create({
      data: {
        resumeId: resume.id,
        technical: aiResumeData.skills.technical,
        soft: aiResumeData.skills.soft,
      },
    });
  }
  
  // Create projects
  for (const project of aiResumeData.projects || []) {
    await prisma.project.create({
      data: {
        resumeId: resume.id,
        name: project.name,
        description: project.description,
        technologies: project.technologies,
        link: project.link,
      },
    });
  }
  
  return resume;
}

async function createCoverLetterFromAI(userId, aiCoverLetterData) {
  const coverLetter = await prisma.coverLetter.create({
    data: {
      userId,
      title: aiCoverLetterData.title,
      date: aiCoverLetterData.date,
      salutation: aiCoverLetterData.salutation,
      body: aiCoverLetterData.body,
      closing: aiCoverLetterData.closing,
      signature: aiCoverLetterData.signature,
    },
  });
  
  // Create recipient
  if (aiCoverLetterData.recipient) {
    await prisma.recipient.create({
      data: {
        coverLetterId: coverLetter.id,
        name: aiCoverLetterData.recipient.name,
        title: aiCoverLetterData.recipient.title,
        company: aiCoverLetterData.recipient.company,
        address: aiCoverLetterData.recipient.address,
      },
    });
  }
  
  return coverLetter;
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});