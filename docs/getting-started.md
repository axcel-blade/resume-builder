# Getting Started

VitaForge is a full-stack application with root-level `frontend/` and `backend/`
applications.

## Docker

From the repository root:

```bash
docker compose up --build
```

The services are available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Health: http://localhost:3000/api/health
- Swagger: http://localhost:3000/docs

A healthy response includes `server: "ok"` and `database: "ok"`.
It also includes `redis: "ok"` when the Redis service is available.

## Local development

Install dependencies in each application directory. Start PostgreSQL and Redis,
then run the frontend and backend using the root workspace scripts documented in
[README.md](../README.md).
