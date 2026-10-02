---
id: f13-strong-vs-eventual-consistency
title: "F13. Strong vs Eventual Consistency"
sidebar_label: "F13. Strong vs Eventual Consistency"
sidebar_position: 5
description: "F13. Strong vs Eventual Consistency — System Design interview notes."
---

```text
Strong consistency                       Eventual consistency

Write x = 5 ──► all replicas updated     Write x = 5 ──► primary updated
                 before "OK"                              │ replicates in background
Read anywhere → 5 ✓ always               Read replica → 4 (old) for a moment
                                         ... a few ms later → 5 ✓
Slower, less available                   Faster, more available
```

| Use strong | Eventual is fine |
| ---------- | ---------------- |
| Bank balance, payments | Like / view counts |
| Inventory / seat booking | Social feed |
| Username uniqueness | Search index, analytics |

**Read-your-own-writes:** a user edits their profile and immediately sees the old one (read from a lagging replica). Fix: read that user's own data from the primary for a few seconds after they write.

---
