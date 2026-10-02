---
id: functional-vs-class-components
title: "Functional vs Class Components"
sidebar_label: "Functional vs Class Components"
sidebar_position: 5
description: "Functional vs Class Components — React interview notes."
---
**Functional Components**

- Plain JS functions
- Manage state with `useState` and handle lifecycle through `useEffect`
- Simpler to read, easier to test, smaller bundle size

**Class Components**

- ES6 class syntax, rely on the `this` keyword
- Require a `render()` method and separate lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`

```mermaid
flowchart LR
    subgraph Class["Class component"]
        C1["constructor: this.state"] --> C2["render()"]
        C2 --> C3["componentDidMount / DidUpdate / WillUnmount"]
    end
    subgraph Func["Function component"]
        F1["useState"] --> F2["return JSX"]
        F2 --> F3["useEffect + cleanup"]
    end
```

---
