---
id: aggregation-pipeline
title: "Aggregation Pipeline"
sidebar_label: "Aggregation Pipeline"
sidebar_position: 4
description: "Aggregation Pipeline — MongoDB interview notes."
---
Process data in stages where each stage transforms the output of the previous one.

```js
db.orders.aggregate([
  { $match: { status: "paid" } },
  { $group: { _id: "$userId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $limit: 5 },
]);
```

```text
orders (10,000 docs)
   │
   ▼
$match  { status: "paid" }               ──►  4,000 docs
   │
   ▼
$group  by userId, sum(amount)           ──►    800 docs  (one per user)
   │
   ▼
$sort   { total: -1 }                    ──►    800 docs  (biggest first)
   │
   ▼
$limit  5                                ──►      5 docs  = top 5 customers
```

### Pipeline Stages

- `$match` → Filter documents
- `$group` → Group and aggregate
- `$project` → Select fields
- `$sort` → Sort results (`1` = ascending, `-1` = descending)
- `$skip` → Skip documents
- `$limit` → Limit results
- `$count` → Count total

### Pipeline Operators

- `$filter`: Filter array
- `$facet`: Parallel processing - run multiple independent aggregation pipelines on same documents
- `$lookup`: Join data from another collection (returns array)
- `$unwind`: Deconstruct array into individual documents

```text
$unwind on { name: "Ali", skills: ["node", "react"] }

        ┌──► { name: "Ali", skills: "node"  }
input ──┤
        └──► { name: "Ali", skills: "react" }
```
