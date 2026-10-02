---
id: q12-how-do-you-paginate-millions-of-rows
title: "Q12. How do you paginate millions of rows?"
sidebar_label: "Q12. How do you paginate millions of rows?"
sidebar_position: 6
description: "Q12. How do you paginate millions of rows? — System Design interview notes."
---

`OFFSET` gets slower the deeper you go, because the DB still reads and throws away every skipped row.

```text
OFFSET pagination                        Cursor (keyset) pagination

LIMIT 20 OFFSET 1000000                  WHERE id > 1000020 ORDER BY id LIMIT 20
DB scans 1,000,020 rows,                 DB jumps straight to id 1000020
returns 20 ✗ slow                        via the index ✓ fast
```

```sql
-- Page 1
SELECT * FROM posts ORDER BY id LIMIT 20;
-- Next page: client sends the last id it saw
SELECT * FROM posts WHERE id > :lastId ORDER BY id LIMIT 20;
```

| Offset | Cursor |
| ------ | ------ |
| Can jump to page 50 | Only next / previous |
| Slow on deep pages | Same speed on every page |
| Rows shift if new data is inserted | Stable results |

Use cursors for infinite scroll and feeds; offset is fine for small admin tables.

---
