---
id: f7-database-replication-vs-sharding
title: "F7. Database Replication vs Sharding"
sidebar_label: "F7. Database Replication vs Sharding"
sidebar_position: 5
description: "F7. Database Replication vs Sharding — System Design interview notes."
---

**Replication** = copies of the same data. **Sharding** = splitting data across machines.

```text
Replication (read scaling)            Sharding (write + storage scaling)

     Writes                            user_id 1–1M    → Shard A
       │                               user_id 1M–2M   → Shard B
       ▼                               user_id 2M–3M   → Shard C
   ┌────────┐
   │Primary │──copy──┐                  Each shard holds DIFFERENT rows
   └────────┘        ▼
              ┌──────────┐ ┌──────────┐
              │ Replica 1│ │ Replica 2│ ◄── Reads
              └──────────┘ └──────────┘
```

| Replication | Sharding |
| ----------- | -------- |
| Scales **reads** | Scales **writes** and storage |
| Every node has all data | Each node has part of the data |
| Risk: **replication lag** (replica a bit behind) | Risk: picking a bad shard key, cross-shard queries |

Try indexes, caching, and read replicas first. Shard only when you must.

---
