---
id: immediately-invoked-function-iife
title: "Immediately Invoked Function (IIFE)"
sidebar_label: "Immediately Invoked Function (IIFE)"
sidebar_position: 2
description: "Immediately Invoked Function (IIFE) — JavaScript interview notes."
---
A function that runs as soon as it is defined. Used to create a private scope (common before ES modules).

```javascript
(function () {
  // Do something;
})();
```

**How it works:**

1. First set of parentheses: Tells compiler it's a function expression, not declaration
2. Second set of parentheses: Invokes the function

```text
( function () { ... } )  ( )
└──────── 1 ──────────┘  └2┘
  turn it into an          call it
  expression               immediately
```

---
