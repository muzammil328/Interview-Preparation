---
id: optional-chaining
title: "Optional Chaining (?.)"
sidebar_label: "Optional Chaining (?.)"
sidebar_position: 15
description: "Optional Chaining (?.) — JavaScript interview notes."
---
Safely access nested properties. Stops and returns `undefined` if the value before `?.` is `null` or `undefined`.

```javascript
const user = {
  profile: {
    address: {
      city: 'Mumbai',
    },
  },
};
console.log(user.profile.address?.city); // "Mumbai"
console.log(user.profile.address?.country); // undefined
console.log(user.settings?.theme);         // undefined (no error)
user.logout?.();                           // call only if it exists
```

```text
user.settings?.theme
       │
  settings is undefined ──► stop, return undefined   (no TypeError)
```

---
