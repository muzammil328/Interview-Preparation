---
id: null-vs-undefined
title: "null vs undefined"
sidebar_label: "null vs undefined"
sidebar_position: 5
description: "null vs undefined — JavaScript interview notes."
---
| null                            | undefined                        |
| ------------------------------- | -------------------------------- |
| Means intentionally no value    | Means a value has not been assigned |
| Usually assigned by the developer | Usually happens automatically   |
| Example: `user = null`          | Example: `let user;`             |
| `typeof` → `"object"` (JS quirk) | `typeof` → `"undefined"`        |

```text
let a;          a ──► [ undefined ]   "box exists, nothing put in yet"
let b = null;   b ──► [   null    ]   "box exists, deliberately emptied"
```

```javascript
null == undefined;  // true  (loose equality treats them as equal)
null === undefined; // false (different types)
```
