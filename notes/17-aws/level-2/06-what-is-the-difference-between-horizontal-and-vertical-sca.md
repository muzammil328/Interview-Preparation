---
id: what-is-the-difference-between-horizontal-and-vertical-sca
title: "What is the difference between horizontal and vertical scaling?"
sidebar_label: "What is the difference between horizontal and vertical scaling?"
sidebar_position: 6
description: "What is the difference between horizontal and vertical scaling? — AWS interview notes."
---
**Horizontal scaling** means adding more servers.
Example: Adding more EC2 instances behind a Load Balancer.

**Vertical scaling** means increasing the size of one server.
Example: Changing an EC2 instance from t3.medium to t3.large.

```text
Vertical (scale up)          Horizontal (scale out)
┌──────┐      ┌──────────┐   ┌────┐     ┌────┐┌────┐┌────┐
│ 2 CPU│  →   │  8 CPU   │   │ S1 │  →  │ S1 ││ S2 ││ S3 │
└──────┘      └──────────┘   └────┘     └────┘└────┘└────┘
Has a hardware limit,         No hard limit, needs a load
usually needs a restart       balancer and stateless servers
```

---
