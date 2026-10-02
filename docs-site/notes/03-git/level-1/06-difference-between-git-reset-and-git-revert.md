---
id: difference-between-git-reset-and-git-revert
title: "Difference Between git reset and git revert"
sidebar_label: "Difference Between git reset and git revert"
sidebar_position: 6
description: "Difference Between git reset and git revert — Git interview notes."
---
| `git reset` | `git revert` |
|---|---|
| Moves the branch back, removing commits from history. | Creates a new commit that reverses changes. |
| Rewrites commit history. | Keeps existing history. |
| Usually used for local commits. | Safer for shared branches. |

```text
Start:        A ── B ── C   (main)

git reset HEAD~1:
              A ── B        (main)          C is gone from history

git revert C:
              A ── B ── C ── C'  (main)     C' undoes C, history kept
```

### The three reset modes

| Mode | Commit removed | Staged changes | Working files |
|---|---|---|---|
| `--soft` | yes | kept (staged) | kept |
| `--mixed` (default) | yes | unstaged | kept |
| `--hard` | yes | deleted | **deleted** |

Example:

### Reset

```bash
git reset HEAD~1          # default --mixed: undo commit, keep changes in files
git reset --hard HEAD~1   # undo commit AND throw away changes (dangerous)
```

### Revert

```bash
git revert commit_id
```

---
