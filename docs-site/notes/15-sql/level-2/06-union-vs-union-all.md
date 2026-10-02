---
id: union-vs-union-all
title: "UNION vs UNION ALL"
sidebar_label: "UNION vs UNION ALL"
sidebar_position: 6
description: "UNION vs UNION ALL — SQL interview notes."
---
Both stack the results of two queries (same number and type of columns).

| UNION                       | UNION ALL                       |
| --------------------------- | ------------------------------- |
| Removes duplicate rows      | Keeps duplicates                |
| Slower (has to de-duplicate) | Faster                         |

```text
Query A: Ali, Sara        Query B: Sara, Omar

UNION      → Ali, Sara, Omar
UNION ALL  → Ali, Sara, Sara, Omar
```

```sql
SELECT email FROM customers
UNION
SELECT email FROM newsletter_subscribers;
```
