---
id: sql-query-example
title: "SQL Query Example"
sidebar_label: "SQL Query Example"
sidebar_position: 2
description: "SQL Query Example — SQL interview notes."
---
Get only even number IDs for documents and limit to 10:

```sql
SELECT * FROM documents WHERE id % 2 = 0 LIMIT 10;
```

Add `ORDER BY id` if you need a predictable set of 10 — without it, the database may return any 10 matching rows.
