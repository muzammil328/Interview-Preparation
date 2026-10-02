---
id: what-is-cloudfront
title: "What is CloudFront?"
sidebar_label: "What is CloudFront?"
sidebar_position: 5
description: "What is CloudFront? — AWS interview notes."
---
1. **CloudFront** is a Content Delivery Network, or CDN.
2. It delivers content like images, videos, APIs, and websites faster by caching them at edge locations close to users.

```mermaid
flowchart LR
    U1["User in Karachi"] --> E1["Edge location nearby"]
    U2["User in London"] --> E2["Edge location nearby"]
    E1 -->|"cache miss only"| O[("Origin: S3 / ALB")]
    E2 -->|"cache miss only"| O
```

On a **cache hit**, the edge responds directly. On a **miss**, it fetches from the origin once and caches the result.

---
