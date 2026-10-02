---
id: currying
title: "Currying"
sidebar_label: "Currying"
sidebar_position: 6
description: "Currying — JavaScript interview notes."
---
Transforms a function of n arguments to n functions of one or fewer arguments.

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}
add(3)(4); // Returns 7

// Converting multiply(a,b) to curried form
function multiply(a, b) {
  return a * b;
}
function currying(fn) {
  return function (a) {
    return function (b) {
      return fn(a, b);
    };
  };
}
var curriedMultiply = currying(multiply);
curriedMultiply(4)(3); // Returns 12
```

```text
add(3)(4)
  │
  ├─ add(3)  → returns  function (b) { return 3 + b }   ← closure remembers a = 3
  │
  └─ (4)     → 3 + 4 = 7
```

Useful for creating pre-configured functions: `const addTax = multiply(1.17)` style helpers.

---
