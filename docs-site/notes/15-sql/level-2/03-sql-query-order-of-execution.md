---
id: sql-query-order-of-execution
title: "SQL Query Order of Execution"
sidebar_label: "SQL Query Order of Execution"
sidebar_position: 3
description: "SQL Query Order of Execution — SQL interview notes."
---
SQL is **written** in one order but **executed** in another. This explains many interview "why does this fail?" questions.

```text
Written order               Execution order
─────────────               ───────────────
SELECT                      1. FROM / JOIN      pick tables, combine rows
FROM                        2. WHERE            filter rows
JOIN                        3. GROUP BY         make groups
WHERE                       4. HAVING           filter groups
GROUP BY                    5. SELECT           pick columns, compute aliases
HAVING                      6. DISTINCT         remove duplicates
ORDER BY                    7. ORDER BY         sort
LIMIT                       8. LIMIT / OFFSET   cut rows
```

```sql
-- ✘ fails: WHERE runs before SELECT, so the alias does not exist yet
SELECT salary * 12 AS yearly FROM employees WHERE yearly > 100000;

-- ✔ works
SELECT salary * 12 AS yearly FROM employees WHERE salary * 12 > 100000;

-- ✔ works: ORDER BY runs after SELECT, so the alias is visible
SELECT salary * 12 AS yearly FROM employees ORDER BY yearly DESC;
```
