---
id: generator-functions
title: "Generator Functions"
sidebar_label: "Generator Functions"
sidebar_position: 7
description: "Generator Functions — JavaScript interview notes."
---
Can be stopped midway and continue from where they stopped.

```javascript
function* genFunc() {
  yield 3;
  yield 4;
}
genFunc(); // Returns Object [Generator] {}

var iterator = genFunc();
iterator.next(); // {value: 3, done: false}
iterator.next(); // {value: 4, done: false}
iterator.next(); // {value: undefined, done: true}
```

---
