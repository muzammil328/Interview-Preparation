---
id: object-methods
title: "Object Methods"
sidebar_label: "Object Methods"
sidebar_position: 13
description: "Object Methods — JavaScript interview notes."
---
```javascript
const obj = { name: 'John', age: 30 };
Object.keys(obj); // ["name", "age"]
Object.values(obj); // ["John", 30]
Object.entries(obj); // [["name", "John"], ["age", 30]]
Object.assign({}, obj); // Shallow clone
Object.fromEntries([['a', 1]]); // { a: 1 }
```

```text
{ name: 'John', age: 30 }
   │
   ├─ keys    → ['name', 'age']
   ├─ values  → ['John', 30]
   └─ entries → [['name','John'], ['age',30]]  ─ fromEntries ─► back to object
```

---

# JavaScript MCQ Quick Review

| Question          | Answer                       |
| ----------------- | ---------------------------- |
| typeof null       | "object"                     |
| typeof undefined  | "undefined"                  |
| typeof NaN        | "number"                     |
| typeof []         | "object"                     |
| 0.1 + 0.2 === 0.3 | false (0.30000000000000004)  |
| [] == []          | false (different references) |
| [] === []         | false                        |
| {} == {}          | false                        |
| NaN === NaN       | false (use Number.isNaN())   |
| '5' + 3           | "53"                         |
| '5' - 3           | 2                            |
| true + true       | 2                            |
| [] + []           | "" (empty string)            |
| null + 1          | 1                            |
| undefined + 1     | NaN                          |

---

# Quick Fire Questions

- **Is JavaScript single-threaded?** Yes, but async operations use Web APIs / libuv and the event loop
- **What is closure?** Function that remembers its outer scope
- **What is hoisting?** Declarations are registered before code runs
- **Difference between let and var?** Block scope vs function scope
- **What is Promise?** Object representing a future value of an async operation
- **What is async/await?** Syntactic sugar for promises
- **What is DOM?** Document Object Model — the page as a tree of nodes
- **What is event delegation?** Single listener on a parent for many children
- **What is memoization?** Caching function results
- **What is currying?** Converting multi-arg function to unary chain
- **Microtask or macrotask first?** All microtasks first, then one macrotask
- **`==` or `===`?** `===` — no type coercion
- **`map` or `forEach`?** `map` returns a new array; `forEach` returns undefined
- **How to remove duplicates?** `[...new Set(arr)]`
- **How to deep copy?** `structuredClone(obj)`

---
