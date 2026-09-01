# VitaForge Backend

A NestJS + TypeScript backend for the VitaForge platform, using Prisma with PostgreSQL, Redis caching, Swagger/OpenAPI documentation, and Docker-ready deployment.
The backend is a root-level application in the repository.

## Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- Swagger UI
- Docker + Docker Compose

## Quick start

1. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
2. Start PostgreSQL and Redis:
   ```bash
   docker compose up -d postgres redis
   ```
3. Generate Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Start the app:
   ```bash
   npm run start:dev
   ```

The API will be available at:
- http://localhost:3000/api
- http://localhost:3000/api/health
- http://localhost:3000/docs

The health endpoint returns server and database status. A healthy response is:

```json
{"status":"ok","server":"ok","database":"ok","redis":"ok"}
```

## Production build

```bash
npm run build
npm run start:prod
```

## Docker

```bash
cd ..
docker compose up --build
```

The Docker image uses Node.js 22 and installs OpenSSL for Prisma.

## Useful scripts

```bash
npm run lint
npm run test
npm run test:e2e
npx prisma studio
```
