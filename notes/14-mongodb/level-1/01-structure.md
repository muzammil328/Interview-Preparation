---
id: structure
title: "Structure"
sidebar_label: "Structure"
sidebar_position: 1
description: "Structure — MongoDB interview notes."
---
- **NoSQL and Non-relational** document-oriented database
- Store data in **BSON (Binary JSON)** format
- Often prefers **embedding (denormalization)** for read performance — "data that is read together is stored together"

- **Database**: Container for collections
- **Collection**: Group of documents (like table)
- **Document**: Single record (like rows)
- **Field**: Key-value pair in document

```text
SQL world              MongoDB world
─────────              ─────────────
Database      ───►     Database
Table         ───►     Collection
Row           ───►     Document   { _id, name, address: {...}, tags: [...] }
Column        ───►     Field
JOIN          ───►     Embedding  or  $lookup / populate()
```
