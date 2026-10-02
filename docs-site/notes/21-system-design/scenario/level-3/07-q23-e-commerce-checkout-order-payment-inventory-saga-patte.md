---
id: q23-e-commerce-checkout-order-payment-inventory-saga-patte
title: "Q23. E-commerce Checkout — Order, Payment, Inventory (Saga Pattern)"
sidebar_label: "Q23. E-commerce Checkout — Order, Payment, Inventory (Saga Pattern)"
sidebar_position: 7
description: "Q23. E-commerce Checkout — Order, Payment, Inventory (Saga Pattern) — System Design interview notes."
---

In microservices you can't wrap three services in one DB transaction. A **saga** runs a series of local steps, and if one fails, runs **compensating** steps to undo the earlier ones.

```text
Happy path
  1. Order Service      create order (PENDING)
  2. Inventory Service  reserve stock
  3. Payment Service    charge card
  4. Order Service      mark CONFIRMED

Payment fails at step 3 → compensate backwards
  3 ✗ charge failed
  2 ↩ release reserved stock
  1 ↩ mark order CANCELLED
```

```mermaid
flowchart LR
    O["Create order"] --> I["Reserve stock"]
    I --> P{"Charge card"}
    P -->|success| C["Order CONFIRMED"]
    P -->|fail| RI["Release stock"] --> X["Order CANCELLED"]
```

- **Orchestration:** one coordinator service tells each step what to do (easier to follow).
- **Choreography:** each service listens for events (`StockReserved`) and reacts (looser coupling, harder to trace).
- Every step must be **idempotent**, because messages can be delivered twice.

---
