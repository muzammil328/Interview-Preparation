---
id: docker-layers-and-build-cache
title: "Docker Layers and Build Cache"
sidebar_label: "Docker Layers and Build Cache"
sidebar_position: 1
description: "Docker Layers and Build Cache — Docker interview notes."
---
Each instruction in a Dockerfile creates a **layer**. Docker caches layers. If a layer and everything before it did not change, Docker reuses the cache.

**Once one layer changes, every layer after it is rebuilt.** That is why you copy `package.json` and install dependencies **before** copying the source code.

```text
Good order                          Bad order
──────────                          ─────────
FROM node:20-alpine   (cached)      FROM node:20-alpine   (cached)
COPY package*.json    (cached)      COPY . .              (CHANGED - code edited)
RUN npm ci            (cached) ✅    RUN npm ci            (rebuilt) ❌ slow
COPY . .              (rebuilt)     CMD ...               (rebuilt)
CMD ...               (rebuilt)
```

Editing one source file with the bad order reinstalls every dependency.

---
