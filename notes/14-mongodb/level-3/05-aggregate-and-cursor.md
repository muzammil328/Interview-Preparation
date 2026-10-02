---
id: aggregate-and-cursor
title: "aggregate() and Cursor"
sidebar_label: "aggregate() and Cursor"
sidebar_position: 5
description: "aggregate() and Cursor — MongoDB interview notes."
---
In the MongoDB shell and native driver, `aggregate()` returns a **cursor** — it streams data instead of loading everything at once.

In **Mongoose**, `Model.aggregate()` returns an `Aggregate` object; `await` gives you a full **array**. Call `.cursor()` to stream instead.

### Cursor

- Pointer/iterator
- Retrieves documents in batches, one by one for your code
- Doesn't load all data into memory

```text
MongoDB  ──batch 1 (101 docs)──►  cursor  ──► for await (const doc of cursor) { ... }
         ──batch 2 ────────────►
         ──batch 3 ────────────►   memory stays small
```
