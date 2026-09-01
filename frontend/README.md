# VitaForge Frontend

This is the React + Vite client for VitaForge, the browser-first career tools platform.
The frontend is a root-level application in the repository.

## Stack

- React 19
- Vite 8
- TypeScript 5.8
- Tailwind CSS 4
- React Router 7

## Local development

```bash
npm install
npm run dev
```

The app will run at http://localhost:5173.

## Production build

```bash
npm run build
npm run preview
```

## Docker

```bash
docker build -t vitaforge-frontend .
docker run -p 5173:5173 vitaforge-frontend
```

For the complete stack, run `docker compose up --build` from the repository root.

## Project structure

- src/apps/resume-builder
- src/apps/cover-letter
- src/components
- src/core
- src/data
- src/routes
