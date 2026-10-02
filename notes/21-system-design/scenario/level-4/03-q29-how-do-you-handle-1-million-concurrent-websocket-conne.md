---
id: q29-how-do-you-handle-1-million-concurrent-websocket-conne
title: "Q29. How do you handle 1 million concurrent WebSocket connections?"
sidebar_label: "Q29. How do you handle 1 million concurrent WebSocket connections?"
sidebar_position: 3
description: "Q29. How do you handle 1 million concurrent WebSocket connections? — System Design interview notes."
---

```mermaid
flowchart LR
    U["1M clients"] --> LB["Load Balancer<br/>(supports WebSocket upgrade)"]
    LB --> G1["Gateway 1<br/>~50K connections"]
    LB --> G2["Gateway 2"]
    LB --> GN["Gateway N"]
    G1 <--> PS[("Redis Pub/Sub / Kafka")]
    G2 <--> PS
    GN <--> PS
    PS <--> APP["Business services"]
    G1 --> REG[("Redis: userId → gateway")]
```

- Each connection is long-lived, so the limit is **memory and file descriptors**, not CPU. Node can hold tens of thousands per instance; plan ~20 gateway servers for 1M.
- Gateways only hold connections; business logic lives in other services.
- To message user X: look up which gateway holds X, publish to that gateway.
- **Reconnect storms:** if a gateway restarts, 50K clients reconnect at once → clients reconnect with random **jitter** and backoff.
- Send heartbeats (ping/pong) to detect dead connections and free resources.

---
