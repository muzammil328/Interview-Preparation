---
id: group-by
title: "GROUP BY"
sidebar_label: "GROUP BY"
sidebar_position: 4
description: "GROUP BY — SQL interview notes."
---
`GROUP BY` collapses rows with the same value into one row so you can use aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`).

```sql
SELECT dept_id, COUNT(*) AS employees, AVG(salary) AS avg_salary
FROM employees
GROUP BY dept_id;
```

```text
employees                         GROUP BY dept_id
┌──────┬────────┬─────────┐       ┌─────────┬───────────┬────────────┐
│ name │ salary │ dept_id │       │ dept_id │ employees │ avg_salary │
├──────┼────────┼─────────┤       ├─────────┼───────────┼────────────┤
│ Ali  │ 9000   │ 10      │ ─┐    │ 10      │ 2         │ 8500       │
│ Zara │ 8000   │ 10      │ ─┘──► │ 20      │ 1         │ 8000       │
│ Sara │ 8000   │ 20      │ ───►  └─────────┴───────────┴────────────┘
└──────┴────────┴─────────┘
```

**Rule:** every column in `SELECT` must either be in `GROUP BY` or be inside an aggregate function.
