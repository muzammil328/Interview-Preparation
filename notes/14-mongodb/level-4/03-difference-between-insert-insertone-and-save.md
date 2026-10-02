---
id: difference-between-insert-insertone-and-save
title: "Difference between insert(), insertOne(), and save()?"
sidebar_label: "Difference between insert(), insertOne(), and save()?"
sidebar_position: 3
description: "Difference between insert(), insertOne(), and save()? — MongoDB interview notes."
---
- **`insertOne()` / `insertMany()`** — explicitly insert a new document or documents. Throws a duplicate key error if the `_id` already exists.
- **`insert()`** — the old shell method that could insert one document or an array. **Deprecated**, use `insertOne()` / `insertMany()`.
- **`save()`** — in the old shell it acted as an **upsert**: with an existing `_id` it overwrote the document, without an `_id` it inserted. Also deprecated and removed from modern drivers.

**In Mongoose**, `save()` is different — it's a **document method**. It inserts the document if it's new, otherwise it updates only the modified fields and runs validators and middleware.

```js
const user = new User({ name: "Ali" });
await user.save();    // insert

user.name = "Ahmed";
await user.save();    // update
```
