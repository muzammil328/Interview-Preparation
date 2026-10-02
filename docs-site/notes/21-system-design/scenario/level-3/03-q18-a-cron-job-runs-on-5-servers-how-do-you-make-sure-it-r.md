---
id: q18-a-cron-job-runs-on-5-servers-how-do-you-make-sure-it-r
title: "Q18. A cron job runs on 5 servers. How do you make sure it runs only once?"
sidebar_label: "Q18. A cron job runs on 5 servers. How do you make sure it runs only once?"
sidebar_position: 3
description: "Q18. A cron job runs on 5 servers. How do you make sure it runs only once? — System Design interview notes."
---

Every server runs the same code, so a 9 AM job would run 5 times.

```text
9:00  Server 1 ─► SET lock:daily-report NX EX 300 → OK      ✓ runs job
9:00  Server 2 ─► SET lock:daily-report NX EX 300 → null    ✗ skips
9:00  Server 3 ─► SET lock:daily-report NX EX 300 → null    ✗ skips
```

- **Distributed lock** in Redis: `SET key value NX EX 300` succeeds for only one caller.
- The `EX` expiry releases the lock even if that server crashes.
- Or run scheduled jobs from **one** dedicated scheduler (e.g. a BullMQ repeatable job, AWS EventBridge) that pushes to a queue.
- Make the job itself **idempotent** in case it runs twice anyway.

---
