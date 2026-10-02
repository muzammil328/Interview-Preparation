---
id: f6-what-is-a-cdn
title: "F6. What is a CDN?"
sidebar_label: "F6. What is a CDN?"
sidebar_position: 2
description: "F6. What is a CDN? — System Design interview notes."
---

A CDN (Content Delivery Network) stores copies of static files (images, JS, CSS, videos) on servers close to the user.

```text
                 Origin Server (USA)
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
   Edge (London)   Edge (Mumbai)   Edge (Tokyo)
         ▲              ▲              ▲
     UK user      Pakistan user    Japan user
      ~20ms           ~30ms          ~25ms
```

- Lower latency (data travels a shorter distance).
- Less load on your origin server.
- Examples: CloudFront, Cloudflare.

---
