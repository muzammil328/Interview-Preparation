---
id: schema-design-for-one-to-many
title: "Schema Design for One-to-Many"
sidebar_label: "Schema Design for One-to-Many"
sidebar_position: 2
description: "Schema Design for One-to-Many — MongoDB interview notes."
---
Pick the pattern based on **how many** children there are.

| Relationship       | Example                     | Pattern                                  |
| ------------------ | --------------------------- | ---------------------------------------- |
| One-to-few         | User → addresses (2–3)      | **Embed** the array in the parent        |
| One-to-many        | Product → parts (hundreds)  | **Array of references** in the parent    |
| One-to-squillions  | Server → log entries (millions) | **Parent reference** in each child   |

```text
One-to-few (embed)        One-to-many (child refs)       One-to-squillions (parent ref)

user {                    product {                      host { _id: "h1" }
  addresses: [              parts: [ObjectId(p1),
    { city: "A" },                  ObjectId(p2), ...]   log { hostId: "h1", msg: "..." }
    { city: "B" }         }                              log { hostId: "h1", msg: "..." }
  ]                                                      log { hostId: "h1", msg: "..." }
}                                                        ... millions, each points UP
```

**Rule:** never let an array grow without limit — a document has a **16 MB** maximum size, and huge arrays make every update slow.
