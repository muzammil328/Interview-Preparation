---
id: derived-state
title: "Derived State: Should You Copy Props into State?"
sidebar_label: "Derived State: Should You Copy Props into State?"
sidebar_position: 8
description: "Derived State: Should You Copy Props into State? — React interview notes."
---
Usually **no**. If a value can be calculated from props or other state, calculate it during render. Copying it into state creates two sources of truth that drift apart.

```jsx
// ❌ Goes stale when items changes
const [count, setCount] = useState(items.length);

// ✅ Derive during render
const count = items.length;
```

```text
props.items changes → ❌ state copy still holds old value
props.items changes → ✅ derived value recalculated on render
```

---
