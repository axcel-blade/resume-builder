---
name: vitaforge-feature-branch
description: Creates VitaForge Git Flow feature branches from develop. Use when starting a feature, naming a branch, or when the user mentions Git Flow.
---

# Feature branches

```bash
git checkout -b feature/<short-desc> develop
```

| Type | Pattern | Source |
|------|---------|--------|
| Feature | `feature/<short-desc>` | `develop` |
| Release | `release/<version>` | `develop` |
| Hotfix | `hotfix/<version>-<issue>` | `main` |

Do not commit or push unless the user asks. Merge to `main` through a PR.
