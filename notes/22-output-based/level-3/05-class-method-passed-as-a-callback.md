---
id: class-method-passed-as-a-callback
title: "Class Method Passed as a Callback"
sidebar_label: "Class Method Passed as a Callback"
sidebar_position: 5
description: "Class Method Passed as a Callback — Output Based interview notes."
---
```js
class Counter {
  count = 0;
  inc() {
    this.count++;
    return this.count;
  }
}

const c = new Counter();
const fn = c.inc;
fn();
```

**Output:** `TypeError: Cannot read properties of undefined (reading 'count')`

Class bodies are always in **strict mode**, so a detached method gets `this = undefined` (not the global object). This is the same bug as `onClick={this.handleClick}` in old React class components.

```text
c.inc()   → this = c          → works
fn()      → this = undefined  → undefined.count → TypeError
```

**Fixes:** `c.inc.bind(c)`, `() => c.inc()`, or define it as an arrow field: `inc = () => { ... }`.

---
