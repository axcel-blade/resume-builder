# Authentication Documentation

Vita Forge uses JWT (JSON Web Tokens) for secure authentication.

## 📋 Overview

Authentication is handled through:
- **Login** - Obtain JWT token from user credentials
- **Token Refresh** - Get new token when current expires
- **Session Management** - Track active sessions and users

## 🔑 Authentication Flow

```
1. User submits credentials (email/password)
2. Backend validates credentials against PostgreSQL
3. If valid, backend generates JWT token with:
   - user_id
   - email
   - expiry_time (typically 24 hours)
4. Token sent to client in response body
5. Client stores token and includes in Authorization header for future requests
```

## 📡 Endpoints

### Login

**POST** `/api/auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response (success):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400,
  "user": {
    "id": "uuid-string",
    "email": "user@example.com"
  }
}
```

### Refresh Token

**POST** `/api/auth/refresh`

Request:
```json
{
  "token": "expired-jwt-token"
}
```

Response (success):
```json
{
  "token": "new-jwt-token",
  "expires_in": 86400
}
```

## 🔐 Token Format

JWT tokens are structured as:
```
header.payload.signature
```

**Header:**
- `alg`: HS256 (HMAC with SHA-256)
- `typ`: JWT

**Payload:**
| Claim | Description |
|-------|-------------|
| `sub` | User ID (UUID) |
| `email` | User email address |
| `iat` | Issued at timestamp |
| `exp` | Expiration timestamp (Unix time) |
| `iss` | Token issuer identifier |

## ⚠️ Security Best Practices

1. **Never log or expose tokens** - Treat them like passwords
2. **Use HTTPS only** - Tokens transmitted over TLS
3. **Store tokens securely** - Use httpOnly cookies if possible
4. **Implement token refresh** - Don't wait for token to expire
5. **Rotate tokens periodically** - Re-authenticate when needed

## 🚫 Error Responses

### Invalid Credentials (401)

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email or password is incorrect"
  }
}
```

### Token Expired (401)

```json
{
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "Your session has expired. Please login again."
  }
}
```

### Invalid Token (401)

```json
{
  "error": {
    "code": "INVALID_TOKEN",
    "message": "The provided token is invalid"
  }
}
```

## 🔍 Troubleshooting

| Issue | Solution |
|-------|----------|
| Token keeps expiring quickly | Check backend server time synchronization |
| "Invalid credentials" error | Verify email and password match registered account |
| Session not persisting | Ensure Authorization header includes Bearer token |
| CORS errors | Check frontend configuration for proper origin settings |

---

> **Note:** See [GitHub Wiki](../../wiki) for user-facing authentication guides.