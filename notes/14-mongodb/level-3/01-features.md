---
id: features
title: "Features"
sidebar_label: "Features"
sidebar_position: 1
description: "Features — MongoDB interview notes."
---
- Flexible schema
- High performance
- Horizontal Scalability
- Support nested and unstructured data

```text
One document can hold nested objects and arrays — no extra table needed:

{
  _id: ObjectId("..."),
  name: "Ali",
  address: { city: "Lahore", zip: "54000" },   ← nested object
  skills:  ["node", "react"]                    ← array
}
```
