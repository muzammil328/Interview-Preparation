---
id: es-modules
title: "ES Modules"
sidebar_label: "ES Modules"
sidebar_position: 15
description: "ES Modules — JavaScript interview notes."
---
Official standard for packaging JavaScript code.

```javascript
// utils.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export default function greet(name) {
  return `Hello, ${name}`;
}

// app.js
import greet, { add, multiply } from './utils.js';
add(2, 3); // 5
greet('Jasmin'); // "Hello, Jasmin"
```

```text
utils.js                              app.js
┌────────────────────────┐
│ export default greet ──┼──────────► import greet          (any name)
│ export const add ──────┼──────────► import { add }        (exact name)
│ export const multiply ─┼──────────► import { multiply }
└────────────────────────┘
```

| Named export | Default export |
| ------------ | -------------- |
| Many per file | One per file |
| Imported with `{ }` and the exact name | Imported without `{ }`, any name |

---
