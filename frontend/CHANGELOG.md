# Frontend changelog

## [0.8.0] - 2026-09-05

- nginx Docker image for the production Vite build (`docker/frontend.Dockerfile`)
- Template marketplace page wired to `/api/templates` with shared layout constants
- Collaborative resume rooms via SSE client (`src/services/collab.ts`)
- Builder share/join flow for multi-peer last-write-wins edits

## [0.7.0] - 2026-09-05

- Feature folders for website, auth, resume builder, and cover letter
- API clients live under `src/services/`
- Signed-in profile edits sync to the backend with optimistic UI
