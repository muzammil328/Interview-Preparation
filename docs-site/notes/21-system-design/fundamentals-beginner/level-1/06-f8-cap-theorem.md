---
id: f8-cap-theorem
title: "F8. CAP Theorem"
sidebar_label: "F8. CAP Theorem"
sidebar_position: 6
description: "F8. CAP Theorem — System Design interview notes."
---

In a distributed system, when the network splits (**P**artition), you must choose between **C**onsistency and **A**vailability.

```mermaid
flowchart TD
    P["Network partition happens"] --> Q{"Choose"}
    Q -->|CP| C["Consistency<br/>refuse request rather than return stale data<br/>e.g. banking, inventory"]
    Q -->|AP| A["Availability<br/>always answer, data may be stale<br/>e.g. likes count, social feed"]
```

Partitions will happen, so the real choice is **CP vs AP**, and it can differ per feature in the same app.

---
