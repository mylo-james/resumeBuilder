# Architecture - Components

## Core Components Overview

### Frontend Components

#### 1. Frontend UI Component

A single React component that handles all user interactions and displays the generated content.

**Responsibilities:**

- User input handling (text and URL)
- State management for loading and display
- Template rendering with Handlebars
- PDF download triggering

### Backend Components

#### 2. API Route (/api/generate)

A serverless function that acts as the backend for our application. It will handle web scraping, API calls, and PDF generation.

**Responsibilities:**

- Accept job description input
- Handle web scraping for URLs
- Call OpenAI API
- Process JSON responses
- Generate PDF documents
- Return data to frontend

#### 3. Handlebars Templates

A set of templates that define the structure of the resume and cover letter.

**Responsibilities:**

- Define document structure
- Handle dynamic content insertion
- Maintain consistent formatting

#### 4. PDF Generation Service

A dedicated service within the application that handles the logic of creating and saving PDF files.

**Responsibilities:**

- Convert HTML templates to PDF
- Handle file storage
- Manage download links

## Component Interactions

1. **User Input** → Frontend UI Component
2. **Frontend UI** → API Route (/api/generate)
3. **API Route** → OpenAI API + Web Scraping
4. **API Route** → PDF Generation Service
5. **PDF Service** → Local Storage
6. **API Route** → Frontend UI (with data and PDF)
7. **Frontend UI** → Handlebars Templates → User Display
