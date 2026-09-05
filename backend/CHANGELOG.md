# Backend changelog

## [0.8.0] - 2026-09-05

- Docker image build for Nest (`docker/backend.Dockerfile`) with Compose healthcheck on `/api/health/live`
- `HealthService` liveness + readiness (memory vs Postgres)
- In-memory collab rooms with SSE fan-out (`CollabModule`)
- Static template catalog (`TemplatesModule`)
- `AIService` no longer takes Nest-injected config objects (avoids `Object` DI token)

## [0.7.0] - 2026-09-05

- Prisma schema and migrations under `database/`
- Auth and profiles use a DataStore repository
- Profile version snapshots and restore
