---
id: function-declaration-inside-a-function
title: "Function Declaration Inside a Function"
sidebar_label: "Function Declaration Inside a Function"
sidebar_position: 1
description: "Function Declaration Inside a Function — Output Based interview notes."
---
```js
var a = 1;
function b() {
  a = 10;
  return;
  function a() {}
}
b();
console.log(a);
```

**Output:** `1`

`function a() {}` is hoisted to the top of `b`, creating a **local** `a`. So `a = 10` changes the local one, and the global `a` stays `1`. The `return` doesn't matter — hoisting happens before any line runs.

```text
b() creation phase:   local a → function a() {}
b() runs:             a = 10   → changes LOCAL a  (function replaced by 10)
                      return
global:               a → 1    (never touched)
```

---
