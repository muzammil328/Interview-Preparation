---
id: tagged-templates
title: "Tagged Templates"
sidebar_label: "Tagged Templates"
sidebar_position: 10
description: "Tagged Templates — JavaScript interview notes."
---
Function that processes template literals.

```javascript
function tag(strings, ...values) {
  console.log(strings); // parts
  console.log(values); // interpolated values
}
tag`Hello ${'Justin'}, you have ${3} messages`;
```

---
