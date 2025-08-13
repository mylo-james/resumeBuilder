# Mylo James's Application Fullstack Architecture Document - Overview

## Introduction

This document outlines the complete full-stack architecture for your application, including the frontend implementation, backend systems, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack. This unified approach streamlines the development process for modern full-stack applications.

## High Level Architecture

### Technical Summary

This system is a minimalist, single-page application built with Next.js. It follows a Monolith architecture to keep the front end and backend tightly integrated within a single repository. The backend logic, including web scraping and API calls, will be handled by Next.js's API Routes. The application will use Handlebars for client-side templating and a dedicated JavaScript library for generating PDF documents. The backend will store a copy of the generated PDFs locally while also serving them for download.

### Platform and Infrastructure Choice

For this local-only application, the choice of a deployment platform is not a priority. However, given our use of Next.js and its serverless-compatible API routes, a platform like Vercel or AWS Amplify would be a natural fit for future deployment due to their native support and simplified serverless hosting.

### Repository Structure

The project will be a Monolith within a single repository. This is an efficient approach for a project of this size, as it keeps all code in one place.

## High Level Architecture Diagram

```
graph TD
    A[User] -->|Input Text/URL| B(Frontend: Next.js)
    B -->|API Call| C(Backend: Next.js API Route)
    C -->|Secure Call| D[OpenAI API Assistant]
    C -->|Web Scraping| E[External Job Description Site]
    D -->|JSON Response| C
    E -->|Scraped Content| C
    C -->|PDF Generated & Stored| F[Local Storage: PDF Files]
    C -->|PDF Data| B
    B -->|Render Templates & Download| G[PDF Document]
```

## Architectural Patterns

- **Jamstack Architecture**: The front end is a single-page application built with Next.js, and the backend is handled by serverless functions (API Routes). This provides excellent performance and scalability.
- **Component-Based UI**: The user interface will be built using reusable React components.
- **Repository Pattern**: The backend will abstract data access logic to enable future changes without affecting the rest of the application.
- **API Gateway Pattern**: Next.js API Routes will act as a single entry point for all API calls, which is a great pattern for centralized authentication and security.
