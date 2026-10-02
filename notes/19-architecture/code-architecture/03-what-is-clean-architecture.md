---
id: what-is-clean-architecture
title: "What is Clean Architecture?"
sidebar_label: "What is Clean Architecture?"
sidebar_position: 3
description: "What is Clean Architecture? — Architecture interview notes."
---
The core idea: **dependencies point inward**. Business rules (entities, use cases) are in the center and know nothing about frameworks, databases, or HTTP. Outer layers depend on inner layers — never the opposite.

```mermaid
flowchart LR
    F["Frameworks & drivers<br/>Express, DB, external APIs"] --> I["Interface adapters<br/>controllers, repositories"]
    I --> U["Use cases<br/>CreateOrder, SendInvoice"]
    U --> E["Entities<br/>Order, User - core rules"]
```

The use case defines an **interface** (e.g. `OrderRepository`), and the outer layer provides the implementation (e.g. `PostgresOrderRepository`). This is **dependency inversion**. You could swap Postgres for MongoDB without touching business logic.

---
