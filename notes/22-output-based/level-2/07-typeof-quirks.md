---
id: typeof-quirks
title: "typeof Quirks"
sidebar_label: "typeof Quirks"
sidebar_position: 7
description: "typeof Quirks — Output Based interview notes."
---
```js
console.log(typeof null);
console.log(typeof []);
console.log(typeof function () {});
console.log(typeof NaN);
console.log(typeof undefined);
console.log(typeof notDeclared);
```

**Output:** `object`, `object`, `function`, `number`, `undefined`, `undefined`

| Expression            | Output        | Why                                                     |
| --------------------- | ------------- | ------------------------------------------------------- |
| `typeof null`         | `"object"`    | A bug from the first version of JS, kept for compatibility |
| `typeof []`           | `"object"`    | Arrays are objects — use `Array.isArray()`              |
| `typeof function(){}` | `"function"`  | Functions are callable objects with their own tag        |
| `typeof NaN`          | `"number"`    | NaN is a special numeric value                          |
| `typeof notDeclared`  | `"undefined"` | `typeof` is the one place an undeclared name does not throw |

```text
             typeof value
                  │
   ┌──────────────┼───────────────┐
primitive?     function?       everything else
   │              │                 │
"string"      "function"        "object"
"number" (incl. NaN)            ├── {}  []  new Date()
"boolean"                        └── null  ← historical bug
"undefined"
"bigint" "symbol"
```

---
