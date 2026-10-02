---
id: what-is-aws
title: "What is AWS?"
sidebar_label: "What is AWS?"
sidebar_position: 1
description: "What is AWS? — AWS interview notes."
---
---

AWS stands for **Amazon Web Services**. It is a cloud computing platform that provides services like servers, storage, databases, networking, security, monitoring, and machine learning.

| Service | What it does                                                                                       |
| ------- | -------------------------------------------------------------------------------------------------- |
| **EC2** | Provides virtual servers to run your applications                                                  |
| **VPC** | Provides a private virtual network to control traffic, security, and isolation for those servers |

A typical web app on AWS:

```mermaid
flowchart LR
    U["User"] --> R53["Route 53 (DNS)"]
    R53 --> CF["CloudFront (CDN)"]
    CF --> S3[("S3: static files")]
    CF --> ALB["Load Balancer"]
    ALB --> EC2a["EC2 / app"]
    ALB --> EC2b["EC2 / app"]
    EC2a --> RDS[("RDS database")]
    EC2b --> RDS
```

---
