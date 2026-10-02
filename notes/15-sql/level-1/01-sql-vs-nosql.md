---
id: sql-vs-nosql
title: "SQL vs NoSQL"
sidebar_label: "SQL vs NoSQL"
sidebar_position: 1
description: "SQL vs NoSQL — SQL interview notes."
---
| Feature        | SQL (PostgreSQL, MySQL)                   | NoSQL (MongoDB, Redis, Cassandra)            |
| -------------- | ----------------------------------------- | -------------------------------------------- |
| Data model     | Tables with rows and columns              | Documents, key-value, wide-column, graph     |
| Schema         | Fixed, defined up front                   | Flexible, can change per record              |
| Relationships  | Foreign keys and JOINs                    | Embedding or references                      |
| Scaling        | Mostly vertical (+ replicas)              | Built for horizontal (sharding)              |
| Transactions   | Strong ACID, multi-table                  | Varies (MongoDB supports multi-document ACID) |
| Best for       | Payments, orders, complex queries/reports | Fast-changing schema, huge scale, caching    |

```text
Which one?

Data highly related + need JOINs + money/consistency?  ──►  SQL
Schema changes often + nested data + huge scale?         ──►  NoSQL (document)
Just need fast key lookups / cache / sessions?           ──►  Redis (key-value)
```

**Interview answer:** it is not "which is better" — pick based on data shape, consistency needs, and query patterns. Many systems use both.
