---
id: q20-design-a-ride-sharing-app-like-uber-finding-nearby-dri
title: "Q20. Design a Ride-Sharing App (like Uber) — finding nearby drivers"
sidebar_label: "Q20. Design a Ride-Sharing App (like Uber) — finding nearby drivers"
sidebar_position: 4
description: "Q20. Design a Ride-Sharing App (like Uber) — finding nearby drivers — System Design interview notes."
---

```mermaid
flowchart LR
    D["Driver app<br/>sends GPS every 4s"] --> LS["Location Service"]
    LS --> R[("Redis GEO<br/>driverId → lat,lng")]
    Rider["Rider requests ride"] --> M["Matching Service"]
    M -->|"GEOSEARCH within 3 km"| R
    M -->|"offer ride"| D2["Nearest available driver"]
    D2 -->|"accept"| T["Trip Service + DB"]
```

**How do you find "drivers within 3 km" fast?** Don't compare the rider with every driver. Split the map into cells (**geohash**):

```text
Map divided into geohash cells          Rider in cell "tdr1y"
┌──────┬──────┬──────┐                  → search that cell + 8 neighbours
│tdr1v │tdr1y │tdr1z │                    (only a few hundred drivers,
├──────┼──────┼──────┤                     not 1 million)
│tdr1t │ 🧍   │tdr1x │
├──────┼──────┼──────┤
│tdr1s │tdr1u │tdr1w │
└──────┴──────┴──────┘
```

- Driver locations are **write-heavy** and short-lived → keep them in memory (Redis GEO), not the main DB.
- Lock the driver while an offer is pending, so two riders can't get the same driver.
- Live trip tracking: driver location → WebSocket → rider's map.

---
