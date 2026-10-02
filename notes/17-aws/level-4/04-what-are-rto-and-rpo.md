---
id: what-are-rto-and-rpo
title: "What are RTO and RPO?"
sidebar_label: "What are RTO and RPO?"
sidebar_position: 4
description: "What are RTO and RPO? — AWS interview notes."
---
**RTO**, or Recovery Time Objective, is the maximum acceptable downtime after a failure.
**RPO**, or Recovery Point Objective, is the maximum acceptable data loss measured in time.
Example: If RPO is 15 minutes, the business can tolerate losing up to 15 minutes of data.

```text
 last backup        failure            back online
      │◄──── RPO ────►│◄──── RTO ────►│
      │  (data lost)  │  (downtime)   │
```
