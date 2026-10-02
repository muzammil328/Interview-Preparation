---
id: what-is-git-cherry-pick
title: "What is git cherry-pick?"
sidebar_label: "What is git cherry-pick?"
sidebar_position: 2
description: "What is git cherry-pick? — Git interview notes."
---
Copies **one specific commit** from another branch onto your current branch.

```text
feature:  A ── B ── X ── Y
main:     A ── B ── C

git checkout main
git cherry-pick X

main:     A ── B ── C ── X'     (only X is copied, not Y)
```

**Use case:** a bug fix was committed on a feature branch, and you need only that fix on `main` right now.

```bash
git cherry-pick <commit-id>
```

---
