---
id: closures
title: "Closures"
sidebar_label: "Closures"
sidebar_position: 9
description: "Closures — JavaScript interview notes."
---
An ability of a function to remember variables from its outer scope even after the outer function has finished executing.

```javascript
function randomFunc() {
  var obj1 = { name: 'Vivian', age: 45 };
  return function () {
    console.log(obj1.name + ' is awesome');
  };
}
var initialiseClosure = randomFunc();
initialiseClosure(); // "Vivian is awesome"
```

```text
randomFunc() runs and returns ─────────────────┐
randomFunc's execution context is gone         │
                                               ▼
                         ┌──────────────────────────────────┐
initialiseClosure ─────► │ function () {...}                │
                         │   [[Closure]] ──► obj1 = {Vivian} │  ← kept alive
                         └──────────────────────────────────┘
```

### Practical use: private counter

```javascript
function createCounter() {
  let count = 0;               // private — nothing outside can touch it
  return {
    increment: () => ++count,
    get: () => count,
  };
}
const c = createCounter();
c.increment(); // 1
c.increment(); // 2
c.count;       // undefined
```

### Classic question: closure in a loop

```javascript
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// 4 4 4

for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// 1 2 3
```

```text
var — ONE shared i                let — a NEW i per iteration

callback1 ─┐                      callback1 ──► i = 1
callback2 ─┼──► i  (loop ends     callback2 ──► i = 2
callback3 ─┘        at 4)         callback3 ──► i = 3
After 1s: 4 4 4                   After 1s: 1 2 3
```

**Uses of closures:** data privacy, function factories, currying, memoization, debounce/throttle, event handlers.

---
