# Architecture Overview

This document provides a comprehensive overview of the Vita Forge system architecture, technical stack, and design patterns.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Application                      │
│                  (Vite + React + TypeScript)                   │
│  ┌──────────────┬──────────────┬──────────────┬───────────┐ │
│  │   Website    │ Resume       │ Cover        │   Shared   │ │
│  │   Pages      │ Builder      │ Letter       │ Components │ │
│  └──────────────┴──────────────┴──────────────┴───────────┘ │
└─────────────────────────────────────────────────────────────┘
                           ↓ HTTP/WebSocket
┌─────────────────────────────────────────────────────────────┐
│                   Backend API Server                          │
│              (NestJS + TypeScript + Express)                   │
│  ┌──────────────┬──────────────┬──────────────┬───────────┐ │
│  │   Auth       │ Profiles     │ Documents    │ Cache      │ │
│  │ Module       │ Module       │ Module       │ (Redis)    │ │
│  └──────────────┴──────────────┴──────────────┴───────────┘ │
└─────────────────────────────────────────────────────────────┘
                           ↓ PostgreSQL
┌─────────────────────────────────────────────────────────────┐
│                      Database Layer                           │
│                (PostgreSQL - Relational DB)                    │
│  ┌────────────────┬────────────────┬────────────────────┐   │
│  │  users         │  profiles      │  documents          │   │
│  └────────────────┴────────────────┴────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Technical Stack

### Frontend (Client)

| Layer | Technology | Version/Notes | Purpose |
|-------|------------|---------------|---------|
| Framework | React | 19 | UI component library |
| Language | TypeScript | 5.8 | Type-safe development |
| Build Tool | Vite | 8 | Fast HMR and builds |
| Styling | Tailwind CSS | 4 | Utility-first CSS framework |
| Routing | React Router | 7 | Client-side routing |
| PDF Export | jsPDF | - | A4 document generation |

### Backend (API)

| Layer | Technology | Version/Notes | Purpose |
|-------|------------|---------------|---------|
| Framework | NestJS | Latest | Structured Node.js framework |
| Language | TypeScript | 5.8 | Type-safe development |
| Database ORM | Prisma | - | Type-safe database access |
| Cache | Redis | - | Session storage and caching |
| Authentication | JWT | - | Stateless user authentication |

### Infrastructure

- **Database**: PostgreSQL (relational, ACID-compliant)
- **Cache**: Redis (in-memory data store)
- **Hosting**: Platform-agnostic (can deploy to Vercel, Netlify, Heroku, AWS, etc.)

## Key Architectural Decisions

### 1. Monorepo Structure

Vita Forge uses a monorepo architecture:

```
vita-forge/
├── frontend/    # React SPA
├── backend/     # NestJS API server
└── docs/        # Shared documentation
```

**Benefits:**
- Centralized codebase
- Shared configuration
- Simplified dependency management

### 2. Frontend-First Approach

The Vite application is placed at the repository root, keeping it focused on project documentation and automation:

```bash
vita-forge/
├── frontend/      # Standalone SPA with its own build config
│   ├── src/
│   │   ├── core/          # Router, layouts, SEO, config
│   │   ├── website/       # Home, About, Products, Contact pages
│   │   ├── apps/          # Feature apps (resume builder, cover letter)
│   │   │   ├── resume-builder/
│   │   │   └── cover-letter/
│   │   ├── components/    # Shared UI: Toolbar, templates, editors, preview
│   │   ├── data/          # Data management and services
│   │   └── routes/        # Route definitions
├── .github/           # GitHub workflows, issues, PRs
├── README.md          # Main project documentation
├── CHANGELOG.md       # Version history
└── CONTRIBUTING.md    # Contribution guidelines
```

### 3. API Design Principles

- **RESTful**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **Resource-based URLs**: `/api/profiles`, `/api/documents`
- **JSON payloads**: Standardized request/response format
- **JWT Authentication**: Stateless token-based auth

### 4. Document Generation Strategy

**PDF Export:**
- Client-side generation using jsPDF
- A4 page format matching on-screen preview
- ATS-friendly formatting (clean text, standard fonts)

**JSON Export:**
- Structured data for import/export
- Enables profile backup and sharing