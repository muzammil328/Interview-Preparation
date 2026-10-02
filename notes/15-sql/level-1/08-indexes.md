---
id: indexes
title: "Indexes"
sidebar_label: "Indexes"
sidebar_position: 8
description: "Indexes — SQL interview notes."
---
An index improves query performance by helping the database find records faster. The default index type is a **B-tree** — a sorted tree, so lookups are `O(log n)` instead of scanning every row.

```sql
CREATE INDEX idx_users_email
ON users(email);
```

```text
WITHOUT index: Seq Scan                    WITH B-tree index on email
row 1 ✘                                              [ m ]
row 2 ✘                                            /       \
row 3 ✘                                       [ d ]         [ s ]
 ...  check all 1,000,000 rows               /    \        /    \
row N ✔                                    a–c    e–l    n–r    t–z
                                                    │
                                                    ▼
                                         row pointer → read 1 row
```

| Index Type    | Simple Meaning                            |
| ------------- | ----------------------------------------- |
| Single-column | Index on one column                       |
| Composite     | Index on multiple columns                 |
| Unique        | Prevents duplicate values                 |
| Primary       | Automatically created for a primary key   |
| Partial       | Index only some rows (`WHERE status = 'active'`) |
| Expression    | Index on a computed value (`LOWER(email)`) |

### PostgreSQL Index Methods

| Method    | Use for                                                   |
| --------- | --------------------------------------------------------- |
| B-tree    | Default. `=`, `<`, `>`, `BETWEEN`, `ORDER BY`, `LIKE 'abc%'` |
| Hash      | Equality (`=`) only                                       |
| GIN       | Full-text search (`tsvector`), `JSONB`, arrays            |
| GiST      | Geometric / location data, ranges                         |
| BRIN      | Very large tables naturally ordered by time (logs)        |

**Trade-off:** indexes speed up reads but slow down writes, because every `INSERT`, `UPDATE`, and `DELETE` must also update the index.

### When Indexes Don't Help (or Hurt)

```text
Composite index on (last_name, first_name)

WHERE last_name = 'Khan'                        ✔ uses index
WHERE last_name = 'Khan' AND first_name = 'Ali' ✔ uses index
WHERE first_name = 'Ali'                        ✘ skips the left-most column
```

- **Function on the column:** `WHERE LOWER(email) = '...'` cannot use a plain index on `email` — create an expression index.
- **Leading wildcard:** `LIKE '%gmail.com'` cannot use a B-tree.
- **Low-cardinality column** (e.g. `is_active` boolean): the planner often prefers a full scan anyway.
- **Small tables:** a sequential scan is already fast.
- **Write-heavy tables:** every extra index slows every write and uses disk.
- **Type mismatch:** comparing a text column to a number forces a cast and skips the index.
