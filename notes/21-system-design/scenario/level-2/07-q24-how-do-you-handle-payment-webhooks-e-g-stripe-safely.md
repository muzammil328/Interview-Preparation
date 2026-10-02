---
id: q24-how-do-you-handle-payment-webhooks-e-g-stripe-safely
title: "Q24. How do you handle payment webhooks (e.g. Stripe) safely?"
sidebar_label: "Q24. How do you handle payment webhooks (e.g. Stripe) safely?"
sidebar_position: 7
description: "Q24. How do you handle payment webhooks (e.g. Stripe) safely? — System Design interview notes."
---

The payment provider calls **your** endpoint when something happens (`payment_intent.succeeded`).

```mermaid
sequenceDiagram
    participant S as Stripe
    participant API as Webhook endpoint
    participant DB
    participant Q as Queue
    S->>API: POST /webhooks/stripe (event evt_123)
    API->>API: verify signature header
    API->>DB: INSERT event evt_123 (unique) — already exists? skip
    API->>Q: push "process evt_123"
    API-->>S: 200 OK (quickly)
    Q->>Q: worker fulfils order
```

- **Verify the signature** — otherwise anyone can POST "payment succeeded".
- **Respond fast (2xx)**, then do the work in a queue. Slow responses get retried by the provider.
- **Store event IDs with a unique constraint** — providers retry, so the same event arrives more than once.
- Events can arrive **out of order** — check the current state instead of assuming the sequence.
- Never trust the client's "payment done" redirect alone; the webhook (or an API check) is the truth.

---
