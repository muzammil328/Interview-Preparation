---
id: conditional-rendering
title: "Conditional Rendering"
sidebar_label: "Conditional Rendering"
sidebar_position: 10
description: "Conditional Rendering — React interview notes."
---
Rendering different UI depending on a condition.

```jsx
// if / else
if (loading) return <Spinner />;

// Ternary
{isLoggedIn ? <Dashboard /> : <Login />}

// Logical &&
{hasError && <ErrorMessage />}
```

**Careful with `&&`:** a number like `0` renders as `0` instead of nothing. Use `count > 0 && <List />` rather than `count && <List />`.

```mermaid
flowchart TD
    A{"loading?"} -->|yes| B["Spinner"]
    A -->|no| C{"isLoggedIn?"}
    C -->|yes| D["Dashboard"]
    C -->|no| E["Login"]
```

---
