---
id: multiply-two-numbers-without-using-operator
title: "Multiply Two Numbers Without Using \\* Operator"
sidebar_label: "Multiply Two Numbers Without Using \\* Operator"
sidebar_position: 1
description: "Multiply Two Numbers Without Using \\* Operator — DSA interview notes."
---
```javascript
// Multiply a = 7, b = 5 without * operator

// Method 1: Addition (loop) — O(b)
function multiplyLoop(a, b) {
  let result = 0;
  for (let i = 0; i < b; i++) {
    result += a;
  }
  return result;
}
console.log(multiplyLoop(7, 5)); // 35

// Method 2: Bitwise (shift and add) — O(log b), positive integers only
function multiply(a, b) {
  let result = 0;
  while (b > 0) {
    if (b & 1) result += a;
    a <<= 1;
    b >>= 1;
  }
  return result;
}
console.log(multiply(7, 5)); // 35
```

```text
a = 7, b = 5 (binary 101)

b (binary)   b & 1   result        a
101          1       0 + 7 = 7     7  → 14
10           0       7             14 → 28
1            1       7 + 28 = 35   28 → 56
0            stop    35
```
