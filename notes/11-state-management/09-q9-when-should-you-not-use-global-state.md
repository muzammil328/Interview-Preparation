---
id: q9-when-should-you-not-use-global-state
title: "Q9. When should you NOT use global state?"
sidebar_label: "Q9. When should you NOT use global state?"
sidebar_position: 9
description: "Q9. When should you NOT use global state? — State Management interview notes."
---
- **Form input values** — keep them local (or in a form library like React Hook Form).
- **UI state used by one component** — modal open, dropdown open, active tab.
- **API data** — use TanStack Query / RTK Query, not a hand-written global store.
- **Values you can derive** — don't store `totalPrice` if you can compute it from `items`.
- **URL state** — filters, page number, search query belong in the URL (search params), so they survive refresh and can be shared.

```text
Too much global state → every change touches the store → harder to debug, more re-renders
Keep state as close as possible to where it is used.
```

---
