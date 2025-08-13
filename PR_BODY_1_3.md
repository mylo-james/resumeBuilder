### Story 1.3: Basic UI with Mock Data

Link to story: docs/stories/1.3.basic-ui-with-mock-data.md

#### Summary

Implements a single-page UI that renders a sample resume and cover letter using local mock data and Handlebars templates. Provides non-functional input form (textarea + URL + Generate button) and previews rendered documents. Uses shadcn/ui for consistent styling and Tailwind for layout.

#### Changes

- UI: `src/app/page.tsx`, `src/app/globals.css`, `src/app/layout.tsx`
- Components: `src/components/ResumeDisplay.tsx`, `src/components/CoverLetterDisplay.tsx`, `src/components/InputForm.tsx`, `src/components/ui/*`
- Templates: `src/lib/templates/resume.hbs`, `src/lib/templates/cover-letter.hbs`
- Services: `src/lib/services/client-template-service.ts`, `src/lib/services/template-service.ts`
- Data: `src/lib/mock-data.ts`
- Tests: Unit tests for components and services; E2E test `tests/e2e/basic-ui.spec.ts`
- Cleanup: Removed outdated `tests/e2e/example.spec.ts`

#### Acceptance Criteria

- [x] Single page with clean, minimalist layout
- [x] Local hardcoded JSON for resume and cover letter
- [x] Content rendered via Handlebars templates
- [x] Input form (textarea, URL field) and Generate button (non-functional)

#### Testing

- Unit tests: 42 passing
- E2E tests (Playwright): all passing
- Lint: passing (note: dev console warnings allowed during tests)
- Type-check: passing

Run locally:

- Unit tests: `npm test`
- E2E tests: `npm run test:e2e`
- Lint: `npm run lint`
- Type check: `npm run type-check`

#### Notes

- Generate button is intentionally non-functional per story scope; logs/alerts for future integration.
- PR updates the story checklist and Dev Agent Record to reflect completion.
