---
id: what-is-the-difference-between-origin-and-upstream
title: "What is the Difference Between origin and upstream?"
sidebar_label: "What is the Difference Between origin and upstream?"
sidebar_position: 2
description: "What is the Difference Between origin and upstream? — Git interview notes."
---
```text
Original repo (upstream)  ──fork──►  Your GitHub copy (origin)  ──clone──►  Your laptop
          ▲                                                                     │
          └──────────────────── Pull Request ◄──── git push origin ─────────────┘
```

- **origin** — the remote you cloned from (usually your copy).
- **upstream** — the original repo you forked from. Use `git fetch upstream` to stay updated.

---
