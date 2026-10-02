---
id: useref
title: "useRef"
sidebar_label: "useRef"
sidebar_position: 25
description: "useRef — React interview notes."
---
Stores a mutable value that persists between renders **without** causing a re-render when changed.

```jsx
const inputRef = useRef(null);

<input ref={inputRef} />;

inputRef.current.focus();
```

Unlike state, `ref.current = value` does not trigger a render. Use it for DOM nodes, timer IDs, and previous values.

## useRef vs useState

| useState                         | useRef                                  |
| -------------------------------- | --------------------------------------- |
| Changing it re-renders           | Changing it does **not** re-render      |
| Value shown in the UI            | Value kept "behind the scenes"          |
| Updated via setter (scheduled)   | Updated directly (`ref.current = x`)     |

```text
state:  setCount(5)        → 🔄 re-render → UI shows 5
ref:    ref.current = 5    → no render    → UI unchanged, value saved for later
```

---
