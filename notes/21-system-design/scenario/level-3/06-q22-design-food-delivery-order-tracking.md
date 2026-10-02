---
id: q22-design-food-delivery-order-tracking
title: "Q22. Design Food Delivery Order Tracking"
sidebar_label: "Q22. Design Food Delivery Order Tracking"
sidebar_position: 6
description: "Q22. Design Food Delivery Order Tracking — System Design interview notes."
---

The order is a **state machine** — every change is an event the customer can see.

```text
PLACED ─► ACCEPTED ─► PREPARING ─► PICKED_UP ─► DELIVERED
   │          │
   └──────────┴──► CANCELLED (only allowed before PICKED_UP)
```

```mermaid
flowchart LR
    R["Restaurant app"] -->|"status update"| OS["Order Service"]
    D["Rider app GPS"] --> LS["Location Service"]
    OS --> E[("Event bus")]
    LS --> E
    E --> N["Notification Service<br/>push / SMS"]
    E --> WS["WebSocket Gateway"]
    WS --> C["Customer's live map"]
```

- Validate transitions on the server: `DELIVERED → PREPARING` must be rejected.
- Store every status change with a timestamp (an **order history** table) — useful for support and ETAs.
- Live location: push over WebSocket/SSE every few seconds; don't make the client poll.

---
