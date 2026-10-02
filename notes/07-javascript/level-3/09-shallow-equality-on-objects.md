---
id: shallow-equality-on-objects
title: "Shallow Equality: == / === on Objects"
sidebar_label: "Shallow Equality: == / === on Objects"
sidebar_position: 9
description: "Shallow Equality: == / === on Objects — JavaScript interview notes."
---
```javascript
[] === [];             // false — two different objects
const a = [];
const b = a;
a === b;               // true — same reference
```

```text
[] ──► 0x01            a ──┐
[] ──► 0x02  0x01≠0x02     ├──► 0x01   same address → true
                       b ──┘
```

Objects are compared by **reference** (address), never by content.

---
