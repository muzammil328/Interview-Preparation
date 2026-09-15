# SQL Interview

## SQL (Structured Query Language)

- **Relational database**: Data organized in tables with relationships
- Manage structured data
- Data stored in **Tables (Rows and Columns)**
- **Fixed schema** (predefined structure)
- **Vertical Scaling** (scale by adding more hardware resources)
- Examples: MySQL, PostgreSQL

## Composite Key

Multiple columns together as a unique identifier.

Example:

- Col 1: First Name
- Col 2: Last Name
- Composite Key: First Name + Last Name

## ACID

Properties ensuring reliable database transactions:

- **Atomicity**: All operations succeed or all fail (no partial updates)
- **Consistency**: Data remains valid after transactions
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed data is permanently saved

## SQL Query Example

Get only even number IDs for documents and limit to 10:

```sql
SELECT * FROM documents WHERE id % 2 = 0 LIMIT 10;
```

---

# PostgreSQL Interview

## Components of PostgreSQL

- **Database**: Stores related tables and other database objects
- **Schema**: Organizes database objects into namespaces (default is `public`)
- **Table**: Stores data in rows and columns
- **Index**: Improves query performance
- **View**: A virtual table based on the result of a query

## Constraints

| Constraint    | Meaning                                                  |
| ------------- | -------------------------------------------------------- |
| `PRIMARY KEY` | Uniquely identifies each record, does not allow `NULL`   |
| `FOREIGN KEY` | Maintains relationships between tables                   |
| `UNIQUE`      | Ensures all values in a column are different             |
| `NOT NULL`    | Prevents `NULL` values                                   |
| `CHECK`       | Ensures values meet a specific condition                 |
| `DEFAULT`     | Sets a value when none is provided                       |

## Primary Key vs Foreign Key

A **primary key** uniquely identifies a row in a table.

```sql
CREATE TABLE employees (
   employee_id SERIAL PRIMARY KEY,
   name VARCHAR(100)
);
```

A **foreign key** creates a relationship between two tables by referring to the primary key of another table.

```sql
CREATE TABLE departments (
   department_id SERIAL PRIMARY KEY,
   department_name VARCHAR(100)
);

CREATE TABLE employees (
   employee_id SERIAL PRIMARY KEY,
   name VARCHAR(100),
   department_id INT,
   FOREIGN KEY (department_id) REFERENCES departments(department_id)
);
```

| Primary Key                              | Foreign Key                              |
| ---------------------------------------- | ---------------------------------------- |
| Uniquely identifies a row                | Connects one table to another            |
| Must be unique                           | Can have duplicate values                |
| Cannot be `NULL`                         | Can be `NULL` depending on the relationship |
| One per table (can be composite)         | A table can have multiple foreign keys   |
| Example: `users.id`                      | Example: `orders.user_id`                |

## Basic Operations

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

## Joins

A `JOIN` combines data from multiple tables using a related column, such as a foreign key.

| Join         | Simple Meaning                                                  |
| ------------ | --------------------------------------------------------------- |
| `INNER JOIN` | Returns only matching records from both tables                  |
| `LEFT JOIN`  | All records from the left table + matching records from the right |
| `RIGHT JOIN` | All records from the right table + matching records from the left |
| `FULL JOIN`  | All records from both tables                                    |
| `CROSS JOIN` | Every row of the first table with every row of the second       |

```sql
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d
  ON e.department_id = d.department_id;
```

Non-matching sides are filled with `NULL` in `LEFT`, `RIGHT`, and `FULL` joins.

## Views

A view is a **virtual table** based on a SQL query. Use it to simplify frequently used queries or hide unnecessary columns.

```sql
CREATE VIEW active_users AS
SELECT id, name, email
FROM users
WHERE status = 'active';
```

Then query it like a normal table:

```sql
SELECT * FROM active_users;
```

A view stores the **query**, not the data, so it always shows current results. For cached results, use a `MATERIALIZED VIEW` and refresh it manually.

## Indexes

An index improves query performance by helping the database find records faster.

```sql
CREATE INDEX idx_users_email
ON users(email);
```

| Index Type    | Simple Meaning                            |
| ------------- | ----------------------------------------- |
| Single-column | Index on one column                       |
| Composite     | Index on multiple columns                 |
| Unique        | Prevents duplicate values                 |
| Primary       | Automatically created for a primary key   |
| Full-text     | Used for text searching                   |

**Trade-off:** indexes speed up reads but slow down writes, because every `INSERT`, `UPDATE`, and `DELETE` must also update the index.

Use `EXPLAIN ANALYZE` to check whether a query actually uses an index:

```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'a@b.com';
```

## Transactions

A transaction groups multiple operations into one unit. If everything succeeds we `COMMIT`; if something fails we `ROLLBACK`, so the database stays consistent.

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 100
WHERE id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE id = 2;

COMMIT;
```

If something fails:

```sql
ROLLBACK;
```

This is the classic money transfer example — either both updates happen or neither does. See the [ACID](#acid) section above.
