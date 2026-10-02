---
id: what-is-blue-green-deployment
title: "What is blue-green deployment?"
sidebar_label: "What is blue-green deployment?"
sidebar_position: 10
description: "What is blue-green deployment? — AWS interview notes."
---
Blue-green deployment uses two environments:

- **Blue** is the current production environment.
- **Green** is the new version.

Traffic is shifted from blue to green after testing. This reduces downtime and rollback risk. To roll back, switch traffic back to blue.

```mermaid
flowchart LR
    U["Users"] --> LB["Load Balancer / Route 53"]
    LB -->|"100% traffic"| B["Blue: v1 (current)"]
    LB -.->|"switch after tests"| G["Green: v2 (new)"]
```

---
