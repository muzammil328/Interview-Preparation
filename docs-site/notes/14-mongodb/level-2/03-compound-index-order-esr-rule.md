---
id: compound-index-order-esr-rule
title: "Compound Index Order (ESR Rule)"
sidebar_label: "Compound Index Order (ESR Rule)"
sidebar_position: 3
description: "Compound Index Order (ESR Rule) — MongoDB interview notes."
---
The **order of fields** in a compound index matters. Follow the **ESR rule**: **E**quality → **S**ort → **R**ange.

```js
// Query
db.users.find({ status: "active", age: { $gt: 18 } }).sort({ createdAt: -1 });

// Best index:  Equality   Sort           Range
db.users.createIndex({ status: 1, createdAt: -1, age: 1 });
```

### Prefix Rule

An index on `{ a: 1, b: 1, c: 1 }` can be used by queries on its **left-most prefixes**:

```text
Index: { a, b, c }

Query filters on      Uses index?
──────────────────    ───────────
a                     ✔ yes
a, b                  ✔ yes
a, b, c               ✔ yes
b                     ✘ no   (skips the first field)
b, c                  ✘ no
a, c                  ~ partly (only "a" narrows the search)
```
