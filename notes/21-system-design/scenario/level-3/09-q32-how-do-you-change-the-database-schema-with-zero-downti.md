---
id: q32-how-do-you-change-the-database-schema-with-zero-downti
title: "Q32. How do you change the database schema with zero downtime?"
sidebar_label: "Q32. How do you change the database schema with zero downtime?"
sidebar_position: 9
description: "Q32. How do you change the database schema with zero downtime? — System Design interview notes."
---

Example: rename column `name` → `full_name` while the app is live. Renaming directly breaks the old code that is still running.

**Expand → Migrate → Contract:**

```text
Step 1 EXPAND     add column full_name (nullable)         old code still works
Step 2 DEPLOY     app writes BOTH name and full_name,
                  reads full_name if present else name
Step 3 BACKFILL   copy name → full_name in small batches  (not one huge UPDATE)
Step 4 DEPLOY     app reads/writes only full_name
Step 5 CONTRACT   drop column name                        after you're sure
```

- Each step is safe to deploy and to **roll back** on its own.
- Backfill in batches (`WHERE id BETWEEN ...`) so you don't lock the table.
- Adding an index on a big Postgres table: use `CREATE INDEX CONCURRENTLY` so writes aren't blocked.

---
