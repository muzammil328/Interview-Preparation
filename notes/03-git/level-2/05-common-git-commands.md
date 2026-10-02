---
id: common-git-commands
title: "Common Git Commands"
sidebar_label: "Common Git Commands"
sidebar_position: 5
description: "Common Git Commands — Git interview notes."
---
| Task | Command |
|---|---|
| Check status | `git status` |
| Initialize repository | `git init` |
| Clone repository | `git clone repository-url` |
| Add files | `git add .` |
| Commit changes | `git commit -m "commit message"` |
| Push changes | `git push origin main` |
| Pull latest changes | `git pull origin main` |
| Create branch | `git branch feature-name` |
| Create and switch branch | `git switch -c feature-name` (or `git checkout -b`) |
| Switch branch | `git switch branch-name` (or `git checkout branch-name`) |
| View commit history | `git log --oneline --graph` |
| See changes | `git diff` |

```text
A typical day:
git pull → git switch -c feature/x → edit → git add . → git commit → git push → open PR
```

---
