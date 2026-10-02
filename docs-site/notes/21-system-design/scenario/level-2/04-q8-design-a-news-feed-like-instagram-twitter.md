---
id: q8-design-a-news-feed-like-instagram-twitter
title: "Q8. Design a News Feed (like Instagram / Twitter)"
sidebar_label: "Q8. Design a News Feed (like Instagram / Twitter)"
sidebar_position: 4
description: "Q8. Design a News Feed (like Instagram / Twitter) — System Design interview notes."
---

Two strategies:

```text
Fan-out on WRITE (push)                 Fan-out on READ (pull)

User posts                              User opens feed
   │                                       │
   ▼                                       ▼
Copy post ID into every                 Fetch latest posts of everyone
follower's feed list (Redis)            they follow, merge, sort
   │                                       │
Feed read = instant                     Feed read = slow
Post write = slow for many followers    Post write = instant
```

| | Push (on write) | Pull (on read) |
| - | --------------- | -------------- |
| Read speed | Fast | Slow |
| Bad for | Celebrities (10M followers = 10M writes) | Users following thousands of accounts |

**Real answer — hybrid:** push for normal users; for celebrities, pull their posts at read time and merge them in.

---
