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
