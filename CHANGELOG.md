# Changelog

All notable changes to Vita Forge are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

## [0.5.9] - 2026-08-26

### Added
- Up/down controls on bullet lists so experience, education, projects, skills, awards, volunteer work, certificates, and interests can be reordered without deleting and re-adding lines

---

## [0.5.8] - 2026-08-26

### Changed
- Resume dates now render as abbreviated months with a spaced en-dash (`Jun 2022 – Present`) and bold-italic styling in both the A4 preview and the PDF export
- Date-bearing sections (experience, education, projects, volunteer work, certificates, awards) sort reverse-chronologically
- Section headings share one type size; titles, dates, and bullets inside sections share one body size
- Page margins sit in the 0.75–1 inch band (0.9 inch sides; extra PDF top offset so the name cap-height still clears 0.75 inch)

### Fixed
- Mixed date formats (full month names, `Issued …` certificate lines, year-only awards) that failed community format checks

---

## [0.5.7] - 2026-05-26

### Removed
- `react-router-dom` — replaced with a custom History API router (`src/core/router/router.jsx`)
- `jspdf` — replaced with native browser `window.print()` and CSS `@media print`
- `html2canvas` — unused dependency removed
- `react-to-print` — unused dependency removed

### Added
- `src/core/router/router.jsx`: custom router exporting `BrowserRouter`, `Routes`, `Route`, `Outlet`, `Link`, `NavLink`, `useNavigate`, `useLocation`
- Hidden `#resume-print-area` in `Builder.jsx` for CSS print targeting
- Hidden `#cover-letter-print-area` in `CoverLetterHome.jsx` for CSS print targeting
- `@media print` rules in `index.css` with A4 `@page` size

### Changed
- All `react-router-dom` imports updated to use the custom router
- `Toolbar.jsx` `savePDF` now calls `window.print()` instead of building a jsPDF document
- `exportCoverLetterPdf.js` now calls `window.print()` instead of building a jsPDF document

---

## [0.5.6] - 2026-05-25

### Fixed
- Resume Builder reset now restores default data in-app without a page reload, preventing 404 errors on nested routes hosted on static servers

---

## [0.5.5] - 2026-05-20

### Changed
- Replaced placeholder starter resume and cover letter defaults with fully filled fictional sample data covering every supported section

---

## [0.5.4] - 2026-05-15

### Added
- Route-level lazy loading via React `lazy` + `Suspense` to reduce initial bundle weight and improve first-load performance

---

## [0.5.3] - 2026-05-10

### Added
- Dedicated 404 page (`src/website/pages/NotFound.jsx`) for unknown routes

---

## [0.5.2] - 2026-05-01

### Changed
- Product page CTA button label updated from `Start Now` to `Get Started`
