---
id: find-the-second-highest-salary
title: "Find the Second-Highest Salary"
sidebar_label: "Find the Second-Highest Salary"
sidebar_position: 5
description: "Find the Second-Highest Salary — SQL interview notes."
---
One of the most asked SQL questions.

```sql
-- 1. Subquery
SELECT MAX(salary) AS second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- 2. LIMIT / OFFSET (DISTINCT handles ties)
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

-- 3. DENSE_RANK — works for the Nth highest
SELECT name, salary
FROM (
  SELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM employees
) ranked
WHERE rnk = 2;
```

```text
salary sorted DESC     DENSE_RANK
9000                   1
8000   ◄── answer      2
8000   ◄── answer      2   (ties both returned)
7000                   3
```
