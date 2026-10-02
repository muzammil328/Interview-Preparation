---
id: acid
title: "ACID"
sidebar_label: "ACID"
sidebar_position: 2
description: "ACID — SQL interview notes."
---
Properties ensuring reliable database transactions:

- **Atomicity**: All operations succeed or all fail (no partial updates)
- **Consistency**: Data remains valid after transactions (constraints, foreign keys, checks still hold)
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed data is permanently saved (survives a crash — written to the WAL first)

```text
Transfer 100 from A to B

 A: 500   B: 200
   │
   ├── A = A - 100   → 400
   │       ✖ server crashes here
   │
   ▼
 Atomicity   → rollback, A back to 500 (money never disappears)
 Consistency → balance >= 0 CHECK is never broken
 Isolation   → another user never sees A=400 while B is still 200
 Durability  → once COMMIT returns, A=400 B=300 survives a power cut
```
