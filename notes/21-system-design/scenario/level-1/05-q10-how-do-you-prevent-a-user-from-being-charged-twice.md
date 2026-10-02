---
id: q10-how-do-you-prevent-a-user-from-being-charged-twice
title: "Q10. How do you prevent a user from being charged twice?"
sidebar_label: "Q10. How do you prevent a user from being charged twice?"
sidebar_position: 5
description: "Q10. How do you prevent a user from being charged twice? — System Design interview notes."
---

The user double-clicks Pay, or the network times out and the client retries. Use an **idempotency key**.

```mermaid
sequenceDiagram
    participant C as Client
    participant API
    participant DB
    C->>API: POST /pay (Idempotency-Key: abc123)
    API->>DB: key abc123 exists?
    DB-->>API: no → save key, charge, store result
    API-->>C: 200 paid
    C->>API: POST /pay (retry, same key abc123)
    API->>DB: key abc123 exists?
    DB-->>API: yes → return stored result
    API-->>C: 200 paid (no second charge)
```

- The client generates the key once per checkout (UUID).
- Store keys with a **unique constraint**, so even two simultaneous requests can't both insert.
- Also disable the Pay button after the first click — but never rely on the frontend alone.

---
