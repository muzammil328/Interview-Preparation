---
id: what-is-head
title: "What is HEAD?"
sidebar_label: "What is HEAD?"
sidebar_position: 1
description: "What is HEAD? — Git interview notes."
---
`HEAD` is a pointer to **where you are right now** — usually the latest commit of the current branch.

```text
A ── B ── C   ← main ← HEAD
```

- `HEAD~1` = one commit before HEAD, `HEAD~2` = two before.
- **Detached HEAD** = HEAD points directly to a commit, not a branch (for example after `git checkout <commit-id>`). New commits there can be lost unless you create a branch.

---
