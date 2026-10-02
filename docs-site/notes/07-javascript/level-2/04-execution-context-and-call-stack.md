---
id: execution-context-and-call-stack
title: "Execution Context and Call Stack"
sidebar_label: "Execution Context and Call Stack"
sidebar_position: 4
description: "Execution Context and Call Stack — JavaScript interview notes."
---
Every time JavaScript runs code, it creates an **execution context**. It has two phases:

1. **Creation (memory) phase** — variables and functions are registered (this is where hoisting happens).
2. **Execution (code) phase** — code runs line by line and values are assigned.

```javascript
var n = 2;
function square(num) {
  return num * num;
}
var result = square(n);
```

```text
Global Execution Context
┌───────────────────────────┬──────────────────────────────┐
│ Memory (creation phase)   │ Code (execution phase)       │
├───────────────────────────┼──────────────────────────────┤
│ n      : undefined → 2    │ n = 2                        │
│ square : function {...}   │ result = square(n) ──┐       │
│ result : undefined → 4    │                      │       │
└───────────────────────────┴──────────────────────┼───────┘
                                                   ▼
                     square() Execution Context (new, then destroyed)
                     ┌──────────────────┬──────────────────┐
                     │ num : 2          │ return 2 * 2 = 4 │
                     └──────────────────┴──────────────────┘
```

The **call stack** tracks which context is running:

```text
 call square()        square returns        program ends

 ┌──────────┐
 │ square() │
 ├──────────┤         ┌──────────┐
 │  global  │         │  global  │          (empty)
 └──────────┘         └──────────┘
```

Too many nested calls (e.g. infinite recursion) → **"Maximum call stack size exceeded"** (stack overflow).

---
