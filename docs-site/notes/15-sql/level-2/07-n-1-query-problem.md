---
id: n-1-query-problem
title: "N+1 Query Problem"
sidebar_label: "N+1 Query Problem"
sidebar_position: 7
description: "N+1 Query Problem — SQL interview notes."
---
You run **1 query** to get a list, then **N more queries** — one per item — to get related data. With 1,000 users that is 1,001 round trips.

```text
N+1 (bad)                                  JOIN / IN (good)

SELECT * FROM users;          ← 1          SELECT u.*, o.*
SELECT * FROM orders WHERE user_id=1; ←┐   FROM users u
SELECT * FROM orders WHERE user_id=2;  │   LEFT JOIN orders o ON o.user_id = u.id;   ← 1 query
SELECT * FROM orders WHERE user_id=3;  │N
...                                    ┘   -- or 2 queries:
                                           SELECT * FROM orders WHERE user_id IN (1,2,3,...);
```

Common in ORMs that lazy-load relations inside a loop. Fix with a `JOIN`, an `IN (...)` query, or the ORM's eager loading (`include` in Prisma/Sequelize, `relations` in TypeORM).

---
