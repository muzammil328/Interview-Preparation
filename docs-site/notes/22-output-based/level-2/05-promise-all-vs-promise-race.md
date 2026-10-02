---
id: promise-all-vs-promise-race
title: "Promise.all vs Promise.race"
sidebar_label: "Promise.all vs Promise.race"
sidebar_position: 5
description: "Promise.all vs Promise.race — Output Based interview notes."
---
```js
const slow = new Promise((resolve) => setTimeout(() => resolve('slow'), 200));
const fast = new Promise((resolve) => setTimeout(() => resolve('fast'), 100));

Promise.all([slow, fast]).then((values) => console.log('all', values));
Promise.race([slow, fast]).then((value) => console.log('race', value));
Promise.all([slow, Promise.reject('err')]).catch((error) => console.log('catch', error));
```

**Output:**

```text
catch err
race fast
all [ 'slow', 'fast' ]
```

- `Promise.all` waits for **every** promise and keeps the **input order**, not the finish order.
- `Promise.all` rejects **immediately** when any promise rejects.
- `Promise.race` settles with the **first** promise to settle (resolve or reject).

```text
time  0ms ─────────── 100ms ─────────── 200ms
       │                │                 │
reject ●  → all(...reject) catches "err"  │
fast   ─────────────────● → race = "fast" │
slow   ───────────────────────────────────● → all = ['slow', 'fast']
                                               (input order, not finish order)
```

---
