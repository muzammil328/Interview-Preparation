---
id: react-js-interview-questions-for-experienced-professionals
title: "React.js Interview Questions for Experienced Professionals"
sidebar_label: "React.js Interview Questions for Experienced Professionals"
sidebar_position: 1
description: "React.js Interview Questions for Experienced Professionals — React interview notes."
---
### B. Routing and State Management

### Q49. Components of React Router?
`BrowserRouter`, `HashRouter`, `Routes`, `Route`, `Link`, `NavLink`, `Outlet`, and hooks like `useNavigate`, `useParams`, `useLocation`, `useSearchParams`.

```mermaid
flowchart TD
    BR["BrowserRouter"] --> RS["Routes"]
    RS --> R1["Route / → Home"]
    RS --> R2["Route /users → UsersLayout"]
    R2 --> O["Outlet"]
    O --> R3["Route :id → UserDetail (useParams)"]
```

### Q50. What is Redux?
A predictable state management library using store, actions, reducers, and immutable updates.

### Q51. Components of Redux?
Store, actions, reducers, dispatch, and subscribers/selectors.

```mermaid
flowchart LR
    UI["Component"] -->|"dispatch(action)"| Store["Store"]
    Store --> Red["Reducer(state, action)"]
    Red -->|"new state"| Store
    Store -->|"useSelector"| UI
```

### Q54. Context API vs Redux?
Context is lightweight for shared state; Redux is stronger for complex large-scale workflows.

| Context API                                | Redux (Toolkit)                                  |
| ------------------------------------------ | ------------------------------------------------ |
| Built into React                           | External library                                 |
| Every consumer re-renders on value change  | Components subscribe to slices via selectors     |
| Good for theme, auth, locale               | Good for large, frequently changing global state |
| No devtools / middleware                   | Devtools, middleware, time-travel debugging      |

---
