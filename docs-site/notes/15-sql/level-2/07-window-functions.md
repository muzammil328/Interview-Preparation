---
id: window-functions
title: "Window Functions"
sidebar_label: "Window Functions"
sidebar_position: 7
description: "Window Functions — SQL interview notes."
---
A window function calculates across a set of related rows **without collapsing them** (unlike `GROUP BY`, every row stays).

```sql
SELECT name, dept_id, salary,
       ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,
       RANK()       OVER (ORDER BY salary DESC) AS rnk,
       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk,
       SUM(salary)  OVER (PARTITION BY dept_id) AS dept_total
FROM employees;
```

```text
salary │ ROW_NUMBER │ RANK │ DENSE_RANK
───────┼────────────┼──────┼───────────
9000   │ 1          │ 1    │ 1
8000   │ 2          │ 2    │ 2
8000   │ 3          │ 2    │ 2          ← tie
7000   │ 4          │ 4    │ 3          ← RANK skips 3, DENSE_RANK does not
```

```text
GROUP BY dept_id                        SUM(salary) OVER (PARTITION BY dept_id)

dept │ total                            name │ dept │ salary │ dept_total
─────┼──────                            ─────┼──────┼────────┼───────────
10   │ 17000   (rows collapsed)         Ali  │ 10   │ 9000   │ 17000
20   │ 8000                             Zara │ 10   │ 8000   │ 17000   (rows kept)
                                        Sara │ 20   │ 8000   │ 8000
```

Common uses: top-N per group, running totals, ranking, comparing a row with the previous one (`LAG()` / `LEAD()`).
