---
id: shared-hosting-vs-vps-vs-dedicated-server-vs-cloud
title: "Shared Hosting vs VPS vs Dedicated Server vs Cloud"
sidebar_label: "Shared Hosting vs VPS vs Dedicated Server vs Cloud"
sidebar_position: 1
description: "Shared Hosting vs VPS vs Dedicated Server vs Cloud — VPS interview notes."
---

| Type               | What you get                                   | Control | Cost   | Good for                         |
| ------------------ | ---------------------------------------------- | ------- | ------ | -------------------------------- |
| Shared hosting     | Space on a server shared with many sites       | Low     | Lowest | Small static/WordPress sites     |
| VPS                | Your own virtual machine with fixed resources  | Full (root) | Low–medium | Node/Next apps, APIs, side projects |
| Dedicated server   | A whole physical machine                       | Full    | High   | Heavy, predictable workloads     |
| Cloud (EC2, etc.)  | VMs plus managed services and auto scaling     | Full    | Pay per use | Apps that need to scale       |

```text
Shared hosting:   [site A | site B | site C | site D]  ← one server, shared everything
VPS:              [ VPS 1 ][ VPS 2 ][ VPS 3 ]          ← one server, isolated slices
Dedicated:        [         your server         ]      ← whole machine is yours
```

---
