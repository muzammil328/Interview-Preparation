---
id: passed-by-value-vs-passed-by-reference
title: "Passed by Value vs Passed by Reference"
sidebar_label: "Passed by Value vs Passed by Reference"
sidebar_position: 3
description: "Passed by Value vs Passed by Reference — JavaScript interview notes."
---
- **Primitive types**: Copied by value (a copy of the actual data)
- **Non-primitive types**: Copied by reference (a copy of the memory address of the same object)

```javascript
// Primitive - copied by value
var y = 234;
var z = y;   // z gets its own copy: 234
z = 5411;    // only z changes
console.log(y); // 234
console.log(z); // 5411

// Non-primitive - copied by reference
var obj = { name: 'Vivek' };
var obj2 = obj;
obj.name = 'Akki';
console.log(obj2); // Returns {name: "Akki"}
```

```text
Primitives (stack)            Objects (heap)

y │ 234  │                    obj  ─┐
z │ 5411 │  separate copies          ├──► { name: 'Akki' }   one object
                              obj2 ─┘     two arrows point to it
```

---
