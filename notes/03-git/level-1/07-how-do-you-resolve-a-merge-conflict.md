---
id: how-do-you-resolve-a-merge-conflict
title: "How Do You Resolve a Merge Conflict?"
sidebar_label: "How Do You Resolve a Merge Conflict?"
sidebar_position: 7
description: "How Do You Resolve a Merge Conflict? — Git interview notes."
---
A conflict happens when two branches change **the same lines** of the same file, and Git can't decide which to keep.

```mermaid
flowchart TD
    A["git merge feature"] --> B{"Same lines changed<br/>on both branches?"}
    B -- No --> C["Auto-merged"]
    B -- Yes --> D["CONFLICT"]
    D --> E["Open file, choose code,<br/>remove markers"]
    E --> F["git add file"]
    F --> G["git commit"]
```

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

To cancel the merge completely: `git merge --abort`.

---
