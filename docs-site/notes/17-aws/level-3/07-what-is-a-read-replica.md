---
id: what-is-a-read-replica
title: "What is a Read Replica?"
sidebar_label: "What is a Read Replica?"
sidebar_position: 7
description: "What is a Read Replica? — AWS interview notes."
---
1. A **Read Replica** is a copy of a database used to handle read traffic.
2. It improves performance by reducing load on the primary database.
3. Replication is **asynchronous**, so replicas can be slightly behind the primary.

```mermaid
flowchart LR
    App["App"] -->|"writes + reads"| P[("Primary - AZ a")]
    P -->|"synchronous copy"| S[("Standby - AZ b<br/>Multi-AZ: failover only")]
    P -->|"asynchronous copy"| RR[("Read Replica")]
    App -->|"reads only"| RR
```

| Multi-AZ                      | Read Replica                     |
| ----------------------------- | -------------------------------- |
| For **availability**          | For **read performance**         |
| Synchronous replication       | Asynchronous replication         |
| Automatic failover            | Manual promotion if needed       |

---
