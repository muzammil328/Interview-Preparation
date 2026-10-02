---
id: recursion
title: "Recursion"
sidebar_label: "Recursion"
sidebar_position: 5
description: "Recursion — JavaScript interview notes."
---
A technique where a function calls itself until it reaches a **base case**.

```javascript
function add(number) {
  if (number <= 0) {
    return 0;
  } else {
    return number + add(number - 1);
  }
}
add(3); // 3 + 2 + 1 + 0 = 6
```

```text
add(3)                                 returns 6
 └─ 3 + add(2)                         ▲ 3 + 3
         └─ 2 + add(1)                 ▲ 2 + 1
                 └─ 1 + add(0)         ▲ 1 + 0
                         └─ 0  (base case)
```

No base case → infinite calls → stack overflow.

---
