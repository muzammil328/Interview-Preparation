---
id: common-questions
title: "Common Questions"
sidebar_label: "Common Questions"
sidebar_position: 5
description: "Common Questions — MongoDB interview notes."
---
### Q1. How does MongoDB store data?

MongoDB stores documents in **BSON (Binary JSON)** format. BSON supports extra data types that JSON does not, such as `Date`, `ObjectId`, `Decimal128`, and binary data.

```text
Database
 └── Collection (users)
      ├── Document { _id: ..., name: "Ali" }      ← stored as BSON
      └── Document { _id: ..., name: "Sara" }
```

### Q2. What is the `_id` field and the structure of an ObjectId?

`_id` uniquely identifies a document in a collection. If you don't provide one, MongoDB generates an **ObjectId**, which is **12 bytes**:

| Part         | Size    | Meaning                          |
| ------------ | ------- | -------------------------------- |
| Timestamp    | 4 bytes | Creation time (seconds)          |
| Random value | 5 bytes | Unique per machine/process       |
| Counter      | 3 bytes | Incrementing counter             |

```text
ObjectId("65a1f2c3  9b8e7d6c5a  4f3e2d")
          └──┬───┘  └────┬───┘  └─┬──┘
         timestamp    random    counter
          4 bytes     5 bytes   3 bytes
```

Because the first 4 bytes are a timestamp, sorting by `_id` roughly sorts by creation time.

### Q3. How does MongoDB handle relationships?

| Embedded Documents (Denormalization)     | Referenced Documents (Normalization)            |
| ---------------------------------------- | ----------------------------------------------- |
| Store related data inside the same document | Store related data in separate documents      |
| Good for data that belongs together      | Good for data shared by multiple documents      |
| Faster to read together (no join)        | Useful for large or frequently changing data    |
| Example: User → Address                  | Example: User → Orders                          |

References are resolved with `populate()` in Mongoose or `$lookup` in aggregation. See [Embedding vs Referencing](./02-embedding-vs-referencing-normalization-vs-denormalization.md) for the diagram.

### Q4. What is indexing and why does it matter for performance?

An index stores a small part of a collection's data in an easy-to-search sorted order. It improves query performance by letting MongoDB find documents **without scanning the entire collection**.

See the [Indexing](./03-indexing.md) section above for the diagram and supported types.

### Q5. How do you analyze the performance of a slow query?

Use `explain("executionStats")` to see how MongoDB executes the query.

- Check the winning plan — is it using an index (`IXSCAN`) or a full collection scan (`COLLSCAN`)?
- Check `executionTimeMillis` — how long it took.
- Compare `totalDocsExamined` with `nReturned` — if MongoDB examined 100,000 documents to return 10, the index is missing or wrong.
- Create or improve an index based on the query's filter, sort, and projected fields.

```js
db.users.find({ email: "a@b.com" }).explain("executionStats");
```

```text
BAD                                   GOOD
winningPlan: COLLSCAN                 winningPlan: IXSCAN → FETCH
totalDocsExamined: 100000             totalDocsExamined: 1
nReturned: 1                          nReturned: 1
executionTimeMillis: 850              executionTimeMillis: 1
```

### Q6. What is a covered query?

A covered query is a query MongoDB can answer **entirely from an index**, without reading the actual documents from disk or cache.

This happens when all fields in the query **and** all fields returned are part of the index (and `_id` is excluded if not indexed).

```js
db.users.createIndex({ email: 1, name: 1 });
db.users.find({ email: "a@b.com" }, { _id: 0, name: 1 }); // covered
```

```text
Normal query:   index ──► find pointer ──► read document ──► return
Covered query:  index ──► return  (answer is already inside the index)
```

Covered queries are very fast because no document lookup is needed.

### Q7. Explain the Aggregation Framework and common pipeline stages.

The Aggregation Framework processes and transforms data to get useful results. It works like a **pipeline**: data passes through multiple stages, and each stage performs one operation on the output of the previous one.

| Stage      | Simple Meaning                            |
| ---------- | ----------------------------------------- |
| `$match`   | Filter documents                          |
| `$group`   | Group documents and calculate values      |
| `$project` | Select or change fields                   |
| `$sort`    | Sort documents                            |
| `$limit`   | Limit the number of documents             |
| `$skip`    | Skip documents                            |
| `$unwind`  | Convert array elements into separate documents |
| `$lookup`  | Join data from another collection         |

**Tip:** put `$match` and `$limit` as early as possible so later stages work on fewer documents, and so `$match` can use an index. See the [Aggregation Pipeline](./04-aggregation-pipeline.md) diagram.

### Q8. How does Mongoose schema validation work?

You define a schema with field types, required fields, defaults, enums, and custom validators. Mongoose validates the data **before** saving it to the database.

```js
const userSchema = new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age:   { type: Number, min: 18, max: 100 },
  role:  { type: String, enum: ["user", "admin"], default: "user" },
  phone: {
    type: String,
    validate: {
      validator: (v) => /^\d{11}$/.test(v),
      message: "Invalid phone number",
    },
  },
});
```

```text
user.save()
   │
   ▼
Mongoose validation ── fails ──► ValidationError (nothing sent to DB)
   │
 passes
   ▼
MongoDB write ── duplicate email ──► E11000 duplicate key error (from the unique INDEX)
```

**Note:** validation runs on `save()` and `create()`. Update operations like `findOneAndUpdate()` skip it unless you pass `{ runValidators: true }`. Also, `unique: true` is **not a validator** — it creates a unique index, and the error comes from MongoDB.

### Q9. Difference between Replication and Sharding?

These two models solve different scaling problems.

| Feature           | Replication (Replica Set)                        | Sharding                                        |
| ----------------- | ------------------------------------------------ | ----------------------------------------------- |
| Purpose           | High availability and data redundancy            | Horizontal scalability                          |
| Data Distribution | Every node holds an identical copy of the data   | Data is partitioned and split across shards     |
| Nodes             | 1 Primary (writes) + multiple Secondaries (reads) | Shards + Config Servers + router (`mongos`)     |
| Solves            | Server failure, read load                        | Data too large for one server, write load       |

```text
Replication: same data, many copies       Sharding: different data, many servers

[A B C D]  [A B C D]  [A B C D]           [A B]   [C D]   [E F]
 primary    secondary  secondary          shard1  shard2  shard3
```

In production they are used **together** — each shard is itself a replica set.

### Q10. When should you embed and when should you reference?

| Question to ask                                  | Embed | Reference |
| ------------------------------------------------ | ----- | --------- |
| Is it always read together with the parent?      | ✔     |           |
| Is the list small and bounded?                   | ✔     |           |
| Can it grow without limit (comments, logs)?      |       | ✔         |
| Is it shared by many parents (product, author)?  |       | ✔         |
| Is it updated often on its own?                  |       | ✔         |

```text
Blog post with comments

Few comments, always shown with the post  ──►  embed comments in post
Thousands of comments, paginated          ──►  comments collection with postId
```

### Q11. How do you paginate large collections efficiently?

`skip()` gets slower as the page number grows, because MongoDB still walks over all skipped documents.

```js
// Offset pagination — slow on page 10,000
db.posts.find().sort({ _id: -1 }).skip(200000).limit(20);

// Range (cursor) pagination — always fast, uses the _id index
db.posts.find({ _id: { $lt: lastSeenId } }).sort({ _id: -1 }).limit(20);
```

```text
skip(200000).limit(20)
[■■■■■■■■■■■■■■■■■■■■■■■■■ walk 200,000 docs ■■■■■■■■■■■■■■■■■■■■■][20 returned]

_id < lastSeenId .limit(20)
jump straight to lastSeenId via index ──► [20 returned]
```

Trade-off: range pagination cannot jump to "page 57" directly — it suits infinite scroll and "Next" buttons.

### Q12. What happens when a document grows beyond 16 MB?

The write fails. A single document cannot exceed **16 MB**. Usually this means an array was allowed to grow without limit — move that data into its own collection with a reference (see [Schema Design for One-to-Many](../level-2/02-schema-design-for-one-to-many.md)). For storing large files, use **GridFS** or object storage like S3.

```text
post { comments: [ c1, c2, c3, ... c500000 ] }   ✘ hits 16 MB, slow updates

post { _id: 1 }                                  ✔
comments { postId: 1, ... }  × 500,000
```

---
