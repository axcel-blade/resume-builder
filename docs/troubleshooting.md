# Troubleshooting

## Compose cannot find `backend/.env`

The current Compose configuration does not require `backend/.env`. Make sure
Docker is using the repository-root `docker-compose.yml`:

```bash
cd C:\Users\srika\Desktop\GitHub\Vita-Forge
docker compose up --build
```

## Container name conflict

A stale container may prevent recreation. Stop the project and remove only the
VitaForge containers:

```bash
docker compose down
docker compose up --build -d
```

## Backend starts then exits

Inspect the logs:

```bash
docker compose logs backend
```

Confirm PostgreSQL and Redis are running with `docker compose ps`. The backend
also requires OpenSSL for Prisma; the supplied backend Dockerfile installs it.

## Health reports a degraded database

Check PostgreSQL status and logs:

```bash
docker compose ps postgres
docker compose logs postgres
```

The database URL inside Compose must use host `postgres`, not `localhost`.

## Port already in use

Stop the process using ports `5173`, `3000`, `5432`, or `6379`, or adjust the
host-side port in `docker-compose.yml`. Container ports must remain consistent
with the service configuration.

## Frontend build cannot find `tsc`

Install frontend dependencies from the repository root:

```bash
npm --prefix frontend install
npm run build:frontend
```
