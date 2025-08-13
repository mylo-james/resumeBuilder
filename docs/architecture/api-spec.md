# Architecture - API Specification

## API Overview

This document defines the expected behavior of our unified backend API route.

## OpenAPI Specification

```yaml
openapi: 3.0.0
info:
  title: Job Application Generator API
  version: 1.0.0
  description: API for generating resumes and cover letters from a job description.

paths:
  /api/generate:
    post:
      summary: Generate resume and cover letter
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                input:
                  type: string
                  description: 'Job description as plain text or a URL'
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DocumentContent'
        '400':
          description: Bad Request - Invalid input
        '500':
          description: Internal Server Error

components:
  schemas:
    DocumentContent:
      type: object
      properties:
        resume:
          type: object
          properties:
            name:
              type: string
            contact:
              type: string
            summary:
              type: string
            experience:
              type: array
              items:
                type: object
                properties:
                  title:
                    type: string
                  company:
                    type: string
                  details:
                    type: array
                    items:
                      type: string
            skills:
              type: array
              items:
                type: string
        coverLetter:
          type: object
          properties:
            recipient:
              type: string
            greeting:
              type: string
            body:
              type: array
              items:
                type: string
            closing:
              type: string
```

## API Endpoints

### POST /api/generate

**Purpose**: Generate resume and cover letter from job description

**Request Body**:

```json
{
  "input": "string - Job description text or URL"
}
```

**Response**:

```json
{
  "resume": {
    "name": "string",
    "contact": "string",
    "summary": "string",
    "experience": [
      {
        "title": "string",
        "company": "string",
        "details": ["string"]
      }
    ],
    "skills": ["string"]
  },
  "coverLetter": {
    "recipient": "string",
    "greeting": "string",
    "body": ["string"],
    "closing": "string"
  }
}
```

## Error Handling

- **400 Bad Request**: Invalid input format or content
- **500 Internal Server Error**: Server-side processing errors
- All errors return a standardized error response format
