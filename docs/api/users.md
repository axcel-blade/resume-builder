# User Management API

Endpoints for managing user accounts and profiles.

## 📋 Overview

User management handles:
- Account creation and registration
- Profile updates (name, contact info)
- Password management
- Account settings

## 👤 Data Model

```typescript
interface UserProfile {
  id: string;              // UUID v4
  email: string;           // Unique email address
  password_hash: string;   // BCrypt hashed password
  first_name: string;      // User's first name
  last_name: string;       // User's last name
  phone?: string;          // Optional phone number
  bio?: string;            // Optional biography
  avatar_url?: string;     // Optional avatar URL
  created_at: Date;        // Account creation timestamp
  updated_at: Date;        // Last update timestamp
  is_active: boolean;      // Account status
}
```

## 📡 Endpoints

### List Users (Admin Only)

**GET** `/api/users`

Headers: `Authorization: Bearer <admin-token>`

Query Parameters:
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| page | integer | Page number for pagination | 1 |
| limit | integer | Items per page | 20 |
| search | string | Search by email or name | - |
| status | string | Filter by status (active/inactive) | all |

Response:
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "john@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "created_at": "2026-08-01T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

### Create User (Admin Only)

**POST** `/api/users`

Headers: `Authorization: Bearer <admin-token>`

Request:
```json
{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "first_name": "Jane",
  "last_name": "Smith"
}
```

Response:
```json
{
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "newuser@example.com",
    "first_name": "Jane",
    "last_name": "Smith"
  }
}
```

### Get User Profile

**GET** `/api/users/:id`

Headers: `Authorization: Bearer <token>`

Response:
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "email": "jane@example.com",
  "first_name": "Jane",
  "last_name": "Smith",
  "phone": "+1-555-987-6543",
  "bio": "Marketing professional",
  "created_at": "2026-08-15T09:00:00Z",
  "updated_at": "2026-09-01T14:20:00Z"
}
```

### Update User Profile

**PUT** `/api/users/:id`

Headers: `Authorization: Bearer <token>`

Request:
```json
{
  "first_name": "Jane Marie",
  "bio": "Senior Marketing Manager"
}
```

Response:
```json
{
  "data": {
    "updated_at": "2026-09-05T12:00:00Z"
  }
}
```

### Delete User Account

**DELETE** `/api/users/:id`

Headers: `Authorization: Bearer <admin-token>`

Response:
```json
{
  "success": true,
  "message": "User account deleted successfully",
  "deleted_user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

## ⚖️ Validation Rules

### Required Fields
| Field | Type | Min Length | Max Length |
|-------|------|------------|------------|
| email | string | 5 | 254 |
| password | string | 8 | 128 |
| first_name | string | 2 | 50 |
| last_name | string | 2 | 50 |

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)

## 🔐 Password Hashing

Vita Forge uses **BCrypt** with cost factor 12.

### Example (Node.js)

```typescript
import bcrypt from 'bcrypt';

const hashedPassword = await bcrypt.hash(password, 12);
const isMatch = await bcrypt.compare(providedPassword, storedHash);
```

## 🔍 Filtering & Searching

**Search by email:**
```
GET /api/users?search=john%40example.com
```

**Search by name:**
```
GET /api/users?search=smith
```

**Filter active users only:**
```
GET /api/users?status=active
```

**Paginated results:**
```
GET /api/users?page=2&limit=10&search=john
```

## 🚫 Error Responses

### Invalid Email Format (400)

```json
{
  "error": {
    "code": "INVALID_EMAIL",
    "message": "Please provide a valid email address"
  }
}
```

### Weak Password (400)

```json
{
  "error": {
    "code": "WEAK_PASSWORD",
    "message": "Password must contain uppercase, lowercase, number, and special character"
  }
}
```

### Email Already Exists (409)

```json
{
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "An account with this email already exists"
  }
}
```

### Unauthorized Access (401)

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required. Please login first."
  }
}
```

### Insufficient Permissions (403)

```json
{
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Admin privileges required for this operation"
  }
}
```

## 🔍 Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| EMAIL_EXISTS | User already registered | Use different email or login existing account |
| WEAK_PASSWORD | Password doesn't meet requirements | Add uppercase, number, and special character |
| INVALID_EMAIL | Malformed email address | Check for typos and proper format |
| UNAUTHORIZED | Missing/invalid token | Login again to get new JWT token |