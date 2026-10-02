---
id: what-is-a-branching-strategy-git-flow-vs-trunk-based
title: "What is a Branching Strategy? (Git Flow vs Trunk-Based)"
sidebar_label: "What is a Branching Strategy? (Git Flow vs Trunk-Based)"
sidebar_position: 3
description: "What is a Branching Strategy? (Git Flow vs Trunk-Based) — Git interview notes."
---
A branching strategy is the team's rule for how branches are created and merged.

### Feature branch workflow (most common)

```mermaid
gitGraph
    commit id: "init"
    branch feature-login
    commit id: "login UI"
    commit id: "login API"
    checkout main
    merge feature-login id: "PR merged"
    branch fix-header
    commit id: "fix"
    checkout main
    merge fix-header id: "PR merged 2"
```

1. Create a branch from `main` for each feature or fix.
2. Push it and open a **Pull Request**.
3. Code review + CI checks pass.
4. Merge into `main`, then deploy.

| Git Flow | Trunk-Based |
|---|---|
| Long-lived `main`, `develop`, `release/*`, `hotfix/*` branches | One main branch (`main` / trunk) |
| Good for scheduled releases | Good for continuous deployment |
| More process, more merges | Short-lived branches, merged daily |

---
