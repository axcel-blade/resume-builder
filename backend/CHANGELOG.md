# Backend Changelog

All notable changes to the VitaForge backend will be documented in this file.

## [0.6.1] - 2026-09-01
### Changed
- Aligned the backend API version metadata with the repository-wide 0.6.1 release update.

## [0.6.0] - 2026-09-01
### Added
- `GET /api/health` reports API and PostgreSQL availability.

### Changed
- Backend moved to the repository root and Docker image updated to Node.js 22 with OpenSSL for Prisma.

## [0.1.0] - 2026-08-31
### Added
- NestJS backend scaffold
- Prisma schema for users and resume profiles
- Redis cache integration
- Swagger/OpenAPI configuration
- Docker and Compose support

### Changed
- Backend configured for local development and containerized deployment

### Fixed
- Project documentation and environment setup finalized for the API service
