---
id: shallow-copy-vs-deep-copy
title: "Shallow Copy vs Deep Copy"
sidebar_label: "Shallow Copy vs Deep Copy"
sidebar_position: 17
description: "Shallow Copy vs Deep Copy — JavaScript interview notes."
---
### Shallow Copy

Only top-level properties are copied. Nested objects are still shared.

```javascript
const user = { name: 'Alice', address: { city: 'Mumbai' } };
const copy = { ...user };
copy.address.city = 'Delhi';
// Both user and copy show "Delhi" (shared nested object)
```

### Deep Copy

Completely independent clone.

```javascript
const user = { name: 'Alice', address: { city: 'Mumbai' } };
const deepCopy = structuredClone(user);
// Or: JSON.parse(JSON.stringify(user))

deepCopy.address.city = 'Delhi';
// Original user unchanged
```

```text
Shallow { ...user }                     Deep structuredClone(user)

user ─► { name:'Alice', address ─┐      user     ─► { name, address ─► {city:'Mumbai'} }
                                 ├─► { city }
copy ─► { name:'Alice', address ─┘      deepCopy ─► { name, address ─► {city:'Delhi'} }
         one shared nested object                    two separate nested objects
```

**JSON method limits:** loses functions, `undefined`, and `Symbol`s; turns `Date` into a string; fails on circular references. `structuredClone` handles dates and circular references but not functions.

---
