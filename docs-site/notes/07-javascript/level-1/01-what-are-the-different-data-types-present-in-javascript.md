---
id: what-are-the-different-data-types-present-in-javascript
title: "What are the different data types present in javascript?"
sidebar_label: "What are the different data types present in javascript?"
sidebar_position: 1
description: "What are the different data types present in javascript? — JavaScript interview notes."
---
JavaScript has two types of data:

### 1. Primitive Types

- **String**: A series of characters
- **Number**: Can be written with or without decimals
- **BigInt**: For large integers (add "n" to the end)
- **Boolean**: true or false
- **Undefined**: Declared but not assigned
- **Null**: Non-existent or invalid value
- **Symbol**: Unique value (ES6)

### 2. Non-Primitive Types

- **Object**: Collection of data in key-value pairs. **Arrays, functions, dates, Maps and Sets are all objects.**

```text
                    JavaScript values
                          │
          ┌───────────────┴───────────────┐
      Primitive (7)                  Object (reference)
   immutable, copied by value       mutable, copied by reference
          │                               │
 string  number  bigint             {}  []  function
 boolean undefined null symbol      Date  Map  Set
```

```javascript
typeof 'hi';       // "string"
typeof 42;         // "number"
typeof [];         // "object"   ← use Array.isArray([]) instead
typeof null;       // "object"   ← famous bug from JS v1
typeof function(){}; // "function" (still an object)
```
