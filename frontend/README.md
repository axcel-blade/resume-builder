# VitaForge Frontend

The frontend is the React + Vite client for VitaForge. It handles the resume builder, cover-letter writer, document preview flows, and the browser-based user experience for creating career assets.

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

The app runs at http://localhost:5173.

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

For the full application, run `docker compose up --build` from the repository root.

## Project structure

- `src/apps/resume-builder`
- `src/apps/cover-letter`
- `src/components`
- `src/core`
- `src/data`
- `src/routes`

## Related documentation

- [CHANGELOG.md](CHANGELOG.md)
- [ROADMAP.md](ROADMAP.md)
- [TODO.md](TODO.md)
- [SECURITY.md](SECURITY.md)
- [../README.md](../README.md)
