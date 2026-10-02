---
id: spread-is-a-shallow-copy
title: "Spread Is a Shallow Copy"
sidebar_label: "Spread Is a Shallow Copy"
sidebar_position: 6
description: "Spread Is a Shallow Copy — Output Based interview notes."
---
```js
const original = { name: 'Ali', address: { city: 'Lahore' } };
const copy = { ...original };

copy.name = 'Sara';
copy.address.city = 'Karachi';

console.log(original.name);
console.log(original.address.city);
```

**Output:** `Ali`, `Karachi`

Spread copies only the **top level**. Nested objects are still shared. Use `structuredClone()` for a deep copy.

```text
original ──► { name: 'Ali',  address: ─┐ }
                                       ├──► { city: 'Lahore' → 'Karachi' }
copy     ──► { name: 'Sara', address: ─┘ }

name    → copied (separate)       address → shared reference
```

---
