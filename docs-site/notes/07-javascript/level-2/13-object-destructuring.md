---
id: object-destructuring
title: "Object Destructuring"
sidebar_label: "Object Destructuring"
sidebar_position: 13
description: "Object Destructuring — JavaScript interview notes."
---
Extract elements from objects.

```javascript
const classDetails = {
  strength: 78,
  benches: 39,
  blackBoard: 1,
};

// Before ES6
const strength = classDetails.strength;

// ES6 Destructuring
const { strength, benches, blackBoard } = classDetails;
const { strength: classStrength } = classDetails; // Rename
const { teacher = 'Unknown' } = classDetails;      // Default value
```

```text
{ strength: 78, benches: 39, blackBoard: 1 }
      │             │             │
      ▼             ▼             ▼
const { strength,  benches,  blackBoard } = classDetails
```

---
