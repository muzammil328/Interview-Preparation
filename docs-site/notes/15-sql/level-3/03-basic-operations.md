---
id: basic-operations
title: "Basic Operations"
sidebar_label: "Basic Operations"
sidebar_position: 3
description: "Basic Operations — SQL interview notes."
---
```text
Create  ──► INSERT
Read    ──► SELECT
Update  ──► UPDATE
Delete  ──► DELETE
```

### Create a Database

```sql
CREATE DATABASE mydatabase;
```

### Create a Table

```sql
CREATE TABLE employees (
   employee_id SERIAL PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   position VARCHAR(100),
   salary NUMERIC(10, 2),
   hire_date DATE
);
```

### Insert Data

```sql
INSERT INTO employees (name, position, salary, hire_date)
VALUES ('John Doe', 'Software Engineer', 80000, '2021-01-15');
```

### Query Data

```sql
SELECT * FROM employees;

SELECT name, salary FROM employees
WHERE salary > 50000
ORDER BY salary DESC
LIMIT 10;
```

### Update Data

```sql
UPDATE employees
SET salary = 85000
WHERE name = 'John Doe';
```

### Delete Data

```sql
DELETE FROM employees
WHERE name = 'John Doe';
```

**Note:** always use a `WHERE` clause with `UPDATE` and `DELETE`, otherwise every row in the table is affected.
