---
id: operations
title: "Operations"
sidebar_label: "Operations"
sidebar_position: 4
description: "Operations — MongoDB interview notes."
---
| Operation      | Description                     |
| -------------- | ------------------------------- |
| `find()`       | Return multiple documents       |
| `findOne()`    | Return only one document        |
| `findById()`   | Find by ID, return one document |
| `updateOne()`  | Update first matched document   |
| `updateMany()` | Update all matched documents    |
| `deleteOne()`  | Delete first matched document   |
| `deleteMany()` | Delete all matched documents    |
| `insertOne()`  | Insert single document          |
| `insertMany()` | Insert multiple documents       |
| `{ upsert: true }` | Option on update methods — update if exists, create if not (there is no `upsert()` method) |
| `create()`     | Create and save in one step (Mongoose) |
| `save()`       | Save after creating/modifying (Mongoose) |

```js
db.users.updateOne(
  { email: "a@b.com" },
  { $set: { name: "Ali" } },
  { upsert: true }   // insert if no match
);
```

```text
upsert: true
   find match? ── yes ──► update it
        │
        no
        ▼
   insert new document
```
