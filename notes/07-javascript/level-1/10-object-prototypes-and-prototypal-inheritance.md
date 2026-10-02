---
id: object-prototypes-and-prototypal-inheritance
title: "Object Prototypes and Prototypal Inheritance"
sidebar_label: "Object Prototypes and Prototypal Inheritance"
sidebar_position: 10
description: "Object Prototypes and Prototypal Inheritance — JavaScript interview notes."
---
All JavaScript objects have a hidden link (`[[Prototype]]`, accessible via `__proto__` or `Object.getPrototypeOf`) to another object. When a property is not found on the object, JavaScript looks up this chain.

```javascript
var arr = [];
arr.push(2);
console.log(arr); // [2]
```

Array objects inherit from Array prototype. The JavaScript engine looks for methods in the prototype chain.

```text
arr.push(2)

arr ──────────────► Array.prototype ──────► Object.prototype ──────► null
{ 0: 2, length }    { push, map, filter }   { toString, hasOwnProperty }
   │                    │
 "push" here? no ──► found here ✓
```

```javascript
const animal = { eats: true };
const dog = Object.create(animal); // dog.__proto__ === animal
dog.barks = true;

dog.barks; // true  (own property)
dog.eats;  // true  (found on the prototype)
dog.hasOwnProperty('eats'); // false
```

`class ... extends` uses exactly this mechanism under the hood.

---
