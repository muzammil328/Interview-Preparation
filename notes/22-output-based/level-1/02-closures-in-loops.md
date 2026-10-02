---
id: closures-in-loops
title: "Closures in Loops"
sidebar_label: "Closures in Loops"
sidebar_position: 2
description: "Closures in Loops — Output Based interview notes."
---
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

**Output:** `3`, `3`, `3`

`var` is function-scoped, so all three callbacks share the **same** `i`. By the time the timers fire, the loop has finished and `i` is `3`.

**Fix:** use `let`, which creates a new binding per iteration.

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// 0, 1, 2
```

```text
var — ONE shared box                 let — a NEW box per iteration

  cb1 ─┐                               cb1 ──► [ i = 0 ]
  cb2 ─┼──► [ i ]  0 → 1 → 2 → 3        cb2 ──► [ i = 1 ]
  cb3 ─┘                               cb3 ──► [ i = 2 ]

After 1s every callback reads i = 3   After 1s each reads its own box
Output: 3 3 3                          Output: 0 1 2
```

**Fix without `let` (often asked as a follow-up):** wrap the body in an IIFE so each iteration gets its own copy.

```js
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => console.log(j), 0);
  })(i);
}
// 0, 1, 2
```

```text
iteration 0 → IIFE(0) → new scope { j = 0 } ◄── cb1
iteration 1 → IIFE(1) → new scope { j = 1 } ◄── cb2
iteration 2 → IIFE(2) → new scope { j = 2 } ◄── cb3
```

---
