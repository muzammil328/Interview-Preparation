---
id: f9-why-use-a-message-queue
title: "F9. Why use a Message Queue?"
sidebar_label: "F9. Why use a Message Queue?"
sidebar_position: 3
description: "F9. Why use a Message Queue? — System Design interview notes."
---

A queue lets one service hand work to another **without waiting** for it to finish.

```mermaid
flowchart LR
    API["API<br/>(producer)"] -->|"push job, return 202"| Q[(Queue)]
    Q --> W1["Worker 1<br/>(consumer)"]
    Q --> W2["Worker 2"]
    Q --> W3["Worker 3"]
```

- **Decoupling** — the API doesn't care how the email gets sent.
- **Buffering** — a spike of 10K jobs waits in the queue instead of crashing workers.
- **Retries** — a failed job goes back to the queue.

| Queue (point-to-point) | Pub/Sub |
| ---------------------- | ------- |
| Each message goes to **one** consumer | Each message goes to **all** subscribers |
| SQS, RabbitMQ, BullMQ | SNS, Kafka topics, Redis Pub/Sub |
| "Send this email" | "Order placed" → email, inventory, analytics all react |

---
