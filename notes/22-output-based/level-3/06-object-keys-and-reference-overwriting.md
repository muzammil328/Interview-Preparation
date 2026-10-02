---
id: object-keys-and-reference-overwriting
title: "Object Keys and Reference Overwriting"
sidebar_label: "Object Keys and Reference Overwriting"
sidebar_position: 6
description: "Object Keys and Reference Overwriting — Output Based interview notes."
---
```js
const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
```

**Output:** `456`

Object keys are always **strings** (or symbols). Both `b` and `c` are converted with `toString()` to the same key `"[object Object]"`, so the second assignment overwrites the first.

```js
console.log(a); // { '[object Object]': 456 }
```

**Fix:** use a `Map`, which allows object references as real keys.

```js
const m = new Map();
m.set(b, 123);
m.set(c, 456);
console.log(m.get(b)); // 123
```

```text
a[b] = 123   b.toString() → "[object Object]"   a = { "[object Object]": 123 }
a[c] = 456   c.toString() → "[object Object]"   a = { "[object Object]": 456 }  ← overwritten
a[b]         b.toString() → "[object Object]"   → 456
```

---
