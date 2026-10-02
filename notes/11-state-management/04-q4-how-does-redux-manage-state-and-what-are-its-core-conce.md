---
id: q4-how-does-redux-manage-state-and-what-are-its-core-conce
title: "Q4. How does Redux manage state, and what are its core concepts?"
sidebar_label: "Q4. How does Redux manage state, and what are its core concepts?"
sidebar_position: 4
description: "Q4. How does Redux manage state, and what are its core concepts? — State Management interview notes."
---
Redux is used for complex, frequently updated shared state, with middleware support.

Redux stores shared state in a central store. A component dispatches an action, the reducer handles that action and updates the state, and the component gets the updated state through a selector.

```mermaid
flowchart LR
    UI["Component"] -- "dispatch(action)" --> MW["Middleware<br/>(thunk, logger)"]
    MW --> R["Reducer<br/>(state, action) => newState"]
    R --> S["Store<br/>(single source of truth)"]
    S -- "useSelector" --> UI
```

| Concept  | Simple Meaning                    |
| -------- | --------------------------------- |
| Store    | Holds the application state (single central store) |
| Action   | Describes what happened, e.g. `{ type: 'cart/add', payload: item }` |
| Reducer  | Pure function: current state + action → new state |
| Dispatch | Sends an action to Redux          |
| Selector | Reads data from the store         |

When state changes, only components whose **selected value** changed re-render.

![Redux Flow](https://miro.medium.com/1*T7dpCTgsMvaf9LKxpSdtXA.png)

### Three principles of Redux

1. **Single source of truth** — one store.
2. **State is read-only** — change it only by dispatching actions.
3. **Changes are made with pure reducers** — no side effects, no mutation (Redux Toolkit lets you write "mutating" code safely via Immer).

---
