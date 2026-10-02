---
id: nan-property
title: "NaN Property"
sidebar_label: "NaN Property"
sidebar_position: 1
description: "NaN Property — JavaScript interview notes."
---
NaN = "Not-a-Number". It is the result of a failed number operation, and it is the only value not equal to itself.

```javascript
typeof NaN; // Returns "number"
NaN === NaN; // false

isNaN('Hello'); // Returns true  (global isNaN coerces first)
isNaN(345); // Returns false
isNaN('1'); // Returns false (converted to 1)
isNaN(true); // Returns false (converted to 1)
isNaN(undefined); // Returns true

Number.isNaN('Hello'); // false — no coercion, only true for real NaN ✓ prefer this
Number.isNaN(NaN);     // true
```

```text
isNaN('Hello')         Number.isNaN('Hello')
   │                        │
Number('Hello') → NaN       is it the value NaN? no
   │                        │
 true                     false
```
