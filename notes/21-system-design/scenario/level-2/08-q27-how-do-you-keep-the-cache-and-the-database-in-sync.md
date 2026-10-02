---
id: q27-how-do-you-keep-the-cache-and-the-database-in-sync
title: "Q27. How do you keep the cache and the database in sync?"
sidebar_label: "Q27. How do you keep the cache and the database in sync?"
sidebar_position: 8
description: "Q27. How do you keep the cache and the database in sync? — System Design interview notes."
---

```text
Common bug: update DB, then update cache — two writers race

Writer A: DB = 1 ────────────────────────── cache = 1
Writer B:          DB = 2 ── cache = 2
Final:    DB = 2, cache = 1   ✗ stale forever (until TTL)
```

**Safer default: update the DB, then DELETE the cache key** (the next read refills it).

```mermaid
flowchart LR
    W["Write request"] --> DB[("1. UPDATE DB")]
    DB --> DEL["2. DEL cache key"]
    R["Next read"] --> M{"cache hit?"}
    M -->|miss| RD["read DB → SET cache"]
```

| Strategy | How | Good for |
| -------- | --- | -------- |
| Cache-aside + delete on write | App deletes the key after DB write | Most apps (default) |
| Write-through | Write cache and DB together | Data read right after writing |
| Write-behind | Write cache, flush to DB later | Counters; risk of data loss |
| CDC (change data capture) | DB change log → event → invalidate cache | Many services caching the same data |

- **Always set a TTL** as a safety net, so any stale value eventually expires.
- Accept that a cache gives **eventual** consistency; don't cache data that must be exact (balances).

---
