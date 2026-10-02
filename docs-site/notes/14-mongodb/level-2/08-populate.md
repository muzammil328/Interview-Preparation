---
id: populate
title: "Populate()"
sidebar_label: "Populate()"
sidebar_position: 8
description: "Populate() — MongoDB interview notes."
---
Find related documents from another collection by replacing ObjectId references with actual data (Mongoose).

```js
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  total: Number,
});

const orders = await Order.find().populate("user", "name email");
```

```text
Before populate                       After populate
{ _id: 501,                           { _id: 501,
  user: ObjectId("u1"),     ──►         user: { _id: "u1", name: "Ali", email: "..." },
  total: 300 }                          total: 300 }

How it works:
 query 1: Order.find()                         → orders
 query 2: User.find({ _id: { $in: [u1,u2..] }}) → users   (ONE extra query, not one per order)
 Mongoose stitches them together in Node.js
```

**populate() vs $lookup:** `populate()` runs extra queries and joins in your app; `$lookup` joins inside the database in one aggregation. For heavy reports use `$lookup`.
