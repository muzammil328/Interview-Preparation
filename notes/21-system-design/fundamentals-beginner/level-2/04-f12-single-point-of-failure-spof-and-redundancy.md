---
id: f12-single-point-of-failure-spof-and-redundancy
title: "F12. Single Point of Failure (SPOF) and Redundancy"
sidebar_label: "F12. Single Point of Failure (SPOF) and Redundancy"
sidebar_position: 4
description: "F12. Single Point of Failure (SPOF) and Redundancy — System Design interview notes."
---

A SPOF is any one component that takes the whole system down when it fails.

```text
✗ SPOFs everywhere                     ✓ Redundant

User → [1 server] → [1 DB]             User → LB pair ─┬─► Server 1 ─┐
                                                       ├─► Server 2 ─┼─► DB primary
                                                       └─► Server 3 ─┘      │ replicates
                                                                            ▼
                                                                       DB standby (other AZ)
```

| Layer | How to remove the SPOF |
| ----- | ---------------------- |
| Server | Several servers behind a load balancer |
| Load balancer | Managed LB (AWS ALB is already redundant) |
| Database | Primary + standby with automatic failover (Multi-AZ) |
| Region / data center | Run in multiple availability zones |
| Cache | Redis replica or cluster; app still works (slower) if cache dies |

**Interview tip:** after drawing your design, point at each box and ask, "What happens if this dies?"

---
