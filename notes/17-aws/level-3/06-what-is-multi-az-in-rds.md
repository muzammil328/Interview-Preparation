---
id: what-is-multi-az-in-rds
title: "What is Multi-AZ in RDS?"
sidebar_label: "What is Multi-AZ in RDS?"
sidebar_position: 6
description: "What is Multi-AZ in RDS? — AWS interview notes."
---
1. **Multi-AZ** means the database has a standby copy in another Availability Zone.
2. If the primary database fails, AWS automatically fails over to the standby database.
3. It is used for high availability. The standby does **not** serve read traffic (in the classic Multi-AZ setup).
