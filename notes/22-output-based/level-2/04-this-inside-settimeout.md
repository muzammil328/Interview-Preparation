---
id: this-inside-settimeout
title: "this Inside setTimeout"
sidebar_label: "this Inside setTimeout"
sidebar_position: 4
description: "this Inside setTimeout — Output Based interview notes."
---
```js
const obj = {
  name: 'Ali',
  regular() {
    setTimeout(function () {
      console.log(this.name);
    }, 0);
  },
  arrow() {
    setTimeout(() => console.log(this.name), 0);
  },
};

obj.regular();
obj.arrow();
```

**Output (Node):** `undefined`, `Ali`
**Output (browser):** `''` (empty line), `Ali` — `window.name` exists and is an empty string by default.

The regular callback is called **later by the timer**, not by `obj`, so it loses `this`. The arrow callback copies `this` from `arrow()`, where it is `obj`.

```text
obj.regular()  this = obj
   └─ setTimeout(function () {...})
          later the TIMER calls it:  callback()   ← nothing before the dot
          this = Timeout object (Node) / window (browser) → this.name = undefined / ''

obj.arrow()    this = obj
   └─ setTimeout(() => {...})
          arrow has no own this → uses arrow()'s this = obj → 'Ali'
```

**Old-school fix:** `const self = this;` before the timer, or `.bind(this)`.

---
