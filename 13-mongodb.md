# MongoDB Interview

- **NoSQL and Non-relational** document-oriented database
- Store data in **BSON (Binary JSON)** format
- Prefer **denormalization** for performance

## Structure

- **Database**: Container for collections
- **Collection**: Group of documents (like table)
- **Document**: Single record (like rows)
- **Field**: Key-value pair in document

## Features

- Flexible schema
- High performance
- Horizontal Scalability
- Support nested and unstructured data

## Difference Between BSON and JSON

| BSON                       | JSON                   |
| -------------------------- | ---------------------- |
| Binary                     | Text                   |
| Faster (Machine Readable)  | Slower                 |
| Support more types         | Limited Types          |
| Used internally by MongoDB | Used for data exchange |

## MongoDB Data Types

### Common

- String
- Number
- Boolean
- Array
- Object
- Date
- ObjectId
- Null
- Binary

### Special

- Timestamp
- Decimal128

## Aggregation Pipeline

Process data in stages where each stage transforms the output of the previous one.

### Pipeline Stages

- `$match` → Filter documents
- `$group` → Group and aggregate
- `$project` → Select fields
- `$sort` → Sort results
- `$skip` → Skip documents
- `$limit` → Limit results
- `$count` → Count total

### Pipeline Operators

- `$filter`: Filter array
- `$group`: Group data
- `$facet`: Parallel processing - run multiple independent aggregation pipelines on same documents
- `$project`: Select which fields to include/exclude
- `$lookup`: Join data from another collection (returns array)
- `$unwind`: Deconstruct array into individual documents

### Sort Order

- `1` = Ascending (small to big, A to Z)
- `-1` = Descending (big to small, Z to A)

## Indexing

Store a small portion of data in a sorted structure to make queries faster.

- **Without indexing**: Full collection scan
- **With indexing**: Direct lookup

### Index Types

- **Single Index**: One field
- **Compound Index**: More than one field
- **Unique Index**: Unique values only, prevent duplicates
- **Multi Key Index**: For array fields
- **Text Index**: For text search
- **Geospatial Index**: For location based queries
- **Hashed Index**: For sharding
- **TTL Index**: Auto-delete documents after specific time (sessions, logs, temp data)

### How Indexing Improves Performance

- Reduce search space
- Avoid full collection scan
- Speed up read operations
- Low CPU and memory usage

### Disadvantage of Indexing

- Slow down writes because indexes also need to be updated

## Cluster

Multiple MongoDB servers working together for performance, scalability, and reliability.

### Types

1. **Replica Set**: Same data on multiple servers
   - Primary (writes)
   - Secondary (copies, can read)
   - If primary down, secondary becomes primary

2. **Sharded Cluster**: Split data across multiple servers
   - Each server stores specific part of data

## Replication

Duplicate data across multiple servers.

## Sharding

Horizontal data split across multiple servers - each holds a subset of data.

## Transaction

Ensures multiple database operations either all succeed or all fail together. Sequence of operations executed as a single unit.

## Data Redundancy

Store duplicate data in multiple documents - improves performance but can cause inconsistency.

## Mongoose

**Object Data Model (ODM)** for MongoDB.

- Schema-based
- Built-in validation, middleware, and query helpers

### Key Concepts

- **Schema**: Blueprint of documents (fields, data types, validations)
- **Model**: Interact with database using defined schema
- **Middleware**: Pre hook (before) and Post hook (after)

## Operations

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
| `upsert()`     | Update if exists, create if not |
| `create()`     | Create and save in one step     |
| `save()`       | Save after creating/modifying   |

## Query Performance

Use `explain()` to analyze query execution.

## Populate()

Find related documents from another collection by replacing ObjectId references with actual data.

## aggregate()

Returns a cursor (iterator) - streams data, doesn't dump all at once. Retrieves documents one by one.

### Cursor

- Pointer/iterator
- Retrieves documents one by one
- Doesn't load all data into memory

## Difference Between lean() and mongoose Documents

| lean()              | mongoose Query           |
| ------------------- | ------------------------ |
| Return plain object | Return mongoose document |
| Faster              | Slower                   |
| Less memory         | More memory              |
| No methods          | Has methods              |

## Handling Large Dataset

- Sharding
- Cursors
- Batch Operations
- Aggregation pipelines

## Optimizing MongoDB Queries

- Proper indexing
- Return only required fields
- Use aggregations
- Use lean() for heavy reads
- Limit results

## Normalization vs Denormalization

| Normalization                      | Denormalization                             |
| ---------------------------------- | ------------------------------------------- |
| Use references                     | Use embedding                               |
| Store data in separate collections | Store related data together (same document) |
| Data duplication avoided           | Data redundancy for fast access             |
| Use IDs to link documents          | No joins needed                             |
| Better for frequent updates        | Better for frequent reads                   |

## Common Questions

### Q1. How does MongoDB store data?

MongoDB stores documents in **BSON (Binary JSON)** format. BSON supports extra data types that JSON does not, such as `Date`, `ObjectId`, `Decimal128`, and binary data.

### Q2. What is the `_id` field and the structure of an ObjectId?

`_id` uniquely identifies a document in a collection. If you don't provide one, MongoDB generates an **ObjectId**, which is **12 bytes**:

| Part         | Size    | Meaning                          |
| ------------ | ------- | -------------------------------- |
| Timestamp    | 4 bytes | Creation time (seconds)          |
| Random value | 5 bytes | Unique per machine/process       |
| Counter      | 3 bytes | Incrementing counter             |

Because the first 4 bytes are a timestamp, sorting by `_id` roughly sorts by creation time.

### Q3. How does MongoDB handle relationships?

| Embedded Documents (Denormalization)     | Referenced Documents (Normalization)            |
| ---------------------------------------- | ----------------------------------------------- |
| Store related data inside the same document | Store related data in separate documents      |
| Good for data that belongs together      | Good for data shared by multiple documents      |
| Faster to read together (no join)        | Useful for large or frequently changing data    |
| Example: User → Address                  | Example: User → Orders                          |

References are resolved with `populate()` in Mongoose or `$lookup` in aggregation.

### Q4. What is indexing and why does it matter for performance?

An index stores a small part of a collection's data in an easy-to-search sorted order. It improves query performance by letting MongoDB find documents **without scanning the entire collection**.

See the [Index Types](#index-types) section above for the supported types.

### Q5. How do you analyze the performance of a slow query?

Use `explain("executionStats")` to see how MongoDB executes the query.

- Check the winning plan — is it using an index (`IXSCAN`) or a full collection scan (`COLLSCAN`)?
- Check `executionTimeMillis` — how long it took.
- Compare `totalDocsExamined` with `nReturned` — if MongoDB examined 100,000 documents to return 10, the index is missing or wrong.
- Create or improve an index based on the query's filter, sort, and projected fields.

```js
db.users.find({ email: "a@b.com" }).explain("executionStats");
```

### Q6. What is a covered query?

A covered query is a query MongoDB can answer **entirely from an index**, without reading the actual documents from disk or cache.

This happens when all fields in the query **and** all fields returned are part of the index (and `_id` is excluded if not indexed).

```js
db.users.createIndex({ email: 1, name: 1 });
db.users.find({ email: "a@b.com" }, { _id: 0, name: 1 }); // covered
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

**Tip:** put `$match` and `$limit` as early as possible so later stages work on fewer documents, and so `$match` can use an index.

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

**Note:** validation runs on `save()` and `create()`. Update operations like `findOneAndUpdate()` skip it unless you pass `{ runValidators: true }`.

### Q9. Difference between Replication and Sharding?

These two models solve different scaling problems.

| Feature           | Replication (Replica Set)                        | Sharding                                        |
| ----------------- | ------------------------------------------------ | ----------------------------------------------- |
| Purpose           | High availability and data redundancy            | Horizontal scalability                          |
| Data Distribution | Every node holds an identical copy of the data   | Data is partitioned and split across shards     |
| Nodes             | 1 Primary (writes) + multiple Secondaries (reads) | Shards + Config Servers + router (`mongos`)     |
| Solves            | Server failure, read load                        | Data too large for one server, write load       |

In production they are used **together** — each shard is itself a replica set.

### Q10. Difference between `insert()`, `insertOne()`, and `save()`?

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
