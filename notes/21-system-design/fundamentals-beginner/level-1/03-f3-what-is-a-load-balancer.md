---
id: f3-what-is-a-load-balancer
title: "F3. What is a Load Balancer?"
sidebar_label: "F3. What is a Load Balancer?"
sidebar_position: 3
description: "F3. What is a Load Balancer? — System Design interview notes."
---

A load balancer sits in front of your servers and spreads incoming requests across them. It also runs **health checks** and stops sending traffic to a dead server.

```mermaid
flowchart LR
    U1[User] --> LB[Load Balancer]
    U2[User] --> LB
    U3[User] --> LB
    LB --> S1["API Server 1"]
    LB --> S2["API Server 2"]
    LB -.->|"health check failed"| S3["API Server 3 ✗"]
```

| Algorithm | How it picks a server |
| --------- | --------------------- |
| Round Robin | 1 → 2 → 3 → 1 → 2 ... |
| Least Connections | The server with the fewest active requests |
| IP Hash | Same client IP always goes to the same server |

Examples: Nginx, AWS ALB, HAProxy.

---
