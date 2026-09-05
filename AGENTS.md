# 🤖 VitaForge Agents Guide

## Table of Contents

1. [Project Overview](#project-overview)
2. [Git Flow Strategy](#git-flow-strategy)
3. [Markdown File Management](#markdown-file-management)
4. [Version Control Protocol](#version-control-protocol)
5. [Code Commenting Standards](#code-commenting-standards)
6. [Token Management & Continuity](#token-management--continuity)

---

## Git Flow Strategy

### Branch Structure

```
main (Production)          develop (Integration)
      ↑                          ↓
      |--------------------------|
      |   release/*              |
      |   hotfix/*               |
      └── feature/* branches     │
                                 ↓
                        [merge to main via PR]
```

### Branch Naming Convention

| Type | Pattern | Source Branch | Purpose |
|------|---------|---------------|----------|
| Main Development | `main` | - | Production-ready code |
| Integration | `develop` | - | Next release integration |
| New Features | `feature/<short-desc>` | `develop` | New features only |
| Release Prep | `release/<version>` | `develop` | Pre-release preparation |
| Hotfixes | `hotfix/<version>-<issue>` | `main` | Critical production fixes |

### Branch Workflow

1. **Feature Development:**
   - Create from `develop`: `git checkout -b feature/<description> develop`

---

## Version Control Protocol

### SemVer Format: `MAJOR.MINOR.PATCH`

| Component | When to Increment | Example Transition |
|-----------|------------------|-------------------|
| MAJOR | Incompatible API changes, breaking changes | 0.6.x → 1.0.0 |
| MINOR | New features (backward compatible) | 0.7.0 → 0.8.0 |
| PATCH | Bug fixes only | 0.8.0 → 0.8.1 |

### Version Update Checklist

Before every release, update:

- [ ] Root `README.md` - version in header
- [ ] Frontend `frontend/package.json`
- [ ] Backend `backend/package.json`
- [ ] Frontend `frontend/CHANGELOG.md`
- [ ] Backend `backend/CHANGELOG.md`
- [ ] Docker labels (if using docker-compose)
- [ ] Environment variables in `.env.example`

---

## Code Commenting Standards

### When to Add Comments

**✅ Add comments when:**
- Complex logic requires explanation
- Algorithm decisions need documentation
- Workarounds for known issues exist
- Performance optimizations are in place
- External dependencies require context

**❌ Don't add comments when:**
- Code is self-explanatory
- Adding "this fixes issue" comments (use commit messages)
- Commenting on trivial operations (array iteration, basic logic)

### Comment Style Guide

#### JSDoc for Functions/Classes

```typescript
/**
 * Generates a resume PDF with the given configuration.
 * 
 * @param config - Resume generation configuration object
 * @param options - Optional rendering options
 * @returns Promise resolving to generated PDF buffer
 * @throws {ValidationError} If configuration is invalid
 * @throws {GenerationError} If PDF generation fails
 */
async function generateResume(
  config: ResumeConfig,
  options?: GenerateOptions
): Promise<Buffer> {
  // Implementation
}
```

#### Inline Comments for Complex Logic

```typescript
// TODO: Optimize this query - currently fetching all users unnecessarily
// Issue: #1234 | Owner: @developer-name | Status: In Progress
const users = await userRepository.find({ where: { status: 'active' } });
```

---

*Last updated: 2026-09-05 (v0.8.0)*
