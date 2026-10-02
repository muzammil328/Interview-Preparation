---
id: pure-functions-and-side-effects
title: "Pure Functions and Side Effects"
sidebar_label: "Pure Functions and Side Effects"
sidebar_position: 23
description: "Pure Functions and Side Effects — JavaScript interview notes."
---
A **pure function** always returns the same output for the same input and changes nothing outside itself.

```javascript
// ✓ Pure
const add = (a, b) => a + b;

// ✗ Impure — depends on / changes outside state
let total = 0;
const addToTotal = n => (total += n);
```

```text
Pure:    input ──► [ function ] ──► output        nothing else touched
Impure:  input ──► [ function ] ──► output
                        │
                        └──► changes DB / global / DOM / console  (side effect)
```

React reducers, `map` callbacks and memoized functions should be pure.

---
