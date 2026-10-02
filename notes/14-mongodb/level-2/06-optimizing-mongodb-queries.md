---
id: optimizing-mongodb-queries
title: "Optimizing MongoDB Queries"
sidebar_label: "Optimizing MongoDB Queries"
sidebar_position: 6
description: "Optimizing MongoDB Queries — MongoDB interview notes."
---
- Proper indexing (follow the ESR rule)
- Return only required fields (projection)
- Use aggregations
- Use lean() for heavy reads
- Limit results
- Check with `explain("executionStats")`

```text
Slow query?
   │
   ▼
explain("executionStats")
   │
   ├── COLLSCAN?                      ──► add an index
   ├── docsExamined >> nReturned?     ──► index is wrong / reorder fields (ESR)
   ├── SORT stage in memory?          ──► add sort field to the index
   └── returning huge documents?      ──► use projection + lean()
```
