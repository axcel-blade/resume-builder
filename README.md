# VitaForge

VitaForge is a full-stack resume and career-tools platform built as a monorepo. It combines a Vite + React frontend with a NestJS + Prisma backend to support resume building, cover-letter authoring, live preview workflows, and deployment-ready local development.

Current version: `0.6.1`

## Overview

- Frontend: Vite + React + TypeScript
- Backend: NestJS + TypeScript
- Database: PostgreSQL via Prisma
- Cache: Redis
- API docs: Swagger/OpenAPI
- Deployment: Docker + Docker Compose
- Health check: `GET /api/health`

## Project structure

```text
vita-forge/
├── frontend/              # Vite React client
├── backend/               # NestJS API service
├── docs/                  # product and deployment docs
├── wiki/                  # GitHub wiki content
├── .github/               # issue and PR templates
├── .gitignore
├── .dockerignore
├── docker-compose.yml     # full-stack local orchestration
├── package.json           # workspace scripts
├── README.md              # overall project overview
├── CHANGELOG.md           # monorepo changelog
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── TODO.md
├── ROADMAP.md
├── SECURITY.md
├── SUPPORT.md
├── LICENSE.md
└── LICENSE
```

## App entry points

- Frontend application: [frontend/README.md](frontend/README.md)
- Backend API: [backend/README.md](backend/README.md)
- Frontend changelog: [frontend/CHANGELOG.md](frontend/CHANGELOG.md)
- Backend changelog: [backend/CHANGELOG.md](backend/CHANGELOG.md)
- Product roadmap: [ROADMAP.md](ROADMAP.md)
- Task tracking: [TODO.md](TODO.md)
- Security policy: [SECURITY.md](SECURITY.md)

## Quick start

### Frontend only

```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:5173

### Backend only

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

Open:
- API: http://localhost:3000/api
- Health: http://localhost:3000/api/health
- Swagger: http://localhost:3000/docs

### Full stack with Docker

```bash
cd vita-forge
docker compose up --build
```

Then use:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Health: http://localhost:3000/api/health
- Swagger: http://localhost:3000/docs

## Workspace commands

```bash
npm install
npm run dev:frontend
npm run dev:backend
npm run build:frontend
npm run build:backend
npm run test:backend
```

## Product focus

- Resume builder
- Cover letter writer
- Live preview and export flows
- ATS-friendly document styling
- Browser-first workflows for career assets

## Contribution and support

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [CHANGELOG.md](CHANGELOG.md)
- [TODO.md](TODO.md)
- [Documentation](docs/index.md)
- [ROADMAP.md](ROADMAP.md)
- [SECURITY.md](SECURITY.md)
- [SUPPORT.md](SUPPORT.md)

## License

MIT — see [LICENSE](LICENSE) or [LICENSE.md](LICENSE.md)
