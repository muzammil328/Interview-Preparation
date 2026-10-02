---
id: closure-counter
title: "Closure Counter"
sidebar_label: "Closure Counter"
sidebar_position: 3
description: "Closure Counter — Output Based interview notes."
---
```js
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counterA = createCounter();
const counterB = createCounter();

console.log(counterA());
console.log(counterA());
console.log(counterB());
```

**Output:** `1`, `2`, `1`

Each call to `createCounter()` creates a **new** `count` variable. The returned function keeps a reference to its own one.

```text
createCounter() #1               createCounter() #2
┌──────────────────┐            ┌──────────────────┐
│ count: 0 → 1 → 2 │◄─counterA  │ count: 0 → 1     │◄─counterB
└──────────────────┘            └──────────────────┘

counterA() → 1    counterA() → 2    counterB() → 1   (separate memory)
```

---
