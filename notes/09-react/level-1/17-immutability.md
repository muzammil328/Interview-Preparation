---
id: immutability
title: "Immutability: Why Not Mutate State Directly?"
sidebar_label: "Immutability: Why Not Mutate State Directly?"
sidebar_position: 17
description: "Immutability: Why Not Mutate State Directly? — React interview notes."
---
React decides whether to re-render by comparing the old and new state **by reference** (`Object.is`). If you mutate the same object, the reference doesn't change, so React thinks nothing happened.

```jsx
// ❌ Wrong — same array reference, no re-render
items.push(newItem);
setItems(items);

// ✅ Right — new array reference
setItems([...items, newItem]);

// ✅ Objects
setUser({ ...user, name: 'Ali' });
```

```text
Mutate:     items ──► [a, b, c]  (push d)  ──► [a, b, c, d]
            old ref === new ref  → React: "same" → skips render ❌

Copy:       old ──► [a, b, c]
            new ──► [a, b, c, d]   (different object)
            old ref !== new ref → React re-renders ✅
```

---
