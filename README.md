# Vita Forge Platform

![Version](https://img.shields.io/badge/version-0.5.6-blue)
![Status](https://img.shields.io/badge/status-active-success)

Simple overview of use/purpose. Vita Forge is a modular career-tools platform with a main website and app modules for Resume Builder and Cover Letter Writer.

## Description

This project combines a marketing website and app experiences in one React codebase. Users can browse the website pages, open Resume Builder, and now create targeted cover-letter drafts using guided inputs with live preview output.

## Getting Started

### Dependencies

- Node.js 20+
- npm 10+
- Windows 10/11, macOS, or Linux

### Installing

```bash
git clone https://github.com/axcel-blade/vita-forge.git
cd vita-forge
npm install
```

### Executing program

```bash
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

Default local URL: `http://localhost:5173`

## Features

- Website pages: `Home`, `About`, `Products`, `Contact`
- Resume Builder app with editor and preview flow
- Cover Letter Writer app with:
  - guided form fields
  - tone selection
  - live generated draft preview
  - save-to-PDF export button
  - A4-style page preview for output consistency
- Shared router/layout architecture across website and apps

## Routes

- `/` - Home page
- `/about` - About page
- `/products` - Products listing
- `/contact` - Contact page
- `/apps/resume-builder` - Resume Builder app
- `/apps/resume-builder/templates` - Resume templates page
- `/apps/resume-builder/preview` - Resume preview page
- `/apps/cover-letter` - Cover Letter Writer app
- `*` - Custom 404 page for unknown routes

## SEO Setup

- Route-level SEO is configured in `src/routes/AppRoutes.jsx` via reusable `src/core/seo/Seo.jsx`
- Each route now sets:
  - page title
  - meta description
  - canonical URL
  - Open Graph tags
  - Twitter card tags
  - JSON-LD structured data (where applicable)
- Technical SEO files:
  - `public/robots.txt`
  - `public/sitemap.xml`
  - `public/og-image.svg`
- Site-level SEO constants:
  - `src/core/config/seo.js`

## Project Structure

```txt
project-root/
├── public/
├── src/
│   ├── core/
│   │   ├── router/
│   │   ├── layouts/
│   │   └── config/
│   ├── website/
│   │   ├── pages/
│   │   └── components/
│   ├── apps/
│   │   ├── resume-builder/
│   │   │   └── pages/
│   │   └── cover-letter/
│   │       ├── pages/
│   │       ├── components/
│   │       └── services/
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## Help

If dependencies fail to install, clear cache and reinstall:

```bash
npm cache verify
npm install
```

## Authors

- Axcel Blade

## Version History

- `0.5.6`
  - Fixed Resume Builder reset to restore default data in-app without page reload, preventing 404 errors on nested routes
- `0.5.5`
  - Replaced starter resume and cover-letter defaults with fully filled fictional sample data across every supported section
- `0.5.4`
  - Added route-level lazy loading with React `lazy` + `Suspense` to reduce initial bundle weight and improve first-load performance
- `0.5.3`
  - Added a dedicated website 404 page and routed all unknown URLs to a proper Not Found experience
- `0.5.2`
  - Updated product page CTA button label from `Start Now` to `Get Started`
- `0.5.1`
  - Updated product page CTA button label from `Open App` to `Start Now`

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.