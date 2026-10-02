---
id: object-freeze-vs-const
title: "Object.freeze vs const"
sidebar_label: "Object.freeze vs const"
sidebar_position: 8
description: "Object.freeze vs const — JavaScript interview notes."
---
```javascript
const user = { name: 'Ali' };
user.name = 'Sara';   // ✓ allowed — const only stops reassigning `user`
// user = {};         // ✗ TypeError

const frozen = Object.freeze({ name: 'Ali', address: { city: 'Lahore' } });
frozen.name = 'Sara';           // ✗ ignored (TypeError in strict mode)
frozen.address.city = 'Karachi'; // ✓ works — freeze is SHALLOW
```

```text
const    → locks the VARIABLE (arrow can't move)     user ──X──► new object
freeze   → locks the OBJECT's top-level properties    { name 🔒, address ──► {city ✏️} }
```

---
