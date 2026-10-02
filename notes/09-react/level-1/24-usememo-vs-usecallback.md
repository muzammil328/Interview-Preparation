---
id: usememo-vs-usecallback
title: "useMemo vs useCallback"
sidebar_label: "useMemo vs useCallback"
sidebar_position: 24
description: "useMemo vs useCallback — React interview notes."
---
```jsx
// useMemo → memoize a VALUE
const expensiveValue = useMemo(() => calculateSomething(data), [data]);

// useCallback → memoize a FUNCTION reference
const handleClick = useCallback(() => doSomething(id), [id]);
```

`useCallback(fn, deps)` is just shorthand for `useMemo(() => fn, deps)`.

```mermaid
flowchart TD
    R["Component re-renders"] --> D{"Dependencies changed?"}
    D -->|no| Cached["Return cached value / same function reference"]
    D -->|yes| New["Recompute value / create new function"]
    Cached --> M["Memoized child sees same prop → skips render"]
```

**When to use them:** for genuinely expensive calculations, or to keep a stable reference for a `React.memo` child or an effect dependency. Wrapping everything adds cost without benefit.

---
