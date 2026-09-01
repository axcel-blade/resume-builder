# Backend Security Policy

## Scope

This policy applies to the VitaForge backend API and supporting services, including the NestJS application, Prisma data layer, Redis health checks, and Docker-based deployment configuration.

## Key Security Considerations

- Input validation for all request payloads and route parameters
- Protection against malformed or malicious database queries
- Secret and environment variable handling for PostgreSQL and Redis connections
- Restricting publicly exposed ports and deployment endpoints in production
- Ensuring health and diagnostics endpoints do not leak sensitive infrastructure details

## Security Practices

- Validate all DTOs and request schemas before processing data
- Keep credentials and production values in environment-managed secrets, not committed files
- Verify Prisma migrations and runtime environment are configured correctly before deployment
- Use TLS, signed certificates, and protected network boundaries in production deployments
- Review Redis and database connection strings before exposing services beyond the local environment

## Reporting a Vulnerability

Please do not report security concerns through public issues or pull requests.

Send a private report to: **srikanthfernando3@gmail.com**

Include:

1. A description of the vulnerability and its impact
2. Steps to reproduce or a proof of concept
3. Affected version or commit hash
4. Suggested remediation or mitigation, if known

We will acknowledge valid reports within 72 hours and prioritise fixes for the next release.
