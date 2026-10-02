---
id: q4-design-a-url-shortener-like-bit-ly
title: "Q4. Design a URL Shortener (like bit.ly)"
sidebar_label: "Q4. Design a URL Shortener (like bit.ly)"
sidebar_position: 3
description: "Q4. Design a URL Shortener (like bit.ly) — System Design interview notes."
---

**Requirements:** long URL → short code (`sho.rt/aZ3x9`); redirect fast; read-heavy (~100 reads per write).

```mermaid
flowchart LR
    U[User] -->|"GET /aZ3x9"| LB[Load Balancer]
    LB --> API[API Servers]
    API -->|"1. check"| R[(Redis cache)]
    API -->|"2. on miss"| DB[(DB: code → longUrl)]
    API -->|"301/302 redirect"| U
```

**Generating the short code:**

| Approach | How | Trade-off |
| -------- | --- | --------- |
| Base62 of an auto-increment ID | id `125` → `"21"` | Short and unique, but guessable |
| Random 7 chars + uniqueness check | `aZ3x9Qp` | Not guessable, needs a retry on collision |
| Hash (MD5) of URL, take 7 chars | Same URL → same code | Collisions must be handled |

Base62 with 7 characters = 62⁷ ≈ **3.5 trillion** codes.

- **301** (permanent) lets browsers cache the redirect → less load, but you lose click analytics. **302** keeps every click hitting you.
- Cache hot codes in Redis — a few popular links get most of the traffic.

---
