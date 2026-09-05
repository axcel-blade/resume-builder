# Security Policy

## Supported Versions

Only the latest release of Vita Forge receives security fixes.

| Version | Supported |
|---------|-----------|
| 0.8.0   | Yes       |
| Older   | No        |

---

## Scope

Vita Forge stores resume and cover letter data in two ways:

- **Guests:** browser `localStorage` only
- **Signed-in users:** Nest API + optional PostgreSQL (`DATABASE_URL`)

Optional AI endpoints (`POST /api/generate_summary` and `/api/ai/*`) send profile text to an AI provider. They require server-side API keys. Never put those keys in `VITE_*` frontend variables.

Security concerns relevant to this project include:

- Cross-site scripting (XSS) in rendered resume or cover letter content
- Malicious JSON imported via Import JSON
- Stolen JWTs or leaked `.env` secrets
- Unauthorized access to another user’s profile API

---

## Reporting a Vulnerability

**Do not report security vulnerabilities through public GitHub issues.**

Send a private report to: **srikanthfernando3@gmail.com**

Include:

1. A description of the vulnerability and its potential impact
2. Steps to reproduce or a proof of concept
3. The affected version or commit hash
4. Any suggested fix, if you have one

You will receive an acknowledgement within **72 hours**. If the vulnerability is confirmed, a fix will be prioritised for the next release. You will be credited in the release notes unless you prefer to remain anonymous.
