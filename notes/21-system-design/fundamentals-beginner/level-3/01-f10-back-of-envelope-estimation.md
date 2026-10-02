---
id: f10-back-of-envelope-estimation
title: "F10. Back-of-Envelope Estimation"
sidebar_label: "F10. Back-of-Envelope Estimation"
sidebar_position: 1
description: "F10. Back-of-Envelope Estimation — System Design interview notes."
---

Interviewers want rough numbers, not exact ones. Round aggressively.

```text
Handy numbers
  1 day          ≈ 86,400 sec  → round to 100,000 (10^5)
  1 million/day  ≈ 12 per second
  100M/day       ≈ 1,200 per second
  Peak traffic   ≈ 2–3× the average

Latency (roughly)
  Read from RAM / Redis      ~ 0.1 ms
  SSD read                   ~ 0.1–1 ms
  DB query with index        ~ 1–10 ms
  Same-region network call   ~ 1 ms
  Cross-continent call       ~ 100–150 ms
```

**Worked example — photo app, 10M daily users, each uploads 1 photo (500 KB):**

```text
Writes:   10M / 100K sec         = 100 uploads/sec   (peak ~300)
Storage:  10M × 500 KB           = 5 TB per day
          5 TB × 365             ≈ 1.8 PB per year   → object storage (S3), not a DB
Reads:    100 reads per upload   = 10,000 reads/sec  → needs CDN + cache
```

The numbers tell you **what the design needs**: here, S3 for files and a CDN for reads.

---
