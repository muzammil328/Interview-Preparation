---
id: q1-what-is-state-management-and-why-do-we-need-it-in-react
title: "Q1. What is state management, and why do we need it in React apps?"
sidebar_label: "Q1. What is state management, and why do we need it in React apps?"
sidebar_position: 1
description: "Q1. What is state management, and why do we need it in React apps? — State Management interview notes."
---
State management is how we store, update, and share data across components.

```text
Types of state in a React app

┌────────────────────┬──────────────────────────┬────────────────────────────────┐
│ Local state        │ Global (client) state    │ Server state                   │
├────────────────────┼──────────────────────────┼────────────────────────────────┤
│ One component      │ Many components          │ Data that lives on the server  │
│ input, modal open  │ theme, auth user, cart   │ products, users, orders (API)  │
│ useState/useReducer│ Context, Redux, Zustand  │ TanStack Query, SWR, RTK Query │
└────────────────────┴──────────────────────────┴────────────────────────────────┘
```

---

State management is the way we store, update, and share data in a React application. We need it to keep application data organized and make it easier for different components to access and update shared data.

Without it, shared data must be passed through many layers of props — called **prop drilling**:

```text
Prop drilling                           With global state

App (user)                              App
 └─ Layout (user)   ← doesn't need it    └─ Layout
     └─ Sidebar (user) ← doesn't need it     └─ Sidebar
         └─ Avatar (user) ✓ needs it             └─ Avatar ──► reads user from store ✓
```

---
