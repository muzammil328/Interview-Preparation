---
id: local-var-shadows-the-global
title: "Local var Shadows the Global"
sidebar_label: "Local var Shadows the Global"
sidebar_position: 1
description: "Local var Shadows the Global — Output Based interview notes."
---
```js
var name = 'Global';
function greet() {
  console.log(name);
  var name = 'Local';
  console.log(name);
}
greet();
```

**Output:** `undefined`, `Local`

Many people expect `Global` first. But `var name` inside `greet` is hoisted to the top of **greet**, so the local `name` (still `undefined`) hides the global one.

```text
Global memory               greet() memory (creation phase)
┌────────────────────┐      ┌──────────────────────────┐
│ name → 'Global'    │      │ name → undefined          │ ◄── found here first,
└────────────────────┘      └──────────────────────────┘     global never checked

line 1: console.log(name) → undefined
line 2: name = 'Local'
line 3: console.log(name) → 'Local'
```

---
