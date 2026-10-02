---
id: what-is-the-difference-between-a-public-subnet-and-private
title: "What is the difference between a public subnet and private subnet?"
sidebar_label: "What is the difference between a public subnet and private subnet?"
sidebar_position: 4
description: "What is the difference between a public subnet and private subnet? — AWS interview notes."
---
1. A **public subnet** has a route to the internet through an **Internet Gateway**.
2. A **private subnet** does not have direct internet access. It is usually used for databases or backend servers. It can reach the internet for updates through a **NAT Gateway** (outbound only).

```mermaid
flowchart TB
    Internet(("Internet")) <--> IGW["Internet Gateway"]
    subgraph VPC["VPC 10.0.0.0/16"]
        subgraph Pub["Public subnet 10.0.1.0/24"]
            ALB["Load Balancer"]
            NAT["NAT Gateway"]
        end
        subgraph Priv["Private subnet 10.0.2.0/24"]
            App["EC2 app servers"]
            DB[("RDS")]
        end
    end
    IGW <--> ALB
    ALB --> App
    App --> DB
    App -->|"outbound only"| NAT
    NAT --> IGW
```

---
