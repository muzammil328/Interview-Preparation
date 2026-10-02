---
id: q28-a-third-party-api-you-depend-on-is-slow-or-down-what-d
title: "Q28. A third-party API you depend on is slow or down. What do you do?"
sidebar_label: "Q28. A third-party API you depend on is slow or down. What do you do?"
sidebar_position: 8
description: "Q28. A third-party API you depend on is slow or down. What do you do? — System Design interview notes."
---

```text
Without protection
  Your API ──► Slow provider (30s timeout)
  every request waits 30s → all threads/connections busy → YOUR app goes down too
```

**Layers of defence:**

```mermaid
flowchart LR
    A["Your service"] --> T["Timeout<br/>e.g. 2s"]
    T --> R["Retry<br/>backoff + jitter,<br/>max 2–3"]
    R --> CB{"Circuit breaker"}
    CB -->|closed| P["Provider"]
    CB -->|open| F["Fallback<br/>cached data / default /<br/>queue for later"]
```

**Circuit breaker states:**

```text
CLOSED ──(many failures)──► OPEN ──(after 30s)──► HALF-OPEN
  ▲   calls go through        fail instantly,        let 1 test call through
  │                           don't call provider        │
  └──────────── test succeeds ◄──────────────────────────┘
                test fails ──► back to OPEN
```

- **Timeouts** on every external call — the default is often "wait forever".
- **Fallbacks:** show cached prices, hide the "recommendations" widget, or queue the request and finish it later.
- **Bulkhead:** give each provider its own connection pool, so one slow provider can't use them all.

---
