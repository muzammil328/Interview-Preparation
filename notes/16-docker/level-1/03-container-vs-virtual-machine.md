---
id: container-vs-virtual-machine
title: "Container vs Virtual Machine"
sidebar_label: "Container vs Virtual Machine"
sidebar_position: 3
description: "Container vs Virtual Machine — Docker interview notes."
---
| Container                               | Virtual Machine                        |
| --------------------------------------- | -------------------------------------- |
| Shares the host OS kernel               | Has its own full guest OS              |
| Starts in seconds (or less)             | Starts in minutes                      |
| Size in MBs                             | Size in GBs                            |
| Process-level isolation                 | Hardware-level isolation (stronger)    |
| Runs on a container runtime (Docker)    | Runs on a hypervisor                   |

```text
        Containers                          Virtual Machines
┌─────┐ ┌─────┐ ┌─────┐            ┌─────────┐ ┌─────────┐
│App A│ │App B│ │App C│            │  App A  │ │  App B  │
│Libs │ │Libs │ │Libs │            │  Libs   │ │  Libs   │
└─────┘ └─────┘ └─────┘            │Guest OS │ │Guest OS │
┌─────────────────────┐            └─────────┘ └─────────┘
│   Docker Engine     │            ┌─────────────────────┐
├─────────────────────┤            │     Hypervisor      │
│     Host OS         │            ├─────────────────────┤
├─────────────────────┤            │     Host OS / HW    │
│     Hardware        │            ├─────────────────────┤
└─────────────────────┘            │     Hardware        │
                                   └─────────────────────┘
```

**Interview line:** containers virtualize the **OS**, VMs virtualize the **hardware**.

---
