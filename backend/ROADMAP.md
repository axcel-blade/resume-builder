# Backend Roadmap

This roadmap focuses on the VitaForge backend: API stability, data integrity, deployment reliability, and operational health.

---

## In Progress

- [ ] Harden API validation and error-handling coverage
- [ ] Expand health checks and operational observability

---

## Planned

### API and Data

- [ ] Add pagination and filtering for user and profile endpoints
- [ ] Add stronger validation and sanitisation for all DTOs
- [ ] Extend Prisma models for richer resume and cover-letter ownership flows
- [ ] Review database indexing and query performance for larger payloads

### Reliability

- [ ] Improve background job and queue resilience
- [ ] Add retry logic and circuit-break patterns for external services
- [ ] Expand integration coverage for API and persistence paths

### Deployment and Operations

- [ ] Add stronger production environment checks and secret management guidance
- [ ] Expand docker health and readiness validation
- [ ] Add structured application logging and monitoring hooks

---

## Completed

| Version | Feature |
|---------|---------|
| 0.6.1 | Backend version metadata alignment and app-specific documentation refresh |
| 0.6.0 | Health endpoint, root-level API deployment, Redis checks, and migration support |
| 0.1.0 | Initial NestJS backend scaffold with Prisma and Swagger |

---

## Out of Scope

- Client-side business logic
- Browser UI rendering concerns
- Storage of user documents outside the configured backend data model
