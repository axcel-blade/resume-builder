# Vita Forge

![Version](https://img.shields.io/badge/version-0.5.7-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

A modular career-tools platform for building professional, ATS-friendly resumes and cover letters — entirely in the browser, with no accounts and no data leaving your device.

---

## Overview

| Module | Description |
|---|---|
| **Website** | Home, About, Products, and Contact pages |
| **Resume Builder** | Structured section editor with live A4 preview and PDF export |
| **Cover Letter Writer** | Guided form with tone selection, live draft preview, and PDF export |

---

## Features

- **Resume Builder** — section editors for profile, experience, education, skills, projects, certificates, achievements, volunteer work, interests, and references; live A4-paginated preview; Modern and Basic templates; accent colour picker; PDF and JSON export
- **Cover Letter Writer** — guided form with tone selection; auto-fills identity from a saved resume profile; live A4 draft preview; PDF and JSON export
- **Platform** — custom browser-native router; route-level lazy loading; per-route SEO meta and JSON-LD; custom 404 page

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 19 |
| Language | TypeScript 5.8 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | Custom History API router |
| PDF export | Browser `window.print()` + CSS `@media print` |
| Runtime | Node.js 20+, npm 10+ |

---

## Getting Started

```bash
git clone https://github.com/axcel-blade/vita-forge.git
cd vita-forge
npm install
npm run dev
```

Opens at `http://localhost:5173`

**Build for production**

```bash
npm run build
npm run preview
```

---

## Project Structure

```
vita-forge/
├── public/
├── api/
├── src/
│   ├── core/          # Router, layouts, SEO, config
│   ├── website/       # Home, About, Products, Contact, NotFound
│   ├── apps/
│   │   ├── resume-builder/
│   │   └── cover-letter/
│   ├── components/    # Shared UI: Toolbar, templates, editors, preview
│   ├── data/
│   └── routes/
├── .github/
└── package.json
```

---

## Contributing

- [CONTRIBUTING.md](CONTRIBUTING.md) — Git Flow, commit format, PR checklist
- [CHANGELOG.md](CHANGELOG.md) — version history
- [ROADMAP.md](ROADMAP.md) — planned features
- [SECURITY.md](SECURITY.md) — vulnerability reporting

---

## License

MIT — see [LICENSE](LICENSE) for details.
