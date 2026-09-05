# Docker notes for Vita Forge (v0.8.0)

## Quick start

From the repository root:

```bash
docker compose up --build
```

- Frontend: http://localhost:8080
- Backend: http://localhost:3001/api

Compose waits for the backend `/api/health/live` check before starting the frontend.

## Files

| Path | Role |
|------|------|
| `docker/backend.Dockerfile` | NestJS API image |
| `docker/frontend.Dockerfile` | Vite build + nginx |
| `docker/nginx.conf` | SPA routing for the frontend |
| `docker-compose.yml` | Compose services (repo root) |

## Environment

Compose reads env vars from your shell or a root `.env` (not committed):

```bash
JWT_SECRET=change-me
CORS_ORIGINS=http://localhost:8080
VITE_API_BASE_URL=http://localhost:3001/api
ANTHROPIC_API_KEY=
```

Postgres is optional (`--profile db`). See the root README Docker section.
