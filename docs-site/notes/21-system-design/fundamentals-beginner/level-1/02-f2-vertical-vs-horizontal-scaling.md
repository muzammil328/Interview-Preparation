---
id: f2-vertical-vs-horizontal-scaling
title: "F2. Vertical vs Horizontal Scaling"
sidebar_label: "F2. Vertical vs Horizontal Scaling"
sidebar_position: 2
description: "F2. Vertical vs Horizontal Scaling — System Design interview notes."
---

```text
Vertical (scale UP)                Horizontal (scale OUT)

  ┌──────────┐                      ┌────┐ ┌────┐ ┌────┐ ┌────┐
  │          │                      │ S1 │ │ S2 │ │ S3 │ │ S4 │
  │  BIGGER  │                      └────┘ └────┘ └────┘ └────┘
  │  SERVER  │                          ▲      ▲      ▲      ▲
  │ more CPU │                          └──────┴──┬───┴──────┘
  │ more RAM │                              Load Balancer
  └──────────┘
```

| Vertical | Horizontal |
| -------- | ---------- |
| Add CPU/RAM to one machine | Add more machines |
| Simple, no code change | Needs a load balancer and **stateless** servers |
| Has a hard upper limit | Almost unlimited |
| Single point of failure | One server dies, others keep serving |

Real systems usually start vertical, then go horizontal when one machine is not enough.

---
