---
id: cluster-vs-worker-threads
title: "Cluster vs Worker Threads"
sidebar_label: "Cluster vs Worker Threads"
sidebar_position: 9
description: "Cluster vs Worker Threads — Node.js interview notes."
---
| Worker Threads                    | Cluster                              |
| --------------------------------- | ------------------------------------ |
| Threads inside one process        | Separate processes                   |
| Can share memory                  | No shared memory                     |
| For CPU-heavy computation         | For scaling an HTTP server across CPU cores |
| One crash can affect the process  | One worker crash doesn't kill others |

```mermaid
flowchart TB
    subgraph CL["Cluster: many processes"]
        PRI["Primary process"] --> W1["Worker process 1: app"]
        PRI --> W2["Worker process 2: app"]
        PRI --> W3["Worker process 3: app"]
    end
    subgraph WT["Worker threads: one process"]
        MAIN["Main thread: app"] --> T1["Worker thread: resize image"]
        MAIN --> T2["Worker thread: parse CSV"]
    end
```

In production, process managers (PM2) or containers (Kubernetes replicas) often replace hand-written cluster code.

### Scaling

- **Vertical**: increase the power of one server (more CPU/RAM)
- **Horizontal**: run multiple servers behind a load balancer

---
