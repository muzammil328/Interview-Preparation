---
id: transaction
title: "Transaction"
sidebar_label: "Transaction"
sidebar_position: 3
description: "Transaction — MongoDB interview notes."
---
Ensures multiple database operations either all succeed or all fail together. Sequence of operations executed as a single unit.

- A **single-document** write is always atomic, even without a transaction — another reason to embed.
- **Multi-document** transactions need a **replica set** (MongoDB 4.0+) or a sharded cluster (4.2+). They do not work on a standalone server.

```js
const session = await mongoose.startSession();
await session.withTransaction(async () => {
  await Account.updateOne({ _id: from }, { $inc: { balance: -100 } }, { session });
  await Account.updateOne({ _id: to },   { $inc: { balance:  100 } }, { session });
});
session.endSession();
```

```text
startTransaction
   │
   ├── debit  account A  -100
   ├── credit account B  +100
   │
   ├── all OK?  ──► commit  ──► both changes visible
   └── error?   ──► abort   ──► nothing changed
```
