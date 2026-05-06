# Vita Forge Platform

![Version](https://img.shields.io/badge/version-0.3.3-blue)
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

- `0.3.3`
  - Fixed sticky layering so the cover-letter action bar stays above preview header while scrolling
  - Prevented `Cover Letter Preview (A4)` header from covering Reset/Export/Import/Save controls
- `0.3.2`
  - Updated cover-letter editor/preview body layout to mirror resume-builder split view
  - Kept existing cover-letter action bar (Reset, Export JSON, Import JSON, Save as PDF)
  - Refined preview container styling for cleaner integration in the new panel layout
- `0.3.1`
  - Tuned cover-letter PDF spacing to better match workbook Example 1 block layout
  - Added explicit paragraph/block gap handling during PDF export for cleaner letter sections
- `0.3.0`
  - Fixed cover-letter PDF export width by reducing A4 side margins
  - Improved right-side spacing balance in exported cover-letter PDFs
- `0.2.9`
  - Removed `Application Source` and `Reference Number` from cover-letter sample structure form
  - Updated generated cover letter to workbook-style subject/body without source/reference fields
- `0.2.8`
  - Removed `Enc. Resume` from generated cover-letter closing
  - Renamed cover-letter identity field label from `Full Name` to `Name`
- `0.2.7`
  - Updated cover-letter sample structure to always source name, email, and phone from Resume Builder profile
  - Added read-only identity fields in cover-letter form to reflect resume-synced details
  - Improved import/reset flows to preserve resume identity in workbook-style cover letter output
- `0.2.6`
  - Added cover-letter toolbar controls (Reset, Import JSON, Export JSON, Save as PDF) like resume-builder
  - Added shared profile bundle storage so resume and cover-letter apps reuse each other's data
  - Updated JSON import/export to support combined payload with both `resume` and `coverLetter` details
  - Added cover-letter autofill from resume profile and experience data
- `0.2.5`
  - Updated Cover Letter output structure to match workbook-style Example 1 format
  - Added sender/addressee/source/reference fields for formal letter layout
  - Improved generated content flow with subject line, formal close, and attachment note
- `0.2.4`
  - Aligned Cover Letter live preview with DOCX-style A4 formatting
  - Updated cover-letter PDF export to Times 12pt with 1-inch A4 margins
  - Improved visual parity between live preview and exported PDF output
- `0.2.3`
  - Adjusted Cover Letter A4 preview spacing so content uses more page width
  - Improved text wrapping behavior inside the A4 preview container
- `0.2.2`
  - Updated Cover Letter preview to render in A4-style page dimensions
  - Improved on-screen layout consistency with exported PDF format
- `0.2.1`
  - Added Save as PDF export for Cover Letter Writer drafts
  - Added cover-letter PDF export service with automatic multi-page handling
- `0.2.0`
  - Added live Cover Letter Writer app with form + generated draft preview
  - Updated website copy and products status for Cover Letter module
  - Updated project docs for new app structure
- `0.1.0`
  - Initial modular platform release with Resume Builder

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.