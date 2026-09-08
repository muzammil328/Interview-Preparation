# Git Interview Preparation

---

# Difference Between Git and GitHub

| Git | GitHub |
|---|---|
| Git is a distributed version control system. | GitHub is a platform that hosts Git repositories. |
| Used to track code changes locally. | Used for collaboration and sharing code online. |
| Works on your local machine. | Works as a remote repository hosting service. |
| Example: `git commit`, `git branch` | Example: Pull requests, Issues, Code reviews |

---

# What are the Three Main Areas/States of Git?

Git has three main areas:

## 1. Working Directory

- Where you create and modify files.
- Changes are not tracked until added.

Example:

```bash
git status
```

---

## 2. Staging Area

- Where you prepare changes before committing.
- Files are added using `git add`.

Example:

```bash
git add file.js
```

---

## 3. Repository

- Where Git permanently stores committed changes.

Example:

```bash
git commit -m "Add new feature"
```

---

# Difference Between `git merge` and `git rebase`

| `git merge` | `git rebase` |
|---|---|
| Combines two branches together. | Moves commits to the latest branch position. |
| Keeps the original commit history. | Creates a cleaner linear history. |
| Creates a merge commit. | Rewrites commit history. |
| Safer for shared branches. | Better for cleaning local branches. |

Example:

### Merge

```bash
git checkout main
git merge feature
```

### Rebase

```bash
git checkout feature
git rebase main
```

---

# Difference Between `git fetch` and `git pull`

| `git fetch` | `git pull` |
|---|---|
| Downloads latest changes from remote repository. | Downloads and applies changes to current branch. |
| Does not modify your working code. | Updates your current working branch. |
| Safer for reviewing changes first. | Faster way to update your branch. |

Example:

```bash
git fetch origin
```

```bash
git pull origin main
```

---

# What Does `git stash` Do?

`git stash` temporarily saves uncommitted changes and gives you a clean working directory.

## When to use:

- Switching branches without committing unfinished work.
- Temporarily saving changes.
- Working on another task.

Example:

```bash
git stash
```

Restore changes:

```bash
git stash pop
```

---

# Difference Between `git reset` and `git revert`

| `git reset` | `git revert` |
|---|---|
| Removes commits from history. | Creates a new commit that reverses changes. |
| Rewrites commit history. | Keeps existing history. |
| Usually used for local commits. | Safer for shared branches. |

Example:

### Reset

```bash
git reset HEAD~1
```

### Revert

```bash
git revert commit_id
```

---

# How Do You Resolve a Merge Conflict?

Steps:

1. Check conflicted files.

```bash
git status
```

2. Open the conflicted file.

3. Decide which code to keep.

Conflict example:

```text
<<<<<<< HEAD
Your code
=======
Incoming code
>>>>>>> branch-name
```

4. Remove conflict markers:

```text
<<<<<<<
=======
>>>>>>>
```

5. Add the resolved file.

```bash
git add file.js
```

6. Commit changes.

```bash
git commit -m "Resolve merge conflict"
```

---

# Essential First-Time Git Setup

## Set Your Name

```bash
git config user.name "Your Name"
```

Set globally:

```bash
git config --global user.name "Your Name"
```

---

## Set Your Email

```bash
git config user.email "your.email@example.com"
```

Set globally:

```bash
git config --global user.email "your.email@example.com"
```

---

# Remove Old GitHub Saved Login (Windows)

Run this command in terminal:

```bash
cmdkey /delete:LegacyGeneric:target=git:https://github.com
```

---

# Common Git Commands

## Check Git Status

```bash
git status
```

---

## Initialize Repository

```bash
git init
```

---

## Clone Repository

```bash
git clone repository-url
```

---

## Add Files

```bash
git add .
```

---

## Commit Changes

```bash
git commit -m "commit message"
```

---

## Push Changes

```bash
git push origin main
```

---

## Pull Latest Changes

```bash
git pull origin main
```

---

## Create Branch

```bash
git branch feature-name
```

---

## Switch Branch

```bash
git checkout branch-name
```

---

## View Commit History

```bash
git log
```

---

# Git Interview Topics Checklist

- Git vs GitHub
- Git states (Working Directory, Staging Area, Repository)
- git merge vs git rebase
- git fetch vs git pull
- git stash
- git reset vs git revert
- Merge conflict resolution
- Git configuration
- Common Git commands
