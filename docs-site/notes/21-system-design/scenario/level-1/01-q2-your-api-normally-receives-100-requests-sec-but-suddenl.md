---
id: q2-your-api-normally-receives-100-requests-sec-but-suddenl
title: "Q2. Your API normally receives 100 requests/sec, but suddenly receives 10,000 requests/sec. How would you handle it?"
sidebar_label: "Q2. Your API normally receives 100 requests/sec, but suddenly receives 10,000 requests/sec. How would you handle it?"
sidebar_position: 1
description: "Q2. Your API normally receives 100 requests/sec, but suddenly receives 10,000 requests/sec. How would you handle it? — System Design interview notes."
---

```text
Load Balancer
      │
      ▼
Multiple API Servers  (auto-scaling)
      │
      ▼
Queue
      │
      ▼
Workers
      │
      ▼
Database
```

- **Load balancer** spreads traffic across servers.
- **Horizontal auto-scaling** adds more API servers when traffic rises.
- **Queue** absorbs the spike — the API accepts fast and workers process at a steady pace, so the database is never flooded.
- **Caching** (Redis / CDN) serves repeated reads without touching the DB.
- **Rate limiting** blocks abusive clients at the edge.
- **Database**: connection pooling, read replicas, and indexes.

The key idea is **buffering**: never let a traffic spike hit the database directly.

---
