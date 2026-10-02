---
id: q11-design-a-real-time-leaderboard
title: "Q11. Design a Real-Time Leaderboard"
sidebar_label: "Q11. Design a Real-Time Leaderboard"
sidebar_position: 1
description: "Q11. Design a Real-Time Leaderboard — System Design interview notes."
---

Use a **Redis Sorted Set** — it keeps members sorted by score automatically.

```text
ZADD leaderboard 1500 "ali"
ZADD leaderboard 2300 "sara"
ZINCRBY leaderboard 100 "ali"      → ali = 1600

ZREVRANGE leaderboard 0 9 WITHSCORES   → top 10

 Rank │ Player │ Score
──────┼────────┼──────
  1   │ sara   │ 2300
  2   │ ali    │ 1600
```

- Updating a score and getting a rank are **O(log N)**, fast even with millions of players.
- Persist scores to the DB too; Redis is the fast view, the DB is the source of truth.

---
