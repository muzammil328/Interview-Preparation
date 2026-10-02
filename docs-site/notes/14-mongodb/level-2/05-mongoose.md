---
id: mongoose
title: "Mongoose"
sidebar_label: "Mongoose"
sidebar_position: 5
description: "Mongoose — MongoDB interview notes."
---
**Object Data Model (ODM)** for MongoDB.

- Schema-based
- Built-in validation, middleware, and query helpers

### Key Concepts

- **Schema**: Blueprint of documents (fields, data types, validations)
- **Model**: Interact with database using defined schema
- **Middleware**: Pre hook (before) and Post hook (after)

```text
Schema (rules) ──► Model (User) ──► Document (one user)
                                       │
                         save() ──► pre('save') ──► validate ──► MongoDB ──► post('save')
```

```js
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
```
