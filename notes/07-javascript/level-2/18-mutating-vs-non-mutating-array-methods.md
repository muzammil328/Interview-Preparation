---
id: mutating-vs-non-mutating-array-methods
title: "Mutating vs Non-Mutating Array Methods"
sidebar_label: "Mutating vs Non-Mutating Array Methods"
sidebar_position: 18
description: "Mutating vs Non-Mutating Array Methods — JavaScript interview notes."
---
```text
MUTATE the original              RETURN a new array (original safe)
push  pop  shift  unshift        map  filter  slice  concat
splice  sort  reverse  fill      toSorted  toReversed  toSpliced  (ES2023)
```

### slice vs splice

```javascript
const a = [1, 2, 3, 4, 5];
a.slice(1, 3);   // [2, 3]   a is unchanged
a.splice(1, 2);  // [2, 3]   a is now [1, 4, 5]
```

```text
slice(1, 3)  → copy index 1 up to (not incl.) 3       original untouched
[1, 2, 3, 4, 5]
    └──┘

splice(1, 2) → REMOVE 2 items starting at index 1     original changed
[1, ✂2, ✂3, 4, 5]  →  [1, 4, 5]
```

### The sort() trap

```javascript
[10, 1, 5, 100].sort();               // [1, 10, 100, 5]  ✗ sorts as strings
[10, 1, 5, 100].sort((a, b) => a - b); // [1, 5, 10, 100]  ✓
```

---
