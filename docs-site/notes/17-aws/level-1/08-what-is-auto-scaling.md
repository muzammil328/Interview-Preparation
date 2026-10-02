---
id: what-is-auto-scaling
title: "What is Auto Scaling?"
sidebar_label: "What is Auto Scaling?"
sidebar_position: 8
description: "What is Auto Scaling? — AWS interview notes."
---
**Auto Scaling** automatically increases or decreases the number of EC2 instances based on traffic or demand. It helps maintain performance and reduce cost.

You set **min**, **desired**, and **max** instances, plus a rule such as "keep average CPU at 50%". Auto Scaling registers new instances with the load balancer automatically.

```text
CPU > 70%  →  scale OUT  →  add instance   [EC2][EC2][EC2][+EC2]
CPU < 30%  →  scale IN   →  remove instance [EC2][EC2]

min = 2   desired = 3   max = 10
```

---
