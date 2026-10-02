---
id: function-declaration-vs-function-expression
title: "Function Declaration vs Function Expression"
sidebar_label: "Function Declaration vs Function Expression"
sidebar_position: 2
description: "Function Declaration vs Function Expression — JavaScript interview notes."
---
```javascript
sayHi();   // ✓ "Hi" — declaration is fully hoisted
function sayHi() { console.log('Hi'); }

sayBye();  // ✗ TypeError: sayBye is not a function (it is undefined here)
var sayBye = function () { console.log('Bye'); };
```

```text
Creation phase memory:
  sayHi  → function sayHi() {...}   ✓ callable
  sayBye → undefined                ✗ calling undefined → TypeError
```

| Declaration | Expression |
| ----------- | ---------- |
| `function f() {}` | `const f = function () {}` / arrow |
| Hoisted with its body | Follows variable hoisting rules |
| Can be called before its line | Cannot be called before its line |
