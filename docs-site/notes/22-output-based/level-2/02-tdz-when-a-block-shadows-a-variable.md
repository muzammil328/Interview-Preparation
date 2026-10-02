---
id: tdz-when-a-block-shadows-a-variable
title: "TDZ When a Block Shadows a Variable"
sidebar_label: "TDZ When a Block Shadows a Variable"
sidebar_position: 2
description: "TDZ When a Block Shadows a Variable — Output Based interview notes."
---
```js
let x = 1;
{
  console.log(x);
  let x = 2;
}
```

**Output:** `ReferenceError: Cannot access 'x' before initialization`

You might expect `1` from the outer scope. But the inner `let x` is hoisted to the top of the **block**, so the block has its own `x` that is still in the TDZ.

```text
Outer scope: x = 1
┌─ block ──────────────────────────────┐
│ x → <uninitialized> (TDZ)            │ ◄── lookup stops HERE
│ console.log(x)  → ReferenceError     │     (never reaches outer x = 1)
│ let x = 2                            │
└──────────────────────────────────────┘
```

---
