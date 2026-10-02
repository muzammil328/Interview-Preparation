---
id: this-regular-method-vs-arrow-function
title: "this — Regular Method vs Arrow Function"
sidebar_label: "this — Regular Method vs Arrow Function"
sidebar_position: 3
description: "this — Regular Method vs Arrow Function — Output Based interview notes."
---
```js
const user = {
  username: 'Ali',
  regular() {
    return this.username;
  },
  arrow: () => {
    return this.username;
  },
  nested() {
    return [1].map(() => this.username)[0];
  },
};

console.log(user.regular());
console.log(user.arrow());
console.log(user.nested());

const detached = user.regular;
console.log(detached());
```

**Output:** `Ali`, `undefined`, `Ali`, `undefined`

| Call               | `this` is                                    | Result      |
| ------------------ | -------------------------------------------- | ----------- |
| `user.regular()`   | `user` (object before the dot)               | `Ali`       |
| `user.arrow()`     | Outer scope `this` (global / module), not `user` | `undefined` |
| `user.nested()`    | Arrow inherits `this` from `nested` → `user` | `Ali`       |
| `detached()`       | No object before the dot → global (or `undefined` in strict mode, which throws) | `undefined` |

```text
Regular function: `this` is decided at CALL time   → look left of the dot
Arrow function:   `this` is decided at WRITE time  → copy it from the enclosing scope

user.regular()     user ◄── dot ── regular()          this = user
user.arrow()       arrow written at top level         this = global/module
user.nested()      nested(): this = user
                     └── arrow inside copies it      this = user
detached()         nothing left of the call           this = global/undefined
```

---
