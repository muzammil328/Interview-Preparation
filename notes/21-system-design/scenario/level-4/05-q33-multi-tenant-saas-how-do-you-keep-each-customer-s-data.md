---
id: q33-multi-tenant-saas-how-do-you-keep-each-customer-s-data
title: "Q33. Multi-Tenant SaaS — how do you keep each customer's data separate?"
sidebar_label: "Q33. Multi-Tenant SaaS — how do you keep each customer's data separate?"
sidebar_position: 5
description: "Q33. Multi-Tenant SaaS — how do you keep each customer's data separate? — System Design interview notes."
---

```text
1. Shared DB, shared tables          2. Shared DB, schema per tenant     3. DB per tenant
┌──────────────────────────┐         ┌──────────────────────────┐        ┌────────┐ ┌────────┐
│ orders                   │         │ schema acme.orders       │        │ acme DB│ │ globex │
│  tenant_id │ id │ total  │         │ schema globex.orders     │        └────────┘ └────────┘
│  acme      │ 1  │ 50     │         └──────────────────────────┘
│  globex    │ 2  │ 90     │
└──────────────────────────┘
```

| | Shared tables + `tenant_id` | Schema per tenant | DB per tenant |
| - | --------------------------- | ----------------- | ------------- |
| Cost | Lowest | Medium | Highest |
| Isolation | Weakest (one missing `WHERE` leaks data) | Medium | Strongest |
| Migrations | One | One per schema | One per DB |
| Good for | Many small customers | Tens to hundreds | Enterprise / compliance |

- With shared tables, **never rely on every developer remembering** `WHERE tenant_id = ?`:
  - put `tenant_id` from the auth token into a request context, and filter in one data-access layer,
  - or use **PostgreSQL Row-Level Security** so the DB enforces it.
- Index on `(tenant_id, ...)`, and watch for one huge tenant slowing others (**noisy neighbour**) — move them to their own DB if needed.
