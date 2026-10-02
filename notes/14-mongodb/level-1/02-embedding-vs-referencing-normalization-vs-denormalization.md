---
id: embedding-vs-referencing-normalization-vs-denormalization
title: "Embedding vs Referencing (Normalization vs Denormalization)"
sidebar_label: "Embedding vs Referencing (Normalization vs Denormalization)"
sidebar_position: 2
description: "Embedding vs Referencing (Normalization vs Denormalization) — MongoDB interview notes."
---
This is the most important MongoDB design question.

| Normalization                      | Denormalization                             |
| ---------------------------------- | ------------------------------------------- |
| Use references                     | Use embedding                               |
| Store data in separate collections | Store related data together (same document) |
| Data duplication avoided           | Data redundancy for fast access             |
| Use IDs to link documents          | No joins needed                             |
| Better for frequent updates        | Better for frequent reads                   |

```text
EMBEDDING (one read)                    REFERENCING (two reads / $lookup)

users                                   users                  orders
{                                       {                      { _id: 501,
  _id: 1,                                 _id: 1,                userId: 1,  ──► points to users._id
  name: "Ali",                            name: "Ali"            total: 300 }
  address: {                            }                      { _id: 502,
    city: "Lahore"                                               userId: 1,
  }                                                              total: 120 }
}
```

**Embed when:** the data belongs to the parent, is read together, and is small/bounded (address, profile settings).

**Reference when:** the data is large, grows without limit, is shared by many documents, or changes independently (orders, comments, products).

### Data Redundancy

Embedding stores duplicate data in multiple documents — improves read performance but can cause inconsistency (for example, a product name copied into 10,000 orders must be updated everywhere if it changes).
