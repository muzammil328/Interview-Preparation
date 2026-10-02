---
id: react-js-interview-questions-for-intermediate
title: "React.js Interview Questions for Intermediate"
sidebar_label: "React.js Interview Questions for Intermediate"
sidebar_position: 2
description: "React.js Interview Questions for Intermediate — React interview notes."
---
### Q36. What is Strict Mode in React?
A development-only helper that surfaces unsafe patterns and side effects. See [Strict Mode](../../07-javascript/level-3/03-strict-mode.md).

### Q32. Common side effects in React components?
Data fetching, subscriptions, timers, DOM operations, analytics, and storage interactions. They belong in `useEffect` or event handlers, never in the render body.

```mermaid
flowchart LR
    R["Render (pure)"] -->|"after commit"| E["useEffect"]
    E --> F["fetch"]
    E --> S["subscribe"]
    E --> T["setInterval"]
```

### Q45. Types of React hooks?
Core hooks include `useState`, `useEffect`, `useContext`, `useRef`, `useMemo`, `useCallback`, `useReducer`, and concurrent hooks like `useTransition` and `useDeferredValue`.

```mermaid
flowchart TD
    H["Hooks"] --> St["State: useState, useReducer"]
    H --> Ef["Effects: useEffect, useLayoutEffect"]
    H --> Rf["Refs: useRef"]
    H --> Cx["Context: useContext"]
    H --> Pf["Performance: useMemo, useCallback"]
    H --> Cc["Concurrent: useTransition, useDeferredValue"]
```

---
