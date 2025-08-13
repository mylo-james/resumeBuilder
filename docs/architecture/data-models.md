# Architecture - Data Models

## Data Models Overview

The application will work with a simple, structured JSON object that represents the resume and cover letter content. We will not be using a traditional database.

## Conceptual Data Model

```typescript
// Conceptual data model for the JSON response from the AI
interface DocumentContent {
  resume: {
    name: string;
    contact: string;
    summary: string;
    experience: Array<{
      title: string;
      company: string;
      details: string[];
    }>;
    skills: string[];
  };
  coverLetter: {
    recipient: string;
    greeting: string;
    body: string[];
    closing: string;
  };
}
```

## Data Flow

1. **Input**: Job description (text or URL)
2. **Processing**: AI API processes the input and returns structured JSON
3. **Templating**: JSON data populates Handlebars templates
4. **Output**: Generated PDF documents for download

## Storage Strategy

- **Local Storage**: Generated PDFs will be stored locally for backup and potential reuse
- **No Database**: The application will not require a traditional database
- **File System**: Simple file-based storage for generated documents
