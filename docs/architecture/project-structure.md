# Architecture - Project Structure

## Unified Project Structure

```
/mylo-app
├── docs/
│   ├── prd.md
│   └── architecture.md
├── src/
│   ├── app/
│   │   ├── page.tsx          # Single-screen UI
│   │   └── api/
│   │       └── generate/
│   │           └── route.ts  # Backend API route
│   ├── components/
│   │   └── ui-components/      # UI components
│   └── lib/
│       ├── templates/          # Handlebars templates
│       ├── services/           # PDF and scraping services
│       └── utils/              # Utility functions
├── public/                     # Static assets
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .gitignore
├── next.config.mjs
├── package.json
└── README.md
```

## Directory Structure Details

### `/src/app/`

- **`page.tsx`**: Main single-screen UI component
- **`api/generate/route.ts`**: Backend API route for document generation

### `/src/components/`

- **`ui-components/`**: Reusable UI components built with shadcn/ui

### `/src/lib/`

- **`templates/`**: Handlebars templates for resume and cover letter
- **`services/`**: Business logic services (PDF generation, web scraping)
- **`utils/`**: Utility functions and helpers

### `/tests/`

- **`unit/`**: Jest unit tests for individual functions and components
- **`integration/`**: Tests for frontend-backend communication
- **`e2e/`**: Playwright end-to-end tests

### `/public/`

- Static assets (images, fonts, etc.)

## File Naming Conventions

- **Components**: PascalCase (e.g., `ResumeGenerator.tsx`)
- **Services**: camelCase (e.g., `pdfService.ts`)
- **Templates**: kebab-case (e.g., `resume-template.hbs`)
- **Tests**: Same name as source file with `.test.ts` extension
- **API Routes**: `route.ts` (Next.js App Router convention)

## Development Workflow

The local development environment will be set up using a Next.js starter. The project can be run with `npm run dev`. The tests can be run using a single command, such as `npm test`.
