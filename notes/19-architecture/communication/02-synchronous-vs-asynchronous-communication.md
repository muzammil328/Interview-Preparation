---
id: synchronous-vs-asynchronous-communication
title: "Synchronous vs Asynchronous Communication"
sidebar_label: "Synchronous vs Asynchronous Communication"
sidebar_position: 2
description: "Synchronous vs Asynchronous Communication — Architecture interview notes."
---
- **Synchronous**: the caller sends a request and **waits** for the response (HTTP/REST, gRPC).
- **Asynchronous**: the caller sends a message to a **queue/broker** and continues; another service processes it later (RabbitMQ, Kafka, SQS).

```mermaid
sequenceDiagram
    participant O as Order Service
    participant P as Payment Service
    participant Q as Queue
    participant E as Email Service
    Note over O,P: Synchronous - waits for the answer
    O->>P: POST /charge
    P-->>O: 200 OK (charged)
    Note over O,E: Asynchronous - fire and continue
    O->>Q: publish OrderPlaced
    O-->>O: respond to user immediately
    Q->>E: deliver OrderPlaced (later)
    E->>E: send confirmation email
```

| Synchronous                                  | Asynchronous                                      |
| -------------------------------------------- | ------------------------------------------------- |
| Simple, immediate result                     | Caller doesn't wait — faster response             |
| If the other service is down, the call fails | Messages wait in the queue until the service is back |
| Services are tightly coupled                 | Services are loosely coupled                      |
| Use when you **need the answer now** (payment check) | Use for work that can happen later (emails, reports) |

---
