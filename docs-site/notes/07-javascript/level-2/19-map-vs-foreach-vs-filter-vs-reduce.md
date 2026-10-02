---
id: map-vs-foreach-vs-filter-vs-reduce
title: "map vs forEach vs filter vs reduce"
sidebar_label: "map vs forEach vs filter vs reduce"
sidebar_position: 19
description: "map vs forEach vs filter vs reduce — JavaScript interview notes."
---
```javascript
const nums = [1, 2, 3, 4];

nums.forEach(n => console.log(n));       // returns undefined — just loops
nums.map(n => n * 2);                    // [2, 4, 6, 8]   — same length
nums.filter(n => n % 2 === 0);           // [2, 4]         — same or shorter
nums.reduce((sum, n) => sum + n, 0);     // 10             — single value
```

```text
           [ 1,  2,  3,  4 ]
map(x2)    [ 2,  4,  6,  8 ]     transform each
filter     [     2,      4 ]     keep some
reduce     0 →1 →3 →6 →10        combine into one

reduce step by step:
  acc=0, n=1 → 1
  acc=1, n=2 → 3
  acc=3, n=3 → 6
  acc=6, n=4 → 10
```

| `forEach` | `map` |
| --------- | ----- |
| Returns `undefined` | Returns a **new array** |
| For side effects (logging, saving) | For transforming data |
| Can't chain | Can chain `.map().filter()` |

Neither can be stopped with `break` — use `for...of` or `some()` / `find()` if you need to stop early.

### Polyfill for map (common interview task)

```javascript
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};
```

---
