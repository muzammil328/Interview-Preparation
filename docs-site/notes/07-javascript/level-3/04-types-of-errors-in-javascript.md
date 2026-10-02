---
id: types-of-errors-in-javascript
title: "Types of Errors in JavaScript"
sidebar_label: "Types of Errors in JavaScript"
sidebar_position: 4
description: "Types of Errors in JavaScript — JavaScript interview notes."
---
```text
            Errors
              │
   ┌──────────┼───────────────┐
 Syntax     Runtime         Logical
 (won't     (crashes while  (runs fine,
  parse)     running)        wrong result)
              │
   ReferenceError  TypeError  RangeError
```

| Error | Example |
| ----- | ------- |
| `SyntaxError` | `let x = ;` |
| `ReferenceError` | Using a variable that doesn't exist |
| `TypeError` | `undefined.name`, calling a non-function |
| `RangeError` | `new Array(-1)`, infinite recursion |
| Logical error | `total = price - tax` instead of `+` — no message at all |

```javascript
try {
  null.name;
} catch (err) {
  console.log(err.name);    // "TypeError"
  console.log(err.message); // "Cannot read properties of null..."
} finally {
  console.log('always runs');
}
```

---
