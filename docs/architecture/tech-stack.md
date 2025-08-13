# Architecture - Technology Stack

## Tech Stack Overview

| Category             | Technology     | Version | Purpose                                         | Rationale                                                      |
| -------------------- | -------------- | ------- | ----------------------------------------------- | -------------------------------------------------------------- |
| Frontend Framework   | Next.js        | Latest  | Front-end development and server-side rendering | Unified framework for front end and back end                   |
| Backend Framework    | Next.js        | Latest  | Backend API routes, serverless functions        | Uses JavaScript for the entire stack                           |
| Templating           | Handlebars.js  | Latest  | HTML templating for resume and cover letter     | Flexible and easy to use with JSON data                        |
| PDF Generation       | jsPDF          | Latest  | Client-side PDF generation                      | Works well in both browser and Node.js environments            |
| Web Scraping         | Puppeteer      | Latest  | Web scraping for job description URLs           | Powerful and widely used headless browser for web scraping     |
| UI Component Library | shadcn/ui      | Latest  | Reusable UI components built with Radix UI      | Headless components that integrate perfectly with Tailwind CSS |
| Styling              | Tailwind CSS   | Latest  | Utility-first CSS framework                     | Rapid and consistent UI development                            |
| Testing              | Jest           | Latest  | Unit and integration testing                    | Widely used and well-supported by Next.js                      |
| E2E Testing          | Playwright     | Latest  | End-to-end testing                              | Recommended by Next.js for robust, automated testing           |
| CI/CD                | GitHub Actions | Latest  | Automated testing and deployment                | Deep integration with GitHub for automated workflows           |
