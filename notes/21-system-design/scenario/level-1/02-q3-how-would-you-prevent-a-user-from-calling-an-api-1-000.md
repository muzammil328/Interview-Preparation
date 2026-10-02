---
id: q3-how-would-you-prevent-a-user-from-calling-an-api-1-000
title: "Q3. How would you prevent a user from calling an API 1,000 times per second?"
sidebar_label: "Q3. How would you prevent a user from calling an API 1,000 times per second?"
sidebar_position: 2
description: "Q3. How would you prevent a user from calling an API 1,000 times per second? — System Design interview notes."
---

Implement **rate limiting**, usually with Redis, using algorithms such as **Token Bucket** or **Sliding Window**.

Redis is used because it is fast, shared across all API servers, and supports atomic counters with TTL.

| Algorithm       | How It Works                                                        |
| --------------- | ------------------------------------------------------------------- |
| Fixed Window    | Count requests per fixed time window. Simple, but allows bursts at window edges. |
| Sliding Window  | Counts requests in a rolling time window. More accurate.            |
| Token Bucket    | Tokens refill at a fixed rate; each request takes one token. Allows short bursts. |
| Leaky Bucket    | Requests drain at a constant rate. Smooths traffic.                 |

### Notes

- Rate limit per **user / API key / IP**, not globally.
- Return **429 Too Many Requests** with a `Retry-After` header.
- Apply it at the **API Gateway** or a middleware layer.
- Different limits for different tiers (free vs paid users).

```text
Token Bucket (capacity 5, refill 1 token/sec)

t=0s   [● ● ● ● ●]  5 requests arrive → all allowed → [ _ _ _ _ _ ]
t=0s   request #6   → bucket empty     → 429 Too Many Requests
t=1s   [● _ _ _ _]  1 token refilled   → 1 request allowed
```

---
