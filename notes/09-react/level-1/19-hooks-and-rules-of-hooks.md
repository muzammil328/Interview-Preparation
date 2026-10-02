---
id: hooks-and-rules-of-hooks
title: "Hooks and the Rules of Hooks"
sidebar_label: "Hooks and the Rules of Hooks"
sidebar_position: 19
description: "Hooks and the Rules of Hooks — React interview notes."
---
Hooks are functions that let function components use state, lifecycle, refs, context, and other React features.

**Rules:**

1. Call hooks only at the **top level** — never inside conditions, loops, or nested functions.
2. Call hooks only from **React components or custom hooks**.

**Why?** React doesn't store hooks by name. It stores them in a list, in call order, per component. If a hook is skipped on one render, every hook after it reads the wrong slot.

```text
Render 1 (isLoggedIn = true)     Render 2 (isLoggedIn = false)
slot 0: useState('Ali')          slot 0: useState('Ali')
slot 1: useState(0)  ← in if     slot 1: useEffect(...)   ← reads count's slot! 💥
slot 2: useEffect(...)
```

```jsx
// ❌ Breaks the order
if (isLoggedIn) {
  const [count, setCount] = useState(0);
}

// ✅ Always call the hook, put the condition inside
const [count, setCount] = useState(0);
```

---
