---
id: memoization
title: "Memoization"
sidebar_label: "Memoization"
sidebar_position: 8
description: "Memoization — JavaScript interview notes."
---
Caching return values based on parameters, so an expensive call with the same input is computed only once.

```javascript
function memoizedAddTo256() {
  var cache = {};
  return function (num) {
    if (num in cache) {
      console.log('cached value');
      return cache[num];
    } else {
      cache[num] = num + 256;
      return cache[num];
    }
  };
}
var memoizedFunc = memoizedAddTo256();
memoizedFunc(20); // Normal return
memoizedFunc(20); // Cached return
```

```text
memoizedFunc(20)
   │
   ▼
 20 in cache? ──no──► compute 276 ──► cache = { 20: 276 } ──► return 276
   │
  yes (second call)
   ▼
 return cache[20] ⚡ no computation
```

---
