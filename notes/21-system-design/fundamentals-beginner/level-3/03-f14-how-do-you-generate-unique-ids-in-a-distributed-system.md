---
id: f14-how-do-you-generate-unique-ids-in-a-distributed-system
title: "F14. How do you generate unique IDs in a distributed system?"
sidebar_label: "F14. How do you generate unique IDs in a distributed system?"
sidebar_position: 3
description: "F14. How do you generate unique IDs in a distributed system? — System Design interview notes."
---

| Approach | Example | Pros | Cons |
| -------- | ------- | ---- | ---- |
| DB auto-increment | `1, 2, 3` | Simple, small, sortable | One DB is the bottleneck; guessable |
| UUID v4 | `f47ac10b-58cc-...` | Generated anywhere, no coordination | 128-bit, random → poor index locality, not sortable |
| UUID v7 / ULID | time-prefixed | Sortable by time, generated anywhere | Still 128-bit |
| Snowflake (Twitter) | 64-bit number | Sortable, compact, no coordination | Needs unique machine IDs, clock care |

```text
Snowflake ID (64 bits)

┌─┬──────────────────────────────┬────────────┬──────────────┐
│0│ timestamp (41 bits, ms)      │ machine(10)│ sequence (12)│
└─┴──────────────────────────────┴────────────┴──────────────┘
     ~69 years of ms              1024 servers  4096 IDs per ms per server
```

Rule of thumb: auto-increment for a single DB, UUID v7 / Snowflake when many servers create IDs.

---
