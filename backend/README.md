# VitaForge Backend

The backend is the NestJS + TypeScript API layer for VitaForge. It exposes the application endpoints, handles data access through Prisma, manages Redis health checks, and serves Swagger-driven API documentation.

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

The API is available at:
- http://localhost:3000/api
- http://localhost:3000/api/health
- http://localhost:3000/docs

A healthy response looks like:

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

The Docker image uses Node.js 22 and includes OpenSSL for Prisma compatibility.

## Useful scripts

```bash
npm run lint
npm run test
npm run test:e2e
npx prisma studio
```

## Related documentation

- [CHANGELOG.md](CHANGELOG.md)
- [ROADMAP.md](ROADMAP.md)
- [TODO.md](TODO.md)
- [SECURITY.md](SECURITY.md)
- [../README.md](../README.md)
