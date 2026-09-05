# Getting Started with Vita Forge

Welcome to **Vita Forge**, a comprehensive career-tools platform for building professional resumes and cover letters.

## Quick Start

### Prerequisites

- [Git](https://git-scm.com/) (v2.0+)
- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) (v10 or higher)
- [PostgreSQL](https://www.postgresql.org/download/) (database)
- [Redis](https://redis.io/download/) (caching)

### Installation

```bash
# Clone the repository
git clone https://github.com/axcel-blade/vita-forge.git
cd vita-forge

# Navigate to frontend and install dependencies
cd frontend
npm install
npm run dev
```

The application will open at `http://localhost:5173`

## Project Structure

```
vita-forge/
├── frontend/           # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── core/          # Router, layouts, SEO, config
│   │   ├── website/       # Home, About, Products, Contact pages
│   │   ├── apps/
│   │   │   ├── resume-builder/
│   │   │   └── cover-letter/
│   │   ├── components/    # Shared UI components
│   │   ├── data/          # Data management
│   │   └── routes/        # Route definitions
├── backend/             # NestJS + TypeScript API
│   ├── src/
│   │   ├── modules/       # Feature modules (auth, profiles, etc.)
│   │   └── main.ts        # Application entry point
├── docs/                # Project documentation
└── wiki/                # GitHub Wiki pages
```

## Features Overview

### Resume Builder

- Edit all resume sections: profile, experience, education, skills, projects, certificates
- Reorder bullet points with up/down controls
- Live A4-paginated preview that updates in real-time
- Professional formatting following community standards
- Export to PDF or JSON, import profiles from JSON

### Cover Letter Writer

- Guided form with tone selection
- Auto-populates personal info from resume profile
- Live draft preview on A4 format
- Export to PDF or JSON

### Backend Integration

- User authentication with JWT tokens
- PostgreSQL for persistent storage
- Redis for caching
- User-specific data isolation
- Profile sync across devices

## Development Workflow

```bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/vitaforge"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT Secret
JWT_SECRET="your-secret-key-here"
```

## First Steps

1. **Create a database** - Set up PostgreSQL database
2. **Configure Redis** - Start Redis server
3. **Install dependencies** - Run `npm install` in frontend
4. **Start development** - Run `npm run dev`
5. **Explore the UI** - Build your first resume or cover letter

## Next Steps

- Read the [Architecture Guide](./architecture.md) to understand the system design
- Check the [API Guide](./api-guide.md) for backend endpoints
- Review the [Deployment Guide](./deployment.md) for production setup

## Getting Help

- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Git flow and commit guidelines
- [CHANGELOG.md](../../CHANGELOG.md) - Version history
- [SUPPORT.md](../../SUPPORT.md) - How to get help
- [ROADMAP.md](../../ROADMAP.md) - Planned features

## License

MIT License - See [LICENSE](../../LICENSE) for details.

---

**Last Updated**: September 2026  
**Version**: 0.6.1