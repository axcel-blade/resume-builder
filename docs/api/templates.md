# Templates API

Static marketplace catalog used by the resume builder Templates page.

Global prefix: `/api`.

## Endpoints

### `GET /api/templates`

Returns the full catalog array (id, name, description, layout hints).

### `GET /api/templates/:id`

Single template by id. `404` when unknown.

## Notes

- Catalog is defined in `backend/src/templates/template-catalog.ts`.
- Frontend mirrors layout ids in `frontend/src/constants/templates.js`.
