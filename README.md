# Resume Builder - Full Stack Application

A modern full-stack application that generates professional resumes and cover letters using AI. The application features a Next.js frontend, Express.js backend, PostgreSQL database, and AI agent integration.

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with shadcn/ui components
- **Language**: TypeScript
- **Port**: 3000

### Backend (Express.js)
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Port**: 3001
- **Features**: User management, job request processing, AI agent communication

### Database (PostgreSQL)
- **ORM**: Prisma
- **Models**: Users, Resumes, Cover Letters, Job Requests, and related entities
- **Features**: Full relational database with proper relationships

### AI Agent Integration
- **External Service**: AI agent with `makeResume` and `makeCoverLetter` tools
- **Communication**: HTTP API calls from backend to AI service
- **Fallback**: Mock data for development

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL database
- AI agent service (optional for development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy the example environment file and configure your settings:
```bash
cp .env.example .env
```

Update the `.env` file with your configuration:
```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/resume_builder"

# Server Configuration
PORT=3001

# AI Service Configuration (optional)
AI_SERVICE_URL="http://localhost:8000/api/generate"

# Next.js Configuration
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### 3. Set Up Database
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Run migrations
npm run db:migrate
```

### 4. Start Development Servers

#### Option A: Start Both Frontend and Backend
```bash
npm run dev:full
```

#### Option B: Start Separately
```bash
# Terminal 1: Start backend server
npm run dev:server

# Terminal 2: Start frontend
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database Studio**: `npm run db:studio`

## 📁 Project Structure

```
resume-builder/
├── src/                    # Frontend source code
│   ├── app/               # Next.js app router
│   ├── components/        # React components
│   └── lib/              # Utilities and services
├── server/               # Backend Express.js server
│   └── index.js         # Main server file
├── prisma/              # Database schema and migrations
│   └── schema.prisma    # Database schema
├── tests/               # Test files
└── docs/               # Documentation and stories
```

## 🔄 User Flow

1. **User Registration**: Users provide their information (email, name, contact details)
2. **Job Input**: Users enter job description and optional job URL
3. **AI Processing**: Backend creates job request and calls AI agent
4. **Document Generation**: AI agent generates resume and cover letter
5. **Database Storage**: Generated documents are stored in the database
6. **Display**: Frontend displays the generated documents

## 🛠️ Development

### Available Scripts
```bash
# Development
npm run dev              # Start Next.js frontend
npm run dev:server       # Start Express.js backend
npm run dev:full         # Start both frontend and backend

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Run database migrations
npm run db:studio        # Open Prisma Studio

# Testing
npm test                 # Run unit tests
npm run test:e2e         # Run E2E tests
npm run test:coverage    # Run tests with coverage

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking
npm run format           # Format code with Prettier
```

### Database Schema

The application uses the following main entities:

- **User**: Personal information and contact details
- **Resume**: Resume content with experience, education, skills, and projects
- **CoverLetter**: Cover letter content with recipient information
- **JobRequest**: Job application requests with status tracking

### API Endpoints

#### Backend API (Port 3001)
- `GET /health` - Health check
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user with documents
- `POST /api/job-requests` - Create job request
- `GET /api/job-requests/:id` - Get job request with generated documents

## 🤖 AI Agent Integration

The backend communicates with an external AI agent service that provides:

- **makeResume Tool**: Generates professional resumes based on job descriptions
- **makeCoverLetter Tool**: Creates tailored cover letters

### AI Service Configuration
Set the `AI_SERVICE_URL` environment variable to point to your AI agent service. The backend will send requests with:

```json
{
  "jobDescription": "string",
  "jobUrl": "string",
  "tools": ["makeResume", "makeCoverLetter"]
}
```

### Development Mode
When `AI_SERVICE_URL` is not set, the application uses mock data for development and testing.

## 🧪 Testing

The project includes comprehensive testing:

- **Unit Tests**: Jest for individual functions and components
- **Integration Tests**: API and service interaction tests
- **E2E Tests**: Playwright for complete user workflows

Run tests with:
```bash
npm test              # Unit and integration tests
npm run test:e2e      # End-to-end tests
npm run test:coverage # Tests with coverage report
```

## 📚 Documentation

- **User Stories**: `docs/stories/` - Detailed development stories
- **Architecture**: `docs/architecture/` - System design and technical decisions
- **API Spec**: `docs/architecture/api-spec.md` - API documentation

## 🚀 Deployment

### Frontend Deployment
The Next.js frontend can be deployed to Vercel, Netlify, or any static hosting service.

### Backend Deployment
The Express.js backend can be deployed to:
- Railway
- Heroku
- DigitalOcean App Platform
- AWS Elastic Beanstalk

### Database Deployment
Use managed PostgreSQL services:
- Supabase
- Railway
- PlanetScale
- AWS RDS

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Write tests for new features
3. Update documentation as needed
4. Use conventional commit messages

## 📄 License

This project is licensed under the MIT License.
