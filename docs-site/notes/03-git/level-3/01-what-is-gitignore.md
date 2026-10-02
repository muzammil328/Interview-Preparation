---
id: what-is-gitignore
title: "What is .gitignore?"
sidebar_label: "What is .gitignore?"
sidebar_position: 1
description: "What is .gitignore? — Git interview notes."
---
A file that tells Git which files and folders **not to track**.

```gitignore
node_modules/
.env
dist/
*.log
.DS_Store
```

```text
project/
├── src/           ✓ tracked
├── node_modules/  ✗ ignored (can be reinstalled)
├── .env           ✗ ignored (secrets!)
└── .gitignore
```

**Note:** `.gitignore` does not affect files that are already tracked. To stop tracking one: `git rm --cached .env`.

---
