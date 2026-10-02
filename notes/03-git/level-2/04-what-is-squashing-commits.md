---
id: what-is-squashing-commits
title: "What is Squashing Commits?"
sidebar_label: "What is Squashing Commits?"
sidebar_position: 4
description: "What is Squashing Commits? — Git interview notes."
---
Combining many small commits into one clean commit before merging.

```text
Before:  A ── "wip" ── "fix typo" ── "fix again" ── "done"
After:   A ── "Add login feature"
```

Most often done with **"Squash and merge"** on a GitHub Pull Request, or locally with `git rebase -i HEAD~4`.

---
