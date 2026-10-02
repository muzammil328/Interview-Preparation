---
id: strict-mode
title: "Strict Mode"
sidebar_label: "Strict Mode"
sidebar_position: 3
description: "Strict Mode — JavaScript interview notes."
---
In ECMAScript 5, strict mode makes JavaScript throw errors for silent failures. ES modules and classes are always strict.

```javascript
'use strict';
// x = 23; // Error: x is not defined
var x;
```

**Characteristics:**

- No duplicate arguments allowed
- Cannot use JavaScript keyword as parameter/function name
- Cannot create global variables by accident
- `this` inside a plain function call is `undefined` (not `window`)
- Makes debugging easier

```text
x = 23  (x never declared)
   │
   ├── sloppy mode → silently creates window.x   ✗ hidden bug
   └── strict mode → ReferenceError              ✓ caught early
```

---
