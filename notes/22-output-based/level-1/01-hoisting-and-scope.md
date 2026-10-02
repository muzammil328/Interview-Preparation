---
id: hoisting-and-scope
title: "Hoisting and Scope"
sidebar_label: "Hoisting and Scope"
sidebar_position: 1
description: "Hoisting and Scope — Output Based interview notes."
---
How to read the trace diagrams:

- **Call Stack** — the code running right now.
- **Microtask Queue** — `Promise.then`, `await`, `queueMicrotask` (high priority, drained fully).
- **Macrotask Queue** — `setTimeout`, `setInterval`, I/O (one task at a time).
- **Output** — what has been printed so far.

---

```js
console.log(a);
var a = 10;
```

**Output:** `undefined`

`var` is hoisted and initialized with `undefined`.

```js
console.log(b);
let b = 20;
```

**Output:** `ReferenceError: Cannot access 'b' before initialization`

`let` and `const` are hoisted too, but stay in the **Temporal Dead Zone** until the declaration runs.

```text
Creation phase (before any line runs)     Execution phase
┌──────────────────────────────┐
│ a → undefined   (var)        │  line 1: console.log(a) → undefined
│ b → <uninitialized> (TDZ)    │  line 1: console.log(b) → ReferenceError
└──────────────────────────────┘
          a = 10 / b = 20 only happens when that line executes
```

---
