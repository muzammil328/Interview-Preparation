---
id: what-is-the-difference-between-stopping-terminating-an-ec2
title: "What is the difference between stopping & terminating an EC2 instance?"
sidebar_label: "What is the difference between stopping & terminating an EC2 instance?"
sidebar_position: 2
description: "What is the difference between stopping & terminating an EC2 instance? — AWS interview notes."
---
1. When you **stop** an EC2 instance, it is shut down but can be started again later. EBS root volume data is kept. Data on **instance store** volumes is lost, and the public IP usually changes (use an Elastic IP to keep it). You are not charged for compute while stopped, but you still pay for EBS storage.
2. When you **terminate** an EC2 instance, it is permanently deleted. By default the EBS root volume is deleted too.

```text
running ──stop──► stopped ──start──► running
   │                 │
   └───terminate─────┴──► terminated (gone for good)
```

---
