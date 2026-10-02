---
id: lookup-join-in-mongodb
title: "$lookup (Join in MongoDB)"
sidebar_label: "$lookup (Join in MongoDB)"
sidebar_position: 4
description: "$lookup (Join in MongoDB) — MongoDB interview notes."
---
`$lookup` does a **left outer join** with another collection inside an aggregation. The matches come back as an **array**.

```js
db.orders.aggregate([
  {
    $lookup: {
      from: "users",          // collection to join
      localField: "userId",   // field in orders
      foreignField: "_id",    // field in users
      as: "user",             // output array field
    },
  },
  { $unwind: "$user" },       // turn [user] into user
]);
```

```text
orders                         users
{ _id: 501, userId: 1 }  ───►  { _id: 1, name: "Ali" }

result
{ _id: 501, userId: 1, user: [ { _id: 1, name: "Ali" } ] }
                              └──────── array ─────────┘
after $unwind
{ _id: 501, userId: 1, user: { _id: 1, name: "Ali" } }
```

**Tip:** index `foreignField` (`users._id` already is), otherwise `$lookup` scans the other collection for every input document.
