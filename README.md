# Vita Forge Platform

Vita Forge is a modular web platform where users can browse the main website and launch productivity apps from one unified project.  
Current live app: **Resume Builder**.  
Planned app: **Cover Letter Writer**.

## Features

- Multi-page website: `Home`, `About`, `Products`, `Contact`
- Product-based navigation from website to app modules
- Resume Builder app route integrated into the same frontend
- Placeholder module for Cover Letter Writer
- Scalable architecture separating `website`, `apps`, and `core`
- Resume Builder AI area clearly marked as **Coming Soon**

## Installation

```bash
git clone https://github.com/axcel-blade/vita-forge.git
cd vita-forge
npm install
```

## Usage

Run locally:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Default local URL: `http://localhost:5173`

## Routes

- `/` - Home page
- `/about` - About page
- `/products` - Products listing
- `/contact` - Contact page
- `/apps/resume-builder` - Resume Builder app
- `/apps/resume-builder/templates` - Templates placeholder
- `/apps/resume-builder/preview` - Preview placeholder
- `/apps/cover-letter` - Cover Letter Writer placeholder

## Project Structure

```txt
project-root/
├── .github/
│   └── workflows/
│       └── workflow.yml
├── api/
│   └── generate_summary.js
├── public/
├── src/
│   ├── core/
│   │   ├── config/
│   │   │   └── navLinks.js
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   └── router/
│   │       └── RouterProvider.jsx
│   ├── website/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProductCard.jsx
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── About.jsx
│   │       ├── Products.jsx
│   │       └── Contact.jsx
│   ├── apps/
│   │   ├── resume-builder/
│   │   │   └── pages/
│   │   │       ├── Builder.jsx
│   │   │       ├── Templates.jsx
│   │   │       └── Preview.jsx
│   │   └── cover-letter/
│   │       └── pages/
│   │           └── CoverLetterHome.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── components/      # Existing resume builder shared components
│   ├── data/
│   │   └── defaultData.js
│   ├── utils/
│   │   └── format.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

## Tech Stack

- React `^19.2.4`
- React DOM `^19.2.4`
- Vite `^8.0.3`
- React Router DOM `^7.14.2`
- Tailwind CSS `^4.2.2`
- jsPDF `^4.2.1`
- html2canvas `^1.4.1`
- TypeScript `~5.8.0` (build tooling)

## CI/CD

- GitHub Actions workflow at `.github/workflows/workflow.yml`
- Runs install + build checks on push and pull requests

## Contributing

Pull requests are welcome.  
For major changes, open an issue first to discuss scope and design.

## License

MIT License

## Author

Axcel Blade