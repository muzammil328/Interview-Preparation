---
id: bind-twice
title: "bind Twice"
sidebar_label: "bind Twice"
sidebar_position: 3
description: "bind Twice — Output Based interview notes."
---
```js
function show() {
  return this.name;
}
const a = show.bind({ name: 'A' });
const b = a.bind({ name: 'B' });
console.log(b());
```

**Output:** `A`

A bound function's `this` is **locked forever**. Binding it again creates a new wrapper, but the inner function still uses the first `this`.

```text
b() ──► wrapper(this = B) ──► a ──► wrapper(this = A) ──► show()   this = A ✓
                                    └── first bind wins
```

---
