---
id: q7-what-is-zustand-context-vs-redux-vs-zustand
title: "Q7. What is Zustand? Context vs Redux vs Zustand"
sidebar_label: "Q7. What is Zustand? Context vs Redux vs Zustand"
sidebar_position: 7
description: "Q7. What is Zustand? Context vs Redux vs Zustand — State Management interview notes."
---
**Zustand** is a small global state library — a store is just a hook, with no Provider and very little boilerplate.

```js
import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}));

// In a component — re-renders only when `items` changes
const items = useCartStore((state) => state.items);
```

| Feature     | Context API                        | Redux (Toolkit)              | Zustand                          |
| ----------- | ---------------------------------- | ---------------------------- | -------------------------------- |
| Use Case    | Simple global values (theme, auth) | Large apps, complex updates  | Small–large apps, simple API     |
| Performance | Re-renders all consumers on change | Selective (selectors)        | Selective (selectors)            |
| Provider    | Required                           | Required                     | Not required                     |
| Middleware  | No middleware support              | Supports middleware          | Supports middleware (persist, devtools) |
| Boilerplate | Simpler, less code                 | More setup code              | Least code                       |
| DevTools    | React DevTools only                | Redux DevTools for debugging | Redux DevTools via middleware    |
| Install     | Built into React                   | Extra package                | Extra package (very small)       |

### Context API vs Redux in one line

Context is a **way to pass data**; Redux is a **state management system**. Context is good for simple shared data, but when its value changes, all consumers re-render. Redux lets components subscribe to only the data they need, so fewer components re-render. That's why Redux is better for large and complex applications.

---
