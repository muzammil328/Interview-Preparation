---
id: difference-between-git-and-github
title: "Difference Between Git and GitHub"
sidebar_label: "Difference Between Git and GitHub"
sidebar_position: 1
description: "Difference Between Git and GitHub — Git interview notes."
---
---

| Git | GitHub |
|---|---|
| Git is a distributed version control system. | GitHub is a platform that hosts Git repositories. |
| Used to track code changes locally. | Used for collaboration and sharing code online. |
| Works on your local machine. | Works as a remote repository hosting service. |
| Example: `git commit`, `git branch` | Example: Pull requests, Issues, Code reviews |

```text
Your laptop (Git)                         GitHub (remote)
┌──────────────────┐   git push   ┌──────────────────────┐
│ full repo +      │ ───────────► │ shared copy of repo  │
│ full history     │ ◄─────────── │ + PRs, Issues, CI    │
└──────────────────┘   git pull   └──────────────────────┘
```

**Distributed** means every developer has the full history locally, so you can commit, branch, and view history without internet.

---
