---
id: indexing
title: "Indexing"
sidebar_label: "Indexing"
sidebar_position: 3
description: "Indexing — MongoDB interview notes."
---
Store a small portion of data in a sorted structure (a **B-tree**) to make queries faster.

- **Without indexing**: Full collection scan (`COLLSCAN`)
- **With indexing**: Direct lookup (`IXSCAN`)

```text
WITHOUT index — COLLSCAN, O(n)              WITH index on email — IXSCAN, O(log n)

┌──────┬──────┬──────┬──────┬──────┐                    [ m ]
│ doc1 │ doc2 │ doc3 │ .... │ docN │                  /       \
└──────┴──────┴──────┴──────┴──────┘             [ d ]         [ s ]
   ▲      ▲      ▲             ▲                 /    \        /    \
   check every document one by one            a–c    e–l    n–r    t–z
                                                       │
                                                       ▼
                                             pointer to the matching doc
```

### Index Types

- **Single Index**: One field
- **Compound Index**: More than one field
- **Unique Index**: Unique values only, prevent duplicates
- **Multi Key Index**: For array fields (created automatically when you index an array field)
- **Text Index**: For text search
- **Geospatial Index**: For location based queries
- **Hashed Index**: Used for hashed sharding (spreads data evenly); supports equality matches only, not ranges
- **TTL Index**: Auto-delete documents after specific time (sessions, logs, temp data)

```js
db.users.createIndex({ email: 1 }, { unique: true });          // unique
db.orders.createIndex({ userId: 1, createdAt: -1 });           // compound
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 }); // TTL
```

### How Indexing Improves Performance

- Reduce search space
- Avoid full collection scan
- Speed up read operations and sorts
- Less CPU and disk I/O per query (but the index itself uses RAM and disk)

### Disadvantage of Indexing

- Slow down writes because indexes also need to be updated
- Take extra RAM and disk space — indexes should fit in memory to be fast

```text
insertOne(doc)
   │
   ├──► write document
   ├──► update index #1
   ├──► update index #2      ← every extra index = extra work on every write
   └──► update index #3
```
