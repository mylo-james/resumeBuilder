# PRD - Epic 1: Core Functionality & Document Generation

## Epic Goal

To build a single-page application that can take a job description (text or URL), process it with an AI API, and generate a downloadable, formatted PDF resume and cover letter.

## 1. Foundational Stories

### Story 1.1: Project Setup, Testing, and CI

**As a developer,**
I want to set up a new Next.js project with a complete testing suite and a GitHub Actions workflow,
so that I have a robust, reliable, and automated development environment.

**Acceptance Criteria:**

- The project is initialized using a Next.js starter.
- Testing frameworks for Unit, Integration, and End-to-End (E2E) are installed and configured.
- A sample unit test is written and passes.
- A sample E2E test is written and passes.
- A GitHub Actions workflow is created to run all tests automatically.
- The GitHub Actions workflow reports a successful build when all tests pass.

### Story 1.2: Health Check & Integration Test Skeleton

**As a developer,**
I want to add health check endpoints and an integration test,
so that I can verify the frontend and backend are communicating correctly.

**Acceptance Criteria:**

- A new API route, `/health`, is created to act as a backend health check. It returns a 200 OK status code.
- A basic frontend health check is implemented.
- An integration test is written to verify that the frontend can successfully call the `/health` API route and receive the expected response.

## 2. UI-First Development

### Story 1.3: Basic UI with Mock Data

**As a user,**
I want to see a complete, single-screen UI that displays a sample resume and cover letter using mock data,
so that I can experience the application's design and layout before the backend is built.

**Acceptance Criteria:**

- A single page is created with a clean, minimalist layout.
- Local, hardcoded JSON data is used to represent the resume and cover letter content.
- Handlebars templates are used to render the content.
- The page includes all necessary input fields for the user (text area, URL field) and a "Generate" button, which are currently non-functional.

## 3. Backend-First Development

### Story 1.4: Backend Integration with Static Data

**As a developer,**
I want to create a backend API route that serves the same static JSON data as the front end,
so that I can connect the UI to a working backend without relying on an external API yet.

**Acceptance Criteria:**

- An API route, `/api/generate`, is created in the Next.js project.
- The API route accepts a POST request from the frontend.
- It returns the same static JSON data used in the previous story.
- The frontend is updated to fetch this data from the API route instead of the local file.

### Story 1.5: Live AI Call Integration

**As a developer,**
I want to update the backend API route to call the OpenAI API,
so that the application can generate dynamic, personalized content based on the user's input.

**Acceptance Criteria:**

- The `/api/generate` route is modified to accept a job description from the user.
- The route securely calls the OpenAI API and passes the job description as input.
- The route correctly processes the JSON response from the OpenAI API.
- The frontend now displays dynamic content based on the user's input.
