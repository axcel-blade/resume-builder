# Collaboration API

In-memory shared resume rooms. Last write wins; peers receive updates over SSE.

Global prefix: `/api`.

## Endpoints

### `POST /api/collab/rooms`

Create a room. Returns `{ "roomId": "<uuid>" }`.

### `GET /api/collab/rooms/:roomId`

Room snapshot: `roomId`, `revision`, `resume`, `peers`.

### `POST /api/collab/rooms/:roomId/join`

Body: `{ "clientId": "<string>" }`. Registers a peer and broadcasts peer count.

### `POST /api/collab/rooms/:roomId/state`

Body: `{ "clientId": "<string>", "resume": { ... } }`. Publishes resume JSON and increments `revision`.

### `GET /api/collab/rooms/:roomId/stream?clientId=`

Server-Sent Events stream. Events: `hello`, `update`, `peers`.

## Notes

- Rooms are process-local (lost on restart; not shared across multiple API replicas).
- Docker Compose health does not depend on collab; use `/api/health/live` for liveness.
