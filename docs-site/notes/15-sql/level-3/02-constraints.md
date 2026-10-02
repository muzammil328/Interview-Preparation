---
id: constraints
title: "Constraints"
sidebar_label: "Constraints"
sidebar_position: 2
description: "Constraints — SQL interview notes."
---
| Constraint    | Meaning                                                  |
| ------------- | -------------------------------------------------------- |
| `PRIMARY KEY` | Uniquely identifies each record, does not allow `NULL`   |
| `FOREIGN KEY` | Maintains relationships between tables                   |
| `UNIQUE`      | Ensures all values in a column are different             |
| `NOT NULL`    | Prevents `NULL` values                                   |
| `CHECK`       | Ensures values meet a specific condition                 |
| `DEFAULT`     | Sets a value when none is provided                       |

```sql
CREATE TABLE users (
   id         SERIAL PRIMARY KEY,                    -- unique + not null
   email      VARCHAR(255) UNIQUE NOT NULL,          -- no duplicates, required
   age        INT CHECK (age >= 18),                 -- must be adult
   status     VARCHAR(20) DEFAULT 'active',          -- default value
   company_id INT REFERENCES companies(id)           -- foreign key
);
```

```text
INSERT ... age = 15         ──► ✘ CHECK constraint violated
INSERT ... same email       ──► ✘ UNIQUE constraint violated
INSERT ... company_id = 999 ──► ✘ FOREIGN KEY: company 999 does not exist
```
