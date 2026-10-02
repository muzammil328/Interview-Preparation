---
id: for-in-vs-for-of
title: "for...in vs for...of"
sidebar_label: "for...in vs for...of"
sidebar_position: 19
description: "for...in vs for...of — JavaScript interview notes."
---
```javascript
const arr = ['a', 'b', 'c'];
for (const i in arr) console.log(i);   // "0" "1" "2"   — keys
for (const v of arr) console.log(v);   // "a" "b" "c"   — values

const obj = { x: 1, y: 2 };
for (const k in obj) console.log(k);   // "x" "y"
// for (const v of obj) → TypeError: obj is not iterable
```

```text
           index:  0    1    2
           value: 'a'  'b'  'c'
for...in  ──────► keys ▲
for...of  ──────────────── values ▲
```

| `for...in` | `for...of` |
| ---------- | ---------- |
| Loops over **keys** | Loops over **values** |
| Works on objects | Works on iterables (arrays, strings, Map, Set) |
| Also walks inherited keys | Only the iterable's values |

---
