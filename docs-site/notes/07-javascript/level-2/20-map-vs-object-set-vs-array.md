---
id: map-vs-object-set-vs-array
title: "Map vs Object, Set vs Array"
sidebar_label: "Map vs Object, Set vs Array"
sidebar_position: 20
description: "Map vs Object, Set vs Array — JavaScript interview notes."
---
```javascript
const map = new Map();
map.set({ id: 1 }, 'object as key'); // any type can be a key
map.size; // 1

const set = new Set([1, 2, 2, 3]);    // duplicates removed
[...set]; // [1, 2, 3]

// Remove duplicates from an array — very common
const unique = [...new Set([1, 1, 2, 3, 3])]; // [1, 2, 3]
```

| Object | Map |
| ------ | --- |
| Keys are strings / symbols | Keys can be **anything** (objects too) |
| No `.size` (use `Object.keys().length`) | `.size` |
| Not directly iterable | Iterable, keeps insertion order |
| Good for fixed records (`user`) | Good for frequent add/remove, lookups |

```text
Array [1, 2, 2, 3]  ──► new Set() ──► {1, 2, 3}   only unique values
```

---
