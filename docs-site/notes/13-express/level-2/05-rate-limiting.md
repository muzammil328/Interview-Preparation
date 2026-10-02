---
id: rate-limiting
title: "Rate Limiting"
sidebar_label: "Rate Limiting"
sidebar_position: 5
description: "Rate Limiting — Express.js interview notes."
---
Prevents too many requests from one client (brute-force, abuse).

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests',
});

app.use('/api', limiter);
```

With multiple servers, store the counters in **Redis** so all servers share the same limit.

```mermaid
flowchart LR
    C["Client"] --> RL{"Requests in window under 100?"}
    RL -->|"yes"| API["Route handler"]
    RL -->|"no"| E["429 Too Many Requests"]
```

---
