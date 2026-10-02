---
id: f5-caching-cache-aside-pattern
title: "F5. Caching (Cache-Aside Pattern)"
sidebar_label: "F5. Caching (Cache-Aside Pattern)"
sidebar_position: 4
description: "F5. Caching (Cache-Aside Pattern) — System Design interview notes."
---

A cache keeps frequently read data in fast memory (Redis) so the database is not hit every time.

```mermaid
sequenceDiagram
    participant API
    participant Cache as Redis
    participant DB
    API->>Cache: GET user:42
    alt Cache hit
        Cache-->>API: data ⚡ fast
    else Cache miss
        Cache-->>API: null
        API->>DB: SELECT * FROM users WHERE id = 42
        DB-->>API: data
        API->>Cache: SET user:42 (TTL 10 min)
    end
```

**Where caches live:** Browser → CDN → API memory → Redis → DB buffer.

**Invalidation** (the hard part):

- **TTL** — the entry expires after N seconds.
- **Delete on write** — when the user updates, delete `user:42` so the next read refills it.
- **Write-through** — write to cache and DB together.

**Cache stampede:** a hot key expires and 1,000 requests hit the DB at once. Fix it with a lock so only one request refills the cache, or add random jitter to TTLs.

---
