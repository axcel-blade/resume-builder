# Vita Forge API Documentation (Local)

Complete REST API reference for Vita Forge backend services.

## 📚 Table of Contents

- [Authentication](./auth.md) - JWT token authentication
- [Users](./users.md) - User account management
- [Health](./health.md) - Liveness and readiness probes
- [Collaboration](./collab.md) - Shared resume rooms (SSE)
- [Templates](./templates.md) - Marketplace template catalog
- [Resumes](./resumes.md) - Resume profile operations
- [Cover Letters](./coverletters.md) - Cover letter operations
- [Error Handling](./errors.md) - Error codes and messages

## 🔐 Authentication Endpoints

All authenticated endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

See **[Authentication Guide](./auth.md)** for details.

## 👤 User Management

- [GET /api/users](./users.md#list-users) - List user profiles (admin only)
- [POST /api/users](./users.md#create-user) - Create new user account
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

## 📄 Resume Operations

- `GET /api/resumes` - Get all resumes (admin)
- `POST /api/resumes` - Create new resume profile
- `PUT /api/resumes/:id` - Update resume profile
- `DELETE /api/resumes/:id` - Delete resume profile
- `POST /api/resumes/:id/export/pdf` - Export as PDF
- `POST /api/resumes/:id/export/json` - Export as JSON
- `POST /api/resumes/:id/import` - Import from JSON

See **[Resume API](./resumes.md)** for details.

## 📝 Cover Letter Operations

- `GET /api/cover-letters` - Get all cover letters (admin)
- `POST /api/cover-letters` - Create new cover letter
- `PUT /api/cover-letters/:id` - Update cover letter
- `DELETE /api/cover-letters/:id` - Delete cover letter
- `POST /api/cover-letters/:id/export/pdf` - Export as PDF
- `POST /api/cover-letters/:id/export/json` - Export as JSON

See **[Cover Letter API](./coverletters.md)** for details.

## 🔧 Error Handling

All errors follow a consistent format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": "Additional context (optional)"
  }
}
```

See **[Error Codes](./errors.md)** for the complete list.

---

> **Note:** This is the local API documentation. For user-facing guides, see [GitHub Wiki](../../wiki).