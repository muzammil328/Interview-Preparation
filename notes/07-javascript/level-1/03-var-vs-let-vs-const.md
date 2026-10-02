---
id: var-vs-let-vs-const
title: "var vs let vs const"
sidebar_label: "var vs let vs const"
sidebar_position: 3
description: "var vs let vs const — JavaScript interview notes."
---
| Feature        | var | let       | const     |
| -------------- | --- | --------- | --------- |
| Global Scope   | yes | yes       | yes       |
| Function Scope | yes | yes       | yes       |
| Block Scope    | no  | yes       | yes       |
| Reassigned     | yes | yes       | no        |
| Redeclared     | yes | no        | no        |
| Hoisted        | yes (as `undefined`) | yes (TDZ) | yes (TDZ) |
| Becomes `window.x` at top level | yes | no | no |

```text
function test() {           ┌─ function scope ─────────────┐
  if (true) {               │  ┌─ block scope ──────────┐  │
    var a = 1;              │  │  a → leaks out ───────────┼─► visible in function
    let b = 2;              │  │  b → stays inside        │  │
    const c = 3;            │  │  c → stays inside        │  │
  }                         │  └──────────────────────────┘  │
  console.log(a); // 1      │                                │
  console.log(b); // Error  └────────────────────────────────┘
}
```

`const` stops **reassignment**, not mutation: `const arr = []; arr.push(1)` works.
