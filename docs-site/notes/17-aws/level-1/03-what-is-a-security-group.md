---
id: what-is-a-security-group
title: "What is a Security Group?"
sidebar_label: "What is a Security Group?"
sidebar_position: 3
description: "What is a Security Group? — AWS interview notes."
---
1. A **Security Group** acts like a virtual firewall for EC2 instances.
2. It controls inbound and outbound traffic. Security Groups are **stateful**, meaning return traffic is automatically allowed.
3. Security Groups have **allow rules only** (no deny rules).

```text
Internet
   │  port 443 ✅  (rule: allow 443 from 0.0.0.0/0)
   │  port 22  ❌  (only allowed from your IP)
   ▼
┌──────── Security Group ────────┐
│          EC2 instance          │
└────────────────────────────────┘
```

**Security Group vs NACL:** a Security Group works at the **instance** level and is stateful. A Network ACL works at the **subnet** level, is **stateless**, and supports both allow and deny rules.

---
