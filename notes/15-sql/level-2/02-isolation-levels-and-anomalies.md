---
id: isolation-levels-and-anomalies
title: "Isolation Levels and Anomalies"
sidebar_label: "Isolation Levels and Anomalies"
sidebar_position: 2
description: "Isolation Levels and Anomalies — SQL interview notes."
---
When transactions run at the same time, these problems (anomalies) can happen:

| Anomaly             | What happens                                                              |
| ------------------- | ------------------------------------------------------------------------- |
| Dirty read          | You read data another transaction has **not committed** yet               |
| Non-repeatable read | You read the same row twice and get **different values** (someone updated it) |
| Phantom read        | You run the same query twice and get **new/missing rows** (someone inserted) |

| Isolation Level    | Dirty Read | Non-repeatable Read | Phantom Read |
| ------------------ | ---------- | ------------------- | ------------ |
| Read Uncommitted   | possible   | possible            | possible     |
| Read Committed     | ✘          | possible            | possible     |
| Repeatable Read    | ✘          | ✘                   | possible (standard) — ✘ in PostgreSQL |
| Serializable       | ✘          | ✘                   | ✘            |

```text
Non-repeatable read (Read Committed)

Time   Transaction 1                         Transaction 2
────   ──────────────────────────────        ──────────────────────────────
t1     BEGIN
t2     SELECT balance FROM a WHERE id=1
       → 500
t3                                           BEGIN
t4                                           UPDATE a SET balance=300 WHERE id=1
t5                                           COMMIT
t6     SELECT balance FROM a WHERE id=1
       → 300   ← same query, different value
t7     COMMIT
```

- **PostgreSQL default:** `READ COMMITTED`. **MySQL (InnoDB) default:** `REPEATABLE READ`.
- PostgreSQL accepts `READ UNCOMMITTED` but treats it as `READ COMMITTED` — dirty reads never happen.
- Higher isolation = safer but slower (more locking, more serialization failures to retry).

```sql
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- ...
COMMIT;
```
