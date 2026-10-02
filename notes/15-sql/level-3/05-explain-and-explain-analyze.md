---
id: explain-and-explain-analyze
title: "EXPLAIN and EXPLAIN ANALYZE"
sidebar_label: "EXPLAIN and EXPLAIN ANALYZE"
sidebar_position: 5
description: "EXPLAIN and EXPLAIN ANALYZE — SQL interview notes."
---
- `EXPLAIN` shows the **plan** the database intends to use (estimates only, does not run the query).
- `EXPLAIN ANALYZE` **actually runs** the query and shows real time and row counts.

```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'a@b.com';
```

```text
BEFORE index
Seq Scan on users  (cost=0.00..18334.00 rows=1 width=72)
                   (actual time=0.020..95.112 rows=1 loops=1)
  Filter: (email = 'a@b.com'::text)
  Rows Removed by Filter: 999999            ← scanned everything
Execution Time: 95.140 ms

AFTER CREATE INDEX idx_users_email ON users(email)
Index Scan using idx_users_email on users  (cost=0.42..8.44 rows=1 width=72)
                   (actual time=0.031..0.032 rows=1 loops=1)
  Index Cond: (email = 'a@b.com'::text)
Execution Time: 0.050 ms
```

| Scan type          | Meaning                                               |
| ------------------ | ----------------------------------------------------- |
| Seq Scan           | Reads the whole table                                 |
| Index Scan         | Uses the index, then reads matching rows              |
| Index Only Scan    | Answers from the index alone (fastest)                |
| Bitmap Heap Scan   | Collects many matches from the index, then reads them in bulk |

**Warning:** `EXPLAIN ANALYZE` on `UPDATE` or `DELETE` really changes data — wrap it in `BEGIN; ... ROLLBACK;`.
