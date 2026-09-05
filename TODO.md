# Development Tasks

## Authentication & Backend Integration

### Completed
- [x] AuthContext, login/register, protected routes
- [x] API services (`auth`, `user`) and CORS on Nest
- [x] Profile sync, optimistic saves, version restore points
- [x] Prisma schema + migrations; optional in-memory store

## Resume Builder

### Completed
- [x] Backend-backed resume storage for signed-in users
- [x] Collaborative editing rooms (SSE, last-write-wins)
- [x] Template marketplace (Modern, Basic, Executive, Compact, Academic)

### Planned
- [ ] Additional templates (minimal, timeline, two-column)
- [ ] Drag-and-drop section reordering
- [ ] Per-section visibility toggles

## Platform / Ops

### Completed
- [x] Docker Compose for frontend + backend (+ optional Postgres profile)
- [x] Health liveness and readiness probes

### Planned
- [ ] Dark mode
- [ ] PWA / offline support
- [ ] Accessibility WCAG 2.1 AA pass
