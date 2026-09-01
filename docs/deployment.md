# Deployment Guide

Version 0.6.0

## Docker Compose

Run from the repository root:

```bash
docker compose up --build -d
```

Check service status and logs:

```bash
docker compose ps
docker compose logs -f backend
```

Stop the stack without deleting the PostgreSQL volume:

```bash
docker compose down
```

To remove the stored local database volume as well:

```bash
docker compose down -v
```

## Services and ports

| Service | Container port | Host port |
| --- | ---: | ---: |
| Frontend | 4173 | 5173 |
| Backend | 3000 | 3000 |
| PostgreSQL | 5432 | 5432 |
| Redis | 6379 | 6379 |

The frontend talks to the backend using the Docker service name
`http://backend:3000`. The browser accesses the frontend through
`http://localhost:5173`.

## Runtime configuration

Compose supplies the backend values for `PORT`, `NODE_ENV`, `DATABASE_URL`, and
`REDIS_URL`. Do not commit production credentials. Replace the example values
with secret-managed values before deploying outside local development.

The backend image uses Node.js 22 Alpine and installs OpenSSL because Prisma
requires it at runtime. It applies committed Prisma migrations before starting
NestJS. CI also runs `prisma migrate deploy` against its PostgreSQL service
before backend integration tests.

For production, use managed PostgreSQL and Redis services, inject
`DATABASE_URL` and `REDIS_URL` through a secret manager, restrict public ports,
and add TLS and an external uptime monitor for `/api/health`.

## Verification

After startup, verify:

```bash
curl http://localhost:3000/api/health
```

The response should contain `"server":"ok"` and `"database":"ok"`.
