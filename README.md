# Vita Forge

![Version](https://img.shields.io/badge/version-0.5.7-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

A modular career-tools platform for building professional, ATS-friendly resumes and cover letters — entirely in the browser, with no accounts and no data leaving your device.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [SEO](#seo)
- [CI/CD](#cicd)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Vita Forge combines a marketing website and two app modules in a single React codebase:

| Module | Description |
|---|---|
| **Website** | Home, About, Products, and Contact pages |
| **Resume Builder** | Structured section editor with live A4 preview and PDF export |
| **Cover Letter Writer** | Guided form with tone selection, live draft preview, and PDF export |

All resume and cover letter data is stored in the browser via `localStorage`. No login required.

---

## Features

- **Resume Builder**
  - Section editors for profile, experience, education, skills, projects, certificates, achievements, volunteer work, interests, and references
  - Live A4-paginated preview that updates as you type
  - Template selector: Modern and Basic layouts
  - Accent colour customisation
  - Export to PDF via the browser print dialog
  - Export / Import full profile as JSON

- **Cover Letter Writer**
  - Guided form fields with tone selection
  - Auto-populates identity fields from a saved resume profile
  - Live generated draft preview in A4 format
  - Export to PDF via the browser print dialog
  - Export / Import full profile as JSON

- **Platform**
  - Custom browser-native router — no third-party routing library
  - Shared layout and navigation across website and apps
  - Route-level lazy loading for fast first paint
  - Per-route SEO: title, description, canonical, Open Graph, Twitter card, JSON-LD
  - Custom 404 page for unknown routes

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 19 |
| Language | TypeScript 5.8 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | Custom History API router (`src/core/router/router.jsx`) |
| PDF export | Browser `window.print()` + CSS `@media print` |
| Runtime | Node.js 20+, npm 10+ |

No third-party runtime feature libraries are used.

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
git clone https://github.com/axcel-blade/vita-forge.git
cd vita-forge
npm install
```

### Run development server

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build for production

```bash
npm run build
npm run preview
```

### Validate locally (mirrors CI)

```bash
npm ci
npm run build
```

---

## Project Structure

```
vita-forge/
├── public/                    # Static assets (robots.txt, sitemap.xml, og-image.svg)
├── api/
│   └── generate_summary.js    # Optional serverless AI summary endpoint
├── src/
│   ├── core/
│   │   ├── router/            # Custom History API router
│   │   ├── layouts/           # MainLayout (Navbar + Outlet + Footer)
│   │   ├── seo/               # Seo component (head tag injection)
│   │   └── config/            # navLinks.js, seo.js
│   ├── website/
│   │   ├── pages/             # Home, About, Products, Contact, NotFound
│   │   └── components/        # Navbar, Footer, ProductCard
│   ├── apps/
│   │   ├── resume-builder/
│   │   │   └── pages/         # Builder, Templates, Preview
│   │   └── cover-letter/
│   │       ├── pages/         # CoverLetterHome
│   │       ├── components/    # CoverLetterForm, CoverLetterPreview
│   │       └── services/      # buildCoverLetter.js, exportCoverLetterPdf.js
│   ├── components/            # Shared UI: Toolbar, templates, editors, preview
│   ├── data/                  # defaultData.js (starter resume + cover letter)
│   ├── routes/
│   │   └── AppRoutes.jsx      # Route definitions with SEO wrappers
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              # Tailwind import + print CSS
├── .github/
│   ├── workflows/             # ci.yml, cd.yml
│   ├── ISSUE_TEMPLATE/        # bug_report.md, feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
├── package.json
└── README.md
```

---

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/products` | Products |
| `/contact` | Contact |
| `/apps/resume-builder` | Resume Builder |
| `/apps/resume-builder/templates` | Template selector |
| `/apps/resume-builder/preview` | Full resume preview |
| `/apps/cover-letter` | Cover Letter Writer |
| `*` | 404 Not Found |

---

## SEO

Each route sets its own head tags through `src/core/seo/Seo.jsx`:

- Page title and meta description
- Canonical URL
- Open Graph and Twitter card tags
- JSON-LD structured data (Organisation, WebSite, SoftwareApplication, etc.)

Technical SEO files are in `public/`:

| File | Purpose |
|---|---|
| `robots.txt` | Crawler directives |
| `sitemap.xml` | Site map for indexing |
| `og-image.svg` | Open Graph share image |

Site-level constants live in `src/core/config/seo.js`.

---

## CI/CD

### CI — `ci.yml`

Runs on pull requests and pushes to `main` / `master`:

1. `npm ci`
2. `npm run build`

On pushes to `main`, the built `dist/` folder is uploaded as a workflow artifact.

### CD — `cd.yml`

Triggers on:

- GitHub Release published
- Tags matching `v*`
- Manual `workflow_dispatch`

Steps:

1. Build production assets
2. Copy `dist/index.html` → `dist/404.html` for SPA fallback on static hosts
3. Deploy to GitHub Pages

### Required GitHub settings

| Setting | Value |
|---|---|
| Branch protection | Require `Build and Verify` check before merge |
| Pages source | GitHub Actions |
| Environment (optional) | `github-pages` with required reviewers |

### Manual deploy

```bash
gh workflow run cd.yml
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the Git Flow process, commit format, and PR checklist.

See [CHANGELOG.md](CHANGELOG.md) for the full version history.

See [ROADMAP.md](ROADMAP.md) for planned features.

See [SECURITY.md](SECURITY.md) to report a vulnerability privately.

---

## License

MIT — see [LICENSE](LICENSE) for details.
