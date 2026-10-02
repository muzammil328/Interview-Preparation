---
id: what-is-ec2-elastic-compute-cloud
title: "What is EC2 (Elastic Compute Cloud)?"
sidebar_label: "What is EC2 (Elastic Compute Cloud)?"
sidebar_position: 2
description: "What is EC2 (Elastic Compute Cloud)? — AWS interview notes."
---
1. A service that provides virtual servers in the cloud.
2. These servers are called **instances**.
3. You choose the instance type (CPU/RAM), the OS (via an AMI), storage (EBS), and network (VPC, subnet, security group).

```mermaid
flowchart LR
    AMI["AMI: OS + software"] --> I["EC2 instance"]
    T["Instance type: t3.medium"] --> I
    EBS[("EBS volume: disk")] --- I
    SG["Security Group: firewall"] --- I
```

---
