# API Guide

This document provides detailed information about the Vita Forge API endpoints, request/response formats, and authentication requirements.

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Tokens are obtained through the login endpoint and have an expiration time (default: 24 hours).

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```
