# Architecture

## Overview

VitaForge is a two-application TypeScript project:

- `frontend/`: React and Vite browser client
- `backend/`: NestJS HTTP API
- PostgreSQL: persistent relational data through Prisma
- Redis: cache backend used by Nest cache

Docker Compose runs all four services on one private network. The browser reaches
the published frontend and backend ports; containers communicate by service name.

## Backend modules

- `AppModule`: global configuration, cache setup, and module composition
- `AppController`: API metadata and health endpoints
- `UsersModule`: user CRUD routes and validation
- `PrismaModule`: global Prisma client lifecycle

The backend applies the `/api` prefix, enables CORS, validates request bodies,
and serves Swagger at `/docs`.

## Data model

Prisma currently defines:

- `User`: email, optional name, and timestamps
- `ResumeProfile`: JSON profile payload, optional user association, and timestamps

The database schema maps these models to `users` and `resume_profiles` tables.

## Frontend organization

The client routes website pages, resume-builder pages, and cover-letter pages.
Reusable editor, template, preview, layout, and SEO components live under
`frontend/src/components`, `frontend/src/core`, and `frontend/src/website`.

## Request flow

1. A browser loads the Vite-built frontend.
2. Frontend routes render the selected website or career-tool page.
3. API requests target the configured backend URL.
4. NestJS validates requests and delegates persistence to Prisma.
5. Prisma connects to PostgreSQL; cache operations use Redis where configured.
