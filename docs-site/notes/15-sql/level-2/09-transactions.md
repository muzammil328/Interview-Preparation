---
id: transactions
title: "Transactions"
sidebar_label: "Transactions"
sidebar_position: 9
description: "Transactions — SQL interview notes."
---
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

```text
BEGIN
  │
  ├── UPDATE id=1  balance -100
  ├── UPDATE id=2  balance +100
  │
  ├── both OK ──► COMMIT   ──► changes saved permanently
  └── error   ──► ROLLBACK ──► database back to the state before BEGIN
```

This is the classic money transfer example — either both updates happen or neither does. See the [ACID](../level-1/02-acid.md) and [Isolation Levels](./02-isolation-levels-and-anomalies.md) sections above.

---
