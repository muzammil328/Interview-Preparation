---
id: normalization-1nf-2nf-3nf
title: "Normalization (1NF, 2NF, 3NF)"
sidebar_label: "Normalization (1NF, 2NF, 3NF)"
sidebar_position: 3
description: "Normalization (1NF, 2NF, 3NF) — SQL interview notes."
---
Normalization organizes tables to **remove duplicate data** and avoid update problems.

| Normal Form | Rule (simple)                                                                  |
| ----------- | ------------------------------------------------------------------------------ |
| **1NF**     | Each cell holds **one value** (no lists), each row is unique                   |
| **2NF**     | 1NF + every non-key column depends on the **whole** primary key (no partial dependency) |
| **3NF**     | 2NF + non-key columns depend **only on the key**, not on other non-key columns (no transitive dependency) |

```text
UNNORMALIZED
┌──────────┬──────────┬───────────────┬──────────────────┐
│ order_id │ customer │ customer_city │ products         │
├──────────┼──────────┼───────────────┼──────────────────┤
│ 1        │ Ali      │ Lahore        │ Pen, Book        │ ← list in one cell ✘
└──────────┴──────────┴───────────────┴──────────────────┘
        │
        ▼  1NF: one value per cell
┌──────────┬────────────┬──────────┬───────────────┬──────────────┐
│ order_id │ product_id │ customer │ customer_city │ product_name │   PK = (order_id, product_id)
├──────────┼────────────┼──────────┼───────────────┼──────────────┤
│ 1        │ 100        │ Ali      │ Lahore        │ Pen          │
│ 1        │ 200        │ Ali      │ Lahore        │ Book         │
└──────────┴────────────┴──────────┴───────────────┴──────────────┘
   product_name depends only on product_id   → partial dependency ✘
   customer depends only on order_id         → partial dependency ✘
        │
        ▼  2NF: split by what each column depends on
orders(order_id PK, customer, customer_city)
order_items(order_id, product_id, quantity)   PK = (order_id, product_id)
products(product_id PK, product_name)
   customer_city depends on customer, not on order_id → transitive ✘
        │
        ▼  3NF: move customer data to its own table
customers(customer_id PK, name, city)
orders(order_id PK, customer_id FK)
order_items(order_id FK, product_id FK, quantity)
products(product_id PK, product_name)
```

**Denormalization** is the reverse — deliberately duplicating data to make reads faster (common in reporting tables and caches).
