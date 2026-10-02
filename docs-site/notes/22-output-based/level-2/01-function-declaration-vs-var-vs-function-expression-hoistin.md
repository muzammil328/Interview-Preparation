---
id: function-declaration-vs-var-vs-function-expression-hoistin
title: "Function Declaration vs var vs Function Expression Hoisting"
sidebar_label: "Function Declaration vs var vs Function Expression Hoisting"
sidebar_position: 1
description: "Function Declaration vs var vs Function Expression Hoisting — Output Based interview notes."
---
```js
console.log(typeof foo);
var foo = 1;
function foo() {}
console.log(typeof foo);

console.log(typeof bar);
var bar = function () {};
```

**Output:** `function`, `number`, `undefined`

- Function declarations are hoisted **with their body**, and win over a `var` of the same name during hoisting.
- The assignment `foo = 1` happens later, at run time.
- A function **expression** assigned to `var` is hoisted like any `var` — only as `undefined`.

```text
Creation phase memory          Step                       Memory after
┌───────────────────────┐
│ foo → function foo()  │      typeof foo                 → "function"
│ bar → undefined       │      foo = 1                    foo → 1
└───────────────────────┘      typeof foo                 → "number"
                               typeof bar                 → "undefined"
                               bar = function () {}       bar → function
```

---
