---
id: higher-order-functions
title: "Higher Order Functions"
sidebar_label: "Higher Order Functions"
sidebar_position: 5
description: "Higher Order Functions — JavaScript interview notes."
---
Functions that operate on other functions (take them as arguments or return them). This works because functions are **first-class** values in JavaScript — they can be stored in variables, passed, and returned.

```javascript
function higherOrder(fn) {
  fn();
}
higherOrder(function () {
  console.log('Hello world');
});

function higherOrder2() {
  return function () {
    return 'Do something';
  };
}
var x = higherOrder2();
x(); // Returns "Do something"
```

```text
           ┌──────────────────────┐
 fn ──────►│  higher-order func   │──────► new fn
 (input)   └──────────────────────┘        (output)

 Built-in examples: map, filter, reduce, setTimeout, addEventListener
```

---
