---
id: usereducer
title: "useReducer"
sidebar_label: "useReducer"
sidebar_position: 27
description: "useReducer — React interview notes."
---
Useful for more complex state transitions.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
```

Think: **State + Action → Reducer → New State**

```mermaid
flowchart LR
    UI["UI: button click"] -->|"dispatch({ type: 'increment' })"| R["reducer(state, action)"]
    S["Current state"] --> R
    R --> N["New state"]
    N --> UI
```

**useState vs useReducer:** use `useState` for simple independent values; use `useReducer` when the next state depends on several values or many actions update the same state.

---
