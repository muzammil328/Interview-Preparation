---
id: array-methods
title: "Array Methods"
sidebar_label: "Array Methods"
sidebar_position: 22
description: "Array Methods — JavaScript interview notes."
---
```javascript
// map() - transform each element
[1, 2, 3].map(x => x * 2); // [2, 4, 6]

// filter() - keep elements passing condition
[1, 2, 3, 4].filter(x => x % 2 === 0); // [2, 4]

// reduce() - reduce to single value
[1, 2, 3, 4].reduce((acc, x) => acc + x, 0); // 10

// forEach() - iterate (no return)
[1, 2, 3].forEach(x => console.log(x));

// find() - first matching element
[1, 2, 3].find(x => x > 1); // 2

// findIndex() - index of first match
[1, 2, 3].findIndex(x => x > 1); // 1

// includes() - does it contain the value?
[1, 2, 3].includes(2); // true

// some() / every() - check conditions
[1, 2, 3].some(x => x > 2); // true
[1, 2, 3].every(x => x > 0); // true

// flat() - flatten nested arrays
[1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4]
```

```text
Which method?
  Need a new array of the same length?   → map
  Need fewer items?                      → filter
  Need ONE value (sum, object, max)?     → reduce
  Need the first match?                  → find / findIndex
  Need true/false?                       → some / every / includes
  Just doing something for each?         → forEach / for...of
```
