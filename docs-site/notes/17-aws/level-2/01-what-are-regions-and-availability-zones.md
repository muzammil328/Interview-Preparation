---
id: what-are-regions-and-availability-zones
title: "What are Regions and Availability Zones?"
sidebar_label: "What are Regions and Availability Zones?"
sidebar_position: 1
description: "What are Regions and Availability Zones? — AWS interview notes."
---
- **Region**: a geographic area, for example `us-east-1` (N. Virginia) or `ap-south-1` (Mumbai).
- **Availability Zone (AZ)**: one or more separate data centers inside a region, with their own power and networking.

Deploy across **at least two AZs** so one data center failing does not take your app down.

```text
Region: ap-south-1
┌──────────────────────────────────────────────┐
│  ┌────────────┐  ┌────────────┐  ┌────────────┐
│  │   AZ  a    │  │   AZ  b    │  │   AZ  c    │
│  │ EC2, RDS   │  │ EC2, RDS   │  │   EC2      │
│  │ (primary)  │  │ (standby)  │  │            │
│  └────────────┘  └────────────┘  └────────────┘
└──────────────────────────────────────────────┘
```

---
