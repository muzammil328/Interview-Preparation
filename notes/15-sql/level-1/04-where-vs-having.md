---
id: where-vs-having
title: "WHERE vs HAVING"
sidebar_label: "WHERE vs HAVING"
sidebar_position: 4
description: "WHERE vs HAVING — SQL interview notes."
---
| WHERE                                  | HAVING                                   |
| -------------------------------------- | ---------------------------------------- |
| Filters **rows** before grouping       | Filters **groups** after `GROUP BY`      |
| Cannot use aggregate functions         | Can use aggregate functions              |
| Faster — fewer rows reach grouping     | Runs on the grouped result               |

```sql
-- Departments with more than 5 employees earning above 50,000
SELECT dept_id, COUNT(*) AS cnt
FROM employees
WHERE salary > 50000          -- row filter
GROUP BY dept_id
HAVING COUNT(*) > 5;          -- group filter
```

```text
all rows ──► WHERE salary > 50000 ──► GROUP BY dept_id ──► HAVING COUNT(*) > 5 ──► result
             (removes rows)                                 (removes groups)
```
