---
id: what-does-git-stash-do
title: "What Does git stash Do?"
sidebar_label: "What Does git stash Do?"
sidebar_position: 5
description: "What Does git stash Do? — Git interview notes."
---
`git stash` temporarily saves uncommitted changes and gives you a clean working directory.

```text
Working dir (dirty) ──git stash──► Stash stack [stash@{0}]   Working dir: clean
                                                              ↓ switch branch, fix bug, come back
Working dir (dirty) ◄──git stash pop── Stash stack
```

## When to use:

- Switching branches without committing unfinished work.
- Temporarily saving changes.
- Working on another task.

Example:

```bash
git stash
git stash list        # see all stashes
```

Restore changes:

```bash
git stash pop         # apply and remove from stash
git stash apply       # apply but keep it in stash
```

**Note:** untracked (new) files are not stashed by default. Use `git stash -u`.

---
