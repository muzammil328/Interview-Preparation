---
id: monorepo
title: "Monorepo"
sidebar_label: "Monorepo"
sidebar_position: 1
description: "Monorepo — Architecture interview notes."
---
**Monorepo** means all projects, services, and shared packages live in **one single Git repository**.

### Example

```text
my-company/
├── apps/
│   ├── frontend/
│   ├── auth-service/
│   ├── payment-service/
│   └── inventory-service/
├── packages/
│   ├── ui/
│   └── shared/
└── package.json
```
