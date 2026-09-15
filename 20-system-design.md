# System Design Interview

## Q1. How would you design a system to send 1 million emails reliably and efficiently?

Use an **asynchronous queue-based architecture**: a queue + workers + the provider's batch API + retry/dead-letter handling.

Never send 1M emails inside the API request. The API only accepts the job and returns immediately.

```text
Your API
   │
   ▼
Database: 1M recipients
   │
   ▼
Queue (Redis / SQS / RabbitMQ)
   │
   ▼
Email Workers  (scale horizontally)
   │
   ▼
Email Provider (SES / SendGrid / Mailgun)
   │
   ▼
Provider response
   ├── Success           → mark SENT
   ├── Temporary error   → RETRY
   └── Permanent error   → mark FAILED
                            │
                            ▼
              Dead Letter Queue (DLQ)
                            │
                            ▼
                        Update DB
```

After all retries are exhausted, the message is moved to a **Dead Letter Queue (DLQ)** so it can be inspected or replayed later instead of being lost.

### Rate Limiting

Every provider has a sending limit (for example SES gives you a per-second quota). Respect it or the provider will throttle or block you.

- Limit how many messages workers pull per second (token bucket in Redis).
- Control concurrency by the number of workers, not by looping faster.
- Use the provider's **batch/bulk API** to send many recipients in one call.

### Retries

- Retry only temporary failures, with **exponential backoff** (1s, 2s, 4s, 8s...).
- Add **jitter** so all workers don't retry at the same moment.
- Cap the attempts (for example 3–5), then move to the DLQ.

### Temporary vs Permanent Errors

| Type          | Examples                                             | Action                     |
| ------------- | ---------------------------------------------------- | -------------------------- |
| Temporary     | Rate limit (429), timeout, provider down (5xx), soft bounce (mailbox full) | Retry with backoff |
| Permanent     | Invalid email, hard bounce, unsubscribed, blocked domain | Mark FAILED, do not retry |

Retrying permanent errors wastes quota and damages your sender reputation.

### Failed Emails

- Store the status per recipient: `PENDING → PROCESSING → SENT / FAILED`.
- Save the provider error code and message for debugging.
- Handle provider **webhooks** (bounce, complaint, delivered) and update the DB.
- Suppress hard-bounced and complained addresses from future campaigns.

### Duplicate Sends

Queues usually guarantee **at-least-once** delivery, so the same message can be delivered twice. Make the worker **idempotent**:

- Give each job a unique **idempotency key** (for example `campaignId + userId`).
- Before sending, check the status — if it is already `SENT`, skip.
- Use a DB unique constraint on `(campaign_id, user_id)` so a duplicate insert fails.
- Pass the idempotency key to the provider if it supports one.

---

## Q2. Your API normally receives 100 requests/sec, but suddenly receives 10,000 requests/sec. How would you handle it?

```text
Load Balancer
      │
      ▼
Multiple API Servers  (auto-scaling)
      │
      ▼
Queue
      │
      ▼
Workers
      │
      ▼
Database
```

- **Load balancer** spreads traffic across servers.
- **Horizontal auto-scaling** adds more API servers when traffic rises.
- **Queue** absorbs the spike — the API accepts fast and workers process at a steady pace, so the database is never flooded.
- **Caching** (Redis / CDN) serves repeated reads without touching the DB.
- **Rate limiting** blocks abusive clients at the edge.
- **Database**: connection pooling, read replicas, and indexes.

The key idea is **buffering**: never let a traffic spike hit the database directly.

---

## Q3. How would you prevent a user from calling an API 1,000 times per second?

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
