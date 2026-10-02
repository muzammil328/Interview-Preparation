---
id: hoisting
title: "Hoisting"
sidebar_label: "Hoisting"
sidebar_position: 2
description: "Hoisting — JavaScript interview notes."
---
- Hoisting means declarations are processed **before** the code runs, so they behave as if they were moved to the top of their scope. (Nothing actually moves — the engine just registers them first.)
- Only declarations are hoisted, not initializations.
- Function **declarations** are hoisted completely (you can call them before they appear).
- `var` is hoisted and set to `undefined`.
- `let` and `const` are hoisted but stay in the **Temporal Dead Zone** until their line runs.
- Strict mode does **not** turn off hoisting.

```text
What you write                 How the engine sees it (creation phase)

console.log(a);                var a = undefined;      ← hoisted + initialized
var a = 10;                    let b;  (TDZ)           ← hoisted, NOT initialized
console.log(b);                function greet() {...}  ← hoisted fully
let b = 20;
greet();                       console.log(a);  // undefined
function greet() {...}         a = 10;
                               console.log(b);  // ReferenceError
```

### Temporal Dead Zone (TDZ)

The TDZ is the period between entering a scope and initializing a `let` or `const` variable. Accessing the variable during this period throws a `ReferenceError`.

```text
{                                   ─┐
  console.log(b); // ReferenceError  │  TDZ for b
  ...                                │
  let b = 20;                       ─┘  b is ready from here
  console.log(b); // 20
}
```

```javascript
console.log(a); // undefined  (var is initialized as undefined)
var a = 10;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
```
