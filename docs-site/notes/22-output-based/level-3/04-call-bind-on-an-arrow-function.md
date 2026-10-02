---
id: call-bind-on-an-arrow-function
title: "call / bind on an Arrow Function"
sidebar_label: "call / bind on an Arrow Function"
sidebar_position: 4
description: "call / bind on an Arrow Function — Output Based interview notes."
---
```js
const arrow = () => this;
const regular = function () {
  return this;
};
const obj = { id: 1 };

console.log(regular.call(obj) === obj);
console.log(arrow.call(obj) === obj);
```

**Output:** `true`, `false`

Arrow functions have **no own `this`**, so `call`, `apply`, and `bind` cannot change it. It always comes from where the arrow was written.

```text
regular.call(obj)  → this = obj               ✓ changed
arrow.call(obj)    → obj is ignored
                     this = outer scope's this ✗ not changed
```

---
