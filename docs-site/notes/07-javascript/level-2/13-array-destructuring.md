---
id: array-destructuring
title: "Array Destructuring"
sidebar_label: "Array Destructuring"
sidebar_position: 13
description: "Array Destructuring — JavaScript interview notes."
---
```javascript
const arr = [1, 2, 3, 4];
const [first, second, ...rest] = arr; // 1, 2, [3, 4]

// Swap two variables without a temp
let a = 1, b = 2;
[a, b] = [b, a]; // a = 2, b = 1
```

```text
[ 1,     2,      3, 4 ]
  │      │       └─┬─┘
first  second    rest
```

---
