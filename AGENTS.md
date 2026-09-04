# 🤖 VitaForge Agents Guide

## Table of Contents

1. [Project Overview](#project-overview)
2. [Git Flow Strategy](#git-flow-strategy)
3. [Markdown File Management](#markdown-file-management)
4. [Version Control Protocol](#version-control-protocol)
5. [Code Commenting Standards](#code-commenting-standards)
6. [Token Management & Continuity](#token-management--continuity)
7. [File Type Reference](#file-type-reference)

---

## Project Overview

**VitaForge** is a full-stack resume and career-tools platform built as a monorepo.

- **Current Version:** `0.6.1`
- **Frontend:** Vite + React + TypeScript
- **Backend:** NestJS + TypeScript
- **Database:** PostgreSQL via Prisma
- **Cache:** Redis
- **API Docs:** Swagger/OpenAPI

**Core Features:**
- Resume builder with live preview
- Cover letter authoring
- ATS-friendly document styling
- Browser-first workflows for career assets


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

## Markdown File Management

### Required Markdown Files & Locations

| File | Location | Purpose | When to Update |
|------|----------|---------|----------------|
| `README.md` | Root | Project homepage description | Major changes, version updates |
| `CONTRIBUTING.md` | Root | Contribution guidelines | Process changes |
| `LICENSE.md` | Root | License information | License changes only |
| `CODE_OF_CONDUCT.md` | Root | Community rules | Behavior policy changes |
| `SUPPORT.md` | Root | Help guide | Support channel changes |
| `CHANGELOG.md` | Root/feature/* | Version history | Every release |
| `TODO.md` | feature/* | Task tracking | New features added |
| `ROADMAP.md` | feature/* | Future plans | Feature scope changes |
| `AGENTS.md` | Root | AI agent guidelines | This file always |

### Markdown File Update Protocol

**⚠️ CRITICAL: Always update these files when code changes:**

1. **Update Version Numbers Everywhere:**
   - Root `README.md`: Top line shows current version
   - Frontend `frontend/package.json`
   - Backend `backend/package.json`
   - Frontend `frontend/CHANGELOG.md`
   - Backend `backend/CHANGELOG.md`

2. **Update CHANGELOG on Every Code Change:**
   ```markdown
   ## [Unreleased]

   ### Features
   - Added new feature description here
   
   ### Changes
   - Modified existing feature X
   
   ### Bug Fixes
   - Fixed issue Y
   ```

3. **Update README.md Summary:**
   - Keep the first 5 lines as project overview
   - Update quick start instructions if paths change
   - Add new sections for major features

4. **Update TODO/ROADMAP Files:**
   - Move completed items to CHANGELOG
   - Add new planned features

   - Make changes and commit following conventional commits
   - PR must target `develop`, not `main`

2. **Release Process:**
   - When ready, create `release/0.X.Y` from `develop`
   - Update version numbers in all places (README, package.json, etc.)
   - Merge to `main` when stable

3. **Hotfix Process:**
   - Create from `main`: `git checkout -b hotfix/<version>-<issue> main`
   - Fix critical issues only
   - Update version number
   - Merge back to both `main` and `develop`

---

## Version Control Protocol

### SemVer Format: `MAJOR.MINOR.PATCH`

| Component | When to Increment | Example Transition |
|-----------|------------------|-------------------|
| MAJOR | Incompatible API changes, breaking changes | 0.6.x → 1.0.0 |
| MINOR | New features (backward compatible) | 0.6.1 → 0.7.0 |
| PATCH | Bug fixes only | 0.6.1 → 0.6.2 |

### Version Update Checklist

Before every release, update:

- [ ] Root `README.md` - version in header
- [ ] Frontend `frontend/package.json`
- [ ] Backend `backend/package.json`
- [ ] Frontend `frontend/CHANGELOG.md`
- [ ] Backend `backend/CHANGELOG.md`
- [ ] Docker labels (if using docker-compose)
- [ ] Environment variables in `.env.example`

### Version Update Example

```bash
# After completing a feature
git add README.md frontend/package.json backend/package.json \
      frontend/CHANGELOG.md backend/CHANGELOG.md
git commit -m "feat: update version numbers to 0.7.0"
```


```

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
 * 
 * @example
 * const config = {
 *   format: 'ATS',
 *   includeCoverLetter: true,
 *   outputPath: '/output/resume.pdf'
 * };
 * await generateResume(config, { quality: 'high' });
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

// Cache the result to prevent redundant calculations
const processedData = optimizeUserData(users);
```

#### Performance Notes

```typescript
/**
 * WARNING: This operation is O(n²) due to nested loop.
 * Consider using Map/Set for O(n) lookup when applicable.
 * See: https://en.wikipedia.org/wiki/Time_complexity
 */
for (let i = 0; i < items.length; i++) {
  for (let j = 0; j < items.length; j++) {
    if (items[i].id === items[j].ref) { ... }
  }
}
```

### Git Commit with Comments Reference

When updating code, the commit message should reference any added comments:

```bash
git add src/complex-module.ts
git commit -m "feat: optimize data processing in resume generator

- Added JSDoc to generateResume() function
- Inline comment for O(n²) performance note
- Updated TODO.md with optimization task"
```

---

## Token Management & Continuity

### When to Generate Summary

**Generate summary in CHAT when:**
- Chat reaches 80% of token limit (estimated)
- You detect conversation patterns changing significantly  
- User explicitly requests summary before continuing

### Summary Format (Copy into next chat)

```markdown
## 📋 VITA-FORGE AGENTS.md - Continuation Summary

### Current Progress: `0.6.1`

**Last Completed Task:** [Describe what was just done]

**Current Working Branch:** `[branch-name]`

---

## ⚠️ Context to Continue

### 1. Code Changes Made
- List all files modified with brief description
- Note any breaking changes or API modifications
- Mention database schema updates if any

### 2. Git Operations Performed
- List branches created/merged
- Commits made (brief summary)
- Current git status

### 3. Markdown Files Updated
- [x] README.md - version updated to `X.Y.Z`
- [x] CHANGELOG.md - entries added for unreleased
- [ ] Any other markdown files needing update

### 4. Version Numbers Updated
- frontend/package.json: `X.Y.Z`
- backend/package.json: `X.Y.Z`

### 5. Open Issues/TODOs
- List any incomplete tasks
- Link to relevant TODO.md entries

---

## 🚀 Next Steps for Continuation

1. [ ] Complete any pending code changes
2. [ ] Test updated functionality
3. [ ] Update CHANGELOG.md with new features/breaking changes
4. [ ] Create feature branch from develop if applicable
5. [ ] Prepare PR to develop branch

---

## 📝 Notes for AI Continuation

- Remember this is a monorepo project (frontend + backend)
- Always update version numbers in ALL relevant files
- Follow existing code style and comment conventions
- Use conventional commits format: `feat:`, `fix:`, `chore:`, etc.
```

### Token Limit Warning Signs

**Watch for these indicators:**
- Responses becoming truncated
- Repeating similar explanations
- Missing closing braces/quotes in code
- Chat history seems to "reset" mid-conversation

**Immediate Actions Required:**
1. Generate summary using the format above
2. Save summary to CHAT or copy to clipboard
3. Request continuation with summary attached
4. Continue from where you left off

---

## File Type Reference

| File Type | Purpose | Location | When to Create/Update |
|-----------|---------|----------|----------------------|
| `README.md` | Main project description | Root | Initial setup + version updates |
| `CONTRIBUTING.md` | Contribution guidelines | Root | Process changes |
| `LICENSE.md` | License information | Root | License type changes only |
| `CODE_OF_CONDUCT.md` | Community rules | Root | Policy updates |
| `SUPPORT.md` | Help guide | Root | Support channel updates |
| `CHANGELOG.md` | Version history | Root/feature/* | Every release + feature branch |
| `TODO.md` | Task tracking | feature/* | New features added |
| `ROADMAP.md` | Future plans | feature/* | Feature scope changes |
| `.github/ISSUE_TEMPLATE/*.md` | Issue templates | .github/ISSUE_TEMPLATE/ | Issue type additions |
| `.github/PULL_REQUEST_TEMPLATE.md` | PR template | .github/PULL_REQUEST_TEMPLATE/ | PR workflow changes |
| `.github/DISCUSSION_TEMPLATE/*.md` | Discussion templates | .github/DISCUSSION_TEMPLATE/ | New discussion types |

### Creating New Feature Branch Files

When creating `feature/<name>` branch:

```bash
# Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/new-resume-format

# If new markdown files needed for this feature:
touch docs/resume-format-guide.md      # Feature-specific docs
touch feature/new-resume-format/TODO.md  # Feature task tracking
touch feature/new-resume-format/ROADMAP.md  # Future enhancements

# Commit initial branch structure
git add .
git commit -m "feat: add new resume format feature files

- Added documentation structure
- Created TODO.md for task tracking"
```
