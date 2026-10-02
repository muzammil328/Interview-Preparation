---
id: difference-between-bson-and-json
title: "Difference Between BSON and JSON"
sidebar_label: "Difference Between BSON and JSON"
sidebar_position: 1
description: "Difference Between BSON and JSON — MongoDB interview notes."
---
| BSON                       | JSON                   |
| -------------------------- | ---------------------- |
| Binary                     | Text                   |
| Faster (Machine Readable)  | Slower                 |
| Support more types         | Limited Types          |
| Used internally by MongoDB | Used for data exchange |

```text
Client (JSON)  ──►  Driver encodes  ──►  BSON stored on disk
Client (JSON)  ◄──  Driver decodes  ◄──  BSON read from disk
```
