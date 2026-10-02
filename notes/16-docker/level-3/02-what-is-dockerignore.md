---
id: what-is-dockerignore
title: "What is .dockerignore?"
sidebar_label: "What is .dockerignore?"
sidebar_position: 2
description: "What is .dockerignore? — Docker interview notes."
---
Like `.gitignore`, but for the build context. Files listed here are **not sent** to Docker during `docker build`.

```text
node_modules
.git
.env
dist
*.log
```

Why it matters:

- **Faster builds** — smaller build context.
- **Smaller images** — no `node_modules` from your machine.
- **Security** — `.env` and secrets never end up in the image.

---
