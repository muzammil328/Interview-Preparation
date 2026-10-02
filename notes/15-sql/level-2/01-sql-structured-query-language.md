---
id: sql-structured-query-language
title: "SQL (Structured Query Language)"
sidebar_label: "SQL (Structured Query Language)"
sidebar_position: 1
description: "SQL (Structured Query Language) — SQL interview notes."
---
- **Relational database**: Data organized in tables with relationships
- Manage structured data
- Data stored in **Tables (Rows and Columns)**
- **Fixed schema** (predefined structure)
- Traditionally scaled **vertically** (bigger server). Horizontal scaling is possible with read replicas and sharding, but it is harder than in most NoSQL databases.
- Examples: MySQL, PostgreSQL

```text
Table: employees
                  columns
           ┌──────────┴──────────┐
┌─────────┬───────┬────────┬─────────┐
│ id (PK) │ name  │ salary │ dept_id │
├─────────┼───────┼────────┼─────────┤
│ 1       │ Ali   │ 9000   │ 10      │  ◄── row (record)
│ 2       │ Sara  │ 8000   │ 20      │
│ 3       │ Omar  │ 7000   │ NULL    │
└─────────┴───────┴────────┴─────────┘
```
