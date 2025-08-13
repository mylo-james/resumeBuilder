# PRD - Functional and Non-Functional Requirements

## Functional Requirements

1. **Job Description Input**

   - The user can input a job description as a plain text string.
   - The user can input a URL to a job description.

2. **Content Processing**

   - The application can scrape or download the content from the provided URL.
   - The application sends the job description content to an OpenAI API assistant.
   - The application receives a JSON response from the API containing content for a resume and cover letter.

3. **Document Generation**
   - The application uses the JSON data to populate a Handlebars template.
   - The application can generate a PDF from the populated template.
   - The application provides a mechanism to download the generated PDF file.

## Non-Functional Requirements

1. **Technology Stack**

   - The application will be developed using JavaScript.
   - The application will be a local-only project with no deployment initially.

2. **Templating and Generation**
   - The Handlebars templates must be designed generically to allow for flexible content from the AI.
   - The application will use a JavaScript library for PDF generation, such as jsPDF or PDFKit.
   - The application will utilize Handlebars.js for templating.
