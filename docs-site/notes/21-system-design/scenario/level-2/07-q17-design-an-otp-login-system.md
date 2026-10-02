---
id: q17-design-an-otp-login-system
title: "Q17. Design an OTP Login System"
sidebar_label: "Q17. Design an OTP Login System"
sidebar_position: 7
description: "Q17. Design an OTP Login System — System Design interview notes."
---

```mermaid
sequenceDiagram
    participant U as User
    participant API
    participant R as Redis
    participant SMS
    U->>API: POST /otp (phone)
    API->>R: rate limit check (3 per 10 min)
    API->>R: SET otp:phone = hash(123456), TTL 5 min
    API->>SMS: send 123456
    U->>API: POST /otp/verify (phone, 123456)
    API->>R: compare hash, attempts < 5
    API->>R: DEL otp:phone (one-time use)
    API-->>U: session / JWT
```

- Store a **hash** of the OTP, never the plain code.
- **TTL** (expire after 5 min) + **one-time use** (delete after success).
- Limit both **sending** (SMS costs money) and **verifying** (stops brute force of 6 digits).

---
