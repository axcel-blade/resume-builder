# Development Guide

## Requirements

- Node.js 22 or newer
- npm 10 or newer
- Docker Desktop for PostgreSQL, Redis, or the full stack

## Install dependencies

From the repository root:

```bash
npm install
npm --prefix frontend install
npm --prefix backend install
```

The root workspace scripts target the two root-level applications:

```bash
npm run dev:frontend
npm run dev:backend
npm run build:frontend
npm run build:backend
npm run test:backend
```

Run frontend and backend commands in separate terminals.

## Local backend services

Copy `backend/.env.example` to `backend/.env`. Start only the supporting services:

```bash
docker compose up -d postgres redis
```

Then generate the Prisma client, apply local migrations, and start the API:

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

For CI or an existing deployment, use the committed migrations without creating
a new one:

```bash
npm run prisma:migrate:deploy
```

## Frontend configuration

The current frontend uses relative API routes from the browser, including
`/api/generate_summary`. Configure the reverse proxy or hosting environment to
route that path to the backend when deploying the applications separately.

## Quality checks

```bash
npm run build:frontend
npm run build:backend
npm run test:backend
npm --prefix backend run lint
npm run test:e2e --prefix frontend
```
