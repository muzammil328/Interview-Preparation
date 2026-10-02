---
id: spread-operator
title: "Spread Operator"
sidebar_label: "Spread Operator"
sidebar_position: 10
description: "Spread Operator — JavaScript interview notes."
---
Spreads an array or object literals.

```javascript
function addFourNumbers(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4;
}
let fourNumbers = [5, 6, 7, 8];
addFourNumbers(...fourNumbers); // Spreads as 5,6,7,8

// Clone array
let array1 = [3, 4, 5, 6];
let clonedArray1 = [...array1];

// Merge objects
let obj1 = { x: 'Hello', y: 'Bye' };
let obj2 = { z: 'Yes', a: 'No' };
let mergedObj = { ...obj1, ...obj2 };
```

### Rest vs Spread

Same `...` syntax, opposite jobs:

```text
REST   — gathers many → one array        function f(...args)   1,2,3  ──► [1,2,3]
SPREAD — expands one array → many        f(...[1,2,3])        [1,2,3] ──► 1,2,3
```

---
