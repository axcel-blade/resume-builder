# Roadmap

This document outlines planned features and improvements for Vita Forge. Items are roughly ordered by priority and are subject to change.

---

## In Progress

_None at this time._

---

## Planned

### Resume Builder

- [ ] Additional resume templates (minimal, timeline, two-column)
- [ ] Drag-and-drop section reordering in the editor
- [ ] Per-section visibility toggles (show/hide sections without deleting data)
- [ ] Accent colour picker with preset palette
- [ ] Font family selector (serif, sans-serif, monospace options)
- [ ] Character/word count indicators per section

### Cover Letter Writer

- [ ] Multiple tone options (formal, conversational, confident)
- [ ] Opening paragraph variant selector
- [ ] Company name and role autofill from resume data
- [x] Saved drafts for signed-in users via the profile API

### Platform

- [ ] Unified profile page showing both resume and cover letter side by side
- [ ] Dark mode support
- [ ] Keyboard navigation improvements across all editors
- [ ] Accessibility audit and WCAG 2.1 AA compliance pass
- [ ] Progressive Web App (PWA) support for offline use

### Export

- [ ] Export resume as plain text (`.txt`)
- [ ] Export cover letter as plain text (`.txt`)
- [ ] Print-optimised stylesheet improvements for multi-page resumes

---

## Completed

| Version | Feature |
|---------|---------|
| 0.7.0 | Prisma profiles, API sync, Nest/Vite folder cleanup |
| 0.5.12 | Repo cleanup: Vite app moved into `frontend/`, onboarding docs updated |
| 0.5.11 | PDF title wrap; consistent bold Title Case university names |
| 0.5.10 | VMock: 11pt title/body, hyphen date ranges, recency sort |
| 0.5.9 | Reorder bullet points within resume entries |
| 0.5.8 | Community format: consistent dates, type sizes, and 0.75–1 inch margins |
| 0.5.7 | Removed all third-party runtime libraries; custom router and native print PDF |
| 0.5.6 | In-app reset without page reload to prevent 404 on static hosts |
| 0.5.5 | Fully filled fictional sample data for onboarding |
| 0.5.4 | Route-level lazy loading for faster first load |
| 0.5.3 | Custom 404 page |
| 0.5.2 | Product page CTA label update |

---

## Out of Scope

The following will not be added to this project:

- Third-party integrations (LinkedIn import, job board APIs)
- AI-generated resume content (beyond the optional summary endpoint)
- Mobile native apps
