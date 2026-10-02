---
id: what-is-layered-n-tier-architecture
title: "What is Layered (N-Tier) Architecture?"
sidebar_label: "What is Layered (N-Tier) Architecture?"
sidebar_position: 2
description: "What is Layered (N-Tier) Architecture? — Architecture interview notes."
---
Code is organized into layers. Each layer only talks to the layer directly below it.

| Layer                 | Responsibility                                   |
| --------------------- | ------------------------------------------------ |
| **Route / Controller**| HTTP: parse request, validate, send response     |
| **Service**           | Business logic                                   |
| **Repository / DAO**  | Database queries                                 |
| **Database**          | Storage                                          |

```text
HTTP request
     │
     ▼
┌───────────────┐
│  Controller   │  validate input, call service, shape response
└──────┬────────┘
       ▼
┌───────────────┐
│   Service     │  business rules (no req/res, no SQL)
└──────┬────────┘
       ▼
┌───────────────┐
│  Repository   │  queries only
└──────┬────────┘
       ▼
   Database
```

**Why:** business logic can be tested without HTTP or a real database, and changing the database only affects the repository layer.

---
