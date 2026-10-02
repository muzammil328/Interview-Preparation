---
id: q10-how-do-you-persist-global-state-across-page-refreshes
title: "Q10. How do you persist global state across page refreshes?"
sidebar_label: "Q10. How do you persist global state across page refreshes?"
sidebar_position: 10
description: "Q10. How do you persist global state across page refreshes? — State Management interview notes."
---
```text
Store ──subscribe──► localStorage.setItem('cart', JSON.stringify(state))
Page load ──► read localStorage ──► initial store state
```

- Zustand: `persist` middleware.
- Redux: `redux-persist` or a manual `store.subscribe`.
- Never persist sensitive data (tokens, personal data) in `localStorage` — prefer `httpOnly` cookies for auth.
