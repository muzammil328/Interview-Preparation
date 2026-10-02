---
id: what-is-event-driven-architecture
title: "What is Event-Driven Architecture?"
sidebar_label: "What is Event-Driven Architecture?"
sidebar_position: 3
description: "What is Event-Driven Architecture? — Architecture interview notes."
---
Services communicate by **publishing events** ("something happened") instead of calling each other directly. Other services **subscribe** to the events they care about.

The publisher doesn't know who listens. Adding a new feature means adding a new subscriber — the publisher doesn't change.

```mermaid
flowchart LR
    O["Order Service"] -->|"OrderPlaced"| B["Event Broker<br/>Kafka / RabbitMQ / SNS"]
    B --> I["Inventory: reserve stock"]
    B --> E["Email: send confirmation"]
    B --> A["Analytics: record sale"]
    B --> L["Loyalty: add points<br/>(added later, no change to Order)"]
```

**Pros:** loose coupling, easy to extend, absorbs traffic spikes.
**Cons:** harder to debug and trace, **eventual consistency**, must handle duplicate events (make consumers **idempotent**).

---

# What is an API Gateway?

An **API Gateway** is a single entry point that acts as the **front door** for your entire backend system.

Instead of clients communicating directly with every individual microservice, they communicate with the **API Gateway**, which then routes requests to the appropriate service.

### Example

```text
                    ┌─────────────────┐
                    │     Client      │
                    │ Web / Mobile    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   API Gateway   │
                    └────────┬────────┘
                             │
             ┌───────────────┼───────────────┐
             │               │               │
             ▼               ▼               ▼
      ┌────────────┐  ┌────────────┐  ┌────────────┐
      │Auth Service│  │Payment     │  │Inventory   │
      │            │  │Service     │  │Service     │
      └────────────┘  └────────────┘  └────────────┘
```
