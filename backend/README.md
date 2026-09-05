# VitaForge backend

NestJS API for authentication, profile storage, and AI helpers.

## Layout

```text
src/
├── auth/           # Register, login, JWT
├── users/          # Profile + version history
├── ai/             # Controllers, services, DTOs
├── health/
├── repositories/   # DataStore + Prisma adapters
├── common/         # CORS, exception filter
└── main.ts

database/
├── schema.prisma
└── migrations/

tests/
├── unit/
├── integration/
└── stubs/
```

Nest uses decorator routing, so there is no separate `routes/` folder.

Request flow: Controller → Service → Repository → database (or in-memory store).

## Setup

```bash
cp .env.example .env
npm install
```

Leave `DATABASE_URL` unset to use the in-memory store. To persist with Postgres:

```bash
# set DATABASE_URL in .env
npm run prisma:generate
npm run prisma:deploy
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the API |
| `npm test` | Jest unit + integration tests |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run compiled server |
| `npm run prisma:migrate` | Create/apply migrations |

## Health

```bash
curl http://localhost:3001/api/health
curl http://localhost:3001/api/health/ready
```

See [docs/api/health.md](../docs/api/health.md).
