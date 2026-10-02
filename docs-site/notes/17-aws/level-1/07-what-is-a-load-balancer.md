---
id: what-is-a-load-balancer
title: "What is a Load Balancer?"
sidebar_label: "What is a Load Balancer?"
sidebar_position: 7
description: "What is a Load Balancer? — AWS interview notes."
---
A **Load Balancer** distributes incoming traffic across multiple servers. It improves application availability, performance, and fault tolerance. It also runs **health checks** and stops sending traffic to unhealthy instances.

AWS provides mainly these load balancers:

1. **Application Load Balancer** — used for HTTP and HTTPS traffic (Layer 7, can route by path or host).
2. **Network Load Balancer** — used for high-performance TCP/UDP traffic (Layer 4).
3. **Gateway Load Balancer** — used for security appliances like firewalls.

```mermaid
flowchart LR
    U["Users"] --> ALB["Application Load Balancer"]
    ALB -->|"/api/*"| G1["API target group"]
    ALB -->|"/*"| G2["Web target group"]
    G1 --> A1["EC2"]
    G1 --> A2["EC2"]
    G2 --> W1["EC2"]
```

---
