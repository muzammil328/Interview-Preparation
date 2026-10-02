---
id: joins
title: "Joins"
sidebar_label: "Joins"
sidebar_position: 7
description: "Joins — SQL interview notes."
---
A `JOIN` combines data from multiple tables using a related column, such as a foreign key.

| Join         | Simple Meaning                                                  |
| ------------ | --------------------------------------------------------------- |
| `INNER JOIN` | Returns only matching records from both tables                  |
| `LEFT JOIN`  | All records from the left table + matching records from the right |
| `RIGHT JOIN` | All records from the right table + matching records from the left |
| `FULL JOIN`  | All records from both tables                                    |
| `CROSS JOIN` | Every row of the first table with every row of the second       |
| `SELF JOIN`  | A table joined with itself (e.g. employee → manager)            |

```sql
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d
  ON e.department_id = d.department_id;
```

### Visual Example

```text
employees (left)                    departments (right)
┌──────┬───────────────┐            ┌───────────────┬─────────────────┐
│ name │ department_id │            │ department_id │ department_name │
├──────┼───────────────┤            ├───────────────┼─────────────────┤
│ Ali  │ 10            │            │ 10            │ Engineering     │
│ Sara │ 20            │            │ 20            │ Sales           │
│ Omar │ NULL          │            │ 30            │ HR              │
└──────┴───────────────┘            └───────────────┴─────────────────┘
```

```text
    A = employees    B = departments

 INNER JOIN        LEFT JOIN         RIGHT JOIN        FULL JOIN
   ( A (█) B )      (█(█) B )         ( A (█)█)         (█(█)█)
   only overlap     all of A          all of B          everything

INNER JOIN               LEFT JOIN                RIGHT JOIN               FULL JOIN
Ali  │ Engineering       Ali  │ Engineering       Ali  │ Engineering       Ali  │ Engineering
Sara │ Sales             Sara │ Sales             Sara │ Sales             Sara │ Sales
                         Omar │ NULL              NULL │ HR                Omar │ NULL
                                                                           NULL │ HR

CROSS JOIN → 3 employees × 3 departments = 9 rows (every combination)
```

Non-matching sides are filled with `NULL` in `LEFT`, `RIGHT`, and `FULL` joins.

### Self Join

```sql
-- Each employee with their manager's name
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id;
```

```text
employees
id │ name │ manager_id              employee │ manager
───┼──────┼───────────              ─────────┼────────
1  │ Ali  │ NULL         ──────►    Ali      │ NULL
2  │ Sara │ 1                       Sara     │ Ali
3  │ Omar │ 1                       Omar     │ Ali
```

**Common trap:** a condition on the right table placed in `WHERE` turns a `LEFT JOIN` into an `INNER JOIN` (the `NULL` rows get filtered out). Put it in the `ON` clause instead.
