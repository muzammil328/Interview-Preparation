---
id: accidental-global-var-a-b-5
title: "Accidental Global: var a = b = 5"
sidebar_label: "Accidental Global: var a = b = 5"
sidebar_position: 2
description: "Accidental Global: var a = b = 5 — Output Based interview notes."
---
```js
(function () {
  var a = b = 5;
})();

console.log(typeof a);
console.log(typeof b);
```

**Output:** `undefined`, `number`

The line is read **right to left**: `b = 5` first (no `var`, so `b` becomes a **global**), then `var a = b` (a local).

```text
var a = b = 5;
        └─┬─┘
          1. b = 5      → b is not declared → creates global b  (sloppy mode)
  └──┬─┘
     2. var a = b       → a is local to the IIFE

After IIFE:  a → gone (local)   → typeof a = "undefined"
             b → 5 (global)     → typeof b = "number"
```

In strict mode, step 1 throws `ReferenceError: b is not defined`.

---
