---
id: composite-key
title: "Composite Key"
sidebar_label: "Composite Key"
sidebar_position: 1
description: "Composite Key — SQL interview notes."
---
Multiple columns together as a unique identifier. Each column alone may repeat, but the **combination** must be unique.

Example: in an `order_items` table, one order has many products, and one product appears in many orders — but the same product appears only once per order.

```sql
CREATE TABLE order_items (
   order_id   INT,
   product_id INT,
   quantity   INT,
   PRIMARY KEY (order_id, product_id)
);
```

```text
order_items
┌──────────┬────────────┬──────────┐
│ order_id │ product_id │ quantity │
├──────────┼────────────┼──────────┤
│ 1        │ 100        │ 2        │
│ 1        │ 200        │ 1        │   order_id repeats      ✔
│ 2        │ 100        │ 5        │   product_id repeats    ✔
│ 1        │ 100        │ 3        │   (1,100) again         ✘ rejected
└──────────┴────────────┴──────────┘
```
