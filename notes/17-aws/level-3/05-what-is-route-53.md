---
id: what-is-route-53
title: "What is Route 53?"
sidebar_label: "What is Route 53?"
sidebar_position: 5
description: "What is Route 53? — AWS interview notes."
---
**Route 53** is AWS's DNS service. It is used to register domain names, route traffic, and manage DNS records.

```text
User types myapp.com
      │
      ▼
Route 53:  myapp.com  →  A / ALIAS record  →  Load Balancer / CloudFront
      │
      ▼
Request reaches your app
```

---
