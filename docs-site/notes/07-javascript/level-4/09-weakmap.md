---
id: weakmap
title: "WeakMap"
sidebar_label: "WeakMap"
sidebar_position: 9
description: "WeakMap — JavaScript interview notes."
---
Similar to Map but keys must be objects, and are held weakly.

```javascript
let obj = { name: 'Vivek' };
const map = new WeakMap();
map.set(obj, { age: 23 });
map.get(obj); // { age: 23 }
```

---
