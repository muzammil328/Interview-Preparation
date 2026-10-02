---
id: microservices
title: "Microservices"
sidebar_label: "Microservices"
sidebar_position: 2
description: "Microservices — Architecture interview notes."
---
**Microservices** break a monolith down into a collection of **small, independent applications** that communicate with each other over the network using **HTTP, REST, or message queues**.

Each service typically handles a specific business feature, for example:

* **Auth Service**
* **Payment Service**
* **Inventory Service**
* **Notification Service**

Each service is deployed on its own and usually **owns its own database**.

```mermaid
flowchart LR
    U["Client"] --> GW["API Gateway"]
    GW --> A["Auth Service"] --> DA[("Auth DB")]
    GW --> P["Payment Service"] --> DP[("Payment DB")]
    GW --> I["Inventory Service"] --> DI[("Inventory DB")]
    P -->|"event: PaymentDone"| Q["Message Queue"]
    Q --> N["Notification Service"]
```
