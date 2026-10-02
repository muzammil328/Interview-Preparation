---
id: arrow-functions
title: "Arrow Functions"
sidebar_label: "Arrow Functions"
sidebar_position: 18
description: "Arrow Functions — JavaScript interview notes."
---
Introduced in ES6, provides shorter syntax.

```javascript
// Traditional
var add = function (a, b) {
  return a + b;
};

// Arrow
var arrowAdd = (a, b) => a + b;

// Single parameter
var arrowMultiplyBy2 = num => num * 2;
```

**Key difference: `this` binding**

```javascript
var obj1 = {
  valueOfThis: function () {
    return this;
  },
};
var obj2 = {
  valueOfThis: () => {
    return this;
  },
};
obj1.valueOfThis(); // Returns obj1
obj2.valueOfThis(); // Returns the outer `this` (window in a browser script), NOT obj2
```

| Regular function | Arrow function |
| ---------------- | -------------- |
| Own `this` (depends on how it's called) | No own `this` — uses the surrounding one |
| Has `arguments` | No `arguments` (use `...args`) |
| Can be used with `new` | Cannot be a constructor |
| Good for object methods | Good for callbacks (`map`, `setTimeout`) |

---
