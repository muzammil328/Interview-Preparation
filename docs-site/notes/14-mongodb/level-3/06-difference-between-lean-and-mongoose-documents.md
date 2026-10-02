---
id: difference-between-lean-and-mongoose-documents
title: "Difference Between lean() and mongoose Documents"
sidebar_label: "Difference Between lean() and mongoose Documents"
sidebar_position: 6
description: "Difference Between lean() and mongoose Documents — MongoDB interview notes."
---
| lean()              | mongoose Query           |
| ------------------- | ------------------------ |
| Return plain object | Return mongoose document |
| Faster              | Slower                   |
| Less memory         | More memory              |
| No methods          | Has methods (`save()`, getters, virtuals) |

```text
User.find()          ──► MongoDB ──► raw data ──► wrap in Mongoose Document (heavy) ──► you
User.find().lean()   ──► MongoDB ──► raw data ──────────────────────────────────────► you (plain JS object)
```
