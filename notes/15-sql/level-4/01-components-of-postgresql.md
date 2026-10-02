---
id: components-of-postgresql
title: "Components of PostgreSQL"
sidebar_label: "Components of PostgreSQL"
sidebar_position: 1
description: "Components of PostgreSQL — SQL interview notes."
---
- **Database**: Stores related tables and other database objects
- **Schema**: Organizes database objects into namespaces (default is `public`)
- **Table**: Stores data in rows and columns
- **Index**: Improves query performance
- **View**: A virtual table based on the result of a query

```text
PostgreSQL server
 └── Database (mydatabase)
      └── Schema (public)
           ├── Tables
           ├── Indexes
           └── Views
```
