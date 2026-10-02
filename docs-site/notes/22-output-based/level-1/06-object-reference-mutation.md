---
id: object-reference-mutation
title: "Object Reference Mutation"
sidebar_label: "Object Reference Mutation"
sidebar_position: 6
description: "Object Reference Mutation — Output Based interview notes."
---
```js
const a = { value: 1 };
const b = a;
b.value = 2;
console.log(a.value);

let x = 1;
let y = x;
y = 2;
console.log(x);
```

**Output:** `2`, `1`

Objects are copied **by reference** — `a` and `b` point to the same object. Primitives are copied **by value**.

```text
Objects (reference)                    Primitives (value)

 a ──┐                                  x ──► [ 1 ]
     ├──► { value: 1 → 2 }              y ──► [ 1 → 2 ]   (separate copy)
 b ──┘

a.value → 2                             x → 1
```

---
