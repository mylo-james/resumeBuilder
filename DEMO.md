# Resume Builder Demo Guide

## 🚀 **Quick Start Demo**

This guide will help you run and test the completed Resume Builder application.

### **Prerequisites**
- Node.js 20+
- PostgreSQL database (local or cloud)
- Git

### **1. Setup Database**

First, set up your PostgreSQL database:

```bash
# If using local PostgreSQL
createdb resume_builder

# Or use a cloud service like Supabase, Railway, etc.
```

### **2. Configure Environment**

```bash
# Copy environment file
cp .env.example .env

# Edit .env with your database URL
DATABASE_URL="postgresql://username:password@localhost:5432/resume_builder"
```

### **3. Install and Setup**

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push
```

### **4. Start the Application**

```bash
# Start both frontend and backend
npm run dev:full
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

## 🎯 **Demo Scenarios**

### **Scenario 1: Basic User Registration and Document Generation**

1. **Open the application** at http://localhost:3000
2. **Register a new user** with your information
3. **Enter a job description** like:
   ```
   Senior Software Engineer at Google
   
   We are looking for a Senior Software Engineer to join our team. 
   The ideal candidate will have 5+ years of experience in full-stack development, 
   with expertise in React, Node.js, and cloud technologies. 
   You will be responsible for developing scalable applications, 
   mentoring junior developers, and implementing best practices.
   ```
4. **Click "Generate Resume & Cover Letter"**
5. **Watch the real-time updates** as the AI processes your request
6. **View the generated documents** in the preview
7. **Download the PDF** using the download button

### **Scenario 2: Web Scraping Demo**

1. **Enter a job URL** in the URL field (e.g., a LinkedIn job posting)
2. **Click the globe icon** to scrape the job description
3. **Review the scraped information** displayed in the blue box
4. **Generate documents** using the scraped content
5. **Compare results** with manual entry

### **Scenario 3: AI Agent Integration**

To test with a real AI agent:

1. **Set up your AI service** with `makeResume` and `makeCoverLetter` tools
2. **Update .env** with your AI service URL:
   ```
   AI_SERVICE_URL="http://your-ai-service.com/api/generate"
   ```
3. **Restart the backend server**
4. **Test the integration** with real AI-generated content

### **Scenario 4: Error Handling Demo**

1. **Try generating without a job description** - see validation
2. **Enter an invalid URL** - see scraping error handling
3. **Disconnect the backend** - see health check failure
4. **Test with network issues** - see graceful degradation

## 🔧 **Development Features**

### **Database Management**

```bash
# View database in Prisma Studio
npm run db:studio

# Run migrations
npm run db:migrate

# Reset database
npm run db:push --force-reset
```

### **Testing**

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Check test coverage
npm run test:coverage
```

### **Code Quality**

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

## 📊 **Monitoring and Debugging**

### **Backend Health Check**

```bash
curl http://localhost:3001/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-12-19T10:30:00.000Z",
  "aiServiceConnected": false
}
```

### **Database Queries**

Use Prisma Studio to inspect:
- User profiles
- Generated documents
- Job request history
- AI response metadata

### **Logs**

Check console output for:
- AI service connection status
- Job request processing
- Error messages
- Performance metrics

## 🎨 **UI Features to Test**

### **Responsive Design**
- **Desktop**: Full layout with side-by-side panels
- **Tablet**: Stacked layout with proper spacing
- **Mobile**: Single-column layout with touch-friendly buttons

### **Accessibility**
- **Keyboard navigation**: Tab through all interactive elements
- **Screen readers**: Proper ARIA labels and semantic HTML
- **Color contrast**: High contrast for readability
- **Focus indicators**: Clear focus states for all elements

### **Loading States**
- **Form submission**: Button shows loading spinner
- **URL scraping**: Globe icon animates during scraping
- **Document generation**: Real-time status updates
- **PDF generation**: Download button shows progress

## 🔍 **Troubleshooting**

### **Common Issues**

1. **Database Connection Error**
   ```bash
   # Check DATABASE_URL in .env
   # Ensure PostgreSQL is running
   # Test connection manually
   ```

2. **Port Already in Use**
   ```bash
   # Kill processes on ports 3000/3001
   lsof -ti:3000 | xargs kill -9
   lsof -ti:3001 | xargs kill -9
   ```

3. **AI Service Not Available**
   - Application falls back to mock data
   - Check AI_SERVICE_URL in .env
   - Verify AI service is running

4. **PDF Generation Fails**
   - Check browser console for errors
   - Ensure jsPDF is properly installed
   - Try different browser

### **Performance Tips**

1. **Database**: Use connection pooling for production
2. **Caching**: Implement Redis for frequently accessed data
3. **CDN**: Serve static assets from CDN
4. **Monitoring**: Add application performance monitoring

## 🚀 **Production Deployment**

### **Environment Variables**

```bash
# Required
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_API_URL="https://your-api.com"

# Optional
AI_SERVICE_URL="https://your-ai-service.com"
JWT_SECRET="your-secret-key"
```

### **Deployment Platforms**

- **Frontend**: Vercel, Netlify, AWS Amplify
- **Backend**: Railway, Heroku, DigitalOcean
- **Database**: Supabase, Railway, AWS RDS

### **Health Checks**

```bash
# Frontend health
curl https://your-frontend.com

# Backend health
curl https://your-backend.com/health

# Database health
npm run db:studio
```

## 🎉 **Success Metrics**

The application is working correctly when:

- ✅ **User registration** creates database records
- ✅ **Job input** triggers AI processing
- ✅ **Real-time updates** show progress
- ✅ **Document generation** produces professional output
- ✅ **PDF download** works in all browsers
- ✅ **Error handling** provides helpful messages
- ✅ **Web scraping** extracts job information
- ✅ **Database** stores all user data and documents

## 🔮 **Next Steps**

After successful demo:

1. **Connect real AI agent** with your tools
2. **Add authentication** for user management
3. **Implement analytics** for usage tracking
4. **Add more templates** for document variety
5. **Scale infrastructure** for production load

The application is now ready for production use with real AI agent integration!