---
id: patterns-and-apis
title: "Patterns and APIs"
sidebar_label: "Patterns and APIs"
sidebar_position: 1
description: "Patterns and APIs — React interview notes."
---
### Higher-Order Components (HOC)

A function that takes a component and returns an enhanced component.

```jsx
function withAuth(Component) {
  return function ProtectedComponent(props) {
    if (!isAuthenticated) {
      return <Login />;
    }
    return <Component {...props} />;
  };
}
```

HOCs were common before Hooks. Today most use cases are better handled with custom hooks, composition, or context.

```mermaid
flowchart LR
    A["Dashboard"] --> W["withAuth()"]
    W --> B["ProtectedDashboard"]
    B --> Q{"isAuthenticated?"}
    Q -->|yes| D["render Dashboard"]
    Q -->|no| L["render Login"]
```

---

### Component Lifecycle

Three conceptual phases:

- **Mount** — the component is added to the UI
- **Update** — props or state change and React renders again
- **Unmount** — the component is removed from the UI

In function components this is handled with hooks, mainly `useEffect`.

```mermaid
flowchart LR
    M["Mount"] --> U["Update (repeats)"]
    U --> U
    U --> X["Unmount"]
    M -.- M1["useEffect(fn, []) runs / componentDidMount"]
    U -.- U1["useEffect(fn, [deps]) runs / componentDidUpdate"]
    X -.- X1["cleanup runs / componentWillUnmount"]
```

---

### Event Bubbling

An event triggered on a child propagates upward through its ancestors.

```jsx
<div onClick={() => console.log('parent')}>
  <button onClick={() => console.log('button')}>Click</button>
</div>
```

Clicking the button logs `button` then `parent`. Stop it with:

```jsx
event.stopPropagation();
```

```text
click on <button>
   │  logs "button"
   ▼ bubbles up
<div> logs "parent"
   ▼
document / root
```

---

### Synthetic Events

React wraps native browser events in a **SyntheticEvent** object that behaves the same in every browser. React attaches listeners at the **root** container (event delegation) instead of on each element.

```mermaid
flowchart LR
    B["Native click on button"] --> R["React root listener"]
    R --> S["Creates SyntheticEvent"]
    S --> H["Calls your onClick handler"]
```

---

### Context API

Makes data available to a component subtree without passing props through every level.

```jsx
const ThemeContext = createContext('light');

// Provide (React 19+)
<ThemeContext value="dark">
  <App />
</ThemeContext>;

// React 18 and earlier
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>;

// Consume
const theme = useContext(ThemeContext);
```

The Context API is the overall mechanism of creating, providing, and consuming context. `useContext()` is how function components consume it.

**Caveat:** when the context value changes, every consumer re-renders. Split contexts or memoize the value object to limit this.

```mermaid
flowchart TD
    C["createContext('light')"] --> P["Provider value='dark'"]
    P --> A["App"]
    A --> X["Header (not a consumer)"]
    A --> Y["ThemeButton: useContext → 'dark'"]
    A --> Z["Footer: useContext → 'dark'"]
```

---

### Error Boundaries

Catch errors during rendering and show fallback UI instead of crashing the whole tree.

```jsx
<ErrorBoundary fallback={<ErrorPage />}>
  <Dashboard />
</ErrorBoundary>
```

They catch errors in rendering, lifecycle methods, and constructors of descendant components.

They do **not** catch errors in event handlers, async code, server-side rendering, or the boundary itself. Error boundaries must be class components (or use a library like `react-error-boundary`).

```mermaid
flowchart TD
    App --> EB["ErrorBoundary"]
    EB --> D["Dashboard"]
    D --> W["Widget throws during render 💥"]
    W -.->|"error bubbles up"| EB
    EB --> F["Shows ErrorPage; rest of App keeps working"]
```

---

### Strict Mode

A development-only wrapper that helps find bugs. It does nothing in production.

In development it:

- Renders components **twice** to catch impure render logic
- Runs effects **mount → unmount → mount** to catch missing cleanup
- Warns about deprecated APIs

```text
<StrictMode> in development:
render() → render() again     (results must be identical)
effect() → cleanup() → effect()  (cleanup must undo the effect)
```

**"Why does my console.log / API call run twice?"** — Strict Mode in development. It is not a bug, and it doesn't happen in production.

---

### Client-Side vs Server-Side Routing

**Client-Side Routing** — navigation happens in the browser without a full page reload.

- Fast navigation
- Preserves client state
- More app-like experience

**Server-Side Routing** — the browser requests a URL from the server.

The server decides what to return for that route.

```mermaid
flowchart LR
    subgraph Client-side
        L1["Click Link"] --> H1["History API changes URL"] --> R1["Router swaps component, no reload"]
    end
    subgraph Server-side
        L2["Click link"] --> S2["Request to server"] --> P2["New HTML page, full reload"]
    end
```

---
