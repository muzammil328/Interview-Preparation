---
id: rest-parameter
title: "Rest Parameter"
sidebar_label: "Rest Parameter"
sidebar_position: 10
description: "Rest Parameter — JavaScript interview notes."
---
Collects multiple arguments into an array.

```javascript
function extractingArgs(...args) {
  return args[1];
}
extractingArgs(8, 9, 1); // Returns 9

function addAllArgs(...args) {
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum += args[i];
  }
  return sum;
}
addAllArgs(6, 5, 7, 99); // Returns 117
```

**Note:** Must be the last parameter.

---
