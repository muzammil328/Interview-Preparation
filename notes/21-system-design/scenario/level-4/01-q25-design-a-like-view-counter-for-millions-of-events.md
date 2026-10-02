---
id: q25-design-a-like-view-counter-for-millions-of-events
title: "Q25. Design a Like / View Counter for Millions of Events"
sidebar_label: "Q25. Design a Like / View Counter for Millions of Events"
sidebar_position: 1
description: "Q25. Design a Like / View Counter for Millions of Events — System Design interview notes."
---

Problem: a viral post gets 50,000 likes per second. `UPDATE posts SET likes = likes + 1` 50K times/sec locks the same row → DB melts.

```text
✗ Every like hits the same DB row        ✓ Count in Redis, flush in batches

like ─► UPDATE row 42 ┐                  like ─► INCR likes:42 (Redis, in memory)
like ─► UPDATE row 42 ├─ row lock        like ─► INCR likes:42
like ─► UPDATE row 42 ┘  contention      ...
                                         every 5 sec: worker reads + resets counter
                                         ─► UPDATE posts SET likes = likes + 4,812
```

- **Who liked what** (to stop double likes, show "you liked this") → a `likes(user_id, post_id)` table with a unique key, or a Redis set.
- **The number shown** → a Redis counter, eventually synced to the DB. Being a few seconds behind is fine (eventual consistency, F13).
- For extremely hot keys, split the counter: `likes:42:shard0..9`, sum them when reading.

---
