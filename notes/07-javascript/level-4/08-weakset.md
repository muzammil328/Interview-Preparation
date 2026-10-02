---
id: weakset
title: "WeakSet"
sidebar_label: "WeakSet"
sidebar_position: 8
description: "WeakSet — JavaScript interview notes."
---
Collection of unique objects with weak references (does not stop them from being garbage collected).

```javascript
let obj1 = { message: 'Hello world' };
const newSet = new WeakSet([obj1]);
newSet.has(obj1); // true

// Only objects, no primitives
// Methods: add(), delete(), has()
```

---
