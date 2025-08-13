# Architecture - Core Workflows

## Main Application Workflow

### Sequence Diagram

```
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant OpenAI
    participant ExternalSite

    User->>Frontend: Enters Job Description (Text/URL)
    Frontend->>Backend: POST /api/generate
    alt Input is URL
        Backend->>ExternalSite: Scrape Content
        ExternalSite-->>Backend: Return Content
    end
    Backend->>OpenAI: Send Content
    OpenAI-->>Backend: Return JSON
    Backend->>Backend: Save PDF Copy (Story 1.6)
    Backend-->>Frontend: Return JSON and PDF
    Frontend->>Frontend: Populate Handlebars Templates
    Frontend->>User: Display Content & Trigger Download
```

## Detailed Workflow Steps

### 1. User Input Phase

- User enters job description as text or URL
- Frontend validates input format
- Frontend shows loading state

### 2. Backend Processing Phase

- Backend receives POST request to `/api/generate`
- If URL provided, backend scrapes content using Puppeteer
- Backend calls OpenAI API with job description
- OpenAI returns structured JSON response

### 3. Document Generation Phase

- Backend processes JSON response
- Backend generates PDF using jsPDF
- Backend saves PDF copy to local storage
- Backend returns JSON data and PDF to frontend

### 4. Frontend Display Phase

- Frontend receives data from backend
- Frontend populates Handlebars templates
- Frontend displays formatted resume and cover letter
- Frontend triggers automatic PDF download

## Error Handling Workflows

### Input Validation Errors

- Frontend validates input before sending to backend
- Backend performs additional validation
- Clear error messages returned to user

### API Call Failures

- Retry logic for OpenAI API calls
- Graceful degradation if external services unavailable
- User-friendly error messages

### PDF Generation Errors

- Fallback to basic formatting if PDF generation fails
- Error logging for debugging
- Alternative download options provided
