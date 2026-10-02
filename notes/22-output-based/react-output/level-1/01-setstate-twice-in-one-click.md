---
id: setstate-twice-in-one-click
title: "setState Twice in One Click"
sidebar_label: "setState Twice in One Click"
sidebar_position: 1
description: "setState Twice in One Click — Output Based interview notes."
---
These are asked in React interviews as "what happens when I click the button?". The answers assume React 18+ and a production build unless StrictMode is mentioned.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  }

  return <button onClick={handleClick}>{count}</button>;
}
```

**After one click — logs:** `0` **and the button shows:** `1`

- `count` is a **snapshot** for this render. Both calls are `setCount(0 + 1)`.
- `setCount` doesn't change `count` immediately, so the log still prints `0`.

```text
Render #1: count = 0 (snapshot)
  click → setCount(0 + 1)  queue: [1]
          setCount(0 + 1)  queue: [1, 1]   ← same value twice
          console.log(0)
Render #2: count = 1
```

**Fix — use the updater function:**

```jsx
setCount((c) => c + 1);
setCount((c) => c + 1);
// button shows 2
```

```text
queue: [c => c + 1, c => c + 1]
0 → 1 → 2   each updater receives the LATEST value
```
