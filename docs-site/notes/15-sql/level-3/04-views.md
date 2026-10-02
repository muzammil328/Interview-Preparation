---
id: views
title: "Views"
sidebar_label: "Views"
sidebar_position: 4
description: "Views — SQL interview notes."
---
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

```text
SELECT * FROM active_users
        │
        ▼  (Postgres replaces the view with its saved query)
SELECT id, name, email FROM users WHERE status = 'active'
        │
        ▼
users table (real data)

VIEW              → stores the query, always fresh, runs every time
MATERIALIZED VIEW → stores the result, fast to read, stale until REFRESH
```

A view stores the **query**, not the data, so it always shows current results. For cached results, use a `MATERIALIZED VIEW` and refresh it manually with `REFRESH MATERIALIZED VIEW`.
