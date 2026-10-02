---
id: replication-replica-set
title: "Replication (Replica Set)"
sidebar_label: "Replication (Replica Set)"
sidebar_position: 5
description: "Replication (Replica Set) — MongoDB interview notes."
---
Duplicate data across multiple servers for **high availability**.

```mermaid
flowchart LR
  App["App"] -->|"all writes"| P["Primary"]
  P -->|"replicates via oplog"| S1["Secondary 1"]
  P -->|"replicates via oplog"| S2["Secondary 2"]
  App -.->|"reads (optional, readPreference)"| S1
```

```text
Failover (automatic election)

 Primary ✖ crashes
     │
     ▼
 Secondaries notice missing heartbeats (~10s)
     │
     ▼
 Election → majority votes → Secondary 1 becomes NEW Primary
     │
     ▼
 Driver reconnects automatically, writes continue
```

- Use an **odd number** of voting members (usually 3) so a majority can always be formed.
- Reads from secondaries can be slightly **stale** (replication lag).
