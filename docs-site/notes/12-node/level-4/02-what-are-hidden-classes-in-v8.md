---
id: what-are-hidden-classes-in-v8
title: "What are Hidden Classes in V8?"
sidebar_label: "What are Hidden Classes in V8?"
sidebar_position: 2
description: "What are Hidden Classes in V8? — Node.js interview notes."
---
Hidden classes (also called "shapes" or "maps") are internal structures used by V8 to optimize object property access.

JavaScript objects are dynamic:

```javascript
let obj = {};
obj.name = 'Ali';
obj.age = 25;
```

V8 creates hidden classes to track object shape. Objects with the same properties **added in the same order** share the same hidden class. This enables faster property access (like C++ objects) and optimization.

```text
{}  ──add name──>  Shape1 {name}  ──add age──>  Shape2 {name, age}
```

### How V8 optimizes JavaScript

1. **JIT Compilation**: Converts hot code into machine code
2. **Inline Caching**: Remembers object property access patterns
3. **Hidden Classes**: Makes dynamic objects behave like static ones
4. **Garbage Collection**: Automatically frees memory
5. **TurboFan Optimizer**: Aggressively optimizes frequently used functions

---
