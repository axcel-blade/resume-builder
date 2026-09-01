# VitaForge

A full-stack resume and career-tools platform built as a modern monorepo.

Current version: `0.6.0`

## Overview

- Frontend: Vite + React + TypeScript
- Backend: NestJS + TypeScript
- Database: PostgreSQL via Prisma
- Cache: Redis
- API docs: Swagger/OpenAPI
- Deployment: Docker + Docker Compose
- Health check: `GET /api/health`

## Repository structure

```text
vita-forge/
├── frontend/              # Vite React client
├── backend/               # NestJS API service
├── .github/
├── .gitignore
├── .dockerignore
├── docker-compose.yml     # local full-stack orchestration
├── package.json           # workspace-level scripts and setup
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── TODO.md
├── ROADMAP.md
├── SECURITY.md
├── SUPPORT.md
├── LICENSE.md
├── docs/
├── wiki/
└── LICENSE
```

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

The backend Docker image uses Node.js 22 and includes OpenSSL for Prisma.

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
