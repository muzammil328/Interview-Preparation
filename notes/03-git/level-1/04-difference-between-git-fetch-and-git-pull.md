---
id: difference-between-git-fetch-and-git-pull
title: "Difference Between git fetch and git pull"
sidebar_label: "Difference Between git fetch and git pull"
sidebar_position: 4
description: "Difference Between git fetch and git pull — Git interview notes."
---
| `git fetch` | `git pull` |
|---|---|
| Downloads latest changes from remote repository. | Downloads and applies changes to current branch. |
| Does not modify your working code. | Updates your current working branch. |
| Safer for reviewing changes first. | Faster way to update your branch. |

```text
git pull  =  git fetch  +  git merge   (or + git rebase with --rebase)

Remote ──fetch──► origin/main (remote-tracking branch) ──merge──► main (your branch)
       └──────────────────── pull does both ─────────────────────┘
```

Example:

```bash
git fetch origin
```

```bash
git pull origin main
```

---
