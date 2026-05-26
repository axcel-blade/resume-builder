# Vita Forge

![Version](https://img.shields.io/badge/version-0.5.7-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

A browser-based career-tools platform for building professional, ATS-friendly resumes and cover letters. No accounts, no server — all data stays in your browser.

## What it is

| Module | Description |
|---|---|
| **Website** | Home, About, Products, and Contact pages |
| **Resume Builder** | Section editor with live A4 preview and PDF export |
| **Cover Letter Writer** | Guided form with live draft preview and PDF export |

## What it does

**Resume Builder**
- Edit profile, experience, education, skills, projects, certificates, achievements, volunteer work, interests, and references
- Live A4-paginated preview that updates as you type
- Modern and Basic layout templates with accent colour picker
- Export to PDF or JSON; import a saved profile from JSON

**Cover Letter Writer**
- Guided form with tone selection
- Auto-populates name, email, and phone from a saved resume profile
- Live A4 draft preview
- Export to PDF or JSON; import a saved profile from JSON

## Built with

| Layer | Technology |
|---|---|
| UI framework | React 19 |
| Language | TypeScript 5.8 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | Custom History API router |
| PDF export | Browser `window.print()` + CSS `@media print` |
| Runtime | Node.js 20+, npm 10+ |

## How to run it

```bash
git clone https://github.com/axcel-blade/vita-forge.git
cd vita-forge
npm install
npm run dev
```

Opens at `http://localhost:5173`

**Production build**

```bash
npm run build && npm run preview
```

## Where the code lives

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

## Contributing and support

- [CONTRIBUTING.md](CONTRIBUTING.md) — Git Flow, commit format, PR checklist
- [CHANGELOG.md](CHANGELOG.md) — version history
- [ROADMAP.md](ROADMAP.md) — planned features
- [SECURITY.md](SECURITY.md) — vulnerability reporting
- [SUPPORT.md](SUPPORT.md) — how to get help

## License

MIT — see [LICENSE](LICENSE) for details.
