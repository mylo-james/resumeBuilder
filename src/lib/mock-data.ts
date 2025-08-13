export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    companies: string[];
    startYear: string;
    endYear: string;
    bullets: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
}

export interface CoverLetterData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  date: string;
  recipient: {
    name: string;
    title: string;
    company: string;
    address: string;
  };
  salutation: string;
  body: string[];
  closing: string;
  signature: string;
}

export const mockResumeData: ResumeData = {
  personalInfo: {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
  },
  summary:
    'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading development teams.',
  experience: [
    {
      title: 'Senior Software Engineer',
      companies: ['TechCorp Inc.', 'Innovation Labs'],
      startYear: '2022',
      endYear: 'Present',
      bullets: [
        'Led development of microservices architecture serving 1M+ users',
        'Mentored 3 junior developers and conducted code reviews',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Optimized database queries improving performance by 40%',
      ],
    },
    {
      title: 'Software Engineer',
      companies: ['StartupXYZ', 'Tech Solutions Co.'],
      startYear: '2020',
      endYear: '2021',
      bullets: [
        'Built responsive web applications using React and TypeScript',
        'Collaborated with design team to implement user-friendly interfaces',
        'Integrated third-party APIs and payment processing systems',
        'Participated in agile development process with 2-week sprints',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      graduationDate: 'May 2020',
      gpa: '3.8/4.0',
    },
  ],
  skills: {
    technical: [
      'JavaScript/TypeScript',
      'React/Next.js',
      'Node.js/Express',
      'Python/Django',
      'PostgreSQL/MongoDB',
      'AWS/Docker',
      'Git/GitHub',
    ],
    soft: [
      'Team Leadership',
      'Problem Solving',
      'Communication',
      'Agile/Scrum',
      'Technical Writing',
    ],
  },
  projects: [
    {
      name: 'E-commerce Platform',
      description:
        'Full-stack e-commerce solution with payment processing and inventory management',
      technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      link: 'github.com/johndoe/ecommerce',
    },
    {
      name: 'Task Management App',
      description:
        'Collaborative task management application with real-time updates',
      technologies: ['Next.js', 'Socket.io', 'PostgreSQL'],
      link: 'github.com/johndoe/taskmanager',
    },
  ],
};

export const mockCoverLetterData: CoverLetterData = {
  personalInfo: {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    address: '123 Main Street, San Francisco, CA 94102',
  },
  date: 'December 15, 2024',
  recipient: {
    name: 'Jane Smith',
    title: 'Hiring Manager',
    company: 'Innovation Tech Solutions',
    address: '456 Business Ave, San Francisco, CA 94105',
  },
  salutation: 'Dear Ms. Smith,',
  body: [
    'I am writing to express my strong interest in the Senior Software Engineer position at Innovation Tech Solutions. With over 5 years of experience in full-stack development and a passion for creating innovative solutions, I am excited about the opportunity to contribute to your team.',
    'In my current role at TechCorp Inc., I have successfully led the development of microservices architecture that serves over 1 million users. I have experience with modern technologies including React, Node.js, and cloud platforms, which align perfectly with your technical requirements.',
    "I am particularly drawn to Innovation Tech Solutions' mission of leveraging technology to solve real-world problems. Your focus on sustainable development and user-centered design resonates with my own values and approach to software engineering.",
    "I would welcome the opportunity to discuss how my technical skills and experience can contribute to your team's success. Thank you for considering my application.",
  ],
  closing: 'Sincerely,',
  signature: 'John Doe',
};
