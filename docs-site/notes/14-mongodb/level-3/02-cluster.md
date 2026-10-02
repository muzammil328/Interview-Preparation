---
id: cluster
title: "Cluster"
sidebar_label: "Cluster"
sidebar_position: 2
description: "Cluster — MongoDB interview notes."
---
Multiple MongoDB servers working together for performance, scalability, and reliability.

### Types

1. **Replica Set**: Same data on multiple servers
   - Primary (writes)
   - Secondary (copies, can read)
   - If primary down, secondary becomes primary

2. **Sharded Cluster**: Split data across multiple servers
   - Each server stores specific part of data
