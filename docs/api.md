# API Reference

The backend listens on port `3000` and applies the global `/api/v1` prefix.
Interactive OpenAPI documentation is available at
[http://localhost:3000/docs](http://localhost:3000/docs).

## Health

### `GET /api/v1/health`

Checks that the API process is serving requests and that PostgreSQL responds to
a lightweight query.

Healthy response:

```json
{
  "status": "ok",
  "server": "ok",
  "database": "ok",
  "redis": "ok"
}
```

When PostgreSQL is unavailable, the response reports `status: "degraded"` and
sets the affected dependency to `"unavailable"` while the API remains available
for diagnostics.

## Authentication

### `POST /api/v1/auth/register`

Creates a user account and returns a JWT access token along with the user record.

```json
{
  "email": "alex@example.com",
  "name": "Alex Morgan",
  "password": "Azure123!"
}
```

### `POST /api/v1/auth/login`

Signs in an existing user with an email and password.

```json
{
  "email": "alex@example.com",
  "password": "Azure123!"
}
```

Returns:

```json
{
  "accessToken": "jwt-token",
  "user": {
    "id": "cuid",
    "email": "alex@example.com",
    "name": "Alex Morgan",
    "role": "user"
  }
}
```

### `GET /api/v1/auth/me`

Requires a `Bearer` token and returns the authenticated user profile.

## Users

### `GET /api/v1/users`

Returns users ordered by newest creation date.

### `GET /api/v1/users/:id`

Returns one user. A missing user returns HTTP `404`.

### `POST /api/v1/users`

Creates a user.

```json
{
  "email": "alex@example.com",
  "name": "Alex Morgan"
}
```

Both fields are required. `email` must be valid and `name` must contain at least
two characters.

### `PATCH /api/v1/users/:id`

Updates either `email`, `name`, or both. Both fields are optional, but supplied
values must pass the same validation as creation.

### `DELETE /api/v1/users/:id`

Deletes a user and returns the deleted record. A missing user returns HTTP `404`.

## Errors

Validation errors return HTTP `400`. Resource lookup failures return HTTP `404`.
Duplicate database values, such as an existing email address, are handled by the
API's database error behavior and should be treated as a client-visible failure.
