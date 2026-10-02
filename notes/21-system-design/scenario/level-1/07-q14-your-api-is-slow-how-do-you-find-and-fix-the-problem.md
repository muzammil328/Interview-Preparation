---
id: q14-your-api-is-slow-how-do-you-find-and-fix-the-problem
title: "Q14. Your API is slow. How do you find and fix the problem?"
sidebar_label: "Q14. Your API is slow. How do you find and fix the problem?"
sidebar_position: 7
description: "Q14. Your API is slow. How do you find and fix the problem? — System Design interview notes."
---

Measure first, then fix the biggest cost.

```mermaid
flowchart TD
    A["Slow endpoint"] --> B["Measure: APM / logs<br/>where is the time spent?"]
    B --> C{"Where?"}
    C -->|DB| D["EXPLAIN query<br/>add index, fix N+1,<br/>select only needed columns"]
    C -->|External API| E["Cache response,<br/>timeout, run calls in parallel"]
    C -->|CPU| F["Move heavy work<br/>to a background worker"]
    C -->|Payload| G["Paginate, compress (gzip)"]
```

**N+1 problem** — the most common cause:

```text
✗ 1 query for 100 orders + 100 queries for each order's user = 101 queries
✓ 1 query for orders + 1 query: WHERE user_id IN (...)       =   2 queries
```

Also: `Promise.all` for independent calls, connection pooling, and caching repeated reads.

---
